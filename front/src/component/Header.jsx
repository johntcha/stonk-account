import React from 'react'
import  { useHistory } from 'react-router-dom'
import './header.css'

const Header = (props) => {
    const history = useHistory();
    const LogOut = () => {
        if (window.localStorage.getItem('token')){
            window.localStorage.removeItem('token')
            window.localStorage.removeItem('username')
            let path = `/login`; 
            history.push(path);
        }
    }

    return (
        <div className="header">
            Welcome home {props.username} !
            <button onClick={LogOut}>
                Log Out
            </button>
        </div>
    )
}

export default Header
