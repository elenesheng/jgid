"use client";

import React, { useMemo } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Box,
    Flex
} from "@chakra-ui/react";
import { FaCog } from "react-icons/fa";
import SettingsCheckbox from "./settings-checkbox/SettingsCheckbox";
import Goals from "./goals/Goals.component";
import SoundList from "./sound-list/SoundList.component";
import SettingsFooter from "./footer/SettingsFooter";
import { useSession } from "next-auth/react";
import { useRenderTime } from '@/app/hooks/useRenderTime';
import { useSettings } from "@/app/hooks/useSettings";
import WorkDurationInput from "./duration-input/WorkDurationInput";
import RestDurationInput from "./duration-input/RestDurationInput";

const SettingsModal = () => {
    useRenderTime("Settings");
    const { status } = useSession();
    const {
        formState,
        isOpen,
        handleSave,
        handleOpen,
        onClose,
        handleWorkChange,
        handleRestChange,
        handleGoalChange,
        handleWhiteNoiseToggle,
        handleSound,
        handleIsWeekdaysChange
    } = useSettings();

    const weekdaysCheckbox = useMemo(() => {
        if (status === "authenticated") {
            return (
                <SettingsCheckbox
                    isChecked={formState.isWeekDays}
                    onChange={handleIsWeekdaysChange}
                    label="Manage tasks by week days"
                />
            );
        }
        return null;
    }, [status, formState.isWeekDays, handleIsWeekdaysChange]);

    return (
        <Box textAlign="right">
            <Flex>
                <button onClick={handleOpen}>
                    <FaCog color="#019963" />
                </button>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Settings</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <>
                            <WorkDurationInput onChange={handleWorkChange} value={formState.workDuration} />
                            <RestDurationInput onChange={handleRestChange} value={formState.restDuration} />
                            <Goals  onGoalChange={handleGoalChange} goal={formState.goal} />
                            <SettingsCheckbox
                                isChecked={formState.isWhiteNoise}
                                onChange={handleWhiteNoiseToggle}
                                label="Work with white noise"
                            />
                            <SoundList setSelectedSound={handleSound} selectedSound={formState.sound}/>
                            {weekdaysCheckbox}
                            {/* {status === "authenticated" && (
                                <SettingsCheckbox
                                    isChecked={formState.isWeekDays}
                                    onChange={handleIsWeekdaysChange}
                                    label="Manage tasks by week days"
                                />
                            )} */}
                        </>
                    </ModalBody>
                    <SettingsFooter onSave={handleSave} onClose={onClose} />
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default SettingsModal;
