import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import './card.css'

const CardInputData = ({
    currency,
    handleChangeCurrency,
    currencies,
    onSubmit,
    handleChangeCategory,
    handleChangeAmount,
    handleChangeDate,
    selectedDate,
}) => {

    return (
        <Card className="card input-data">
                    <CardContent>
                        <form className="input-depenses-card" onSubmit={onSubmit}>
                            <Typography>
                                Depenses
                            </Typography>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Date picker inline"
                            value={selectedDate}
                            onChange={handleChangeDate}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            />
                            </MuiPickersUtilsProvider>
                            <TextField 
                            id="standard-basic" 
                            label="Category"
                            onChange={handleChangeCategory} />
                            <TextField
                                id="standard-select-currency"
                                select
                                label="Select"
                                value={currency}
                                onChange={handleChangeCurrency}
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
