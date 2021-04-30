import React, { useState } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './card.css'

const CardAccount = ({
    total,
    currencyTable
}) => {
    const [value, setValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Card className="card account">
            <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleTabChange}
            aria-label="disabled tabs example"
            >
            <Tab label="Active" />
            <Tab label="Active" />
            </Tabs>
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
