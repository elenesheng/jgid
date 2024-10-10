"use client";

import React, { createContext, ReactNode, useCallback, useMemo, useReducer } from 'react';
import useLocalStorage from '@/app/hooks/useLocalStorage';
import { TimerState, TimerSettings, TimerControls } from '@/app/types/timer';
import { minutesToSeconds } from '@/app/lib/utils/timer';
import { DEFAULT_WORK_DURATION, DEFAULT_REST_DURATION } from '@/app/lib/constants';
import { SettingsControls } from '@/app/types/settings';
import { useRenderTime } from '@/app/hooks/useRenderTime';
import { timerReducer, settingsReducer } from '../state/timer/timerReducer';

export const TimerStateContext = createContext<TimerState | undefined>(undefined);
export const SettingsStateContext = createContext<TimerSettings | undefined>(undefined);
export const TimerControlsContext = createContext<TimerControls | undefined>(undefined);
export const SettingsControlsContext = createContext<SettingsControls | undefined>(undefined);

export const TimerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  useRenderTime('TimerProvider');

  const [timerState, setTimerState] = useLocalStorage<TimerState>("timer", {
    workTime: minutesToSeconds(DEFAULT_WORK_DURATION),
    restTime: minutesToSeconds(DEFAULT_REST_DURATION),
    startTime: 0,
    activeTab: "work",
    isRunning: false,
    workSessions: 0,
    restBreaks: 0,
  });

  const [settingsState, setSettingsState] = useLocalStorage<TimerSettings>("timer-settings", {
    workDuration: DEFAULT_WORK_DURATION,
    restDuration: DEFAULT_REST_DURATION,
    sound: "",
    goal: 0,
    isWhiteNoise: false,
    isAutoRest: false,
    isWeekDays: false,
  });

  const [timer, timerDispatch] = useReducer(timerReducer, timerState);
  const [settings, settingsDispatch] = useReducer(settingsReducer, settingsState);

  const memoizedTimerState = useMemo(() => timer, [timer]);
  const memoizedSettingsState = useMemo(() => settings, [settings]);

  useMemo(() => {
    setTimerState(timer);
  }, [timer, setTimerState]);

  useMemo(() => {
    setSettingsState(settings);
  }, [settings, setSettingsState]);

  const timerControls = useMemo(() => ({
    startTimer: () => timerDispatch({ type: "START_TIMER" }),
    pauseTimer: () => timerDispatch({ type: "PAUSE_TIMER" }),
    resetWorkTimer: () => {
      timerDispatch({ type: "PAUSE_TIMER" });
      timerDispatch({ type: "RESET_WORK_TIMER", payload: settingsState.workDuration });
    },
    resetRestTimer: () => {
      timerDispatch({ type: "PAUSE_TIMER" });
      timerDispatch({ type: "RESET_REST_TIMER", payload: settingsState.restDuration });
    },
    updateWorkSessions: () => timerDispatch({ type: "UPDATE_WORK_SESSIONS" }),
    updateRestBreak: () => timerDispatch({type: "UPDATE_REST_BREAK"}),
    setActiveTab: (activeTab: string) => timerDispatch({ type: "SET_ACTIVE_TAB", payload: activeTab }),
    updateStartTime: (seconds: number) => timerDispatch({ type: "UPDATE_START_TIME", payload: seconds }),
    setTimeLeft: (seconds: number, type: string) => timerDispatch({
      type: "SET_TIME_LEFT",
      payload: { seconds, type },
    }),
  }), [settingsState.workDuration, settingsState.restDuration]);

  const settingsControls = useMemo(() => ({
    setSound: (sound_id: string) => settingsDispatch({ type: "SET_SOUND", payload: sound_id }),
    setGoal: (goals: number) => settingsDispatch({ type: "SET_GOAL", payload: goals }),
    setWhiteNoise: (isWhiteNoise: boolean) => settingsDispatch({ type: "SET_WHITE_NOISE", payload: isWhiteNoise }),
    updateWorkDuration: (minutes: number) => {
      settingsDispatch({ type: "UPDATE_WORK_DURATION", payload: minutes });
      timerDispatch({ type: "RESET_WORK_TIMER", payload: minutes });
  },
  updateRestDuration: (minutes: number) => {
      settingsDispatch({ type: "UPDATE_REST_DURATION", payload: minutes });
      timerDispatch({ type: "RESET_REST_TIMER", payload: minutes });
  },
    setAutoRest: () => settingsDispatch({ type: "TOGGLE_AUTO_REST" }),
    setIsWeekDays: (isWeekDays: boolean) => settingsDispatch({ type: "SET_WEEKDAYS", payload: isWeekDays }),
  }), []);

  return (
    <TimerStateContext.Provider value={memoizedTimerState}>
      <SettingsStateContext.Provider value={memoizedSettingsState}>
        <TimerControlsContext.Provider value={timerControls}>
          <SettingsControlsContext.Provider value={settingsControls}>
            {children}
          </SettingsControlsContext.Provider>
        </TimerControlsContext.Provider>
      </SettingsStateContext.Provider>
    </TimerStateContext.Provider>
  );
};

