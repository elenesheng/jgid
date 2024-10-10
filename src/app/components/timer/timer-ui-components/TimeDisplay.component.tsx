import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

const TimeDisplay: React.FC<{ time: { m: string, s: string } }> = React.memo(({ time }) => (
    <Flex justifyContent="center" alignItems="center">
        <Text fontSize="60px" fontWeight="bold">{time.m}</Text>
        <Text fontSize="50px" fontWeight="bold" m="0 5px">:</Text>
        <Text fontSize="60px" fontWeight="bold">{time.s}</Text>
    </Flex>
));

export default TimeDisplay;
