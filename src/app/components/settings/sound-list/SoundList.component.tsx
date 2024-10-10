import React, { memo } from 'react';
import { Box, Text, Select } from '@chakra-ui/react';
import { SOUNDS } from '@/app/lib/constants';
import {  } from "@/app/hooks/useSettings";
import { SoundProps } from '@/app/types/settings';
const SoundList = ({selectedSound, setSelectedSound}: SoundProps) => {
    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedSound(e.target.value);
    };

    return (
        <Box mb="md">
            <Text fontSize="md" mb="xs" fontWeight="500">Choose notification sound</Text>
            <Select value={selectedSound} onChange={handleSelect}>
                <option value="">No Sound</option>
                {SOUNDS.map((sound_item) => (
                    <option key={sound_item.id} value={sound_item.id}>
                        {sound_item.label}
                    </option>
                ))}
            </Select>
        </Box>
    );
};

export default SoundList;
