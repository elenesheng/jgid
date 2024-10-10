"use client"

import React, { useMemo } from 'react';
import { Box, Alert, AlertIcon, Flex, Button } from '@chakra-ui/react';
import TaskInput from './task-input/TaskInput.component';
import TaskItem from './task-item/TaskItem.component';
import { useTodos } from "@/app/hooks/useTodos";
import { WeekdaysComponent } from './weekdays/Weekdays.component';
import { MAX_TASKS } from '@/app/lib/constants';
import { useRenderTime } from '@/app/hooks/useRenderTime';

const TodoComponent = () => {
    const { todos } = useTodos();
    useRenderTime('Todo');
    const memoizedTaskList = useMemo(() =>
        todos?.map((task) => <TaskItem key={task.id} {...task} />),
        [todos]
    );

    return (
        <Box borderWidth="1px" borderRadius="lg" p={0} m={0} borderColor="transparent">
            {todos?.length >= MAX_TASKS && (
                <Alert status="warning" mb="4" color="primaryDark" bg="bg" borderColor="accent">
                    <AlertIcon color="accent" />
                    To stay focused, you can't add more than 7 tasks.
                </Alert>
            )}
            <WeekdaysComponent />
            {memoizedTaskList}
            <TaskInput />
        </Box>
    );
};

export default TodoComponent;
