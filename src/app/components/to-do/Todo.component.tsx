"use client";

import React, { useContext } from 'react';
import {
  Box,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import { TaskContext } from '@/app/contexts/TaskContext';
import TaskInput from './task-input/TaskInput.component';
import TaskItem from './task-item/TaskItem.component';
import { Task } from '@/app/types/tasks';
import { useSession } from "next-auth/react"

const TodoComponent = () => {
  const { todos } = useContext(TaskContext)!;
  const maxTasks = 7;
  const { data: session, status } = useSession()

  return (
    <Box borderWidth="1px" borderRadius="lg" p={0} m={0} borderColor="transparent">
      {todos.length >= maxTasks && (
        <Alert status="warning" mb="4" color="primaryDark" bg="bg" borderColor="accent">
          <AlertIcon color="accent" />
          To stay focused, you can`t add more than 7 tasks.
        </Alert>
      )}
      {todos.map((task: Task) => (
        <TaskItem {...task} key={task.id} />
      ))}
      <TaskInput />
    </Box>
  );
};

export default TodoComponent;
