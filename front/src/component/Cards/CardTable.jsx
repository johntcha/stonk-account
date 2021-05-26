import React, { useState } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import moment from 'moment'
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AddIcon from '@material-ui/icons/Add';
import './card.css'

const CardTable = ({
    expensesList,
    onClickDelete
}) => {
    const [value, setValue] = useState(0);

    const handleTabChange = (event, newValue) => {
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
                    return (<>
                    <tr key={value.id}>
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
