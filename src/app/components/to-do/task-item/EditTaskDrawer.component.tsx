import React, { useState, useContext, useCallback, useEffect, useRef } from 'react';
import {
    Drawer,
    DrawerOverlay,
    DrawerContent,
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
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';
import styles from './taskItem.module.scss';
import { useColorMode } from '@chakra-ui/react';
import { useTodos } from '@/app/hooks/useTaskProvider';

const EditTaskDrawer: React.FC<EditTaskDrawerProps> = ({ task, isOpen, onClose, editorRef, ...props }) => {
    const { editTodo } = useTodos();
    const { name, id, description } = task;
    const [editName, setEditName] = useState(name);
    const [value, setValue] = useState(description);
    const { colorMode } = useColorMode();

    const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setEditName(e.target.value);
    }, []);

    const handleValueChange = useCallback((newValue: string) => {
        setValue(newValue);
    }, []);

    const handleSave = useCallback(() => {
        editTodo(id, editName, value);
        onClose();
    }, [id, editName, value, editTodo, onClose]);

    const handleClose = useCallback(() => {
        handleSave();
    }, [handleSave]);

    return (
        <Drawer isOpen={isOpen} placement="right" onClose={handleClose} size="lg">
            <DrawerOverlay />
            <DrawerContent>
                <DrawerBody color="textPrimary">
                    <Input
                        value={editName}
                        onChange={handleNameChange}
                        placeholder="Task Name"
                        mb={4}
                        border="none"
                        fontSize="25px"
                        focusBorderColor="transparent"
                        _focus={{
                            boxShadow: 'none',
                        }}
                    />
                    <MDXEditor
                        className={colorMode === 'dark' ? styles.darkEditor : styles.defaultEditor}
                        markdown={value}
                        onChange={handleValueChange}
                        autoFocus={{ defaultSelection: "rootEnd" }}
                        plugins={[
                            headingsPlugin(),
                            listsPlugin(),
                            quotePlugin(),
                            thematicBreakPlugin(),
                            markdownShortcutPlugin(),
                            toolbarPlugin({
                                toolbarContents: () => (
                                    <>
                                        <UndoRedo />
                                        <BoldItalicUnderlineToggles />
                                        <ListsToggle />
                                    </>
                                )
                            })]}
                        {...props}
                    />
                </DrawerBody>
                <DrawerFooter>
                    <Button colorScheme="blue" onClick={handleSave}>
                        Save & Close
                    </Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default EditTaskDrawer;
