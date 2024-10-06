import React from 'react';
import { AppBar, Toolbar, Grid } from '@mui/material';
import Logo from '../components/Logo';
import SignUp from '../components/Signup';

const SignUpPage = () => {
    return (
        <div>
            <AppBar position="static" style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                <Toolbar>
                    <Logo />
                </Toolbar>
            </AppBar>
            <Grid container style={{ height: '100vh' }}>
                <SignUp />
            </Grid>
        </div>
    );
};

export default SignUpPage;
