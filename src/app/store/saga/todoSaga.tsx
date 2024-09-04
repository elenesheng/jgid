import { all, takeLatest, takeEvery, put, call, select } from "redux-saga/effects";
import * as api from "@/app/lib/api";

import { Todo } from "@/app/types/tasks";
import { PayloadAction } from "@reduxjs/toolkit";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";

function* addTodoSaga(action: PayloadAction<Todo>){
    try {
        console.log(action.payload)
        const newTodo: Todo = action.payload;
        yield call(api.createTodo, newTodo);
    } catch (error) {
    }
}

function* updateTodoSaga(action: PayloadAction<Todo>) {
    try {
        const updatedTodo: Todo = action.payload;
        yield call(api.updateTodo, updatedTodo);
    } catch (error) {
    }
}

function* removeTodoSaga(action: PayloadAction<string>) {
    try {
        const todoId = action.payload;
        yield call(api.deleteTodo, todoId);
    } catch (error) {
    }
}

function* clearAllTodosSaga() {
    try {
        yield call(api.deleteAllTodos);
    } catch (error) {
    }
}

function* clearAllTodosByWeekDaySaga(action: PayloadAction<string>) {
    try {
        const weekday = action.payload;
        yield call(api.deleteTodosByWeekDays, weekday);
    } catch (error) {
    }
}

export function* todosSaga() {
    yield all([
        takeEvery("todos/addTodo", addTodoSaga),
        takeEvery("todos/updateTodo", updateTodoSaga),
        takeEvery("todos/removeTodo", removeTodoSaga),
        takeEvery("todos/clearAllTodos", clearAllTodosSaga),
        takeEvery("todos/clearAllTodosByWeekDay", clearAllTodosByWeekDaySaga),
    ]);
}