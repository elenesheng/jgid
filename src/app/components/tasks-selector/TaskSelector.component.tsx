"use client";

import React, { useContext } from "react";
import { SettingsStateContext } from "@/app/contexts/TimerContext";
import { Flex, Select } from "@chakra-ui/react";
import { Todo } from "@/app/types/tasks";
import { useTodos } from "@/app/hooks/useTodos";

const TaskSelector = () => {
    const { setSelectedTodoId, selectedTodoId, todos } = useTodos();
    const settings = useContext(SettingsStateContext)!;
    const { isRunning } = settings;

    const handleSelectTask = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTodoId(event.target.value);
    };

    return (
        <Flex justifyContent="center" position="relative" mb="7px">
            <Select
                placeholder="Select Task"
                value={selectedTodoId || ""}
                onChange={handleSelectTask}
                isDisabled={isRunning}
                size="md"
            >
                {todos?.filter((task: Todo)=> !task.completed).map((task: Todo) => (
                    <option key={task.id} value={task.id}>
                        {task.name.length > 10 ? `${task.name.substring(0, 10)}...` : task.name}
                    </option>
                ))}
            </Select>
        </Flex>
    );
};

export default TaskSelector;
