import React, { useEffect, useState } from 'react'
import RequestService from '../request/RequestService'
import  { Redirect } from 'react-router-dom'

import './login.css'

const Login = () => {
    const [token, setToken] = useState()
    const [username, setUsername] = useState()
    const [usernameTyped, setUsernameTyped] = useState()
    const [passwordTyped, setPasswordTyped] = useState()
    
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const user1 = {
        username: usernameTyped,
        password: passwordTyped,
    }
    
    
    const getUsername = (()=>{
        if (token)
         RequestService.displayUserLogged(config).then((result) => {
             setUsername(result.data.username)
            //  console.log(result)
            })
    })

    useEffect(()=>{
        getUsername()
        localStorageHandler()
    },[token, username])


    const handleChangeUsername = (event) => {
        setUsernameTyped(event.target.value);
    }
    const handleChangePassword = (event) => {
        setPasswordTyped(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        RequestService.login(user1).then((result) => setToken(result.data.access_token))
    }

    const localStorageHandler = () => {
        if (token){
            window.localStorage.setItem('token', token)
            window.localStorage.setItem('username', username)
        }
    }
    
    if(window.localStorage.getItem('token')) return <Redirect to='/'  />
    return (
        <>
            {!window.localStorage.getItem('token') && (
            <div className="login-content">
            <form className="login-form" onSubmit={handleSubmit}>
                <label>
                    Username:
                </label>
                <input
                    type="text"
                    placeholder="Enter your username"
                    onChange={handleChangeUsername}
                />
                <label>
                    Password:
                </label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    onChange={handleChangePassword}
                />
                <input type="submit" value="Log in"/>
            </form>
            </div>
            )}
        </>
    )
}

export default Login
