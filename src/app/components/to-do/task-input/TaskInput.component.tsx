import { useContext, useState, useEffect } from 'react';
import { TaskInputProps, WeekDay } from '@/app/types/tasks';
import React from 'react';
import { Flex, Input, Button, Select, Box } from '@chakra-ui/react';
import { TaskContext } from '@/app/contexts/TaskContext';
import { WEEK_DAYS } from '@/app/lib/constants';
import { getWeekDayId } from '@/app/lib/utils/helper';

const TaskInput = () => {
    const [taskName, setTaskName] = useState<string>('');
    const { todos, addTodo, clearAllTodos, activeDate } = useContext(TaskContext)!;

    const handleAddTask = () => {
        if (taskName.trim()) {
            addTodo(taskName, "", activeDate);
            setTaskName('');
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleAddTask();
        }
    };

    const isTaskLimitReached = todos.length >= 7;

    return (
        <Box>
            <Flex alignItems="flex-start" mt={todos.length === 0 ? 0 : '25px'}>
                <Input
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    placeholder="New Task"
                    onKeyDown={handleKeyDown}
                    isDisabled={isTaskLimitReached}
                    borderColor="border"
                    flex={1}
                    borderTopRightRadius="0"
                    borderBottomRightRadius="0"
                />
                <Button
                    mt={0}
                    borderTopLeftRadius="0"
                    borderBottomLeftRadius="0"
                    onClick={handleAddTask}
                    mr="2px"
                    color="white"
                    background="accent"
                    size="md"
                    isDisabled={isTaskLimitReached}
                >
                    Add
                </Button>
            </Flex>
            <Flex align="center" justifyContent="space-between">
                <Button
                    mt="10px"
                    w="100%"
                    color="white"
                    background="accent"
                    variant={todos.length == 0 ? "_disabled" : "primary"}
                    size="md"
                    onClick={() => clearAllTodos()}
                >
                    Clear All Tasks
                </Button>
            </Flex>
        </Box>
    );
};

export default TaskInput;