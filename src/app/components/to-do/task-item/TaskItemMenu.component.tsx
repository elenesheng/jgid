import React from 'react';
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

const TaskItemMenu = ({ onRemove, onComplete, onEdit, completed }: TaskItemMenuProps) => {
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
            />
            <MenuList>
                <MenuItem onClick={onRemove}>
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
