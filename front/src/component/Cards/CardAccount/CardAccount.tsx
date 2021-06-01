import React, { useState, ChangeEvent, useEffect } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Tabs, { TabsProps } from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AddIcon from '@material-ui/icons/Add';
import '../card.css'

interface CardAccountProps {
    total: number
    currency: string
}

const CardAccount = ({ 
    total,
    currency
}: CardAccountProps) => {
    const [value, setValue] = useState<number>(0);
    const [styleCard, setStyleCard] = useState<string>("")

    const handleTabChange = (event: ChangeEvent<{}>, newValue: number): void => {
        setValue(newValue);
    };

    useEffect(() => {
        total > 0 ? setStyleCard("yellowgreen") : setStyleCard("red")
    }, [total])
    return (
        <Card className="card account" style={{ backgroundColor: styleCard }}>
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
                <div>
                    <h2>Account total amount</h2>
                    {total}
                    {currency}
                </div>
            </CardContent>
        </Card>
    )
}

export default CardAccount
