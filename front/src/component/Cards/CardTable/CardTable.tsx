import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import moment from 'moment'
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AddIcon from '@material-ui/icons/Add';
import '../card.css'

interface ExpensesList {
    id: number
    amount: string
    category: string
    currency: string
    date: string
    isDebited: boolean
}

interface CardTableProps {
    expensesList: Array<ExpensesList>
    onClickDelete: Function
    onClickActivate: Function
}

const CardTable: FC<CardTableProps> = ({
    expensesList,
    onClickDelete,
    onClickActivate,
}: CardTableProps) => {
    const [value, setValue] = useState<number>(0);
    const [checked, setChecked] = useState<Array<boolean>>(new Array(expensesList.length).fill(false));
    const handleTabChange = (event: ChangeEvent<{}>, newValue: number): void => {
        setValue(newValue);
    };

    useEffect(() => {
        setChecked(expensesList.map((exp) => exp.isDebited))
    }, [expensesList]);

    const handleOnChange = (position: number, id: number) => {
        const updatedChecked = checked.map((item: boolean, index: number) =>
          index === position ? !item : item
        );
        setChecked(updatedChecked);
        onClickActivate(id)
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
                {expensesList.map((value, index) => {
                    return (
                    <tr key={value.id}>
                        <td>
                            <input
                            type="checkbox"
                            checked={checked[index]}
                            onChange={() => handleOnChange(index, value.id)}
                            />
                        </td>
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
                    )
                })}
                </tbody>
                </table>
            </CardContent>
        </Card>
    )
}

export default CardTable
