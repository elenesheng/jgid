export interface SettingsComponentProps {
    handleOpen: () => void;
    handleSave: () => void;
    localWorkDuration: number;
    localRestDuration: number;
    handleWorkChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRestChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    goalValue: number;
    handleGoalChange: (newGoal: number) => void;
    isOpen: boolean;
    onClose: () => void;
    setSelectedSound: (soundId: string) => void;
    selectedSound: string;
    handleWhiteNoiseToggle: () => void;
    whiteNoiseValue: boolean;
    weekDaysValue: boolean;
    handleIsWeekdaysChange: () => void;
}
export interface SoundProps {
    selectedSound: string;
    setSelectedSound: (soundId: string) => void;
}

export interface SoundListItemProps {
    soundSrc: string;
    label: string;
    isSelected: boolean;
    onSelect: () => void;
}

export interface GoalsProps {
    goal: number;
    onGoalChange: (newGoal: number) => void;
}

export interface DurationInputProps {
    label: string;
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isDisabled: boolean;
    min: number;
    max: number;
}

export interface SettingsCheckboxProps {
    label: string;
    isChecked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SettingsFooterProps {
    onSave: () => void;
    onClose: () => void;
}

export interface SettingsControls {
    updateRestBreak: () => void;
    updateWorkSessions: () => void;
    setGoal: (goals: number) => void;
    setWhiteNoise: (isWhiteNoise: boolean) => void;
    setSound: (sound_id: string) => void;
    updateWorkDuration: (minutes: number) => void;
    updateRestDuration: (minutes: number) => void;
    setIsWeekDays: (isWeekDays: boolean) => void;
}
