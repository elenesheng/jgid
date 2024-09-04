import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '@/app/types/tasks';

interface TodosState {
    loading: boolean;
    error: string | null;
}

const initialState: TodosState = {
    loading: false,
    error: null,
};

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<Todo>) => {
        },
        updateTodo: (state, action: PayloadAction<Todo>) => {
        },
        removeTodo: (state, action: PayloadAction<string>) => {
        },
        clearAllTodos: (state) => {
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
            state.loading = false;
        },
        clearAllTodosByWeekDay: (state, action: PayloadAction<string>) => {
        },
    },
});

export const {
    addTodo,
    updateTodo,
    removeTodo,
    clearAllTodos,
    setError,
    clearAllTodosByWeekDay,
} = todosSlice.actions;

export default todosSlice.reducer;
