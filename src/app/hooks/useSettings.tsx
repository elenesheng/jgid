"use client";

import React, { useContext, useCallback, useReducer } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { SettingsStateContext, SettingsControlsContext } from "@/app/contexts/TimerContext";
import { settingsFormReducer } from "../state/settings/settingsFormReducer";


export const useSettings = () => {
    const settings = useContext(SettingsStateContext)!
    const { workDuration, restDuration, goal, sound, isWhiteNoise, isWeekDays} = useContext(SettingsStateContext)!;
    const {updateWorkDuration, updateRestDuration, setWhiteNoise, setGoal, setSound, setIsWeekDays} = useContext(SettingsControlsContext)!;
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [formState, dispatch] = useReducer(settingsFormReducer, {
        workDuration,
        restDuration,
        goal,
        sound,
        isWhiteNoise,
        isWeekDays,
    });

    const handleSave = useCallback(() => {
        if (formState.workDuration !== workDuration) updateWorkDuration(formState.workDuration);
        if (formState.restDuration !== restDuration) updateRestDuration(formState.restDuration);
        if (formState.goal !== goal) setGoal(formState.goal);
        if (formState.sound !== sound) setSound(formState.sound);
        if (formState.isWhiteNoise !== isWhiteNoise) setWhiteNoise(formState.isWhiteNoise);
        if (formState.isWeekDays !== isWeekDays) setIsWeekDays(formState.isWeekDays);
        onClose();
    }, [formState, settings, onClose]);

    const handleOpen = useCallback(() => {
        dispatch({ type: "RESET", payload: settings });
        onOpen();
    }, [settings, onOpen]);

    const handleWorkChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        dispatch({type: "UPDATE_WORK_DURATION", payload: value});
    }, []);
    
    const handleRestChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        dispatch({type: "UPDATE_REST_DURATION", payload: value});
    }, []);
    
    const handleGoalChange = useCallback((newGoal: number) => {
        dispatch({type: "SET_GOAL", payload: newGoal});
    }, []);
    
    const handleWhiteNoiseToggle = useCallback(() => {
        dispatch({type: "SET_WHITE_NOISE", payload: !formState.isWhiteNoise});
    }, []);

    const handleIsWeekdaysChange = useCallback(() => {
        dispatch({type: "TOGGLE_WEEKDAYS", payload: !formState.isWeekDays});
    }, []);

    const handleSound = useCallback((sound: string) => {
        dispatch({type: "UPDATE_SOUND", payload: sound});
    }, [])


    return {
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
    };
}
