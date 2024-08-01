export interface Todo {
    id: string;
    name: string;
    description: string;
    completed: boolean;
    spentTime: number;
}
export interface TodoContextType {
    todos: Todo[];
    loading: boolean;
    addTodo: (name: string, description: string) => void;
    removeTodo: (todoId: string) => void;
    toggleTodoCompletion: (todoId: string) => void;
    setSpentTime: (todoId: string, timeSpent: number) => void;
    clearAllTodos: () => void;
    chooseTodo: (todoId: string) => void;
    selectedTodoId: string;
    setSelectedTodoId: (todoId: string) => void;
    editTodo: (todoId: string, name: string, description: string) => void;
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
    isOpen: boolean;
    onClose: () => void;
    taskName: string;
    taskDescription: string;
    setTaskName: (name: string) => void;
    setTaskDescription: (description: string) => void;
    onSubmit: () => void;
}

export interface TaskItemMenuProps {
    onRemove: () => void;
    onComplete: () => void;
    onEdit: () => void;
    completed: boolean;
}
