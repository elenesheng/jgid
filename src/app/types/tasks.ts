export interface Task {
    id: string;
    name: string;
    completed: boolean;
    spentTime: number;
    description: string;
}

export interface TaskContextType {
    tasks: Task[];
    activeTaskId: string | null;
    selectedTaskId: string | null;
    addTask: (name: string, description: string) => void;
    removeTask: (taskId: string) => void;
    toggleTaskCompletion: (taskId: string) => void;
    chooseTask: (taskId: string) => void;
    setSpentTime: (taskId: string, seconds: number) => void;
    setSelectedTaskId: (taskId: string) => void;
    clearAllTasks: () => void;
    editTask: (taskId: string, title: string, description: string) => void;
}

export interface TaskButtonProps {
    isRunning: boolean;
    selectedTask?: { id: string; name: string; completed: boolean };
}

export interface TaskMenuProps {
    tasks: Task[];
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
