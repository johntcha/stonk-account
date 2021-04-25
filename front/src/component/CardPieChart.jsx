import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './card.css'

const CardPieChart = ({
    result
}) => {
    return (
        <Card className="card piechart">
            <CardContent>
                <Typography>
                    {result}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default CardPieChart
