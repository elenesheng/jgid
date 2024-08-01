"use client"
import { createContext } from 'react';
import { Todo, TodoContextType } from '@/app/types/tasks';


export const TaskContext = createContext<TodoContextType | undefined>(undefined);
