import { SettingsForm } from "@/app/types/timer";

export const settingsFormReducer = (state: SettingsForm, action: any): SettingsForm => {
    switch (action.type) {
        case "UPDATE_WORK_DURATION":
            return {...state, workDuration: action.payload };
        case "UPDATE_REST_DURATION":
            return {...state, restDuration: action.payload};
        case "SET_GOAL":
            return {...state, goal: action.payload };
        case "SET_SOUND":
            return {...state, sound: action.payload };
        case "SET_WHITE_NOISE":
            return {...state, isWhiteNoise: !state.isWhiteNoise };
        case "TOGGLE_WEEKDAYS":
            return { ...state, isWeekDays: !state.isWeekDays };
        case "RESET":
            return action.payload
        case "UPDATE_SOUND":
            return { ...state, sound: action.payload };
        default:
            return state;
    }
}
