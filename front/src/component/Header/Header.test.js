import React from 'react'
import Header from './Header'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('FieldInput', () => {
    it('should change the text content', () => {
        const mockCapitalize = jest.fn()
        render(<Header username="john" logout={()=>{}} capitalizeFirstLetter={mockCapitalize}/>)
        expect(mockCapitalize.mock.calls.length).toBe(1)
    })

    it('should trigger the desktop log out button', () => {
        const mockLogOut = jest.fn()
        render(<Header username="john" logout={mockLogOut} capitalizeFirstLetter={()=>{}} />)
        const logout = screen.getByLabelText('logout-button')
        userEvent.click(logout)
        expect(mockLogOut.mock.calls.length).toBe(1)
    })

    it('should trigger the mobile log out button', () => {
        const mockLogOutMobile = jest.fn()
        render(<Header username="john" logout={mockLogOutMobile} capitalizeFirstLetter={()=>{}} />)
        const logout = screen.getByLabelText('logout-button-mobile')
        userEvent.click(logout)
        expect(mockLogOutMobile.mock.calls.length).toBe(1)
    })
})