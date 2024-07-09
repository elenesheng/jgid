"use client";

import React, { useContext, useState, useEffect, useCallback } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { SettingsControlsContext, TimerControlsContext, TimerStateContext, SettingsStateContext } from "@/app/contexts/TimerContext";
import SettingsModal from "./Settings.component";

const SettingsModalContainer = () => {
    const settings = useContext(SettingsStateContext)!
    const { workDuration, restDuration, goal, sound, isWhiteNoise} = settings;
    const {updateWorkDuration, updateRestDuration, setWhiteNoise, setGoal, setSound} = useContext(SettingsControlsContext)!
    const {resetRestTimer, resetWorkTimer} = useContext(TimerControlsContext)!
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isWorkChanged, setIsWorkChanged] = useState(false);
    const [isRestChanged, setIsRestChanged] = useState(false);
    const [goalValue, setGoalValue] = useState(goal);
    const [whiteNoiseValue, setWhiteNoiseValue] = useState(isWhiteNoise);
    const [localWorkDuration, setLocalWorkDuration] = useState(workDuration);
    const [localRestDuration, setLocalRestDuration] = useState(restDuration);
    const [selectedSound, setSelectedSound] = useState(sound);

    const handleSave = () => {
        if (isWorkChanged) {
            updateWorkDuration(localWorkDuration);
        }
        if (isRestChanged) {
            updateRestDuration(localRestDuration);
        }
        setGoal(goalValue);
        setSound(selectedSound);
        setWhiteNoise(whiteNoiseValue);
        onClose();
    };

    const handleOpen = () => {
        setIsWorkChanged(false);
        setIsRestChanged(false);
        setLocalWorkDuration(workDuration);
        setLocalRestDuration(restDuration);
        setGoalValue(goal);
        setSelectedSound(sound);
        onOpen();
    }
    
    const handleWorkChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setLocalWorkDuration(value);
        setIsWorkChanged(value !== workDuration);
    }, [workDuration]);
    
    const handleRestChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        setLocalRestDuration(value);
        setIsRestChanged(value !== restDuration);
    }, [restDuration]);
    
    const handleGoalChange = useCallback((newGoal: number) => {
        setGoalValue(newGoal);
    }, []);
    
    const handleWhiteNoiseToggle = useCallback(() => {
        setWhiteNoiseValue(prev => !prev);
    }, []);

    useEffect(() => {
        if (isWorkChanged) {
            resetWorkTimer();
        }
        if (isRestChanged) {
            resetRestTimer();
        }
    }, [workDuration, restDuration, isWorkChanged, isRestChanged, resetWorkTimer, resetRestTimer]);

    return (
        <>
            <SettingsModal
                handleOpen={handleOpen}
                handleSave={handleSave}
                isOpen={isOpen}
                onClose={onClose}
                localWorkDuration={localWorkDuration}
                localRestDuration={localRestDuration}
                handleWorkChange={handleWorkChange}
                handleRestChange={handleRestChange}
                goalValue={goalValue}
                handleGoalChange={handleGoalChange}
                setSelectedSound={setSelectedSound}
                selectedSound={selectedSound}
                handleWhiteNoiseToggle={handleWhiteNoiseToggle}
                whiteNoiseValue={whiteNoiseValue}
            />
        </>
    );
};

export default SettingsModalContainer;
