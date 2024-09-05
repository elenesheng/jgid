"use client"

import React from 'react';
import { Box, Alert, AlertIcon, Flex, Button } from '@chakra-ui/react';
import TaskInput from './task-input/TaskInput.component';
import TaskItem from './task-item/TaskItem.component';
import { Todo } from '@/app/types/tasks';
import { useTodos } from "@/app/hooks/useTodos";
import { WeekdaysComponent } from './weekdays/Weekdays.component';
import { MAX_TASKS } from '@/app/lib/constants';

const TodoComponent = () => {
    const { todos } = useTodos();

    return (
        <Box borderWidth="1px" borderRadius="lg" p={0} m={0} borderColor="transparent">
            {todos?.length >= MAX_TASKS && (
                <Alert status="warning" mb="4" color="primaryDark" bg="bg" borderColor="accent">
                    <AlertIcon color="accent" />
                    To stay focused, you can't add more than 7 tasks.
                </Alert>
            )}
            <WeekdaysComponent/>
            {todos?.map((task: Todo) => (
                <TaskItem {...task} key={task.id} />
            ))}
            <TaskInput />
        </Box>
    );
};

export default TodoComponent;
