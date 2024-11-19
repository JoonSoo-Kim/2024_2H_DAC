import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ETFAddChart from '../components/ETFAddChart';
import { Typography, TextField, Button, Grid, AppBar, Toolbar } from '@mui/material';
import getETFDetailInfo from '../utils/getETFDetailInfo';
import getETFPrice from '../utils/getETFPrice';
import { addPortfolio } from '../utils/addPortfolio';
import Logo from '../components/Logo';
import LogoutButton from '../components/LogoutButton';

const ETFPurchasePage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const etfCode = queryParams.get('etfCode');
    const recommendationCode = queryParams.get('recommendationCode');
    const navigate = useNavigate();

    const [firstQuantity, setFirstQuantity] = useState(1);
    const [secondQuantity, setSecondQuantity] = useState(1);
    const [firstPrice, setFirstPrice] = useState(0);
    const [secondPrice, setSecondPrice] = useState(0);
    const [firstData, setFirstData] = useState([]);
    const [secondData, setSecondData] = useState([]);
    const [averageData, setAverageData] = useState([]);
    const [showFirst, setShowFirst] = useState(true);
    const [showSecond, setShowSecond] = useState(true);
    const [showAverage, setShowAverage] = useState(true);

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const firstData = await getETFDetailInfo(etfCode);
                const secondData = await getETFDetailInfo(recommendationCode);
                console.log('First Price Data:', firstData);
                console.log('Second Price Data:', secondData);
                setFirstPrice(firstData.currentPrice);
                setSecondPrice(secondData.currentPrice);
            } catch (error) {
                console.error('Failed to fetch prices:', error);
            }
        };

        fetchPrices();
    }, [etfCode, recommendationCode]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const firstData = await getETFPrice(etfCode);
                const secondData = await getETFPrice(recommendationCode);
                console.log('First Data:', firstData);
                console.log('Second Data:', secondData);
                setFirstData(firstData);
                setSecondData(secondData);
                calculateAverage(firstData, secondData);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, [etfCode, recommendationCode]);

    const calculateAverage = (data1, data2) => {
        console.log('Calculating average with:', data1, data2);
        const combinedData = data1.map((item, index) => {
            const price2 = index < data2.length ? data2[index].price : 0;
            return {
                date: item.date,
                firstPrice: item.price * firstQuantity,
                secondPrice: price2 * secondQuantity,
                averagePrice: (item.price * firstQuantity + price2 * secondQuantity) / 2,
            };
        });
        console.log('Combined Data:', combinedData);
        setAverageData(combinedData);
    };

    useEffect(() => {
        calculateAverage(firstData, secondData);
    }, [firstQuantity, secondQuantity, firstData, secondData]);

    const totalAmount = firstPrice * firstQuantity + secondPrice * secondQuantity;

    const handlePurchase = () => {
        addPortfolio(etfCode, firstQuantity);
        addPortfolio(recommendationCode, secondQuantity);
        console.log(`Added ${firstQuantity} of ${etfCode} to portfolio`);
        console.log(`Added ${secondQuantity} of ${recommendationCode} to portfolio`);
        navigate('/portfolio');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <AppBar position="static" style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                <Toolbar>
                    <Logo />
                    <LogoutButton />
                </Toolbar>
            </AppBar>
            <ETFAddChart
                data={averageData}
                showFirst={showFirst}
                showSecond={showSecond}
                showAverage={showAverage}
                setShowFirst={setShowFirst}
                setShowSecond={setShowSecond}
                setShowAverage={setShowAverage}
            />
            <Grid container spacing={2} style={{ width: '50%', margin: '20px 0' }}>
                <Grid item xs={6}>
                    <TextField
                        label={`${etfCode} 수량`}
                        type="number"
                        value={firstQuantity}
                        onChange={(e) => setFirstQuantity(Number(e.target.value))}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label={`${recommendationCode} 수량`}
                        type="number"
                        value={secondQuantity}
                        onChange={(e) => setSecondQuantity(Number(e.target.value))}
                        fullWidth
                    />
                </Grid>
            </Grid>
            <Typography variant="h6">총 금액: {totalAmount.toLocaleString()} 원</Typography>
            <Button variant="contained" color="primary" style={{ marginTop: '20px' }} onClick={handlePurchase}>
                구매 확정
            </Button>
        </div>
    );
};

export default ETFPurchasePage;
