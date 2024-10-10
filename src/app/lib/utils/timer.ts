import { TimerState } from '@/app/types/timer';
import { SECONDS_IN_A_MINUTE, MILLISECONDS_IN_A_SECOND } from '../constants';

interface CalculateInitialTimeLeftParams {
  activeTab: string;
  timer: TimerState
}

export const minutesToSeconds = (minutes: number): number => {
  return minutes * SECONDS_IN_A_MINUTE;
};

export const calculateInitialTimeLeft = ({
  activeTab,
  timer
}: CalculateInitialTimeLeftParams): number => {
  if (activeTab === 'rest') {
    return timer.restTime;
  }
  return timer.workTime;
};

export const formatTimePart = (time: number) => {
  return time.toString().padStart(2, '0');
};

export const formatTime = (seconds: number) => {
  const m = formatTimePart(Math.floor((seconds % 3600) / 60));
  const s = formatTimePart(seconds % 60);
  return { m, s };
};

export const calculateElapsedTimeInSeconds = (startTime: number): number => {
  const currentTime = Date.now();
  return Math.floor((currentTime - startTime) / MILLISECONDS_IN_A_SECOND);
};

export const secondsToMinutes = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  return minutes;
}

export const trimText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) {
      return text;
  }
  return text.substring(0, maxLength) + '...';
}
