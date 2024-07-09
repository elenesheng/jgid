import React, { useContext, useState } from "react";
import {
    Text,
    Flex,
    Spacer,
    useDisclosure,
    Heading,
    Box,
} from "@chakra-ui/react";
import { TaskContext } from "@/app/contexts/TaskContext";
import { Task } from "@/app/types/tasks";
import EditTaskDrawer from "./EditTaskDrawer.component";
import TaskItemMenu from "./TaskItemMenu.component";
import { secondsToMinutes } from "@/app/lib/utils/timer";
import { trimText } from "@/app/lib/utils/timer";
import { MAX_LENGTH_LONG } from "@/app/lib/constants";
import { SettingsStateContext } from "@/app/contexts/TimerContext";

const TaskItem = (task: Task) => {
    const { removeTask, toggleTaskCompletion, editTask, setSelectedTaskId } =
        useContext(TaskContext)!;
    const settings = useContext(SettingsStateContext)!;
    const { isRunning } = settings;
    const { name, id, completed, description } = task;

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [editName, setEditName] = useState(name);
    const [editDescription, setEditDescription] = useState(description);
    const [showFullDescription, setShowFullDescription] = useState(false);

    const handleEditSubmit = () => {
        editTask(id, editName, editDescription);
        onClose();
    };

    const onComplete = (id: string) => {
        if (!isRunning) {
            setSelectedTaskId("");
        }
        toggleTaskCompletion(id);
    };

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const calcWidth = `calc(100% - 126px);`;

    return (
        <Box border="none" mb="15px">
            <Flex align="center" w="100%" position="relative" alignItems="flex-start">
                <Flex
                    w="47px"
                    borderRadius="50%"
                    alignItems="center"
                    flexDirection="column"
                    background="secondary"
                    h="47px"
                    justifyContent="center"
                >
                    <Heading mt="2px" fontSize="12px" fontStyle="italic" color="accent">
                        {secondsToMinutes(task.spentTime)} min
                    </Heading>
                </Flex>
                <Flex width={calcWidth} direction="column">
                    <Text
                        as="span"
                        ml="2"
                        textDecoration={completed ? "line-through" : "none"}
                        color={completed ? "accent" : "textPrimary"}
                        flex={1}
                        textAlign="left"
                        whiteSpace="nowrap"
                        mt="10px"
                    >
                        {trimText(name, MAX_LENGTH_LONG)}
                    </Text>

                    <Box
                        ml="2"
                        mt="2"
                        fontSize="sm"
                        color="textSecondary"
                        height="auto"
                        overflow="hidden"
                        onClick={toggleDescription}
                        noOfLines={showFullDescription ? 0 : 1}
                        cursor="pointer"
                        maxW="100%"
                    >
                        {description}
                    </Box>
                </Flex>

                <Spacer />
                <TaskItemMenu
                    onRemove={() => removeTask(id)}
                    onComplete={() => onComplete(id)}
                    onEdit={onOpen}
                    completed={completed}
                />
            </Flex>

            <EditTaskDrawer
                isOpen={isOpen}
                onClose={onClose}
                taskName={editName}
                taskDescription={editDescription}
                setTaskName={setEditName}
                setTaskDescription={setEditDescription}
                onSubmit={handleEditSubmit}
            />
        </Box>
    );
};

export default TaskItem;
