import React, { ChangeEventHandler } from 'react'

interface FieldInputProps {
    label: string
    type: string
    placeholder: string
    handleChange: ChangeEventHandler<HTMLInputElement>
}

const FieldInput = ({
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
