import React from 'react'
import FieldInput from './FieldInput'
import { render } from '@testing-library/react'

describe('FieldInput', () => {
    it('should return the correct string props', () => {
        const container =
            FieldInput({
                label:"test",
                type: "text",
                placeholder: "test1",
                handleChange: jest.fn()
            })
        expect(container).toBeDefined();
        expect(container.props.children[0].props.children).toBe("test")
        expect(container.props.children[1].props.type).toBe("text")
        expect(container.props.children[1].props.placeholder).toBe("test1")
    })
})