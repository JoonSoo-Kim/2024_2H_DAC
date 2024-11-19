import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ETFDetailTop from '../components/ETFDetailTop';
import { AppBar, Grid, Toolbar, Button } from '@mui/material';
import Logo from '../components/Logo';
import ETFDetailInfo from '../components/ETFDetailInfo';
import getRecommend from '../utils/getRecommend';
import LogoutButton from '../components/LogoutButton';

const ETFDetailPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const etfCode = queryParams.get('etfCode');
    const [selectedCode, setSelectedCode] = useState(etfCode);
    const [recommendations, setRecommendations] = useState({});
    const [selectedRecommendation, setSelectedRecommendation] = useState(null);
    const navigate = useNavigate();

    const handlePurchaseClick = () => {
        navigate(`/etf/purchase?etfCode=${selectedCode}&recommendationCode=${selectedRecommendation}`);
    };

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await getRecommend(etfCode);
                setRecommendations(response);
                console.log(recommendations);
            } catch (error) {
                console.error('Failed to fetch recommendations:', error);
            }
        };

        fetchRecommendations();
    }, [etfCode]);

    return (
        <div>
            <AppBar position="static" style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                <Toolbar>
                    <Logo />
                    <LogoutButton />
                </Toolbar>
            </AppBar>
            <Grid>
                <ETFDetailTop etfCode={selectedCode} selectedRecommendation={selectedRecommendation} />
            </Grid>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <ETFDetailInfo
                    etfCode={selectedCode}
                    recommendations={recommendations}
                    selectedRecommendation={selectedRecommendation}
                    setSelectedRecommendation={setSelectedRecommendation}
                />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px' }}>
                <Button variant="contained" color="primary" onClick={handlePurchaseClick}>
                    구매 페이지로 이동
                </Button>
            </div>
        </div>
    );
};

export default ETFDetailPage;
