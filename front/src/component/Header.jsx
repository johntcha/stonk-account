import React from 'react'

import './header.css'

const Header = (props) => {
    
    return (
        <div className="header">
             {props.entry} 
        </div>
    )
}

export default Header
