import { all, takeLatest, takeEvery, put, call, select } from "redux-saga/effects";
import * as api from "@/app/lib/api";
import {
    setTodos,
    setHasLoadedFromDB,
    addTodoSuccess,
    updateTodoSuccess,
    removeTodoSuccess,
    clearAllTodosSuccess,
    setError,
    clearAllTodosByWeekDaySuccess
} from "../slices/todoSlice";
import { Todo } from "@/app/types/tasks";
import { PayloadAction } from "@reduxjs/toolkit";

const getHasLoadedFromDB = (state: any) => state.todos.hasLoadedFromDB;

function* initializeTodosSaga(action: PayloadAction<boolean>) {
    try {
        const isLoggedIn = action.payload;
        const hasLoadedFromDB: string = yield select(getHasLoadedFromDB);
        let todos: Todo[] = [];

        if (!hasLoadedFromDB && isLoggedIn) {
            console.log("Loaded from DB");
            todos = yield call(api.fetchTodos);
            yield put(setHasLoadedFromDB(true));
            localStorage.setItem("todos", JSON.stringify(todos));
        } else {
            console.log("Loaded from Local Storage");
            const localTodos = localStorage.getItem("todos");
            if (localTodos) {
                todos = JSON.parse(localTodos);
            }
        }

        yield put(setTodos(todos));
    } catch (error) {
        yield put(setError("Failed to initialize todos"));
    }
}

function* addTodoSaga(action: PayloadAction<Todo>) {
    try {
        const newTodo: Todo = action.payload;
        const isLoggedIn: boolean = yield select((state) => state.todos.hasLoadedFromDB);

        if (isLoggedIn) {
            yield call(api.createTodo, newTodo);
        }

        const currentTodos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");
        const updatedTodos = [...currentTodos, newTodo];
        localStorage.setItem("todos", JSON.stringify(updatedTodos));

        yield put(addTodoSuccess(newTodo));
    } catch (error) {
        yield put(setError("Failed to add todo"));
    }
}

function* updateTodoSaga(action: PayloadAction<Todo>) {
    try {
        const updatedTodo: Todo = action.payload;
        const isLoggedIn: boolean = yield select((state) => state.todos.hasLoadedFromDB);

        if (isLoggedIn) {
            yield call(api.updateTodo, updatedTodo);
        }

        const currentTodos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");
        const updatedTodos = currentTodos.map((todo) =>
            todo.id === updatedTodo.id ? updatedTodo : todo
        );
        localStorage.setItem("todos", JSON.stringify(updatedTodos));

        yield put(updateTodoSuccess(updatedTodo));
    } catch (error) {
        yield put(setError("Failed to update todo"));
    }
}

function* removeTodoSaga(action: PayloadAction<string>) {
    try {
        const todoId = action.payload;
        const isLoggedIn: boolean = yield select((state) => state.todos.hasLoadedFromDB);

        if (isLoggedIn) {
            yield call(api.deleteTodo, todoId);
        }

        const currentTodos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");
        const updatedTodos = currentTodos.filter((todo) => todo.id !== todoId);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));

        yield put(removeTodoSuccess(todoId));
    } catch (error) {
        yield put(setError("Failed to remove todo"));
    }
}

function* clearAllTodosSaga() {
    try {
        const isLoggedIn: boolean = yield select((state) => state.todos.hasLoadedFromDB);

        if (isLoggedIn) {
            yield call(api.deleteAllTodos);
        }

        localStorage.removeItem("todos");

        yield put(clearAllTodosSuccess());
    } catch (error) {
        yield put(setError("Failed to clear all todos"));
    }
}

function* clearAllTodosByWeekDaySaga(action: PayloadAction<string>) {
    try {
        const weekday = action.payload;
        const isLoggedIn: boolean = yield select((state) => state.todos.hasLoadedFromDB);

        if (isLoggedIn) {
            yield call(api.deleteTodosByWeekDays, weekday);
        }

        const currentTodos: Todo[] = JSON.parse(localStorage.getItem("todos") || "[]");
        const updatedTodos = currentTodos.filter((todo) => todo.weekday !== weekday);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));

        yield put(clearAllTodosByWeekDaySuccess(weekday));
    } catch (error) {
        yield put(setError("Failed to clear todos for the specified weekday"));
    }
}

export function* todosSaga() {
    yield all([
        takeEvery("todos/initializeTodos", initializeTodosSaga),
        takeEvery("todos/addTodo", addTodoSaga),
        takeEvery("todos/updateTodo", updateTodoSaga),
        takeEvery("todos/removeTodo", removeTodoSaga),
        takeEvery("todos/clearAllTodos", clearAllTodosSaga),
        takeEvery("todos/clearAllTodosByWeekDay", clearAllTodosByWeekDaySaga),
    ]);
}