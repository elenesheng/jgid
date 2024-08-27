"use client"

import React, { useContext } from 'react';
import { Box, Alert, AlertIcon, Flex, Button } from '@chakra-ui/react';
import { TaskContext } from '@/app/contexts/TaskContext';
import TaskInput from './task-input/TaskInput.component';
import TaskItem from './task-item/TaskItem.component';
import { Todo } from '@/app/types/tasks';
import { WEEK_DAYS } from '@/app/lib/constants';
import { SettingsStateContext } from "@/app/contexts/TimerContext";
import { useSession } from 'next-auth/react';
import { useTodos } from '@/app/hooks/useTaskProvider';

const TodoComponent = () => {
    // const { todos, activeDate, setActiveDate, addTodo, getCount } = useContext(TaskContext)!;
    const settings = useContext(SettingsStateContext)!;
    const maxTasks = 7;
    const { status } = useSession();
    const { 
        todos, 
        activeDate, 
        setActiveDate, 
        addTodo, 
        getCount, 
      } = useTodos();
      
    const handleWeekdayClick = (weekday: string) => {
        setActiveDate(weekday);
    };

    return (
        <Box borderWidth="1px" borderRadius="lg" p={0} m={0} borderColor="transparent">
            {todos.length >= maxTasks && (
                <Alert status="warning" mb="4" color="primaryDark" bg="bg" borderColor="accent">
                    <AlertIcon color="accent" />
                    To stay focused, you can't add more than 7 tasks.
                </Alert>
            )}
            {status === "authenticated" && settings.isWeekDays && (
                <Flex mb={4} alignItems="center" justifyContent="center">
                    {WEEK_DAYS.map((weekday) => (
                        <>
                        <Button
                            key={weekday.name}
                            onClick={() => handleWeekdayClick(weekday.name)}
                            variant={weekday.name === activeDate ? "primary" : "ghost"}
                            margin={0}
                        >
                            {weekday.name.slice(0, 3)}
                            <span style={{ marginLeft: '5px' }}>{` (${getCount(weekday.name)})`}</span>
                        </Button>
                        </>
                    ))}
                </Flex>
            )}
            {todos.map((task: Todo) => (
                <TaskItem {...task} key={task.id} />
            ))}
            <TaskInput />
        </Box>
    );
};

export default TodoComponent;
