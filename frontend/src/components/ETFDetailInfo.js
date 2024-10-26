import React, { useEffect, useState } from 'react';
import { Typography, Card, CardContent, Grid } from '@mui/material';
import getETFDetailInfo from '../utils/getETFDetailInfo';

const ETFDetailInfo = ({ etfCode }) => {
    const [etfData, setEtfData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getETFDetailInfo(etfCode);
                setEtfData(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [etfCode]);

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

    return (
        <Grid container spacing={2} style={{ width: '50%', margin: '0 auto' }}>
            <Grid item xs={12}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h5">{etfData.longName}</Typography>
                        <Typography variant="h6">현재 주가: {etfData.currentPrice}</Typography>
                        <Typography variant="body1">상장주식수: {etfData.sharesOutstanding}</Typography>
                        <Typography variant="body1">52주 최고: {etfData['52WeekHigh']}</Typography>
                        <Typography variant="body1">52주 최저: {etfData['52weekLow']}</Typography>
                        <Typography variant="body1">기초 지수: {etfData.benchmark}</Typography>
                        <Typography variant="body1">상장일: {etfData.ipoDate}</Typography>
                        <Typography variant="body1">운용보수: {etfData.expenseRatio}</Typography>
                        <Typography variant="body1">자산운용사: {etfData.fundManager}</Typography>
                        <Typography variant="body1">NAV: {etfData.navPrice}</Typography>
                        <Typography variant="body1">1개월 수익률: {etfData.monthChange}</Typography>
                        <Typography variant="body1">3개월 수익률: {etfData.quarterChange}</Typography>
                        <Typography variant="body1">6개월 수익률: {etfData.yearChange}</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default ETFDetailInfo;
