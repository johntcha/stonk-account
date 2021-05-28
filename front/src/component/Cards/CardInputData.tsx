import React, { useReducer, useState } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { createExpense } from '../../request/RequestService';
import './card.css'

interface currencies {
    label: string
    value: string
}

interface CardInputDataProps {
    currencies: Array<currencies>
    expenseGain: Array<any>
    createTrigger: boolean
    setCreateTrigger: Function
}

const CardInputData = ({
    currencies,
    expenseGain,
    createTrigger,
    setCreateTrigger,
}: CardInputDataProps) => {
    const formReducer = (state, {type, payload}) => {
        switch (type) {
            case 'selectedDate':
                return {...state, selectedDate: payload}
            case 'category':
                return {...state, category: payload}
            case 'currency':
                return {...state, currency: payload}
            case 'amountNeg':
                return {...state, amount: -payload}
            case 'amountPos':
                return {...state, amount: payload}
            default:
                throw new Error()
        }
    }

    const [type, setType] = useState<string>('Expense')
    const initialState = {
        selectedDate: new Date(),
        category: "",
        currency: "€",
        amount: "",
      };
    const [state, dispatch] = useReducer(formReducer, initialState);
    const expenseData = {
      date: state.selectedDate,
      category: state.category,
      amount: state.amount,
      currency: state.currency
    }
      const token = window.localStorage.getItem('token')
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

    const handleChangeType = (event): void => {
        setType(event.target.value);
      };
  
    const handleChangeAmount= (event): void => {
        if (type === 'Expense'){
          dispatch({type: 'amountNeg', payload: event.target.value})
        } else {
          dispatch({type: 'amountPos', payload: event.target.value})
        }
        
    }
    const onSubmit = async (event): Promise<void> => {
        event.preventDefault();
        await createExpense(expenseData, config).then((result) => console.log(result))
        setCreateTrigger(!createTrigger)
    }
    return (
        <Card className="card input-data">
                    <CardContent>
                        <form className="input-depenses-card" onSubmit={onSubmit}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Date picker inline"
                            value={state.selectedDate}
                            onChange={(e) => dispatch({type: 'selectedDate', payload: e})}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            />
                            </MuiPickersUtilsProvider>
                            <InputLabel id="demo-simple-select-label">Type</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={type}
                            onChange={handleChangeType}
                            >
                            {expenseGain.map((option) => (
                                <MenuItem key={option.label} value={option.label}>
                                {option.label}
                                </MenuItem>
                            ))}
                            </Select>
                            <TextField 
                            id="standard-basic" 
                            label="Category"
                            onChange={(e) => dispatch({type: 'category', payload: e.target.value})} />
                            <TextField
                            id="standard-select-currency"
                            select
                            label="Select"
                            value={state.currency}
                            onChange={(e) => dispatch({type: 'currency', payload: e.target.value})}
                            helperText="Please select your currency"
                            style={{marginTop: "25px"}}
                            >
                            {currencies.map((option) => (
                                <MenuItem key={option.label} value={option.label}>
                                {option.label}
                                </MenuItem>
                            ))}
                            </TextField>
                            <TextField
                            id="standard-basic" 
                            label="Amount" 
                            onChange={handleChangeAmount}
                            />
                            <Button 
                            variant="contained" 
                            color="primary" 
                            type="submit"
                            style={{marginTop: "25px"}}
                            >
                                Add
                            </Button>
                        </form>
                        
                    </CardContent>
                </Card>
    )
}

export default CardInputData
