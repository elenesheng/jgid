import { useContext } from "react";
import { TodosControlsContext, TodosStateContext } from "../contexts/TodoContext";

export const useTodosControlls = () => {
    const context = useContext(TodosControlsContext);
    if (!context) {
        throw new Error("useTodosContext must be used within a TodosProvider");
    }
    return context;
};

export const useTodos = () => {
    const context = useContext(TodosStateContext);
    if (!context) {
        throw new Error("useTodosContext must be used within a TodosProvider");
    }
    return context;
};
