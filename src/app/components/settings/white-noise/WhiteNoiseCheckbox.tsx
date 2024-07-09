import React from "react";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import { WhiteNoiseCheckboxProps } from "@/app/types/settings";

const WhiteNoiseCheckbox = ({ isChecked, onChange }: WhiteNoiseCheckboxProps) => {
    return (
        <CheckboxGroup >
            <Checkbox mb="md" isChecked={isChecked} onChange={onChange}>
                Work with white noise
            </Checkbox>
        </CheckboxGroup>
    );
};

export default WhiteNoiseCheckbox;
