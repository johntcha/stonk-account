import React, { useState, useEffect } from 'react'
import  { Redirect } from 'react-router-dom'
import Header from '../component/Header';
import CardPieChart from '../component/Cards/CardPieChart';
import CardAccount from '../component/Cards/CardAccount';
import CardInputData from '../component/Cards/CardInputData';
import './homepage.css'
import CardTable from '../component/Cards/CardTable';
import RequestService from '../request/RequestService';


const Homepage = () => {
    const username = window.localStorage.getItem('username')
    const [type, setType] = useState('Expense')
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedDateTable, setSelectedDateTable] = useState();
    const [currency, setCurrency] = useState('€')
    const [currencyTable, setCurrencyTable] = useState()
    const [categoryInput, setCategoryInput] = useState()
    const [categoryTable, setCategoryTable] = useState()
    const [amountInput, setAmountInput] = useState()
    const [amountTable, setAmountTable] = useState()
    const [expensesList, setExpensesList] = useState([])
    const [total, setTotal] = useState(0)
    const [deleteTrigger, setDeleteTrigger] = useState(true)

    const expenseData = {
      date: selectedDate,
      category: categoryInput,
      amount: amountInput,
      currency: currency
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
    const expenseGain = [
      {
        label: 'Expense',
      },
      {
        label: 'Gain',
      },
  ];

    useEffect(() => {
      RequestService.getAllUserExpenses(config).then((result) => {
      setExpensesList(result.data); 
      console.log(result.data);
      calculateTotalAccount(result.data);
      })
    }, [categoryTable, amountTable, selectedDateTable, deleteTrigger]);

    
    const onClickDelete = async (id) => {
      await RequestService.deleteExpense(id, config)
      setDeleteTrigger(!deleteTrigger)
    }

    const calculateTotalAccount = ((array) => {
      if(total !== 0){
        const amountArray = []
        array.map((expense) => amountArray.push(parseFloat(expense.amount)))
        if(amountArray.length > 0){
          const totalAmount = amountArray.reduce((accumulator, currentValue) => accumulator + currentValue)
          setTotal(totalAmount.toFixed(2))
        }
        else {
          setTotal(0)
        }
      } else {
        setTotal(amountTable)
      }
    })

    const handleChangeType = (event) => {
      setType(event.target.value);
    };

    const handleChangeDate = (date) => {
      setSelectedDate(date);
    };

    const handleChangeCurrency = (event) => {
      setCurrency(event.target.value);
    }
    const handleChangeCategory= (event) => {
      setCategoryInput(event.target.value);
    }
    const handleChangeAmount= (event) => {
      if (type === 'Expense'){
        setAmountInput(-event.target.value);
      } else {
        setAmountInput(event.target.value);
      }
      
    }
    const onSubmit = async (event) => {
      event.preventDefault();
      await RequestService.createExpense(expenseData, config).then((result) => console.log(result))
      setSelectedDateTable(selectedDate);
      setCategoryTable(categoryInput);
      setCurrencyTable(currency);
      setAmountTable(amountInput);
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
                <CardAccount
                total={total}
                />
                <CardInputData 
                type={type}
                currency={currency}
                handleChangeCurrency={handleChangeCurrency}
                currencies={currencies}
                onSubmit={onSubmit}
                handleChangeCategory={handleChangeCategory}
                handleChangeAmount={handleChangeAmount}
                handleChangeDate={handleChangeDate}
                selectedDate={selectedDate}
                expenseGain={expenseGain}
                handleChangeType={handleChangeType}
                />
                <CardTable
                expensesList={expensesList}
                onClickDelete={onClickDelete}
                />
                </div>
            </>
        )}
        </>
    )
}

export default Homepage
