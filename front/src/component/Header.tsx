import React from 'react'
import  { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import './header.css'

interface HeaderProps {
    username: string
    logout: VoidFunction
    capitalizeFirstLetter: Function
}

const Header = (props: HeaderProps) => {
    // const history = useHistory();
    // const LogOut = (): void => {
    //     if (window.localStorage.getItem('token')){
    //         window.localStorage.removeItem('token')
    //         window.localStorage.removeItem('username')
    //         let path = `/login`; 
    //         history.push(path);
    //     }
    // }
    // const capitalizeFirstLetter = (string: string): string => {
    //     return string.charAt(0).toUpperCase() + string.slice(1);
    // }

    return (
        <div className="header">
            <h1>Welcome home {props.capitalizeFirstLetter(props.username)}</h1>
            <Button
                variant="contained"
                color="secondary"
                className="logout-button"
                startIcon={<ExitToAppIcon />}
                onClick={props.logout}
                aria-label="logout-button"
            >
                Log Out
            </Button>
            <Button
                variant="contained"
                color="secondary"
                className="logout-button"
                startIcon={<ExitToAppIcon />}
                onClick={props.logout}
                aria-label="logout-button-mobile"
            >
            </Button>
        </div>
    )
}

export default Header
