import React, { ForwardedRef } from 'react';

export interface Todo {
    id: string;
    name: string;
    description: string;
    completed: boolean;
    spentTime: number;
    weekdayId?: string;
}

export interface WeekDay {
    id: string;
    name: string;
}

export interface WeekDay {
    id: string;
    name: string
}
export interface TodoContextType {
    todos: Todo[];
    loading: boolean;
    addTodo: (name: string, description: string, weekDayId: string) => void;
    removeTodo: (todoId: string) => void;
    toggleTodoCompletion: (todoId: string) => void;
    setSpentTime: (todoId: string, timeSpent: number) => void;
    clearAllTodos: () => void;
    chooseTodo: (todoId: string) => void;
    selectedTodoId: string;
    setSelectedTodoId: (todoId: string) => void;
    editTodo: (todoId: string, name: string, description: string) => void;
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    activeDate: string;
    setActiveDate: (date: string) => void;
}

export type QueuedOperation = {
    type: 'add' | 'update' | 'delete' | 'clear';
    payload: any;
};

export interface TaskButtonProps {
    isRunning: boolean;
    selectedTask?: { id: string; name: string; completed: boolean };
}

export interface TaskMenuProps {
    tasks: Todo[];
    handleSelectTask: (taskId: string) => void;
}

export interface TaskInputProps {
    addTask: (name: string, description: string) => void;
}

export interface EditTaskDrawerProps {
    task: Todo;
    isOpen: boolean;
    onClose: () => void;
    editorRef: ForwardedRef<any>;
    [key: string]: any;
}

export interface TaskItemMenuProps {
    onEdit: () => void;
    id: string;
    completed: boolean;
}
