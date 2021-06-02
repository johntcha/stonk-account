import React from 'react'
import Header from './Header'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Header', () => {
    beforeEach(() => {
        jest.resetAllMocks();
      });
      
    afterEach(cleanup)

    it('should change the text content', () => {
        const mockCapitalize = jest.fn()
        render(<Header username="john" logout={()=>{}} capitalizeFirstLetter={mockCapitalize}/>)
        expect(mockCapitalize).toHaveBeenCalledTimes(1)
    })

    it('should trigger the desktop log out button', () => {
        const mockLogOut = jest.fn()
        render(<Header username="john" logout={mockLogOut} capitalizeFirstLetter={()=>{}} />)
        const logout = screen.getByLabelText('logout-button')
        userEvent.click(logout)
        expect(mockLogOut).toHaveBeenCalledTimes(1)
    })

    it('should trigger the mobile log out button', () => {
        const mockLogOutMobile = jest.fn()
        render(<Header username="john" logout={mockLogOutMobile} capitalizeFirstLetter={()=>{}} />)
        const logout = screen.getByLabelText('logout-button-mobile')
        userEvent.click(logout)
        expect(mockLogOutMobile).toHaveBeenCalledTimes(1)
    })
})