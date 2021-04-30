import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './card.css'

const CardAccount = ({
    total,
    currencyTable
}) => {
    return (
        <Card className="card account">
            <CardContent>
                <Typography>
                    <h2>Account total amount</h2>
                    {total}
                    {currencyTable}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default CardAccount
