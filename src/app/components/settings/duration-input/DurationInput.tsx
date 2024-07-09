import React from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { DurationInputProps } from "@/app/types/settings";

const DurationInput = ({ label, value, onChange, isDisabled, min, max }: DurationInputProps) => {
    return (
        <FormControl mb="md">
            <FormLabel>{label}</FormLabel>
            <Input
                type="number"
                value={value}
                onChange={onChange}
                isDisabled={isDisabled}
                min={min}
                max={max}
            />
        </FormControl>
    );
};

export default DurationInput;
