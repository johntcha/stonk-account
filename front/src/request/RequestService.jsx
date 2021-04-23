import React, { Component } from 'react'
import axios from 'axios'

export class RequestService extends Component {
    getName = async (name) => {
        try {
            const data = await axios.get(`http://localhost:3002/name/${name}`)
            return data
        } catch (error) {
            throw(error)
        }
    }
}

export default RequestService

