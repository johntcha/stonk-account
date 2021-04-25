import React from 'react'

const FieldInput = (
        {label,
        type,
        placeholder,
        handleChange}
) => {
    return (
        <>
        <label>
            {label}
        </label>
        <input
            type={type}
            placeholder= {placeholder}
            onChange={handleChange}
        />
        </>
    )
}

export default FieldInput
