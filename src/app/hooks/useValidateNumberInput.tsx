import { useState, useCallback } from "react";

interface ValidatedInputHook {
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    min: number;
    max: number;
}

const useValidatedInput = (
    initialValue: number,
    min: number,
    max: number,
    externalChangeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void
): ValidatedInputHook => {
    const [value, setValue] = useState<number | string>(initialValue);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const numberValue = parseInt(inputValue, 10);

        if (inputValue === "" || (numberValue >= min && numberValue <= max)) {
            setValue(inputValue);
            if (externalChangeHandler) {
                externalChangeHandler(e);
            }
        } else if (numberValue < min) {
            setValue(min);
            if (externalChangeHandler) {
                externalChangeHandler({ ...e, target: { ...e.target, value: min.toString() } });
            }
        } else if (numberValue > max) {
            setValue(max);
            if (externalChangeHandler) {
                externalChangeHandler({ ...e, target: { ...e.target, value: max.toString() } });
            }
        }
    }, [min, max, externalChangeHandler]);

    return {
        value,
        onChange: handleChange,
        min,
        max,
    };
};

export default useValidatedInput;
