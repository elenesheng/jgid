import { memo } from 'react';
import { Box, Text, Flex, Input } from '@chakra-ui/react';
import { MAX_GOAL_VALUE, MIN_GOAL_VALUE } from '@/app/lib/constants';
import { GoalsProps } from '@/app/types/settings';

const Goals = ({ goal, onGoalChange }: GoalsProps) => {
    const handleGoalCHange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newGoal = parseInt(event.target.value, 10);
        onGoalChange(newGoal);
    };

    return (
        <Box mb="md">
            <Flex alignItems="center">
                <Text fontStyle="italic" color="primaryDark" mr="xs">Set daily goal, Pomodoro Sessions: </Text>
                <Input
                    type="number"
                    value={goal}
                    onChange={handleGoalCHange}
                    width="60px"
                    textAlign="center"
                    min={MIN_GOAL_VALUE}
                    max={MAX_GOAL_VALUE}
                />
            </Flex>
        </Box>
    );
};
export default Goals;
