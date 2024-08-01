"use client";

import React, { useContext, useEffect, useState } from 'react';
import { TimerStateContext, SettingsControlsContext, SettingsStateContext, TimerControlsContext } from '@/app/contexts/TimerContext';
import { TaskContext } from '@/app/contexts/TaskContext';
import useTimer from '../../hooks/useTimer';
import { calculateInitialTimeLeft, calculateElapsedTimeInSeconds } from '@/app/lib/utils/timer';
import TimerComponent from './Timer.component';
import { Howl } from 'howler';
import { Todo } from '@/app/types/tasks';
import { SOUNDS } from '@/app/lib/constants';

const TimerContainer: React.FC = () => {
    const {updateWorkSessions, updateRestBreak } = useContext(SettingsControlsContext)!;
    const timer = useContext(TimerStateContext)!
    const settings = useContext(SettingsStateContext)!;
    const {startTimer, pauseTimer, resetWorkTimer, resetRestTimer, setTimeLeft, updateStartTime} = useContext(TimerControlsContext)!;
    const { selectedTodoId, setSpentTime, todos, setSelectedTodoId } = useContext(TaskContext)!;
    const { isRunning, sound } = settings;
    const { startTime, activeTab } = timer;
    const selectedTask = todos.find((todo: Todo) => todo.id === selectedTodoId);

    const calculateInitialTime = (): number => {
        return calculateInitialTimeLeft({
            activeTab,
            timer
        });
    };

    const { isTimeUp, setIsTimeUp, timeLeft } = useTimer(calculateInitialTime(), isRunning);

    const handlePause = () => {
        if (selectedTodoId && activeTab === 'work' && startTime) {
            setSpentTime(selectedTodoId, calculateElapsedTimeInSeconds(startTime));
        }
        setTimeLeft(timeLeft, activeTab);
        pauseTimer();
    };

    const handleStart = () => {
        startTimer();
        updateStartTime(Date.now());
    };

    useEffect(() => {
        if (isTimeUp && isRunning) {
            setIsTimeUp(false);
            if (selectedTodoId && activeTab === 'work' && startTime) {
                setSpentTime(selectedTodoId, calculateElapsedTimeInSeconds(startTime));
            }
            if (activeTab === 'rest') {
                updateRestBreak();
                resetRestTimer();
            } else {
                updateWorkSessions()
                resetWorkTimer();
                //TODO: implement autoRest feature if on, automatically switch to rest timer
                // setActiveTab("rest");
                // handleStart();
            }

            if (sound) {
                const selectedSound = SOUNDS.find(s => s.id === sound);
                if (selectedSound) {
                    const soundHowl = new Howl({ src: [selectedSound.src] });
                    soundHowl.play();
                }
            }
        }
    }, [isTimeUp, selectedTodoId, startTime, isRunning]);

    useEffect(() => {
        if (selectedTask?.completed && isRunning) {
            if (setSelectedTodoId && activeTab === 'work') {
                setSpentTime(selectedTodoId, calculateElapsedTimeInSeconds(startTime));
                setSelectedTodoId("");
                resetWorkTimer();
            }
        }
    }, [isRunning, todos]);

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            if (isRunning) {
                setTimeLeft(timeLeft, activeTab);
            }
            if(activeTab === "rest") { 
                handlePause();
            }
            event.preventDefault();
            event.returnValue = '';
        };

        if (isRunning) {
            window.addEventListener('beforeunload', handleBeforeUnload);
        }

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [timeLeft, isRunning]);

    return (
        <TimerComponent
            timeLeft={timeLeft}
            handlePause={handlePause}
            handleStart={handleStart}
        />
    );
};

export default TimerContainer;
