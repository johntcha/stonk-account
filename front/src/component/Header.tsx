import React from 'react'
import  { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import './header.css'

interface HeaderProps {
    username: string
}

const Header = (props: HeaderProps) => {
    const history = useHistory();
    const LogOut = (): void => {
        if (window.localStorage.getItem('token')){
            window.localStorage.removeItem('token')
            window.localStorage.removeItem('username')
            let path = `/login`; 
            history.push(path);
        }
    }
    const capitalizeFirstLetter = (string: string): string => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className="header">
            Welcome home {capitalizeFirstLetter(props.username)}
            <Button
                variant="contained"
                color="secondary"
                className="logout-button"
                startIcon={<ExitToAppIcon />}
                onClick={LogOut}
            >
                Log Out
            </Button>
            <Button
                variant="contained"
                color="secondary"
                className="logout-button-mobile"
                startIcon={<ExitToAppIcon />}
                onClick={LogOut}
            >
            </Button>
        </div>
    )
}

export default Header
