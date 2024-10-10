import React, { useContext, useRef, memo, useCallback } from "react";
import {
    Text,
    Flex,
    Spacer,
    useDisclosure,
    Heading,
    Box,
} from "@chakra-ui/react";
import { Todo } from "@/app/types/tasks";
import EditTaskDrawer from "./EditTaskDrawer.component";
import TaskItemMenu from "./TaskItemMenu.component";
import { secondsToMinutes } from "@/app/lib/utils/timer";
import { trimText } from "@/app/lib/utils/timer";
import { MAX_LENGTH_LONG } from "@/app/lib/constants";
import { SettingsStateContext } from "@/app/contexts/TimerContext";

const TaskItem = memo((task: Todo) => {
    const { name, id, completed } = task;
    const { isOpen, onClose, onOpen } = useDisclosure();
    const editorRef = useRef(null);

    const calcWidth = `calc(100% - 126px);`;

    const handleClick = useCallback(() => {
        onOpen();
    }, [onOpen]);
    return (
        <Box border="none" mb="15px" onClick={onOpen} style={{cursor: 'pointer'}}>
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
                </Flex>

                <Spacer />
                <TaskItemMenu
                    id={id}
                    completed ={completed}
                    onEdit={handleClick}
                />
            </Flex>

            <EditTaskDrawer task={task} isOpen={isOpen} onClose={onClose} editorRef={editorRef} />
        </Box>
    );
});

export default TaskItem;
