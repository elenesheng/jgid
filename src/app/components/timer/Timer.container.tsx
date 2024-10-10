"use client";

import React, { useContext, useEffect, useCallback } from 'react';
import { TimerStateContext, SettingsStateContext, TimerControlsContext } from '@/app/contexts/TimerContext';
import useTimer from '../../hooks/useTimer';
import { calculateInitialTimeLeft, calculateElapsedTimeInSeconds } from '@/app/lib/utils/timer';
import TimerComponent from './Timer.component';
import { Howl } from 'howler';
import { Todo } from '@/app/types/tasks';
import { SOUNDS } from '@/app/lib/constants';
import { useTodos } from "@/app/hooks/useTodos";

const TimerContainer: React.FC = () => {
    const timer = useContext(TimerStateContext)!
    const settings = useContext(SettingsStateContext)!;
    const {startTimer, pauseTimer, resetWorkTimer, resetRestTimer, setTimeLeft, updateStartTime, updateWorkSessions, updateRestBreak} = useContext(TimerControlsContext)!;
    const { selectedTodoId, setSpentTime, todos, setSelectedTodoId } = useTodos();
    const { sound } = settings;
    const { startTime, activeTab, isRunning } = timer;
    const selectedTask = todos?.find((todo: Todo) => todo.id === selectedTodoId);

    const calculateInitialTime = (): number => {
        return calculateInitialTimeLeft({
            activeTab,
            timer
        });
    };

    const { isTimeUp, setIsTimeUp, timeLeft } = useTimer(calculateInitialTime(), isRunning);

    const handlePause = useCallback(() => {
        if (selectedTodoId && activeTab === 'work' && startTime) {
            setSpentTime(selectedTodoId, calculateElapsedTimeInSeconds(startTime));
        }
        setTimeLeft(timeLeft, activeTab);
        pauseTimer();
    }, [selectedTodoId, activeTab, startTime, setSpentTime, setTimeLeft, timeLeft, pauseTimer]);

    const handleStart = useCallback(() => {
        startTimer();
        updateStartTime(Date.now());
    }, [startTimer, updateStartTime]);
    
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
        console.log(selectedTask)

        if (selectedTask?.completed && isRunning) {
            if (setSelectedTodoId && activeTab === 'work') {
                // setSpentTime(selectedTodoId, calculateElapsedTimeInSeconds(startTime));
                handlePause();
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
