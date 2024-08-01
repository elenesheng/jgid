import { useState, useEffect, useCallback } from 'react';
import * as api from '@/app/lib/api';
import { QueuedOperation } from '@/app/types/tasks';

export function useOperationQueue(session: any) {
    const [operationQueue, setOperationQueue] = useState<QueuedOperation[]>([]);

    const addOperation = useCallback((operation: QueuedOperation) => {
        setOperationQueue(prevQueue => [...prevQueue, operation]);
    }, []);

    const processQueue = useCallback(async () => {
        if (operationQueue.length === 0) return;

        const operation = operationQueue[0];
        try {
            switch (operation.type) {
                case 'add':
                    await api.createTodo(operation.payload);
                    break;
                case 'update':
                    await api.updateTodo(operation.payload);
                    break;
                case 'delete':
                    await api.deleteTodo(operation.payload);
                    break;
                case 'clear':
                    await api.deleteAllTodos();
                    break;
            }
            setOperationQueue(prevQueue => prevQueue.slice(1));
        } catch (error) {
            console.error('Error processing operation:', error);
        }
    }, [operationQueue]);

    useEffect(() => {
        if (session && operationQueue.length > 0) {
            processQueue();
        }
    }, [operationQueue, session, processQueue]);

    return { addOperation, processQueue };
}
