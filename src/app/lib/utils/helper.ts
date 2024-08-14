import { WEEK_DAYS } from "../constants";
export function generateId() {
    return `id_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 15)}`;
}

export function getCurrentWeekday() {
    const daysOfWeek = [
        "Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"
    ];

    const today = new Date();
    const dayIndex = today.getDay();

    return daysOfWeek[dayIndex];
}
