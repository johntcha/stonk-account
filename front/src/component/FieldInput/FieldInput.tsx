import React, { ChangeEventHandler, FC } from 'react'

interface FieldInputProps {
    label: string
    type: string
    placeholder: string
    handleChange: ChangeEventHandler<HTMLInputElement>
}

const FieldInput: FC<FieldInputProps> = ({
    label,
    type,
    placeholder,
    handleChange
}: FieldInputProps) => {
    return (
        <>
        <label>
            {label}
        </label>
        <input
            aria-label="field-input"
            type={type}
            placeholder= {placeholder}
            onChange={handleChange}
        />
        </>
    )
}

export default FieldInput
