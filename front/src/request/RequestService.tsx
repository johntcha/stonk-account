import React from 'react'
import axios from 'axios'

interface credentials {
    username: string
    password: string
}


    export const login = (credentials: credentials): any => {
        try {
            const data = axios.post(`http://localhost:3002/auth/login`, credentials)
            return data
        } catch (error) {
            throw(error)
        }
    }

    export const displayUserLogged = async (token): Promise<any> => {
        try {
            const data = await axios.get(`http://localhost:3002/profile`, token)
            return data
        } catch (error) {
            throw(error)
        }
    }

    export const createAccount = async (credentials): Promise<any> => {
        try {
            const data = await axios.post(`http://localhost:3002/users`, credentials)
            return data
        } catch (error) {
            throw(error)
        }
    }

    export const createExpense = async (expenseData, token): Promise<any> => {
        try {
            const data = await axios.post(`http://localhost:3002/expense`, expenseData, token)
            return data
        } catch (error) {
            throw(error)
        }
    }

    export const getExpense = async (id: number, token): Promise<any> => {
        try {
            const data = await axios.get(`http://localhost:3002/expense/${id}`, token)
            return data
        } catch (error) {
            throw(error)
        }
    }

    export const deleteExpense = async (id: number, token): Promise<void> => {
        try {
            await axios.delete(`http://localhost:3002/expense/${id}`, token)
        } catch (error) {
            throw(error)
        }
    }

    export const getAllUserExpenses = async (token): Promise<any> => {
        try {
            const data = await axios.get(`http://localhost:3002/expense`, token)
            return data
        } catch (error) {
            throw(error)
        }
    }

    export const activateIsDebited = async (id: number, token): Promise<void> => {
        try {
            await axios.patch(`http://localhost:3002/expense/activate/${id}`, null, token)
        } catch (error) {
            throw(error)
        }
    }
      
