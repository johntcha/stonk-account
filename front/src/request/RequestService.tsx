import React from 'react'
import axios from 'axios'

interface credentials {
    username: string
    password: string
}


    export const login = (credentials: credentials): any => {
        try {
            const data = axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, credentials)
            return data
        } catch (error) {
            throw(error)
        }
    }

    export const displayUserLogged = async (token): Promise<any> => {
        try {
            const data = await axios.get(`${process.env.REACT_APP_API_URL}/profile`, token)
            return data
        } catch (error) {
            throw(error)
        }
    }

    export const createAccount = async (credentials): Promise<any> => {
        try {
            const data = await axios.post(`${process.env.REACT_APP_API_URL}/users`, credentials)
            return data
        } catch (error) {
            throw(error)
        }
    }

    export const createExpense = async (expenseData, token): Promise<any> => {
        try {
            const data = await axios.post(`${process.env.REACT_APP_API_URL}/expense`, expenseData, token)
            return data
        } catch (error) {
            throw(error)
        }
    }

    export const getExpense = async (id: number, token): Promise<any> => {
        try {
            const data = await axios.get(`${process.env.REACT_APP_API_URL}/expense/${id}`, token)
            return data
        } catch (error) {
            throw(error)
        }
    }

    export const deleteExpense = async (id: number, token): Promise<void> => {
        try {
            await axios.delete(`${process.env.REACT_APP_API_URL}/expense/${id}`, token)
        } catch (error) {
            throw(error)
        }
    }

    export const getAllUserExpenses = async (token): Promise<any> => {
        try {
            const data = await axios.get(`${process.env.REACT_APP_API_URL}/expense`, token)
            return data
        } catch (error) {
            throw(error)
        }
    }

    export const activateIsDebited = async (id: number, token): Promise<void> => {
        try {
            await axios.patch(`${process.env.REACT_APP_API_URL}/expense/activate/${id}`, null, token)
        } catch (error) {
            throw(error)
        }
    }
      
