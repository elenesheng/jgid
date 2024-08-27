"use client";

import { combineReducers } from '@reduxjs/toolkit';
import todosReducer from '../slices/todoSlice'

const rootReducer = combineReducers({
    todos: todosReducer,
});

export default rootReducer;
