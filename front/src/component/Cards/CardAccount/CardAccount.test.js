import React from 'react'
import CardAccount from './CardAccount'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('CardAccount', () => {
    afterEach(cleanup)
    
    it('should have the currency after the total amount at initial state', () => {
        render(<CardAccount total={25} currency="€" />)
        expect(screen.getByText(/€/i)).toBeInTheDocument()
    })
})