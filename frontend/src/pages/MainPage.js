import React, { useState, useEffect } from 'react';
import { getPortfolioItem } from '../utils/getPortFolioItem';
import PortfolioGraph from '../components/PortfolioGraph';
import ToETFButton from '../components/ToETFButton';
import { generateColorFromUserId } from '../utils/generateGraphColor';
import { AppBar, Toolbar } from '@mui/material';
import Logo from '../components/Logo';
import SurveyPage from './SurveyPage';
import TendencyPage from './TendencyPage';
import LogoutButton from '../components/LogoutButton';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            const fetchedProducts = await getPortfolioItem();
            setProducts(fetchedProducts);
        };
        loadProducts();
    }, []);

    const navigate = useNavigate();

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
                    style={{ width: '50%', height: '600px', alignContent: 'center' }}
                    onClick={() => navigate('/portfolio')}
                >
                    <PortfolioGraph data={data} options={options} />
                    <ToETFButton />
                </div>
                <div onClick={() => navigate('/tendency')}>
                    <TendencyPage></TendencyPage>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
