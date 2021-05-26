import React, { useState, ChangeEvent } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Tabs, { TabsProps } from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AddIcon from '@material-ui/icons/Add';
import './card.css'

interface CardAccountProps {
    total: number
    currency: string
}

const CardAccount = ({
    total,
    currency
}: CardAccountProps) => {
    const [value, setValue] = useState<number>(0);

    const handleTabChange = (event: ChangeEvent<{}>, newValue: number): void => {
        setValue(newValue);
    };
    return (
        <Card className="card account">
            <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleTabChange}
            >
            <Tab label="Active" />
            <button className="tab-add">
                <AddIcon />
            </button>
            </Tabs>
            <CardContent>
                <Typography>
                    <h2>Account total amount</h2>
                    {total}
                    {currency}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default CardAccount
