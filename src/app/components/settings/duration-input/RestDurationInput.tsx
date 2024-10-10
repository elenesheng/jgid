import React, { useContext, memo } from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
// import { useRestDuration } from "@/app/hooks/useSettings";
import { MIN_REST_VALUE, MAX_REST_VALUE, SECONDS_IN_A_MINUTE } from "@/app/lib/constants";
import { DurationInputProps } from "@/app/types/settings";

const RestDurationInput = React.memo(({onChange, value}: DurationInputProps) => {
    console.log("Rest duration input changed")

    return (
        <FormControl mb="md">
            <FormLabel>Rest Duration (minutes)</FormLabel>
            <Input
                type="number"
                value={value}
                onChange={onChange}
                min={MIN_REST_VALUE}
                max={MAX_REST_VALUE}
            />
        </FormControl>
    );
});

export default RestDurationInput;
