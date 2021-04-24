import React, { useEffect, useState } from 'react'
import RequestService from '../request/RequestService'
import './header.css'

const Header = () => {
    const [entry, setEntry] = useState()

    RequestService.getName('John').then((result) => setEntry(result.data)).catch((err)=>console.log(err))

    return (
        <div className="header">
             {entry} 
        </div>
    )
}

export default Header
