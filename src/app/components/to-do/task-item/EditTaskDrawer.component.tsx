import React, { useContext } from 'react';
import {
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Input,
    Textarea,
    Button,
} from '@chakra-ui/react';
import { EditTaskDrawerProps } from '@/app/types/tasks';

const EditTaskDrawer = ({
    isOpen,
    onClose,
    taskName,
    taskDescription,
    setTaskName,
    setTaskDescription,
    onSubmit,
}: EditTaskDrawerProps) => {
    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader>Edit Task</DrawerHeader>
                <DrawerBody>
                    <Input
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        placeholder="Task Name"
                        mb={4}
                    />
                    <Textarea
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        placeholder="Task Description"
                    />
                </DrawerBody>
                <DrawerFooter>
                    <Button variant="outline" mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="ghost" onClick={onSubmit}>
                        Save
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default EditTaskDrawer;
