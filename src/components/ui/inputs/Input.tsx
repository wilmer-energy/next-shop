"use client";
import { TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
interface Props {
    inputName: string,
    label: string,
    required?: boolean,
    disabled?: boolean,
    defaultValue?: string | number
}
export default function Input(props: Props) {
    const methods = useFormContext();
    const { control, formState } = methods;
    const { errors } = formState;
    const { inputName, label, required = true, disabled = false, defaultValue = "" } = props;
    const error = errors[`${inputName}`];
    return (
        <Controller
            name={inputName}
            defaultValue={defaultValue}
            control={control}
            render={({ field }) => (
                <TextField
                    {...field}
                    className="mt-2 mb-2"
                    error={!!error}
                    helperText={error?.message ? true : false}
                    label={label}
                    disabled={disabled}
                    required={required}
                    id={inputName}
                    fullWidth
                />
            )}
        />);
}