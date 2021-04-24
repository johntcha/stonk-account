import React, { useEffect, useState } from 'react'
import RequestService from '../request/RequestService'
import './header.css'

const Header = () => {
    const [entry, setEntry] = useState()
    const [token, setToken] = useState()
    const [username, setUsername] = useState()
    const user1 = {
        username: 'john',
        password: 'changeme',
    }
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    
    RequestService.login(user1).then((result) => setToken(result.data.access_token))

    const getUsername = (()=>{
        
         RequestService.displayUserLogged(config).then((result) => {
             setUsername(result.data.username)
            //  console.clear(result)
            })
    })

    const displayUsername = (() => {
        if (username)
        RequestService.getName(username).then((result) => setEntry(result.data)).catch((err)=>console.log(err))
    })

    useEffect(()=>{
        getUsername()
        displayUsername()
        
    },[token, username])
    

    
    return (
        <div className="header">
             {entry} 
        </div>
    )
}

export default Header
