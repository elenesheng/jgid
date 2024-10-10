"use client";

import React, { useContext } from "react";
import { Box, Text, Progress, Flex } from "@chakra-ui/react";
import { TimerStateContext, SettingsStateContext } from "@/app/contexts/TimerContext";

const GoalProgress = () => {
    const {workSessions } = useContext(TimerStateContext)!;
    const { goal } =  useContext(SettingsStateContext)!;

    return (
        <Box mb={10}>
            {goal > 0 && goal <= workSessions && (
                <Flex fontSize="md" fontWeight="bold" mr={2}>
                    <Text fontStyle="italic" color="accent" fontSize="md" mr="10px">
                        {workSessions} / {goal}
                    </Text>
                    <Progress
                        mt={2}
                        size="sm"
                        value={(workSessions / goal) * 100}
                        colorScheme="primary"
                        flex={1}
                    />
                </Flex>
            )}

            {goal > 0 && goal > workSessions && (
                <Flex fontSize="md" fontWeight="bold" mr={2}>
                    <Text fontStyle="italic" color="accent" fontSize="md" mr="10px">
                        {workSessions} / {goal}
                    </Text>
                    <Progress
                        mt={2}
                        size="sm"
                        value={(workSessions / goal) * 100}
                        colorScheme="primary"
                        flex={1}
                    />
                </Flex>
            )}
        </Box>
    );
};

export default GoalProgress;
