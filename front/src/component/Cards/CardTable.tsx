import React, { ChangeEvent, useState } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import moment from 'moment'
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AddIcon from '@material-ui/icons/Add';
import Checkbox from '@material-ui/core/Checkbox';
import './card.css'

interface ExpensesList {
    id: number
    amount: string
    category: string
    currency: string
    date: string
}

interface CardTableProps {
    expensesList: Array<ExpensesList>
    onClickDelete: Function
    onClickActivate: Function
    isChecked: Function
    checked: boolean
}

const CardTable = ({
    expensesList,
    onClickDelete,
    onClickActivate,
    isChecked,
    checked
}: CardTableProps) => {
    const [value, setValue] = useState<number>(0);

    const handleTabChange = (event: ChangeEvent<{}>, newValue: number): void => {
        setValue(newValue);
    };

    return (
        <Card className="card whatever">
            <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleTabChange}
            aria-label="disabled tabs example"
            >
            <Tab label="Active" />
            <button className="tab-add">
                <AddIcon />
            </button>
            </Tabs>
            <CardContent>
                <h2>Account history</h2>
                <table className="expenses-list">
                <tbody>
                {expensesList.map((value) => {
                    return (
                    <>
                    
                    <tr key={value.id}>
                        <td>
                            <Checkbox
                            onChange={() => isChecked(value.id)}
                            checked={checked}
                            color="primary"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                            onClick={() => onClickActivate(value.id)}
                            />
                        </td>
                        <td>{moment(value.date).format("L")}</td>
                        <td>{value.category}</td>
                        <td>{value.amount}</td>
                        <td>{value.currency}</td>
                        <td>
                            <IconButton 
                            aria-label="clear" 
                            onClick={() => onClickDelete(value.id)}>
                                <ClearIcon color="action" />
                            </IconButton>
                        </td>
                    </tr>  
                    </>)
                })}
                </tbody>
                </table>
            </CardContent>
        </Card>
    )
}

export default CardTable
