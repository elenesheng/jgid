import React from "react";
import { ModalFooter, Button } from "@chakra-ui/react";
import { SettingsFooterProps } from "@/app/types/settings";

const SettingsFooter = ({ onSave, onClose }: SettingsFooterProps) => {
    return (
        <ModalFooter>
            <Button variant="primary" mr={3} onClick={onSave}>
                Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
                Cancel
            </Button>
        </ModalFooter>
    );
};

export default SettingsFooter;
