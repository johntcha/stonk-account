import React, { useEffect, useState } from 'react'
import RequestService from '../request/RequestService'
import './header.css'

const Header = () => {
    const [entry, setEntry] = useState()
    const [token, setToken] = useState()
    const user1 = {
        username: 'john',
        password: 'changeme',
    }

    RequestService.getName('John').then((result) => setEntry(result.data)).catch((err)=>console.log(err))
    RequestService.login(user1).then((result) => setToken(result.data.access_token))

    
    return (
        <div className="header">
             {entry} 
        </div>
    )
}

export default Header
