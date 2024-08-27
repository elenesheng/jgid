import { useCallback, useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
    initializeTodos,
    addTodo,
    updateTodo,
    removeTodo,
    clearAllTodos,
    clearAllTodosByWeekDay,
    setHasLoadedFromDB
} from "@/app/store/slices/todoSlice";
import { Todo } from "@/app/types/tasks";
import { useSession } from "next-auth/react";
import { SettingsStateContext } from "../contexts/TimerContext";
import { getCurrentWeekday } from "../lib/utils/helper";
import useLocalStorage from "./useLocalStorage";

export function useTodos() {
    const dispatch = useDispatch();
    const { todos, activeDate, loading, error, hasLoadedFromDB } = useSelector((state: any) => state.todos);
    const { data: session, status } = useSession();
    const [selectedTodoId, setSelectedId] = useLocalStorage("selectedTodoId", "")
    const settings = useContext(SettingsStateContext)!;

    useEffect(() => {
        if (status !== 'loading') {
            dispatch(initializeTodos(!!session));
        }
    }, []);

    const getFilteredTodos = useCallback(() => {
        if (settings.isWeekDays) {
            return todos.filter((todo: Todo) => todo.weekday === activeDate);
        }
        return todos;
    }, [todos, settings.isWeekDays, activeDate]);

    const addNewTodo = useCallback(
        (name: string, description: string) => {
            const newTodo: Todo = {
                id: uuidv4(),
                name,
                description,
                completed: false,
                spentTime: 0,
                weekday: settings.isWeekDays ? activeDate : "",
            };
            dispatch(addTodo(newTodo));
        },
        [dispatch, activeDate, settings.isWeekDays]
    );

    const editTodo = useCallback(
        (todoId: string, name: string, description: string) => {
            const todoToUpdate = todos.find((todo: Todo) => todo.id === todoId);
            if (todoToUpdate) {
                dispatch(updateTodo({ ...todoToUpdate, name, description }));
            }
        },
        [dispatch, todos]
    );

    const toggleTodoComplete = useCallback(
        (todoId: string) => {
            const todoToToggle = todos.find((todo: Todo) => todo.id === todoId);
            if (todoToToggle) {
                dispatch(updateTodo({ ...todoToToggle, completed: !todoToToggle.completed }));
            }
        },
        [dispatch, todos]
    );

    const removeTodoItem = useCallback(
        (todoId: string) => {
            dispatch(removeTodo(todoId));
        },
        [dispatch]
    );

    const setSelectedTodoId = (todoId: string) => {
        setSelectedId(todoId);
    }

    const clearAllTodosItems = useCallback(() => {
        if (settings.isWeekDays) {
            dispatch(clearAllTodosByWeekDay(activeDate));
        } else {
            dispatch(clearAllTodos());
        }

    }, [dispatch]);

    const getCount = useCallback(
        (weekday: string) => {
            return todos.filter((todo: Todo) => todo.weekday === weekday).length;
        },
        [todos]
    );

    const setSpentTime = useCallback((todoId: string, spentTime: number) => {
        const updatedTodo = todos.find((todo: Todo) => todo.id === todoId);
        if (updatedTodo) {
            dispatch(updateTodo({ ...updatedTodo, spentTime }));
        }
    }, [dispatch, todos]);

    const setActiveDate = useCallback((date: string) => {
        localStorage.setItem("activeDate", date? date: getCurrentWeekday());
    }, []);

    return {
        todos: getFilteredTodos(),
        activeDate,
        loading,
        error,
        hasLoadedFromDB,
        addTodo: addNewTodo,
        editTodo,
        toggleTodoComplete,
        removeTodo: removeTodoItem,
        clearAllTodos: clearAllTodosItems,
        getFilteredTodos,
        getCount,
        setSpentTime,
        setActiveDate,
        setSelectedTodoId,
        selectedTodoId
    };
}
