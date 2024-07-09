"use client";

import React, { createContext, ReactNode, useCallback, useMemo, useState, useEffect } from 'react';
import useLocalStorage from '@/app/hooks/useLocalStorage';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskContextType } from '@/app/types/tasks';

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [activeTaskId, setActiveTaskId] = useLocalStorage<string | null>('activeTaskId', null);
  const [selectedTaskId, setSelectedTaskId] = useLocalStorage<string | null>('selectedTaskId', null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const addTask = useCallback((name: string, description: string) => {
    const newTask: Task = { id: uuidv4(), name, description, completed: false, spentTime: 0 };
    setTasks(prevTasks => [...prevTasks, newTask]);
  }, [setTasks]);

  const removeTask = useCallback((taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  }, [setTasks]);

  const toggleTaskCompletion = useCallback((taskId: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }, [setTasks]);

  const chooseTask = useCallback((taskId: string) => {
    setSelectedTaskId(taskId);
  }, [setSelectedTaskId]);

  const setSpentTime = useCallback((taskId: string, timeSpent: number) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, spentTime: (task.spentTime || 0) + timeSpent } : task
      )
    );
  }, [setTasks]);

  const clearAllTasks = useCallback(() => {
    setTasks([]);
  }, [setTasks]);

  const editTask = useCallback((taskId: string, title: string, description: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, name: title, description } : task
      )
    );
  }, [setTasks]);

  const memoizedValue = useMemo(() => ({
    tasks,
    activeTaskId,
    chooseTask,
    removeTask,
    addTask,
    toggleTaskCompletion,
    selectedTaskId,
    setSpentTime,
    setSelectedTaskId,
    clearAllTasks,
    editTask
  }), [
    tasks,
    activeTaskId,
    chooseTask,
    removeTask,
    addTask,
    toggleTaskCompletion,
    selectedTaskId,
    setSpentTime,
    setSelectedTaskId,
    clearAllTasks,
    editTask
  ]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <TaskContext.Provider value={memoizedValue}>
      {children}
    </TaskContext.Provider>
  );
};
