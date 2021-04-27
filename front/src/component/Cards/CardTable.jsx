import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'
import './card.css'

const CardTable = ({
    expensesList
}) => {
    return (
        <Card className="card whatever">
            <CardContent>
                <Typography>
                    Expenses list
                </Typography>
                <ul>
                {expensesList.map((value) => {
                    return <li key={value.id}>
                        {value.category}
                        {value.amount}
                        {value.currency}
                        </li>
                })}
                </ul>
            </CardContent>
        </Card>
    )
}

export default CardTable
