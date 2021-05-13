import React from 'react'
import axios from 'axios'

    export const login = (credentials) => {
        try {
            const data = axios.post(`http://localhost:3002/auth/login`, credentials)
            return data
        } catch (error) {
            throw(error)
        }
    }

    export const displayUserLogged = async (token) => {
        try {
            const data = await axios.get(`http://localhost:3002/profile`, token)
            return data
        } catch (error) {
            throw(error)
        }
    }

    export const createAccount = async (credentials) => {
        try {
            const data = await axios.post(`http://localhost:3002/users`, credentials)
            return data
        } catch (error) {
            throw(error)
        }
    }

    export const createExpense = async (expenseData, token) => {
        try {
            const data = await axios.post(`http://localhost:3002/expense`, expenseData, token)
            return data
        } catch (error) {
            throw(error)
        }
    }

    export const deleteExpense = async (id, token) => {
        try {
            await axios.delete(`http://localhost:3002/expense/${id}`, token)
        } catch (error) {
            throw(error)
        }
    }

    export const getAllUserExpenses = async (token) => {
        try {
            const data = await axios.get(`http://localhost:3002/expense`, token)
            return data
        } catch (error) {
            throw(error)
        }
    }
      
