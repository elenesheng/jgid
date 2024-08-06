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
} from '@chakra-ui/react';
import { EditTaskDrawerProps } from '@/app/types/tasks';
import { TaskContext } from "@/app/contexts/TaskContext";
import {
    headingsPlugin,
    listsPlugin,
    quotePlugin,
    thematicBreakPlugin,
    markdownShortcutPlugin,
    MDXEditor,
    toolbarPlugin,
    UndoRedo, BoldItalicUnderlineToggles, ListsToggle
} from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css';

const EditTaskDrawer: React.FC<EditTaskDrawerProps> = ({ task, isOpen, onClose, editorRef, ...props }) => {
    const { editTodo } = useContext(TaskContext)!;
    const { name, id, description } = task;
    const [editName, setEditName] = useState(name);
    const [value, setValue] = useState(description);

    const handleSave = () => {
        editTodo(id, editName, value);
        onClose();
    };

    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="lg">
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader>Edit Task</DrawerHeader>
                <DrawerBody>
                    <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="Task Name"
                        mb={4}
                    />
                    <MDXEditor
                        markdown={value}
                        onChange={(val) => setValue(val)}
                        plugins={[
                            headingsPlugin(),
                            listsPlugin(),
                            quotePlugin(),
                            thematicBreakPlugin(),
                            markdownShortcutPlugin(),
                            toolbarPlugin({
                                toolbarContents: () => (
                                    <>
                                        {' '}
                                        <UndoRedo />
                                        <BoldItalicUnderlineToggles />
                                        <ListsToggle />
                                    </>
                                )
                            })]}
                        {...props}
                        ref={editorRef}
                    />
                </DrawerBody>
                <DrawerFooter>
                    <Button variant="outline" mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme="blue" onClick={handleSave}>
                        Save
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default EditTaskDrawer;
