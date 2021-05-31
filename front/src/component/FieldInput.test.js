import React from 'react'
import FieldInput from './FieldInput'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('FieldInput', () => {
    it('should return the correct string props', () => {
        const container =
            FieldInput({
                label:"test",
                type: "text",
                placeholder: "test1",
                handleChange: ()=>{}
            })
        expect(container).toBeDefined();
        expect(container.props.children[0].props.children).toBe("test")
        expect(container.props.children[1].props.type).toBe("text")
        expect(container.props.children[1].props.placeholder).toBe("test1")
    })

    it('should change the text content', () => {
        const container = render(<
            FieldInput
                label="test"
                type="text"
                placeholder="test1"
                handleChange={()=>{}}
            />)
        const input = screen.getByLabelText('field-input')
        expect(container).toBeDefined();
        expect(input.value).toBe("")
        userEvent.type(input, 'hello')
        expect(input.value).toBe("hello")

    })
})