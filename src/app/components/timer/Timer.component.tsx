import React, { useContext } from 'react';
import { Box, Flex, Button, TabPanels, Tab, TabPanel, Text, Select } from '@chakra-ui/react';
import { TimerComponentProps } from '@/app/types/timer';
import { TimerStateContext, SettingsStateContext, TimerControlsContext } from '@/app/contexts/TimerContext';
import TaskSelector from '../tasks-selector';
import TimerTabs from './timer-tabs/TimerTabs.component';
import { formatTime } from '@/app/lib/utils/timer';
import WhiteNoisePlayer from '../settings/player/WhiteNoisePlayer.component';

const TimerComponent = ({
    timeLeft,
    handlePause,
    handleStart,
}: TimerComponentProps) => {
    const {resetWorkTimer, resetRestTimer } = useContext(TimerControlsContext)!;
    const settings = useContext(SettingsStateContext)!
    const timer = useContext(TimerStateContext)!;
    const { isRunning } = settings;

    const time = formatTime(isRunning ? timeLeft : (timer.activeTab === 'work' ? timer.workTime : timer.restTime));

    return (
        <Box textAlign="center" p={0} m={0}>
            <TaskSelector />
            <TimerTabs>
                <TabPanels>
                    <TabPanel>
                        <Flex justifyContent="center" alignItems="center">
                            <Text fontSize="60px" fontWeight="bold">{time.m}</Text>
                            <Text fontSize="50px" fontWeight="bold" m="0 5px">:</Text>
                            <Text fontSize="60px" fontWeight="bold">{time.s}</Text>
                        </Flex>
                    </TabPanel>
                    <TabPanel>
                        <Flex justifyContent="center" alignItems="center">
                            <Flex justifyContent="center" alignItems="center">
                                <Text fontSize="60px" fontWeight="bold">{time.m}</Text>
                                <Text fontSize="50px" fontWeight="bold" m="0 5px">:</Text>
                                <Text fontSize="60px" fontWeight="bold">{time.s}</Text>
                            </Flex>
                        </Flex>
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
};

export default TimerComponent;
