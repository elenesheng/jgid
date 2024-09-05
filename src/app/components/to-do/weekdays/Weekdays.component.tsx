import React, { useContext } from 'react';
import { WEEK_DAYS } from '@/app/lib/constants';
import { Box, Flex, Button } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useTodos } from "@/app/hooks/useTodos";
import { SettingsStateContext } from "@/app/contexts/TimerContext";

export const WeekdaysComponent = () => {
    const { activeDate, getCount, setActiveDate } = useTodos();
    const settings = useContext(SettingsStateContext)!;
    const { status } = useSession();
    
    const handleWeekdayClick = (weekday: string) => {
        setActiveDate(weekday);
    };

    return (
        status === "authenticated" && settings.isWeekDays && (
            <Flex mb={4} alignItems="center" justifyContent="center">
                {WEEK_DAYS.map((weekday) => (
                    <Button
                        key={weekday.name}
                        onClick={() => handleWeekdayClick(weekday.name)}
                        variant={weekday.name === activeDate ? "primary" : "ghost"}
                        margin={0}
                        marginInlineEnd="10px"
                    >
                        {weekday.name}
                        {getCount(weekday.name) > 0 && (
                            <Box
                                position="absolute"
                                top="-8px"
                                right="-8px"
                                bg="accent"
                                color="white"
                                borderRadius="full"
                                w="20px"
                                h="20px"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                fontSize="xs"
                                fontWeight="bold"
                                zIndex="1"
                            >
                                {getCount(weekday.name)}
                            </Box>
                        )}
                    </Button>
                ))}
            </Flex>
        )
    );
};