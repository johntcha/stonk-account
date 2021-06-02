import React from 'react'
import CardInputData from './CardInputData'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MenuItem from '@material-ui/core/MenuItem';

describe('CardInputData', () => {
    afterEach(cleanup)
    const currencies = [
        {label: "$", value: "USD"},
        {label: "€", value: "EUR"},
        {label: "฿", value: "BTC"},
        {label: "¥", value: "JPY"}
    ]
    const expenseGain = [
        {label: "Expense"},
        {label: "Gain"}
    ]
    it('should be initialize to the date of today', () => {
        render(<
            CardInputData
                currencies={currencies}
                expenseGain={expenseGain}
                createTrigger={()=>{}}
                setCreateTrigger={()=>{}}
            />)
        const input = screen.getByLabelText('date-picker').querySelector('input')
        expect(new Date(input.value).toUTCString).toBe(new Date().toUTCString)
    })

    it('should be initialized to € for currency', () => {
        render(<
            CardInputData
                currencies={currencies}
                expenseGain={expenseGain}
                createTrigger={()=>{}}
                setCreateTrigger={()=>{}}
            />)
        const input = screen.getByLabelText('currency-picker').querySelector('input')
        expect(input.value).toBe("€")
    })

    it('should change the text content for category', () => {
        render(<
            CardInputData
                currencies={currencies}
                expenseGain={expenseGain}
                createTrigger={()=>{}}
                setCreateTrigger={()=>{}}
        />)
        const input = screen.getByLabelText('category').querySelector('input')
        expect(input.value).toBe("")
        userEvent.type(input, 'hello')
        expect(input.value).toBe("hello")
    })

    it('should change the number content for amount', () => {
        render(<
            CardInputData
                currencies={currencies}
                expenseGain={expenseGain}
                createTrigger={()=>{}}
                setCreateTrigger={()=>{}}
        />)
        const input = screen.getByLabelText('amount').querySelector('input')
        expect(input.value).toBe("")
        userEvent.type(input, "123")
        expect(input.value).toBe("123")
    })
})