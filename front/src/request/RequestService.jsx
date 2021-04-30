import React from 'react'
import axios from 'axios'

const RequestService = {

    login: function(credentials){
        try {
            const data = axios.post(`http://localhost:3002/auth/login`, credentials)
            return data
        } catch (error) {
            throw(error)
        }
    },

    displayUserLogged: async function(token){
        try {
            const data = await axios.get(`http://localhost:3002/profile`, token)
            return data
        } catch (error) {
            throw(error)
        }
    },

    createAccount: async function(credentials){
        try {
            const data = await axios.post(`http://localhost:3002/users`, credentials)
            return data
        } catch (error) {
            throw(error)
        }
    },

    createExpense: async function(expenseData, token){
        try {
            const data = await axios.post(`http://localhost:3002/expense`, expenseData, token)
            return data
        } catch (error) {
            throw(error)
        }
    },

    deleteExpense: async function(id, token){
        try {
            await axios.delete(`http://localhost:3002/expense/${id}`, token)
        } catch (error) {
            throw(error)
        }
    },

    getAllUserExpenses: async function(token){
        try {
            const data = await axios.get(`http://localhost:3002/expense`, token)
            return data
        } catch (error) {
            throw(error)
        }
    }
}

export default RequestService

