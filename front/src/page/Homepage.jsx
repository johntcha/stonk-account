import React from 'react'
import  { Redirect } from 'react-router-dom'
import Header from '../component/Header'

const Homepage = () => {
    const username = window.localStorage.getItem('username')
    if (!window.localStorage.getItem('token')) return <Redirect to='/login'  />
    return (
        <>
        {window.localStorage.getItem('token') && (
            <Header 
            username={username}
            />
        )}
        </>
    )
}

export default Homepage
