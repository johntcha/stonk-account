import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import moment from 'moment'
import './card.css'

const CardTable = ({
    expensesList
}) => {
    return (
        <Card className="card whatever">
            <CardContent>
                <table className="expenses-list">
                <thead>
                    <tr>
                        <th>Expenses list</th>
                    </tr>
                </thead>
                <tbody>
                {expensesList.map((value) => {
                    return <tr key={value.id}>
                        <td>{moment(value.date).format("L")}</td>
                        <td>{value.category}</td>
                        <td>{value.amount}</td>
                        <td>{value.currency}</td>
                        </tr>
                })}
                </tbody>
                </table>
            </CardContent>
        </Card>
    )
}

export default CardTable
