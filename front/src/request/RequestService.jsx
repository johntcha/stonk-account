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
    }
}

export default RequestService

