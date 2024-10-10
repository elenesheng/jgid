import React, {memo} from "react";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import { SettingsCheckboxProps } from "@/app/types/settings";

const SettingsCheckbox = memo<SettingsCheckboxProps>(({ isChecked, onChange, label }: SettingsCheckboxProps) => {
    return (
        <CheckboxGroup >
            <Checkbox mb="md" isChecked={isChecked} onChange={onChange}>
                {label}
            </Checkbox>
        </CheckboxGroup>
    );
});

SettingsCheckbox.displayName = 'SettingsCheckbox';
export default SettingsCheckbox;
