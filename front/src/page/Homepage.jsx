import React, { useState, useEffect } from 'react'
import  { Redirect } from 'react-router-dom'
import Header from '../component/Header';
import CardPieChart from '../component/Cards/CardPieChart';
import CardInputData from '../component/Cards/CardInputData';
import './homepage.css'
import CardTable from '../component/Cards/CardTable';
import RequestService from '../request/RequestService';


const Homepage = () => {
    const username = window.localStorage.getItem('username')
    const [currency, setCurrency] = useState('$')
    const [currencyTable, setCurrencyTable] = useState()
    const [categoryInput, setCategoryInput] = useState()
    const [categoryTable, setCategoryTable] = useState()
    const [amountInput, setAmountInput] = useState()
    const [amountTable, setAmountTable] = useState()

    const expenseData = {
      category: categoryTable,
      amount: amountTable,
      currency: currencyTable
    }
    const token = window.localStorage.getItem('token')
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    
    const currencies = [
        {
          value: 'USD',
          label: '$',
        },
        {
          value: 'EUR',
          label: '€',
        },
        {
          value: 'BTC',
          label: '฿',
        },
        {
          value: 'JPY',
          label: '¥',
        },
    ];

    

    // useEffect(() => {
    //   onSubmit()
    // }, []);

    const handleChangeCurrency = (event) => {
        setCurrency(event.target.value);
    }
    const handleChangeCategory= (event) => {
      setCategoryInput(event.target.value);
    }
    const handleChangeAmount= (event) => {
      setAmountInput(event.target.value);
    }
    const onSubmit = async (event) => {
      event.preventDefault();
      setCategoryTable(categoryInput);
      setCurrencyTable(currency);
      setAmountTable(amountInput)
      await RequestService.createExpense(expenseData, config).then((result) => console.log(result))
    }

    if (!window.localStorage.getItem('token')) return <Redirect to='/login'  />
    return (
        <>
        {window.localStorage.getItem('token') && (
            <>
                <Header 
                username={username}
                />
                <div className="card-wrapper">
                <CardPieChart
                    
                />
                <CardInputData 
                currency={currency}
                handleChangeCurrency={handleChangeCurrency}
                currencies={currencies}
                onSubmit={onSubmit}
                handleChangeCategory={handleChangeCategory}
                handleChangeAmount={handleChangeAmount}
                />
                <CardTable
                categoryTable={categoryTable}
                currencyTable={currencyTable}
                amountTable={amountTable}
                />
                </div>
            </>
        )}
        </>
    )
}

export default Homepage
