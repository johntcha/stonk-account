import React, { Component } from 'react'
import axios from 'axios'

const RequestService = {

    getName: async function (name){
        try {
            const data = await axios.get(`http://localhost:3002/name/${name}`)
            return data
        } catch (error) {
            throw(error)
        }
    },

    login: function(credentials){
        try {
            const data = axios.post(`http://localhost:3002/auth/login`, credentials)
            return data
        } catch (error) {
            throw(error)
        }
    },

    displayUserLogged: function(token){
        try {
            const data = axios.get(`http://localhost:3002/profile`, token)
            return data
        } catch (error) {
            throw(error)
        }
    }
}

export default RequestService

