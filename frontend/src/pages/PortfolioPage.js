import React, { useState, useEffect } from 'react';
import { getPortfolioItem } from '../utils/getPortFolioItem';
import PortfolioGraph from '../components/PortfolioGraph';
import ToETFButton from '../components/ToETFButton';
import PortfolioItems from '../components/PortfolioItems';
import { generateColorFromUserId } from '../utils/generateGraphColor';
import { AppBar, Toolbar } from '@mui/material';
import Logo from '../components/Logo';

const PortfolioPage = () => {
    const [products, setProducts] = useState([]);

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
                </Toolbar>
            </AppBar>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', height: '100vh' }}>
                <div style={{ width: '50%', height: '600px', alignContent: 'center' }}>
                    <PortfolioGraph data={data} options={options} />
                    <ToETFButton />
                </div>

                <div
                    style={{
                        display: 'flex',
                        width: '40%',
                        height: '80%',
                        border: '2px solid #ccc',
                        borderRadius: '8px',
                        padding: '10px',
                        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                        flexDirection: 'column',
                    }}
                >
                    <h2 style={{ margin: '0 0 10px 0', width: '100%' }}>금융 상품 정보</h2>
                    <PortfolioItems products={products} backgroundColors={data.datasets[0].backgroundColor} />
                </div>
            </div>
        </div>
    );
};

export default PortfolioPage;
