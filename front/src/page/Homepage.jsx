import React, { useState, useEffect, useCallback } from 'react'
import  { Redirect } from 'react-router-dom'
import Header from '../component/Header';
import CardPieChart from '../component/Cards/CardPieChart';
import CardAccount from '../component/Cards/CardAccount';
import CardInputData from '../component/Cards/CardInputData';
import CardTable from '../component/Cards/CardTable';
import { deleteExpense, getAllUserExpenses, activateIsDebited } from '../request/RequestService.jsx';
import './homepage.css'

const Homepage = () => {
    const username = window.localStorage.getItem('username')
    const [expensesList, setExpensesList] = useState([])
    const [total, setTotal] = useState(0)
    const [deleteTrigger, setDeleteTrigger] = useState(true)
    const [createTrigger, setCreateTrigger] = useState(true)
    const [doughnut, setDoughnut] = useState([])
    const [tabArray, setTabArray] = useState([]) 

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
      getAllUserExpenses(config).then((result) => {
      setExpensesList(result.data); 
      console.log(result.data);
      calculateTotalAccount(result.data);
      })
    }, [createTrigger, deleteTrigger]);
    
    const updateChart = useCallback( async (expensesList) => {
      const chartData = expensesList.map((expense) => {
        const container = {
          id: expense.category,
          label: expense.category,
          value: -parseFloat(expense.amount),
        };
        return container;
      });

      const chartExpenseData = await chartData.filter((neg) => neg.value > 0);
      const chartExpenseDataPrevious = [...chartExpenseData.slice(0, -1)];
      console.log(chartExpenseDataPrevious)
      console.log(doughnut)
      const doublonIndex = chartExpenseDataPrevious.findIndex((expense) => expense.id === chartExpenseData[chartExpenseData.length -1].id)
      if (doublonIndex !== -1 && doughnut.length === 0) {
        chartExpenseDataPrevious[doublonIndex].value += chartExpenseData[chartExpenseData.length -1].value
        setDoughnut(chartExpenseDataPrevious);
        console.log(chartExpenseDataPrevious)
      }
      else if(doublonIndex !== -1 && doughnut.length > 0) {
        doughnut[doublonIndex].value += chartExpenseData[chartExpenseData.length -1].value
        // setDoughnut(doughnut);
        console.log(doughnut)
      }
      else {
        setDoughnut(chartExpenseData);
      }
    }, []);

    useEffect(()=>{
      updateChart(expensesList)
    }, [expensesList, updateChart])
    
    const onClickDelete = async (id) => {
      await deleteExpense(id, config)
      setDeleteTrigger(!deleteTrigger)
    }

    const onClickActivate = async (id) => {
      await activateIsDebited(id, config)
    }

    const calculateTotalAccount = ((array) => {
        const amountArray = []
        array.map((expense) => amountArray.push(parseFloat(expense.amount)))
        if(amountArray.length > 0){
          const totalAmount = amountArray.reduce((accumulator, currentValue) => accumulator + currentValue)
          setTotal(totalAmount.toFixed(2))
        }
        else {
          setTotal(0)
        }
    })

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
                doughnut={doughnut}
                />
                <CardAccount
                total={total}
                // currency={expenseData.currency}
                />
                <CardInputData
                currencies={currencies}
                expenseGain={expenseGain}
                createTrigger={createTrigger}
                setCreateTrigger={setCreateTrigger}

                />
                <CardTable
                expensesList={expensesList}
                onClickDelete={onClickDelete}
                onClickActivate={onClickActivate}
                />
                </div>
            </>
        )}
        </>
    )
}

export default Homepage
