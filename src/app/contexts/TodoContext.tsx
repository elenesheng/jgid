"use client";

import { createContext } from "react";
import { TodosContextType } from "@/app/types/tasks";

export const TodosContext = createContext<TodosContextType | undefined>(undefined);
