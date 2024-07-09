import { Box, Text, Flex, Input } from '@chakra-ui/react';
import { GoalsProps } from '@/app/types/settings';
import { MAX_GOAL_VALUE, MIN_GOAL_VALUE } from '@/app/lib/constants';

const Goals = ({ goal, onGoalChange }: GoalsProps) => {
    const handleGoalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
                    onChange={handleGoalChange}
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