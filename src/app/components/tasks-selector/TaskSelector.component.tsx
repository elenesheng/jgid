"use client";

import React, { useContext } from "react";
import { TaskContext } from '@/app/contexts/TaskContext';
import { SettingsStateContext } from "@/app/contexts/TimerContext";
import { Flex, Select } from "@chakra-ui/react";
import { useTodos } from "@/app/hooks/useTaskProvider";

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
                {todos.filter(task => !task.completed).map(task => (
                    <option key={task.id} value={task.id}>
                        {task.name.length > 10 ? `${task.name.substring(0, 10)}...` : task.name}
                    </option>
                ))}
            </Select>
        </Flex>
    );
};

export default TaskSelector;
