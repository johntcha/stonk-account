import React, { useEffect, useState } from 'react'
import RequestService from '../request/RequestService'
import Header from '../component/Header'
import './login.css'

const Login = () => {
    const [entry, setEntry] = useState()
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
         RequestService.displayUserLogged(config).then((result) => {
             setUsername(result.data.username)
            //  console.log(result)
            })
    })

    // const displayUsername = (() => {
    //     if (username)
    //     RequestService.getName(username).then((result) => {setEntry(result.data)
    //     console.log(result)}).catch((err)=>console.log(err))
    // })

    useEffect(()=>{
        getUsername()
        localStorageHandler()
    },[token])


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
        }
    }
    const LogOut = () => {
        if (window.localStorage.getItem('token')){
            window.localStorage.removeItem('token')
        }
    }

    return (
        <>
            {window.localStorage.getItem('token') && (
            <Header 
            username={username}
            LogOut={LogOut}
            />
            )}
            {!window.localStorage.getItem('token') && (
            <div className="login-content">
            <form className="login-form" onSubmit={handleSubmit}>
                <label>
                    Username:
                </label>
                <input
                    type="text"
                    placeholder="Enter your username"
                    // value={props.capitalize(value)}
                    onChange={handleChangeUsername}
                />
                <label>
                    Password:
                </label>
                <input
                    type="text"
                    placeholder="Enter your password"
                    // value={props.capitalize(value)}
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
