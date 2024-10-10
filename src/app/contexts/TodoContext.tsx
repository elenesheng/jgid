"use client";

import { createContext } from "react";
import { TodosContextType, TodosControls } from "@/app/types/tasks";

export const TodosStateContext = createContext<TodosContextType | undefined>(undefined);
export const TodosControlsContext = createContext<TodosControls | undefined>(undefined);
