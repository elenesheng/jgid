export interface TimerState {
    workTime: number;
    restTime: number;
    startTime: number;
    activeTab: string;
    isRunning: boolean;
    workSessions: number;
    restBreaks: number;
}

export interface TimerSettings {
    workDuration: number;
    restDuration: number;
    sound: string;
    goal: number;
    isWhiteNoise: boolean;
    isAutoRest: boolean;
    isWeekDays: boolean;
}

export interface SettingsForm {
    workDuration: number;
    restDuration: number;
    sound: string;
    goal: number;
    isWhiteNoise: boolean;
    isWeekDays: boolean;
}

export interface TimerContextType {
    timer: TimerState;
    settings: TimerSettings;
    updateWorkDuration: (minutes: number) => void;
    updateRestDuration: (minutes: number) => void;
    setSound: (sound_id: string) => void;
    startTimer: () => void;
    pauseTimer: () => void;
    resetWorkTimer: () => void;
    resetRestTimer: () => void;
    setTimeLeft: (seconds: number, type: string) => void;
    updateRestBreak: () => void;
    updateStartTime: (seconds: number) => void;
    updateWorkSessions: () => void;
    setActiveTab: (activeTab: string) => void;
    setGoal: (goals: number) => void;
    setWhiteNoise: (isWhiteNoise: boolean) => void;
}

export interface TimerControls {
    startTimer: () => void;
    pauseTimer: () => void;
    resetWorkTimer: () => void;
    resetRestTimer: () => void;
    setActiveTab: (activeTab: string) => void;
    setTimeLeft: (seconds: number, type: string) => void;
    updateStartTime: (seconds: number) => void;
    updateRestBreak: () => void;
    updateWorkSessions: () => void;
}

export interface TimerTabsProps {
    children: React.ReactNode;
}

export interface ProgressBarProps {
    type: 'work' | 'rest';
    timeLeft: number;
    duration: number;
}

export interface TimerComponentProps {
    timeLeft: number;
    handlePause: () => void;
    handleStart: () => void;
}
