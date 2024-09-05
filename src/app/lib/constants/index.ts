import { generateId } from "../utils/helper";

export const SECONDS_IN_A_MINUTE = 60;
export const DEFAULT_WORK_DURATION = 25;
export const DEFAULT_REST_DURATION = 5;
export const MILLISECONDS_IN_A_SECOND = 1000;
export const SOUNDS = [
    { id: generateId(), src: '/sound/alarm-clock.mp3', label: 'Alarm Clock' },
    { id: generateId(), src: '/sound/doorbell-notification.mp3', label: 'Dorbell notification' },
    { id: generateId(), src: '/sound/simple-notification.mp3', label: 'Simple Notification' },
];
export const MAX_LENGTH_SHORT = 25;
export const MAX_LENGTH_LONG = 50;
export const EXPIRATION_TIME = 12 * 60 * 60 * 1000;
export const MIN_WORK_VALUE = 1;
export const MIN_REST_VALUE = 1;
export const MIN_GOAL_VALUE = 0;
export const MAX_GOAL_VALUE = 10;
export const MAX_WORK_VALUE = 60;
export const MAX_REST_VALUE = 45;
export const WEEK_DAYS = [
    { name: "Monday" },
    { name: "Tuesday" },
    { name: "Wednesday" },
    {  name: "Thursday" },
    { name: "Friday" },
    { name: "Saturday" },
    {  name: "Sunday" },
];
export const MAX_TASKS = 7;
