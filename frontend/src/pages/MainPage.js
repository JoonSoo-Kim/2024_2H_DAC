import React, { useState, useEffect } from 'react';
import { getPortfolioItem } from '../utils/getPortFolioItem';
import PortfolioGraph from '../components/PortfolioGraph';
import ToETFButton from '../components/ToETFButton';
import { generateColorFromUserId } from '../utils/generateGraphColor';
import { AppBar, Paper, Toolbar } from '@mui/material';
import Logo from '../components/Logo';
import LogoutButton from '../components/LogoutButton';
import { useNavigate } from 'react-router-dom';
import TendencySummary from '../components/TendencySummary';
import { getTendency } from '../utils/getTendency';
import TendencyGaugeSection from '../components/TendencyGaugeSection';
import TendencyDescriptionSection from '../components/TendencyDescriptionSection';

const MainPage = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [tendency, setTendency] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    useEffect(() => {
        const loadProducts = async () => {
            const fetchedProducts = await getPortfolioItem();
            setProducts(fetchedProducts);
        };
        loadProducts();
    }, []);

    const basicBackgroundColors = ['#E69F00', '#56B4E9', '#009E73', '#F0E442', '#0072B2', '#D55E00', '#CC79A7'];

    const data = {
        labels: products.map((product) => product.name),
        datasets: [
            {
                data: products.map((product) => product.percentage),
                backgroundColor: products.map((_, index) => {
                    if (index < 7) {
                        return basicBackgroundColors[index]; // 기존 색상 사용
                    } else {
                        return generateColorFromUserId(index); // 사용자 ID 기반 색상 생성
                    }
                }),
            },
        ],
    };

    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const index = tooltipItem.dataIndex;
                        return ` ${products[index].percentage}%, ${products[index].amount}원`;
                    },
                },
            },
            legend: {
                display: false, // 범례 비활성화
            },
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div>
            <AppBar position="static" style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                <Toolbar>
                    <Logo />
                    <LogoutButton />
                </Toolbar>
            </AppBar>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', height: '100vh' }}>
                <div
                    style={{
                        width: '45%',
                        height: '600px',
                        alignContent: 'center',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        ':hover': { transform: 'scale(1.05)' },
                        textAlign: 'center',
                    }}
                    onClick={() => navigate('/portfolio')}
                >
                    <PortfolioGraph data={data} options={options} />
                </div>
                <Paper
                    style={{
                        width: '45%',
                        height: '600px',
                        position: 'relative',
                        border: '2px solid #ccc',
                        borderRadius: '8px',
                        padding: '10px',
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        ':hover': { transform: 'scale(1.05)' },
                        textAlign: 'center',
                    }}
                    onClick={() => navigate('/tendency')}
                >
                    {tendency && (
                        <>
                            <TendencyGaugeSection tendency={tendency} style={{ marginTop: '60px' }} />
                            <TendencyDescriptionSection
                                tendency={tendency}
                                style={{ transform: 'scale(1.2)', marginTop: '-60px' }}
                            />
                        </>
                    )}
                </Paper>
            </div>
        </div>
    );
};

export default MainPage;
