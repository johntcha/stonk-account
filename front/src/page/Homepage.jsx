import React from 'react'
import  { Redirect } from 'react-router-dom'
import Header from '../component/Header'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './homepage.css'

const Homepage = () => {
    const username = window.localStorage.getItem('username')
    if (!window.localStorage.getItem('token')) return <Redirect to='/login'  />
    return (
        <>
        {window.localStorage.getItem('token') && (
            <>
                <Header 
                username={username}
                />
                <div className="card-wrapper">
                <Card className="card piechart">
                    <CardContent>
                        <Typography>
                            salut
                        </Typography>
                    </CardContent>
                </Card>
                <Card className="card input-data">
                    <CardContent>
                        <Typography>
                            salut
                        </Typography>
                    </CardContent>
                </Card>
                <Card className="card whatever">
                    <CardContent>
                        <Typography>
                            salut
                        </Typography>
                    </CardContent>
                </Card>
                </div>
            </>
        )}
        </>
    )
}

export default Homepage
