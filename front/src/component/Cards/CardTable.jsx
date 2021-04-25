import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'
import './card.css'

const CardTable = ({
    categoryTable,
    currencyTable,
    amountTable,
}) => {
    return (
        <Card className="card whatever">
            <CardContent>
                <Typography>
                    {categoryTable}
                    {amountTable}
                    {currencyTable}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default CardTable
