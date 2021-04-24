import React from 'react'

import './header.css'

const Header = (props) => {
    
    return (
        <div className="header">
            Welcome home {props.username} !
            <button onClick={props.LogOut}>
                Log Out
            </button>
        </div>
    )
}

export default Header
