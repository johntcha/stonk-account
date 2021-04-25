import React, { useState } from 'react'
import  { Redirect } from 'react-router-dom'
import Header from '../component/Header';
import CardPieChart from '../component/CardPieChart';
import CardInputData from '../component/CardInputData';
import './homepage.css'
import CardWhatever from '../component/CardWhatever';


const Homepage = () => {
    const username = window.localStorage.getItem('username')
    const [currency, setCurrency] = useState('EUR');
    const [text, setText] = useState()
    const [result, setResult] = useState()

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

    const handleChangeCurrency = (event) => {
        setCurrency(event.target.value);
    }
    const handleChangeText= (event) => {
        setText(event.target.value);
    }
    const onSubmit = (event) => {
        event.preventDefault();
        setResult(text);
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
                    result={result}
                />
                <CardInputData 
                currency={currency}
                handleChangeCurrency={handleChangeCurrency}
                currencies={currencies}
                onSubmit={onSubmit}
                handleChangeText={handleChangeText}
                />
                <CardWhatever />
                </div>
            </>
        )}
        </>
    )
}

export default Homepage
