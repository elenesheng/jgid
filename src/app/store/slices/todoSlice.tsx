import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '@/app/types/tasks';

interface TodosState {
    todos: Todo[];
    loading: boolean;
    error: string | null;
    hasLoadedFromDB: boolean;
}

const initialState: TodosState = {
    todos: [],
    loading: false,
    error: null,
    hasLoadedFromDB: false,
};

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        initializeTodos: (state, action: PayloadAction<boolean>) => {
            state.loading = true;
            state.error = null;
        },
        setTodos: (state, action: PayloadAction<Todo[]>) => {
            state.todos = action.payload;
            state.loading = false;
        },
        setHasLoadedFromDB: (state, action: PayloadAction<boolean>) => {
            state.hasLoadedFromDB = action.payload;
        },
        addTodo: (state, action: PayloadAction<Todo>) => {
            state.loading = true;
        },
        addTodoSuccess: (state, action: PayloadAction<Todo>) => {
            state.todos.push(action.payload);
            state.loading = false;
        },
        updateTodo: (state, action: PayloadAction<Todo>) => {
            state.loading = true;
        },
        updateTodoSuccess: (state, action: PayloadAction<Todo>) => {
            const index = state.todos.findIndex(todo => todo.id === action.payload.id);
            if (index !== -1) {
                state.todos[index] = action.payload;
            }
            state.loading = false;
        },
        removeTodo: (state, action: PayloadAction<string>) => {
            state.loading = true;
        },
        removeTodoSuccess: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
            state.loading = false;
        },
        clearAllTodos: (state) => {
            state.loading = true;
        },
        clearAllTodosSuccess: (state) => {
            state.todos = [];
            state.loading = false;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
            state.loading = false;
        },
        clearAllTodosByWeekDay: (state, action: PayloadAction<string>) => {
            state.loading = true;
        },
        clearAllTodosByWeekDaySuccess: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter(todo => todo.weekday !== action.payload);
            state.loading = false;
        },
    },
});

export const {
    initializeTodos,
    setTodos,
    setHasLoadedFromDB,
    addTodo,
    addTodoSuccess,
    updateTodo,
    updateTodoSuccess,
    removeTodo,
    removeTodoSuccess,
    clearAllTodos,
    clearAllTodosSuccess,
    setError,
    clearAllTodosByWeekDay,
    clearAllTodosByWeekDaySuccess
} = todosSlice.actions;

export default todosSlice.reducer;
