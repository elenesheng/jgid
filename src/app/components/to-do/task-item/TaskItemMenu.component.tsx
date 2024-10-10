import React, { useContext, memo } from 'react';
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
import { TimerStateContext } from "@/app/contexts/TimerContext";
import { useTodosControlls } from "@/app/hooks/useTodos";

const TaskItemMenu = memo(({ id, onEdit, completed }: TaskItemMenuProps) => {
    const { removeTodo, toggleTodoComplete, setSelectedTodoId } = useTodosControlls();
    const timer = useContext(TimerStateContext)!;

    const onComplete = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        if (!timer.isRunning) {
            setSelectedTodoId("");
        }
        toggleTodoComplete(id);
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
});

export default TaskItemMenu;
