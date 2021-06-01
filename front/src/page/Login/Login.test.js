import React from 'react'
import Login from './Login'
import { render, screen, within, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Login', () => {
    afterEach(cleanup)

    it('should show sign up popup onclick', () => {
        render(<Login/>)
        const signup = screen.getByLabelText('open-signup')
        userEvent.click(signup)
        expect(screen.getByText('Create account')).toBeInTheDocument()
    })

    it('should not show created account popup if password is not present', () => {
        render(<Login/>)
        const signup = screen.getByLabelText('open-signup')
        userEvent.click(signup)
        expect(screen.getByText('Create account')).toBeInTheDocument()
        userEvent.click(screen.getByLabelText('close'))
        expect(screen.queryByText('Create account')).not.toBeInTheDocument()
    })

    it('should replace the empty value by the insered text', () => {
        render(<Login/>)
        const loginForm = screen.getByLabelText('login-form')
        const input = within(loginForm).getAllByLabelText('field-input')
        expect(input[0].value).toBe("")
        expect(input[1].value).toBe("")
        userEvent.type(input[0], 'user')
        userEvent.type(input[1], 'password')
        expect(input[0].value).toBe("user")
        expect(input[1].value).toBe("password")
    })
})