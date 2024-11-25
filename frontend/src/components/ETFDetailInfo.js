import React, { useEffect, useState } from 'react';
import {
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    ThemeProvider,
    createTheme,
} from '@mui/material';
import getETFDetailInfo from '../utils/getETFDetailInfo';

const ETFDetailInfo = ({ etfCode, recommendations, selectedRecommendation, setSelectedRecommendation }) => {
    const [etfData, setEtfData] = useState(null);
    const [recommendationData, setRecommendationData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getETFDetailInfo(etfCode);
                setEtfData({ ...data, code: etfCode });
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [etfCode]);

    const formatAmount = (amount) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    useEffect(() => {
        const fetchRecommendationData = async () => {
            try {
                const dataPromises = Object.values(recommendations).map((code) => getETFDetailInfo(code[0]));
                const dataResults = await Promise.all(dataPromises);
                const dataMap = Object.keys(recommendations).reduce((acc, key, index) => {
                    acc[key] = { ...dataResults[index], code: recommendations[key][0] };
                    return acc;
                }, {});
                console.log(dataMap);
                setRecommendationData(dataMap);
            } catch (err) {
                setError(err);
            }
        };

        fetchRecommendationData();
    }, [recommendations]);

    if (loading) {
        return <Typography variant="h6">Loading...</Typography>;
    }

    if (error) {
        return (
            <Typography variant="h6" color="error">
                Error: {error.message}
            </Typography>
        );
    }

    const fontStyle = {
        fontFamily: 'GmarketSansLight, sans-serif',
        fontWeight: 'normal', // Set font weight to normal for GmarketSansLight
    };

    const theme = createTheme({
        typography: {
            fontFamily: " 'GmarketSansLight', sans-serif",
        },
    });

    const allData = [etfData, ...Object.values(recommendationData)];

    return (
        <>
            <style>
                {`
@font-face {
    font-family: 'GmarketSansMedium';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
        `}
            </style>
            <ThemeProvider theme={theme}>
                <TableContainer
                    component={Paper}
                    style={{ width: '90%', margin: '0 auto', textAlign: 'center', ...fontStyle }}
                >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontSize: '0.8rem' }}>분류</TableCell>
                                <TableCell style={{ fontSize: '0.8rem' }}>이름</TableCell>
                                <TableCell style={{ fontSize: '0.8rem' }}>현재 주가</TableCell>
                                <TableCell style={{ fontSize: '0.8rem' }}>상장주식수</TableCell>
                                <TableCell style={{ fontSize: '0.8rem' }}>52주 최고</TableCell>
                                <TableCell style={{ fontSize: '0.8rem' }}>52주 최저</TableCell>
                                <TableCell style={{ fontSize: '0.8rem' }}>기초 지수</TableCell>
                                <TableCell style={{ fontSize: '0.8rem' }}>상장일</TableCell>
                                <TableCell style={{ fontSize: '0.8rem' }}>운용보수</TableCell>
                                <TableCell style={{ fontSize: '0.8rem' }}>자산운용사</TableCell>
                                <TableCell style={{ fontSize: '0.8rem' }}>NAV</TableCell>
                                <TableCell style={{ fontSize: '0.8rem' }}>1개월 수익률</TableCell>
                                <TableCell style={{ fontSize: '0.8rem' }}>3개월 수익률</TableCell>
                                <TableCell style={{ fontSize: '0.8rem' }}>6개월 수익률</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allData.map((data, index) => (
                                <TableRow
                                    key={index}
                                    onClick={() => setSelectedRecommendation(data.code)}
                                    style={{
                                        cursor: 'pointer',
                                    }}
                                >
                                    <TableCell
                                        style={{
                                            fontSize: '0.8rem',
                                            color:
                                                data.code === etfCode
                                                    ? 'red'
                                                    : data.code === selectedRecommendation
                                                    ? 'blue'
                                                    : 'gray',
                                        }}
                                    >
                                        {index === 0
                                            ? '기준 상품'
                                            : index === 1
                                            ? '보수적'
                                            : index === 2
                                            ? '중립적'
                                            : index === 3
                                            ? '공격적'
                                            : index === 4
                                            ? '성향 추천'
                                            : '성향 추천'}
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            fontSize: '0.8rem',
                                            color:
                                                data.code === etfCode
                                                    ? 'red'
                                                    : data.code === selectedRecommendation
                                                    ? 'blue'
                                                    : 'gray',
                                        }}
                                    >
                                        {data.longName}
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            fontSize: '0.8rem',
                                            color:
                                                data.code === etfCode
                                                    ? 'red'
                                                    : data.code === selectedRecommendation
                                                    ? 'blue'
                                                    : 'gray',
                                        }}
                                    >
                                        {formatAmount(Math.round(data.currentPrice))}
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            fontSize: '0.8rem',
                                            color:
                                                data.code === etfCode
                                                    ? 'red'
                                                    : data.code === selectedRecommendation
                                                    ? 'blue'
                                                    : 'gray',
                                        }}
                                    >
                                        {formatAmount(data.sharesOutstanding)}
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            fontSize: '0.8rem',
                                            color:
                                                data.code === etfCode
                                                    ? 'red'
                                                    : data.code === selectedRecommendation
                                                    ? 'blue'
                                                    : 'gray',
                                        }}
                                    >
                                        {formatAmount(Math.round(data.week52High))}
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            fontSize: '0.8rem',
                                            color:
                                                data.code === etfCode
                                                    ? 'red'
                                                    : data.code === selectedRecommendation
                                                    ? 'blue'
                                                    : 'gray',
                                        }}
                                    >
                                        {formatAmount(Math.round(data.week52Low))}
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            fontSize: '0.8rem',
                                            color:
                                                data.code === etfCode
                                                    ? 'red'
                                                    : data.code === selectedRecommendation
                                                    ? 'blue'
                                                    : 'gray',
                                        }}
                                    >
                                        {data.benchmark}
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            fontSize: '0.8rem',
                                            color:
                                                data.code === etfCode
                                                    ? 'red'
                                                    : data.code === selectedRecommendation
                                                    ? 'blue'
                                                    : 'gray',
                                        }}
                                    >
                                        {data.ipoDate}
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            fontSize: '0.8rem',
                                            color:
                                                data.code === etfCode
                                                    ? 'red'
                                                    : data.code === selectedRecommendation
                                                    ? 'blue'
                                                    : 'gray',
                                        }}
                                    >
                                        {data.expenseRatio}
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            fontSize: '0.8rem',
                                            color:
                                                data.code === etfCode
                                                    ? 'red'
                                                    : data.code === selectedRecommendation
                                                    ? 'blue'
                                                    : 'gray',
                                        }}
                                    >
                                        {data.fundManager}
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            fontSize: '0.8rem',
                                            color:
                                                data.code === etfCode
                                                    ? 'red'
                                                    : data.code === selectedRecommendation
                                                    ? 'blue'
                                                    : 'gray',
                                        }}
                                    >
                                        {formatAmount(data.navPrice)}
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            fontSize: '0.8rem',
                                            color:
                                                data.code === etfCode
                                                    ? 'red'
                                                    : data.code === selectedRecommendation
                                                    ? 'blue'
                                                    : 'gray',
                                        }}
                                    >
                                        {data.monthChange.toFixed(2)}
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            fontSize: '0.8rem',
                                            color:
                                                data.code === etfCode
                                                    ? 'red'
                                                    : data.code === selectedRecommendation
                                                    ? 'blue'
                                                    : 'gray',
                                        }}
                                    >
                                        {data.quarterChange.toFixed(2)}
                                    </TableCell>
                                    <TableCell
                                        style={{
                                            fontSize: '0.8rem',
                                            color:
                                                data.code === etfCode
                                                    ? 'red'
                                                    : data.code === selectedRecommendation
                                                    ? 'blue'
                                                    : 'gray',
                                        }}
                                    >
                                        {data.yearChange.toFixed(2)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </ThemeProvider>
        </>
    );
};

export default ETFDetailInfo;
