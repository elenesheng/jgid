"use client";
import React, { createContext, ReactNode, useCallback, useMemo, useContext } from 'react';
import useLocalStorage from '@/app/hooks/useLocalStorage';
import { TimerState, TimerSettings, TimerControls } from '@/app/types/timer';
import { minutesToSeconds } from '@/app/lib/utils/timer';
import { DEFAULT_WORK_DURATION, DEFAULT_REST_DURATION } from '@/app/lib/constants';
import { SettingsControls } from '@/app/types/settings';

export const TimerStateContext = createContext<TimerState | undefined>(undefined);
export const SettingsStateContext = createContext<TimerSettings | undefined>(undefined);
export const TimerControlsContext = createContext<TimerControls | undefined>(undefined);
export const SettingsControlsContext = createContext<SettingsControls | undefined>(undefined);

export const TimerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [timer, setTimer] = useLocalStorage<TimerState>('timer', {
    workTime: minutesToSeconds(DEFAULT_WORK_DURATION),
    restTime: minutesToSeconds(DEFAULT_REST_DURATION),
    startTime: 0,
    activeTab: "work"
  }, true);

  const [settings, setSettings] = useLocalStorage<TimerSettings>('timer-settings', {
    isRunning: false,
    workDuration: DEFAULT_WORK_DURATION,
    restDuration: DEFAULT_REST_DURATION,
    restBreaks: 0,
    workSessions: 0,
    sound: "",
    goal: 0,
    isWhiteNoise: false
  }, true);

  // Timer control callbacks
  const startTimer = useCallback(() => {
    setSettings(prev => ({ ...prev, isRunning: true }));
  }, [setSettings]);

  const pauseTimer = useCallback(() => {
    setSettings(prev => ({ ...prev, isRunning: false }));
  }, [setSettings]);

  const resetWorkTimer = useCallback(() => {
    setSettings(prev => ({ ...prev, isRunning: false }));
    setTimer(prev => ({ ...prev, workTime: minutesToSeconds(settings.workDuration) }));
  }, [setSettings, setTimer, settings.workDuration]);

  const resetRestTimer = useCallback(() => {
    setSettings(prev => ({ ...prev, isRunning: false }));
    setTimer(prev => ({ ...prev, restTime: minutesToSeconds(settings.restDuration) }));
  }, [setSettings, setTimer, settings.restDuration]);

  const setActiveTab = useCallback((activeTab: string) => {
    setTimer(prev => ({ ...prev, activeTab }));
  }, [setTimer]);

  const updateStartTime = useCallback((seconds: number) => {
    setTimer(prev => ({ ...prev, startTime: seconds }));
  }, [setTimer]);

  const setTimeLeft = useCallback((seconds: number, type: string) => {
    setTimer(prev => ({ ...prev, [type === "work" ? "workTime" : "restTime"]: seconds }));
  }, [setTimer]);

  // Settings callbacks
  const setSound = useCallback((sound_id: string) => {
    setSettings(prev => ({ ...prev, sound: sound_id }));
  }, [setSettings]);

  const setGoal = useCallback((goals: number) => {
    setSettings(prev => ({ ...prev, goal: goals }));
  }, [setSettings]);

  const setWhiteNoise = useCallback((isWhiteNoise: boolean) => {
    setSettings(prev => ({ ...prev, isWhiteNoise }));
  }, [setSettings]);

  const updateRestBreak = useCallback(() => {
    setSettings(prev => ({ ...prev, restBreaks: prev.restBreaks + 1 }));
  }, [setSettings]);

  const updateWorkSessions = useCallback(() => {
    setSettings(prev => ({ ...prev, workSessions: prev.workSessions + 1 }));
  }, [setSettings]);
    const updateWorkDuration = useCallback((minutes: number) => {
      setSettings(prev => ({ ...prev, workDuration: minutes }));
    }, [setSettings]);
  
    const updateRestDuration = useCallback((minutes: number) => {
      setSettings(prev => ({ ...prev, restDuration: minutes }));
    }, [setSettings]);

  const timerControls = useMemo(() => ({
    startTimer,
    pauseTimer,
    resetWorkTimer,
    resetRestTimer,
    setActiveTab,
    updateStartTime,
    setTimeLeft
  }), [startTimer, pauseTimer, resetWorkTimer, resetRestTimer, setActiveTab, updateStartTime, setTimeLeft]);

  const settingsControls = useMemo(() => ({
    setSound,
    setGoal,
    setWhiteNoise,
    updateRestBreak,
    updateWorkSessions,
    updateWorkDuration,
    updateRestDuration
  }), [setSound, setGoal, setWhiteNoise, updateWorkSessions, updateRestBreak, updateWorkDuration, updateRestDuration]);

  return (
    <TimerStateContext.Provider value={timer}>
      <SettingsStateContext.Provider value={settings}>
        <TimerControlsContext.Provider value={timerControls}>
          <SettingsControlsContext.Provider value={settingsControls}>
            {children}
          </SettingsControlsContext.Provider>
        </TimerControlsContext.Provider>
      </SettingsStateContext.Provider>
    </TimerStateContext.Provider>
  );
};
