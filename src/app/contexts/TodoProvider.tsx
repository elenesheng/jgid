"use client";

import { useContext, useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSession } from "next-auth/react";
import { v4 as uuidv4 } from "uuid";
import PQueue from "p-queue";
import * as api from "@/app/lib/api";
import { Todo } from "@/app/types/tasks";
import useLocalStorage from "../hooks/useLocalStorage";
import { getCurrentWeekday } from "../lib/utils/helper";
import { SettingsStateContext } from "./TimerContext";
import { TodosContext } from "./TodoContext";

const queue = new PQueue({ concurrency: 1 });

export const TodosProvider = ({ children }: { children: React.ReactNode }) => {
    const queryClient = useQueryClient();
    const { data: session, status } = useSession();
    const [selectedTodoId, setSelectedTodoId] = useLocalStorage("selectedTodoId", "");
    const [activeDate, setActiveDate] = useLocalStorage<string>("activeDate", getCurrentWeekday());
    const [localTodos, setLocalTodos] = useLocalStorage<Todo[]>("todos", []);
    const [isInitialized, setIsInitialized] = useState(false);
    const [isHydrated, setIsHydrated] = useState(false);
    const settings = useContext(SettingsStateContext)!

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const { data: dbTodos, isLoading } = useQuery("todos", api.fetchTodos, {
        enabled: status === "authenticated" && !isInitialized,
        onSuccess: (data) => {
            if (status === "authenticated") {
                setLocalTodos(data);
                setIsInitialized(true);
            }
        },
    });

    useEffect(() => {
        if (status === "authenticated" && !isInitialized) {
            queryClient.invalidateQueries("todos");
        }
    }, [status, isInitialized, queryClient]);

    const addTodoMutation = useMutation(api.createTodo, {
        onError: (error, newTodo, context) => {
            console.error('Failed to add todo', error);
        },
        onSettled: (newTodo) => {
            setLocalTodos((prevTodos) => {
                if (!prevTodos.find((todo) => todo.id === newTodo.id)) {
                    return [...prevTodos, newTodo];
                }
                return prevTodos;
            });
        },
    });

    const updateTodoMutation = useMutation(api.updateTodo, {
        onMutate: (updatedTodo) => {
            const prevTodos = localTodos;
            setLocalTodos((todos) =>
                todos.map(todo => todo.id === updatedTodo.id ? updatedTodo : todo)
            );
            return { prevTodos };
        },
        onError: (error, updatedTodo, context) => {
            if (context?.prevTodos) {
                setLocalTodos(context.prevTodos);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries('todos');
        },
    });

    const deleteTodoMutation = useMutation(api.deleteTodo, {
        onMutate: (id) => {
            const prevTodos = localTodos;
            setLocalTodos((todos) => todos.filter(todo => todo.id !== id));
            return { prevTodos };
        },
        onError: (error, id, context) => {
            if (context?.prevTodos) {
                setLocalTodos(context.prevTodos);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries('todos');
        },
    });

    if (!isHydrated) {
        return null;
    }

    const addTodo =
        (name: string, description: string) => {
            const newTodo = {
                id: uuidv4(),
                name,
                description,
                completed: false,
                spentTime: 0,
                weekday: activeDate,
            };

            setLocalTodos((prevTodos) => [...prevTodos, newTodo]);

            if (status === 'authenticated') {
                queue.add(() =>
                    addTodoMutation.mutateAsync(newTodo).catch((error) => {
                        console.error('Error in adding todo:', error);
                    })
                );
            }
        }


    const editTodo =
        (todoId: string, name: string, description: string) => {
            const todoToUpdate = localTodos.find((todo) => todo.id === todoId);
            if (todoToUpdate) {
                const updatedTodo = { ...todoToUpdate, name, description };

                queue.add(() =>
                    updateTodoMutation.mutateAsync(updatedTodo).catch((error) => {
                        console.error('Error in updating todo:', error);
                    })
                );

                setLocalTodos((prevTodos) =>
                    prevTodos.map((todo) => (todo.id === todoId ? updatedTodo : todo))
                );
            }
        }


    const toggleTodoComplete = (todoId: string) => {
        setLocalTodos((prevTodos) =>
            prevTodos.map(todo =>
                todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
            )
        );

        if (status === 'authenticated') {
            const todoToToggle = localTodos.find(todo => todo.id === todoId);
            if (todoToToggle) {
                queue.add(() =>
                    updateTodoMutation.mutateAsync({ ...todoToToggle, completed: !todoToToggle.completed }).catch((error) => {
                        console.error('Error in toggling todo completion:', error);
                    })
                );
            }
        }
    }

    const removeTodo = (todoId: string) => {
        if (status === 'authenticated') {
            queue.add(() =>
                deleteTodoMutation.mutateAsync(todoId).catch((error) => {
                    console.error('Error in deleting todo:', error);
                })
            );
        } else {
            setLocalTodos((prevTodos) => prevTodos.filter(todo => todo.id !== todoId));
        }
    }

    const clearAllTodos = () => {
        if (status === 'authenticated') {
            const apiCall = settings.isWeekDays ?
                api.deleteTodosByWeekDays(activeDate) :
                api.deleteAllTodos();

            queue.add(() =>
                apiCall.then(() => {
                    setLocalTodos(prevTodos =>
                        settings.isWeekDays ? prevTodos.filter(todo => todo.weekday !== activeDate) : []
                    );
                    queryClient.invalidateQueries('todos');
                }).catch((error) => {
                    console.error('Failed to clear todos:', error);
                })
            );
        } else {
            setLocalTodos(settings.isWeekDays ?
                prevTodos => prevTodos.filter(todo => todo.weekday !== activeDate) :
                []
            );
        }
    };

    const getFilteredTodos = () => {
        if (settings.isWeekDays) {
            return localTodos.filter(todo => todo.weekday === activeDate);
        }
        return localTodos;
    };

    const getCount = (weekday: string) => {
        return localTodos?.filter(todo => todo.weekday === weekday).length;
    };

    const setSpentTime = (todoId: string, spentTime: number) => {
        setLocalTodos((prevTodos) =>
            prevTodos.map(todo =>
                todo.id === todoId ? { ...todo, spentTime: (todo.spentTime || 0) + spentTime } : todo
            )
        );

        if (status === 'authenticated') {
            const todoToUpdate = localTodos.find(todo => todo.id === todoId);
            if (todoToUpdate) {
                queue.add(() =>
                    updateTodoMutation.mutateAsync({ ...todoToUpdate, spentTime: (todoToUpdate.spentTime || 0) + spentTime }).catch((error) => {
                        console.error('Error in updating spent time:', error);
                    })
                );
            }
        }
    };



    const value = {
        todos: getFilteredTodos(),
        activeDate,
        loading: isLoading,
        // error: addTodoMutation.isError || updateTodoMutation.isError || deleteTodoMutation.isError,
        addTodo,
        editTodo,
        toggleTodoComplete,
        removeTodo,
        clearAllTodos,
        getCount,
        setSpentTime,
        setActiveDate,
        setSelectedTodoId,
        selectedTodoId,
    };

    return (
        <TodosContext.Provider value={value}>
            {children}
        </TodosContext.Provider>
    );
};
