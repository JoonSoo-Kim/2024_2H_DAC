import React from 'react';
import ETFDetailTop from '../components/ETFDetailTop'; // 경로에 맞게 수정
import { AppBar, Grid, Toolbar } from '@mui/material';
import Logo from '../components/Logo';

const ETFDetailPage = () => {
    return (
        <div>
            <AppBar position="static" style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                <Toolbar>
                    <Logo />
                </Toolbar>
            </AppBar>
            <Grid>
                <ETFDetailTop />
            </Grid>
        </div>
    );
};

export default ETFDetailPage;
