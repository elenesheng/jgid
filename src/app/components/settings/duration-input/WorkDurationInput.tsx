import React, {memo} from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { MIN_WORK_VALUE, MAX_WORK_VALUE } from "@/app/lib/constants";
import { DurationInputProps } from "@/app/types/settings";

const WorkDurationInput = ({onChange, value}: DurationInputProps) => {
    console.log("work duration changed")
    return (
        <FormControl mb="md">
            <FormLabel>Work Duration (minutes)</FormLabel>
            <Input
                type="number"
                value={value}
                onChange={onChange}
                min={MIN_WORK_VALUE}
                max={MAX_WORK_VALUE}
            />
        </FormControl>
    );
};

export default WorkDurationInput;
