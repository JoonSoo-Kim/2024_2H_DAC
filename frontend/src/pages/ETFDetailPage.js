import React, { useState } from 'react';
import ETFDetailTop from '../components/ETFDetailTop'; // 경로에 맞게 수정
import { AppBar, Grid, Toolbar } from '@mui/material';
import Logo from '../components/Logo';
import ETFDetailInfo from '../components/ETFDetailInfo';
import ETFDetailRecommand from '../components/ETFDetailRecommand';

const ETFDetailPage = () => {
    const [selectedCode, setSelectedCode] = useState('006950'); // 기본 선택 값

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
            <div style={{ display: 'flex', alignItems: 'center', margin: '20px' }}>
                <ETFDetailRecommand selectedCode={selectedCode} onSelect={setSelectedCode} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <ETFDetailInfo etfCode={'069500'} />
                <ETFDetailInfo etfCode={selectedCode} />
            </div>
        </div>
    );
};

export default ETFDetailPage;
