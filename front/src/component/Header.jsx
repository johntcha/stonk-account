import React, { useEffect, useState } from 'react'
import RequestService from '../request/RequestService'

const Header = () => {
    const [entry, setEntry] = useState()

    new RequestService().getName('John').then((result) => setEntry(result.data))

    return (
        <div>
             {entry} 
        </div>
    )
}

export default Header
