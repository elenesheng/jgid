import React, { useContext } from 'react';
import { Tabs as ChakraTabs, TabList as ChakraTabList, TabPanels as ChakraTabPanels, Tab } from '@chakra-ui/react';
import { TimerTabsProps } from '@/app/types/timer';
import { SettingsControlsContext, TimerControlsContext, TimerStateContext, SettingsStateContext } from '@/app/contexts/TimerContext';
import { minutesToSeconds } from '@/app/lib/utils/timer';

const TimerTabs = ({ children }: TimerTabsProps) => {
    const { setActiveTab } = useContext(TimerControlsContext)!;
    const settings = useContext(SettingsStateContext)!;
    const timer = useContext(TimerStateContext)!;
    const { restDuration, workDuration, isRunning } = settings;
    const { restTime, workTime } = timer;
    const disableWork = restTime !== minutesToSeconds(restDuration);
    const disableRest = workTime !== minutesToSeconds(workDuration);

    return (
        <ChakraTabs
            variant="soft-rounded"
            mt="md"
            index={timer.activeTab === 'work' ? 0 : 1}
            onChange={(index) => setActiveTab(index === 0 ? 'work' : 'rest')}
        >
            <ChakraTabList justifyContent="center" mb={4} background="secondary" borderRadius="6px">
                <Tab
                    isDisabled={isRunning || disableWork}
                    color="primaryDark"
                    _selected={{ color: 'textPrimary', bg: 'secondaryLight' }}
                    width="50%"
                    px={8}
                    py={2}
                    borderRadius="md"
                >
                    Work
                </Tab>
                <Tab
                    isDisabled={isRunning || disableRest}
                    color="primaryDark"
                    _selected={{ color: 'textPrimary', bg: 'secondaryLight' }}
                    width="50%"
                    px={8}
                    py={2}
                    borderRadius="md"
                >
                    Rest
                </Tab>
            </ChakraTabList>
            <ChakraTabPanels>{children}</ChakraTabPanels>
        </ChakraTabs>
    );
};

export default TimerTabs;
