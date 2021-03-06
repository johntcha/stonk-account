import React, { useState, useEffect, useCallback } from 'react'
import  { Redirect, useHistory } from 'react-router-dom'
import Header from '../../component/Header/Header';
import CardPieChart from '../../component/Cards/CardPieChart/CardPieChart';
import CardAccount from '../../component/Cards/CardAccount/CardAccount';
import CardInputData from '../../component/Cards/CardInputData/CardInputData';
import CardTable from '../../component/Cards/CardTable/CardTable';
import { deleteExpense, getAllUserExpenses, activateIsDebited } from '../../request/RequestService';
import './homepage.css'

const Homepage = () => {
    const username = window.localStorage.getItem('username')
    const history = useHistory();
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
    
    const totalCurrency = expensesList[0]?.currency || '€'
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

  
  const LogOut = () => {
      if (window.localStorage.getItem('token')){
          window.localStorage.removeItem('token')
          window.localStorage.removeItem('username')
          let path = `/login`; 
          history.push(path);
      }
  }
  const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }

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
      const chartExpenseDataUniqueWithoutValues = Array.from(chartExpenseData.reduce(
        (m, {id, value}) => m.set(id, (m.get(id) || 0) + value), new Map()), ([id, value]) => ({id, value})
      );
      const chartExpenseDataUnique = chartExpenseDataUniqueWithoutValues.map((exp) => Object.assign(exp, {label : exp.id} ))
      setDoughnut(chartExpenseDataUnique)
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
                logout={LogOut}
                capitalizeFirstLetter={capitalizeFirstLetter}
                />
                <div className="card-wrapper">
                <CardPieChart
                doughnut={doughnut}
                />
                <CardAccount
                total={total}
                currency={totalCurrency}
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
