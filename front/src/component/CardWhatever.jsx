import React from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'
import './card.css'

const CardWhatever = () => {
    return (
        <Card className="card whatever">
            <CardContent>
                <Typography>
                    salut
                </Typography>
            </CardContent>
        </Card>
    )
}

export default CardWhatever
