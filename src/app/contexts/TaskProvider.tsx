"use client"
import React, { ReactNode } from 'react';
import { TaskContext } from './TaskContext';
import { useTaskProvider } from '@/app/hooks/useTaskProvider';

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const taskContext = useTaskProvider();

    if (taskContext.loading) {
        return <div>Loading...</div>;
    }

    return (
        <TaskContext.Provider value={taskContext}>
            {children}
        </TaskContext.Provider>
    );
};
