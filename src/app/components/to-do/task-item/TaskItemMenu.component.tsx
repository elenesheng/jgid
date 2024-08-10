import React, { useContext } from 'react';
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    Flex,
    Text,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, CheckIcon } from '@chakra-ui/icons';
import { FaEllipsisV } from 'react-icons/fa';
import { TaskItemMenuProps } from '@/app/types/tasks';
import { TaskContext } from '@/app/contexts/TaskContext';
import { SettingsStateContext } from "@/app/contexts/TimerContext";

const TaskItemMenu = ({ id, onEdit, completed }: TaskItemMenuProps) => {
    const { removeTodo, toggleTodoCompletion, setSelectedTodoId } = useContext(TaskContext)!;
    const settings = useContext(SettingsStateContext)!;


    const onComplete = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        if (!settings.isRunning) {
            setSelectedTodoId("");
        }
        toggleTodoCompletion(id);
    };

    return (
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<FaEllipsisV />}
                variant="ghost"
                color="textPrimary"
                m={0}
                _hover={{
                    backgroundColor: "transparent"
                }}
                onClick={(e)=> e.stopPropagation()}
            />
            <MenuList>
                <MenuItem onClick={() => removeTodo(id)}>
                    <Flex justifyContent="space-between" align="center">
                        <DeleteIcon color="textPrimary" />
                        <Text ml="2" color="textPrimary">Delete</Text>
                    </Flex>
                </MenuItem>
                <MenuItem onClick={onComplete}>
                    <CheckIcon color="textPrimary" />
                    <Text ml="2" color="textPrimary">Mark as {completed ? 'Incomplete' : 'Complete'}</Text>
                </MenuItem>
                <MenuItem onClick={onEdit}>
                    <EditIcon color="textPrimary" />
                    <Text ml="2" color="textPrimary">Edit</Text>
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default TaskItemMenu;
