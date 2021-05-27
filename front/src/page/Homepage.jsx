import React, { useState, useEffect, useReducer } from 'react'
import  { Redirect } from 'react-router-dom'
import Header from '../component/Header';
import CardPieChart from '../component/Cards/CardPieChart';
import CardAccount from '../component/Cards/CardAccount';
import CardInputData from '../component/Cards/CardInputData';
import './homepage.css'
import CardTable from '../component/Cards/CardTable';
import { deleteExpense, createExpense, getAllUserExpenses, activateIsDebited } from '../request/RequestService.jsx';
import formReducer from '../reducers/formReducer'

const Homepage = () => {
    const username = window.localStorage.getItem('username')
    const [type, setType] = useState('Expense')
    const [expensesList, setExpensesList] = useState([])
    const [total, setTotal] = useState(0)
    const [deleteTrigger, setDeleteTrigger] = useState(true)
    const [dataTable, setDataTable] = useState([])
    const [doughnut, setDoughnut] = useState()
    const [tabArray, setTabArray] = useState([]) 
    
    const initialState = {
      selectedDate: new Date(),
      category: "",
      currency: "€",
      amount: "",
    };

  const [state, dispatch] = useReducer(formReducer, initialState);
  const expenseData = {
    date: state.selectedDate,
    category: state.category,
    amount: state.amount,
    currency: state.currency
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
      getAllUserExpenses(config).then((result) => {
      setExpensesList(result.data); 
      console.log(result.data);
      calculateTotalAccount(result.data);
      })
    }, [dataTable, deleteTrigger]);
    
    const updateChart = async (expensesList) => {
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

      const doublonIndex = chartExpenseDataPrevious.findIndex((expense) => expense.id === chartExpenseData[chartExpenseData.length -1].id)
      if (doublonIndex !== -1) {
        chartExpenseDataPrevious[doublonIndex].value += chartExpenseData[chartExpenseData.length -1].value
        setDoughnut(chartExpenseDataPrevious);
      } else {
        setDoughnut(chartExpenseData);
      }
    };

    useEffect(()=>{
      updateChart(expensesList)
    }, [expensesList])
    
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

    const handleChangeType = (event) => {
      setType(event.target.value);
    };

    const handleChangeAmount= (event) => {
      if (type === 'Expense'){
        dispatch({type: 'amountNeg', payload: event.target.value})
      } else {
        dispatch({type: 'amountPos', payload: event.target.value})
      }
      
    }
    const onSubmit = async (event) => {
      event.preventDefault();
      await createExpense(expenseData, config).then((result) => console.log(result))
      setDataTable([{
        date: state.selectedDate,
        category: state.category,
        currency: state.currency,
        amount: state.amount
        }
      ])
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
                doughnut={doughnut}
                />
                <CardAccount
                total={total}
                currency={expenseData.currency}
                />
                <CardInputData 
                state={state}
                dispatch={dispatch}
                type={type}
                currencies={currencies}
                onSubmit={onSubmit}
                handleChangeAmount={handleChangeAmount}
                expenseGain={expenseGain}
                handleChangeType={handleChangeType}
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
