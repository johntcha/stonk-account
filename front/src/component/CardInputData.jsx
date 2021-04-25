import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import './card.css'

const CardInputData = ({
    currency,
    handleChangeCurrency,
    currencies,
    onSubmit,
    handleChangeText
}) => {

    return (
        <Card className="card input-data">
                    <CardContent>
                        <form className="input-depenses-card" onSubmit={onSubmit}>
                            <Typography>
                                Depenses
                            </Typography>
                            <TextField 
                            id="standard-basic" 
                            label="Category"
                            onChange={handleChangeText} />
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
                                    <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                                </TextField>
                            <TextField id="standard-basic" label="Amount" />
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
