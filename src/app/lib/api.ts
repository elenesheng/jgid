import { Todo, WeekDay } from "../types/tasks";
export async function fetchTodos(): Promise<Todo[]> {
    const response = await fetch('/api/todos');
    if (!response.ok) {
        throw new Error('Failed to fetch todos');
    }
    return response.json();
}

export async function createTodo(todo: Omit<Todo, 'id'>): Promise<Todo> {
    const response = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo),
    });
    if (!response.ok) {
        throw new Error('Failed to create todo');
    }
    return response.json();
}

export async function updateTodo(todo: Todo): Promise<Todo> {
    const response = await fetch(`/api/todos/${todo.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo),
    });
    if (!response.ok) {
        throw new Error('Failed to update todo');
    }
    return response.json();
}

export async function deleteTodo(id: string): Promise<void> {
    const response = await fetch(`/api/todos/${id}`, { method: 'DELETE' });
    if (!response.ok) {
        throw new Error('Failed to delete todo');
    }
}

export async function deleteAllTodos(): Promise<void> {
    const response = await fetch('/api/todos', { method: 'DELETE' });
    if (!response.ok) {
        throw new Error('Failed to delete all todos');
    }
}

export async function fetchTodosByWeekday(weekday: string): Promise<Todo[]> {
    const response = await fetch(`/api/todos?weekday=${encodeURIComponent(weekday)}`);
    if (!response.ok) {
        throw new Error('Failed to fetch todos');
    }
    return response.json();
}
