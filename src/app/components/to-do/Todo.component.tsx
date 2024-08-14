"use client"

import React, { useContext, useState, useEffect } from 'react';
import { Box, Alert, AlertIcon, Flex, Button } from '@chakra-ui/react';
import { TaskContext } from '@/app/contexts/TaskContext';
import TaskInput from './task-input/TaskInput.component';
import TaskItem from './task-item/TaskItem.component';
import { Todo, WeekDay } from '@/app/types/tasks';
import { fetchTodosByWeekday } from '@/app/lib/api';
import { useSession } from "next-auth/react";
import {
    SettingsStateContext,
} from "@/app/contexts/TimerContext";
import { WEEK_DAYS } from '@/app/lib/constants';

const TodoComponent = () => {
    const { todos, setTodos, activeDate, setActiveDate } = useContext(TaskContext)!;
    const settings = useContext(SettingsStateContext)!;
    const maxTasks = 7;
    const { data: session, status } = useSession();


    const handleWeekdayClick = async (weekday: string) => {
        setActiveDate(weekday);
        try {
            const fetchedTodos = await fetchTodosByWeekday(weekday);
            setTodos(fetchedTodos);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    return (
        <Box borderWidth="1px" borderRadius="lg" p={0} m={0} borderColor="transparent">
            {todos.length >= maxTasks && (
                <Alert status="warning" mb="4" color="primaryDark" bg="bg" borderColor="accent">
                    <AlertIcon color="accent" />
                    To stay focused, you can't add more than 7 tasks.
                </Alert>
            )}
            {status === "authenticated" && settings.isWeekDays?
                <Flex mb={4}>
                    {WEEK_DAYS.map((weekday) => (
                        <Button
                            key={weekday.name}
                            onClick={() => handleWeekdayClick(weekday.name)}
                            variant={weekday.name === activeDate ? "primary" : "ghost"}
                            margin={0}
                        >
                            {weekday.name}
                        </Button>
                    ))}
                </Flex> : ""}
            {todos.map((task: Todo) => (
                <TaskItem {...task} key={task.id} />
            ))}
            <TaskInput />
        </Box>
    );
};

export default TodoComponent;
