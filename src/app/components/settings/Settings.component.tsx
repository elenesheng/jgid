"use client";

import React, { useContext } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    Box,
    Text,
} from "@chakra-ui/react";
import {
    SettingsStateContext,
    TimerStateContext,
} from "@/app/contexts/TimerContext";
import { FaCog } from "react-icons/fa";
import { SettingsComponentProps } from "@/app/types/settings";
import DurationInput from "./duration-input/DurationInput";
import SettingsCheckbox from "./settings-checkbox/SettingsCheckbox";
import Goals from "./goals/Goals.component";
import SoundList from "./sound-list/SoundList.component";
import SettingsFooter from "./footer/SettingsFooter";
import {
    MIN_WORK_VALUE,
    MIN_REST_VALUE,
    MAX_GOAL_VALUE,
    MAX_REST_VALUE,
    MAX_WORK_VALUE,
    SECONDS_IN_A_MINUTE,
} from "@/app/lib/constants";
import { useSession } from "next-auth/react";

const SettingsModal = ({
    handleOpen,
    handleSave,
    localWorkDuration,
    localRestDuration,
    handleWorkChange,
    handleRestChange,
    goalValue,
    handleGoalChange,
    isOpen,
    onClose,
    setSelectedSound,
    selectedSound,
    handleWhiteNoiseToggle,
    whiteNoiseValue,
    handleIsWeekdaysChange,
    weekDaysValue
}: SettingsComponentProps) => {
    const timer = useContext(TimerStateContext)!;
    const settings = useContext(SettingsStateContext)!;
    const { isRunning, workDuration, restDuration } = settings;
    const { restTime, workTime } = timer;
    const { data: session, status } = useSession();

    return (
        <Box textAlign="right">
            <Button
                onClick={handleOpen}
                margin="0"
                isDisabled={isRunning}
                p={0}
                border="none"
                background="transparent"
                m={0}
                display="block"
                _hover={{
                    backgroundColor: "transparent",
                }}
            >
                <FaCog color="#019963" />
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Settings</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <DurationInput
                            label="Work Duration (minutes)"
                            value={localWorkDuration}
                            onChange={handleWorkChange}
                            isDisabled={workTime !== workDuration * SECONDS_IN_A_MINUTE}
                            min={MIN_WORK_VALUE}
                            max={MAX_WORK_VALUE}
                        />
                        <DurationInput
                            label="Rest Duration (minutes)"
                            value={localRestDuration}
                            onChange={handleRestChange}
                            isDisabled={restTime !== restDuration * SECONDS_IN_A_MINUTE}
                            min={MIN_REST_VALUE}
                            max={MAX_REST_VALUE}
                        />
                        <Goals goal={goalValue} onGoalChange={handleGoalChange} />
                        <Box>
                            <SettingsCheckbox
                                isChecked={whiteNoiseValue}
                                onChange={handleWhiteNoiseToggle}
                                label="Work with white noise"
                            />
                            <SoundList
                                selectedSound={selectedSound}
                                setSelectedSound={setSelectedSound}
                            />
                        </Box>
                        <Box>
                            {status === "authenticated" ?
                                <SettingsCheckbox
                                    isChecked={weekDaysValue}
                                    onChange={handleIsWeekdaysChange}
                                    label="Manage tasks by week days"
                                /> :
                                ""}
                        </Box>
                    </ModalBody>
                    <SettingsFooter onSave={handleSave} onClose={onClose} />
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default SettingsModal;
