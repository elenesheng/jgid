import React, { useState, useContext } from 'react';
import {
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
    Input,
    Button,
    useDisclosure
} from '@chakra-ui/react';
import { EditTaskDrawerProps } from '@/app/types/tasks';
import MDEditor from '@uiw/react-md-editor';
import { TaskContext } from "@/app/contexts/TaskContext";

const EditTaskDrawer: React.FC<EditTaskDrawerProps> = ({ task, isOpen, onClose }) => {
    const { editTodo } = useContext(TaskContext)!;
    const { name, id, description } = task;
    const [editName, setEditName] = useState(name);
    const [value, setValue] = useState(description);

    const handleEditorChange = (value: string | undefined) => {
        if (value !== undefined) {
            setValue(value);
        }
    };


    const handleSave = () => {
        editTodo(id, editName, value);
        onClose();
    };

    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent width="50%"
                maxWidth="50%"
                p={4}
            >
                <DrawerHeader>Edit Task</DrawerHeader>
                <DrawerBody width="100%">
                    <Input
                        value={name}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="Task Name"
                        mb={4}
                    />
                    <MDEditor
                        value={value}
                        onChange={handleEditorChange}
                        height="400px"
                    />

                </DrawerBody>
                <DrawerFooter>
                    <Button variant="outline" mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button variant="ghost" onClick={handleSave}>
                        Save
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default EditTaskDrawer;
