import React from "react";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import { SettingsCheckboxProps } from "@/app/types/settings";

const SettingsCheckbox = ({ isChecked, onChange, label }: SettingsCheckboxProps) => {
    return (
        <CheckboxGroup >
            <Checkbox mb="md" isChecked={isChecked} onChange={onChange}>
                {label}
            </Checkbox>
        </CheckboxGroup>
    );
};

export default SettingsCheckbox;
