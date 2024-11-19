import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Grid, Paper, CircularProgress, Button, AppBar, Toolbar } from '@mui/material';
import { getTendency } from '../utils/getTendency';
import TendencyGauge from '../components/TendencyGauge';
import TendencyBar from '../components/TendencyBar';
import TendencyDetails from '../components/TendencyDetails';
import TendencySummary from '../components/TendencySummary';
import './TendencyPage.css';
import robotImage from '../assets/noun-robot.png';
import Logo from '../components/Logo';
import LogoutButton from '../components/LogoutButton';

const TendencyPage = () => {
    const navigate = useNavigate();
    const [tendency, setTendency] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fontStyle = {
        fontFamily: 'GmarketSansLight, sans-serif',
        fontWeight: 'normal',
    };

    useEffect(() => {
        const fetchTendency = async () => {
            try {
                const data = await getTendency();
                setTendency(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTendency();
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    if (error === 'Tendency not found') {
        return (
            <>
                <style>
                    {`
                    @font-face {
                        font-family: 'GmarketSansLight';
                        src: url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansLight.woff') format('woff');
                        font-weight: normal;
                        font-style: normal;
                    }
                    `}
                </style>
                <div style={{ marginTop: '20px', ...fontStyle }}>
                    <AppBar position="static" style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                        <Toolbar>
                            <Logo />
                            <LogoutButton />
                        </Toolbar>
                    </AppBar>
                    <Paper style={{ padding: '20px', marginTop: '20px' }}>
                        <Typography variant="h6" color="error">
                            성향 분석을 위한 설문조사를 실시해주세요
                        </Typography>
                        <div style={{ marginTop: '20px', textAlign: 'center' }}>
                            <Button variant="contained" color="primary" onClick={() => navigate('/survey')}>
                                설문조사 하러 가기
                            </Button>
                        </div>
                    </Paper>
                </div>
            </>
        );
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    if (!tendency) {
        return (
            <>
                <style>
                    {`
                    @font-face {
                        font-family: 'GmarketSansLight';
                        src: url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansLight.woff') format('woff');
                        font-weight: normal;
                        font-style: normal;
                    }
                    `}
                </style>
                <div style={{ marginTop: '20px', ...fontStyle }}>
                    <AppBar position="static" style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                        <Toolbar>
                            <Logo />
                            <LogoutButton />
                        </Toolbar>
                    </AppBar>
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <Button variant="contained" color="primary" onClick={() => navigate('/survey')}>
                            설문조사 하러 가기
                        </Button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <style>
                {`
                @font-face {
                    font-family: 'GmarketSansLight';
                    src: url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansLight.woff') format('woff');
                    font-weight: normal;
                    font-style: normal;
                }
                `}
            </style>
            <div style={{ marginTop: '20px', ...fontStyle }}>
                <AppBar position="static" style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                    <Toolbar>
                        <Logo />
                        <LogoutButton />
                    </Toolbar>
                </AppBar>
                <Paper style={{ padding: '20px', marginTop: '20px', width: '65%', margin: '0 auto' }}>
                    <TendencySummary tendency={tendency} />
                    <hr style={{ border: '1px solid grey', width: '100%', margin: '20px 0' }} />
                    <TendencyDetails tendency={tendency} />
                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <Button variant="contained" color="primary" onClick={() => navigate('/survey')}>
                            설문조사 다시 하기
                        </Button>
                    </div>
                </Paper>
            </div>
        </>
    );
};

export default TendencyPage;
