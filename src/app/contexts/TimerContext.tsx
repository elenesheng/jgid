"use client";

import React, { createContext, ReactNode, useCallback, useMemo, useReducer } from 'react';
import useLocalStorage from '@/app/hooks/useLocalStorage';
import { TimerState, TimerSettings, TimerControls } from '@/app/types/timer';
import { minutesToSeconds } from '@/app/lib/utils/timer';
import { DEFAULT_WORK_DURATION, DEFAULT_REST_DURATION } from '@/app/lib/constants';
import { SettingsControls } from '@/app/types/settings';
import { useRenderTime } from '@/app/hooks/useRenderTime';

export const TimerStateContext = createContext<TimerState | undefined>(undefined);
export const SettingsStateContext = createContext<TimerSettings | undefined>(undefined);
export const TimerControlsContext = createContext<TimerControls | undefined>(undefined);
export const SettingsControlsContext = createContext<SettingsControls | undefined>(undefined);

const timerReducer = (state: TimerState, action: any): TimerState => {
  switch (action.type) {
    case 'RESET_WORK_TIMER':
      return { ...state, workTime: minutesToSeconds(action.payload) };
    case 'RESET_REST_TIMER':
      return { ...state, restTime: minutesToSeconds(action.payload) };
    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };
    case 'UPDATE_START_TIME':
      return { ...state, startTime: action.payload };
    case 'SET_TIME_LEFT':
      return {
        ...state,
        [action.payload.type === "work" ? "workTime" : "restTime"]: action.payload.seconds,
      };
    default:
      return state
  }
}

const settingsReducer = (state: TimerSettings, action: any): TimerSettings => {
  switch (action.type) {
    case 'START_TIMER':
      return { ...state, isRunning: true };
    case 'PAUSE_TIMER':
      return { ...state, isRunning: false };
    case 'SET_SOUND':
      return { ...state, sound: action.payload };
    case 'SET_GOAL':
      return { ...state, goal: action.payload };
    case 'SET_WHITE_NOISE':
      return { ...state, isWhiteNoise: action.payload };
    case 'TOGGLE_AUTO_REST':
      return { ...state, isAutoRest: !state.isAutoRest };
    case "SET_WEEKDAYS":
      return { ...state, isWeekDays: action.payload };
    case "UPDATE_WORK_DURATION":
      return { ...state, workDuration: action.payload };
    case "UPDATE_REST_DURATION":
      return { ...state, restDuration: action.payload };
    default:
      return state;
  }
}

export const TimerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  useRenderTime('TimerProvider');

  const [timerState, setTimerState] = useLocalStorage<TimerState>("timer", {
    workTime: minutesToSeconds(DEFAULT_WORK_DURATION),
    restTime: minutesToSeconds(DEFAULT_REST_DURATION),
    startTime: 0,
    activeTab: "work",
  });

  const [settingsState, setSettingsState] = useLocalStorage<TimerSettings>("timer-settings", {
    isRunning: false,
    workDuration: DEFAULT_WORK_DURATION,
    restDuration: DEFAULT_REST_DURATION,
    restBreaks: 0,
    workSessions: 0,
    sound: "",
    goal: 0,
    isWhiteNoise: false,
    isAutoRest: false,
    isWeekDays: false,
  });

  const [timer, timerDispatch] = useReducer(timerReducer, timerState);
  const [settings, settingsDispatch] = useReducer(settingsReducer, settingsState);

  useMemo(() => {
    setTimerState(timer);
  }, [timer, setTimerState]);

  useMemo(() => {
    setSettingsState(settings);
  }, [settings, setSettingsState]);

  const timerControls = useMemo(() => ({
    startTimer: () => settingsDispatch({ type: "START_TIMER" }),
    pauseTimer: () => settingsDispatch({ type: "PAUSE_TIMER" }),
    resetWorkTimer: () => {
      settingsDispatch({ type: "PAUSE_TIMER" });
      timerDispatch({ type: "RESET_WORK_TIMER", payload: settingsState.workDuration });
    },
    resetRestTimer: () => {
      settingsDispatch({ type: "PAUSE_TIMER" });
      timerDispatch({ type: "RESET_REST_TIMER", payload: settingsState.restDuration });
    },
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
    updateRestBreak: () => settingsDispatch({ type: "UPDATE_REST_BREAKS" }),
    updateWorkSessions: () => settingsDispatch({ type: "UPDATE_WORK_SESSIONS" }),
    updateWorkDuration: (minutes: number) => settingsDispatch({ type: "UPDATE_WORK_DURATION", payload: minutes }),
    updateRestDuration: (minutes: number) => settingsDispatch({ type: "UPDATE_REST_DURATION", payload: minutes }),
    setAutoRest: () => settingsDispatch({ type: "TOGGLE_AUTO_REST" }),
    setIsWeekDays: (isWeekDays: boolean) => settingsDispatch({ type: "SET_WEEKDAYS", payload: isWeekDays }),
  }), []);

  return (
    <TimerStateContext.Provider value={timerState}>
      <SettingsStateContext.Provider value={settingsState}>
        <TimerControlsContext.Provider value={timerControls}>
          <SettingsControlsContext.Provider value={settingsControls}>
            {children}
          </SettingsControlsContext.Provider>
        </TimerControlsContext.Provider>
      </SettingsStateContext.Provider>
    </TimerStateContext.Provider>
  );
};
