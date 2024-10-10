import { TimerState, TimerSettings } from '@/app/types/timer';
import { minutesToSeconds } from '@/app/lib/utils/timer';

export const timerReducer = (state: TimerState, action: any): TimerState => {
    switch (action.type) {
        case 'START_TIMER':
            return { ...state, isRunning: true };
        case 'PAUSE_TIMER':
            return { ...state, isRunning: false };
        case 'RESET_WORK_TIMER':
            return { ...state, workTime: minutesToSeconds(action.payload) };
        case 'RESET_REST_TIMER':
            return { ...state, restTime: minutesToSeconds(action.payload) };
        case 'SET_ACTIVE_TAB':
            return { ...state, activeTab: action.payload };
        case 'UPDATE_START_TIME':
            return { ...state, startTime: action.payload };
        case "UPDATE_WORK_SESSIONS":
            return { ...state, workSessions: action.payload };
        case 'UPDATE_REST_BREAKS':
            return { ...state, restBreaks: action.payload };
        case 'SET_TIME_LEFT':
            return {
                ...state,
                [action.payload.type === "work" ? "workTime" : "restTime"]: action.payload.seconds,
            };
        default:
            return state
    }
}

export const settingsReducer = (state: TimerSettings, action: any): TimerSettings => {
    switch (action.type) {
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
