import React, { useContext, memo, useMemo } from 'react';
import { Box, Flex, Button, TabPanels, TabPanel } from '@chakra-ui/react';
import { TimerComponentProps } from '@/app/types/timer';
import { TimerStateContext, TimerControlsContext } from '@/app/contexts/TimerContext';
import TaskSelector from '../tasks-selector';
import TimerTabs from './timer-ui-components/TimerTabs.component';
import { formatTime } from '@/app/lib/utils/timer';
import WhiteNoisePlayer from '../settings/player/WhiteNoisePlayer.component';
import { useRenderTime } from '@/app/hooks/useRenderTime';
import TimeDisplay from './timer-ui-components/TimeDisplay.component';

const TimerComponent = memo<TimerComponentProps>(({
    timeLeft,
    handlePause,
    handleStart,
}: TimerComponentProps) => {
    useRenderTime("Timer");
    const {resetWorkTimer, resetRestTimer } = useContext(TimerControlsContext)!;
    const timer = useContext(TimerStateContext)!;
    const { isRunning } = timer;

    const formattedTime = useMemo(() => {
        const timeToFormat = isRunning ? timeLeft : (timer.activeTab === 'work' ? timer.workTime : timer.restTime);
        return formatTime(timeToFormat);
    }, [isRunning, timeLeft, timer.activeTab, timer.workTime, timer.restTime]);

    return (
        <Box textAlign="center" p={0} m={0}>
            <TaskSelector />
            <TimerTabs>
                <TabPanels>
                    <TabPanel>
                        <TimeDisplay time={formattedTime} />
                    </TabPanel>
                    <TabPanel>
                        <TimeDisplay time={formattedTime} />
                    </TabPanel>
                </TabPanels>
            </TimerTabs>

            <Flex justifyContent="center" mt={4}>
                <Button
                    onClick={isRunning ? handlePause : handleStart}
                    color="white"
                    backgroundColor="accent"
                    mx={2}
                    size="md"
                    width="50%"
                >
                    {isRunning ? "Pause" : "Start"}
                </Button>
                <Button
                    onClick={timer.activeTab === 'work' ? resetWorkTimer : resetRestTimer}
                    variant="ghost"
                    mx={2}
                    size="md"
                    width="50%"
                >
                    Reset
                </Button>
            </Flex>
            <WhiteNoisePlayer/>
        </Box>
    );
});

export default TimerComponent;
