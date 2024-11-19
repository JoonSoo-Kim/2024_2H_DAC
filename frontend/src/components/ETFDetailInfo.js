import React, { useEffect, useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
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

    useEffect(() => {
        const fetchRecommendationData = async () => {
            try {
                const dataPromises = Object.values(recommendations).map((code) => getETFDetailInfo(code[0]));
                const dataResults = await Promise.all(dataPromises);
                const dataMap = Object.keys(recommendations).reduce((acc, key, index) => {
                    acc[key] = { ...dataResults[index], code: recommendations[key][0] };
                    return acc;
                }, {});
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

    const allData = [etfData, ...Object.values(recommendationData)];

    return (
        <TableContainer component={Paper} style={{ width: '80%', margin: '0 auto' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>이름</TableCell>
                        <TableCell>현재 주가</TableCell>
                        <TableCell>상장주식수</TableCell>
                        <TableCell>52주 최고</TableCell>
                        <TableCell>52주 최저</TableCell>
                        <TableCell>기초 지수</TableCell>
                        <TableCell>상장일</TableCell>
                        <TableCell>운용보수</TableCell>
                        <TableCell>자산운용사</TableCell>
                        <TableCell>NAV</TableCell>
                        <TableCell>1개월 수익률</TableCell>
                        <TableCell>3개월 수익률</TableCell>
                        <TableCell>6개월 수익률</TableCell>
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
                                    color:
                                        data.code === etfCode
                                            ? 'red'
                                            : data.code === selectedRecommendation
                                            ? 'blue'
                                            : 'gray',
                                }}
                            >
                                {data.currentPrice}
                            </TableCell>
                            <TableCell
                                style={{
                                    color:
                                        data.code === etfCode
                                            ? 'red'
                                            : data.code === selectedRecommendation
                                            ? 'blue'
                                            : 'gray',
                                }}
                            >
                                {data.sharesOutstanding}
                            </TableCell>
                            <TableCell
                                style={{
                                    color:
                                        data.code === etfCode
                                            ? 'red'
                                            : data.code === selectedRecommendation
                                            ? 'blue'
                                            : 'gray',
                                }}
                            >
                                {data.week52High}
                            </TableCell>
                            <TableCell
                                style={{
                                    color:
                                        data.code === etfCode
                                            ? 'red'
                                            : data.code === selectedRecommendation
                                            ? 'blue'
                                            : 'gray',
                                }}
                            >
                                {data.week52Low}
                            </TableCell>
                            <TableCell
                                style={{
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
                                    color:
                                        data.code === etfCode
                                            ? 'red'
                                            : data.code === selectedRecommendation
                                            ? 'blue'
                                            : 'gray',
                                }}
                            >
                                {data.navPrice}
                            </TableCell>
                            <TableCell
                                style={{
                                    color:
                                        data.code === etfCode
                                            ? 'red'
                                            : data.code === selectedRecommendation
                                            ? 'blue'
                                            : 'gray',
                                }}
                            >
                                {data.monthChange}
                            </TableCell>
                            <TableCell
                                style={{
                                    color:
                                        data.code === etfCode
                                            ? 'red'
                                            : data.code === selectedRecommendation
                                            ? 'blue'
                                            : 'gray',
                                }}
                            >
                                {data.quarterChange}
                            </TableCell>
                            <TableCell
                                style={{
                                    color:
                                        data.code === etfCode
                                            ? 'red'
                                            : data.code === selectedRecommendation
                                            ? 'blue'
                                            : 'gray',
                                }}
                            >
                                {data.yearChange}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ETFDetailInfo;
