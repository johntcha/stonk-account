import React, { useEffect, useState } from 'react'
import { login, displayUserLogged, createAccount } from '../request/RequestService.jsx'
import  { Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import FieldInput from '../component/FieldInput'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import './login.css'

const Login = () => {
    const [token, setToken] = useState()
    const [username, setUsername] = useState()
    const [usernameTyped, setUsernameTyped] = useState()
    const [passwordTyped, setPasswordTyped] = useState()
    // const [emailTyped, setEmailTyped] = useState()
    const [isCreated, setIsCreated] = useState(false)
    const dateNow = new Date()
    
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const userCredentials = {
        username: usernameTyped,
        password: passwordTyped,
        // email: emailTyped
    }
    
    
    const getUsername = (()=>{
        if (token)
         displayUserLogged(config).then((result) => {
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
    // const handleChangeEmail = (event) => {
    //     setEmailTyped(event.target.value)
    // }
    const handleSubmitSignIn = (event) => {
        event.preventDefault();
        login(userCredentials).then((result) => setToken(result.data.access_token))
    }
    const handleSubmitSignUp = (event) => {
        event.preventDefault();
        createAccount(userCredentials).then((result) => {
            if (result.status === 201) setIsCreated(true)
        })
    }

    const [showSignup, setShowSignup] = useState(false);

	const handleSignup = () => {
		setShowSignup(!showSignup);
        setIsCreated(false)
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
            <div className="login-content">
                <form className="login-form" onSubmit={handleSubmitSignIn}>
                    <FieldInput
                    label="Username :" 
                    type="text"
                    placeholder="Enter your username"
                    handleChange={handleChangeUsername}
                    />
                    <FieldInput
                    label="Password :" 
                    type="password"
                    placeholder="Enter your password"
                    handleChange={handleChangePassword}
                    />
                    <Button variant="contained" color="primary" type="submit">
                        Sign in
                    </Button>
                        No account yet ?
                    <Button variant="contained" color="primary" onClick={handleSignup}>
                        Sign up
                    </Button>
                </form>
                </div>
                {showSignup && (
                <div className="signup-wrapper">
                    <div className="signup-content">
                        <form className="signup-form" onSubmit={handleSubmitSignUp}>
                            <IconButton aria-label="close" onClick={handleSignup}>
                                <CloseIcon />
                            </IconButton>
                            <FieldInput
                            label="Username :" 
                            type="text"
                            placeholder="Enter your username"
                            handleChange={handleChangeUsername}
                            />
                            <FieldInput
                            label="Password :" 
                            type="password"
                            placeholder="Enter your password"
                            handleChange={handleChangePassword}
                            />
                            {/* <FieldInput
                            label="Email :" 
                            type="text"
                            placeholder="Enter your email"
                            handleChange={handleChangeEmail}
                            /> */}
                            <Button variant="contained" color="primary" type="submit">
                                Create account
                            </Button>
                            {isCreated && (
                                <div>
                                    Your account has been created !
                                    <Button variant="contained" color="primary" onClick={handleSignup}>
                                        OK
                                    </Button>
                                </div>
                            )}
                        </form>
                    </div>
            </div>
            )}
            
            
        </>
    )
}

export default Login
