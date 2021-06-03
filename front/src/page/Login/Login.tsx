import React, { useEffect, useState } from 'react'
import { login, displayUserLogged, createAccount } from '../../request/RequestService'
import  { Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import FieldInput from '../../component/FieldInput/FieldInput'
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import './login.css'

const Login = () => {
    const [token, setToken] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [usernameTyped, setUsernameTyped] = useState<string>("")
    const [passwordTyped, setPasswordTyped] = useState<string>("")
    // const [emailTyped, setEmailTyped] = useState()
    const [isCreated, setIsCreated] = useState<boolean>(false)
    const dateNow: Date = new Date()
    
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const userCredentials = {
        username: usernameTyped,
        password: passwordTyped,
        // email: emailTyped
    }
    
    
    const getUsername = ((): void => {
        if (token)
         displayUserLogged(config).then((result) => {
             setUsername(result.data.username)
            })
    })

    useEffect(() => {
        getUsername()
        localStorageHandler()
    },[token, username])


    const handleChangeUsername = (event): void => {
        setUsernameTyped(event.target.value);
    }
    const handleChangePassword = (event): void => {
        setPasswordTyped(event.target.value)
    }
    // const handleChangeEmail = (event): void => {
    //     setEmailTyped(event.target.value)
    // }
    const handleSubmitSignIn = (event): void => {
        event.preventDefault();
        login(userCredentials).then((result) => setToken(result.data.access_token))
    }
    const handleSubmitSignUp = (event): void => {
        event.preventDefault();
        try{
            createAccount(userCredentials)
            setIsCreated(true)
        }
        catch(e){
            console.log(e)
        }
        
    }

    const [showSignup, setShowSignup] = useState<boolean>(false);

	const handleSignup = (): void => {
		setShowSignup(!showSignup);
        setIsCreated(false)
	}

    const localStorageHandler = (): void => {
        if (token){
            window.localStorage.setItem('token', token)
            window.localStorage.setItem('username', username)
        }
    }
    
    if(window.localStorage.getItem('token')) return <Redirect to='/'  />
    return (
        <>
            <div className="login-content">
                <form className="login-form" onSubmit={handleSubmitSignIn} aria-label="login-form">
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
                    <Button variant="contained" color="primary" onClick={handleSignup} aria-label="open-signup">
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
