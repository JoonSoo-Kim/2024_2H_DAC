import React, { useEffect, useState } from 'react';
import { Typography, Card, CardContent, Grid } from '@mui/material';
import getETFDetailInfo from '../utils/getETFDetailInfo';

const ETFDetailInfo = ({ etfCode, selectedRecommendation }) => {
    const [etfData, setEtfData] = useState(null);
    const [recommendationData, setRecommendationData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getETFDetailInfo(etfCode);
                console.log(data);
                setEtfData(data);
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
                if (!selectedRecommendation) {
                    console.error('selectedRecommendation is null:', selectedRecommendation);
                    return;
                }
                const data = await getETFDetailInfo(selectedRecommendation);
                setRecommendationData(data);
            } catch (err) {
                setError(err);
            }
        };

        if (selectedRecommendation) {
            fetchRecommendationData();
        }
    }, [selectedRecommendation]);

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

    const activeRecommendationData = recommendationData;

    return (
        <Grid container spacing={2} style={{ width: '50%', margin: '0 auto' }}>
            <Grid item xs={12}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h5">{etfData.longName}</Typography>
                        <Typography variant="h6">현재 주가: {etfData.currentPrice}</Typography>
                        <Typography variant="body1">상장주식수: {etfData.sharesOutstanding}</Typography>
                        <Typography variant="body1">52주 최고: {etfData.week52High}</Typography>
                        <Typography variant="body1">52주 최저: {etfData.week52Low}</Typography>
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
            {activeRecommendationData && (
                <Grid item xs={12}>
                    <Card variant="outlined">
                        <CardContent>
                            <Typography variant="h5">{activeRecommendationData.longName}</Typography>
                            <Typography variant="h6">현재 주가: {activeRecommendationData.currentPrice}</Typography>
                            <Typography variant="body1">
                                상장주식수: {activeRecommendationData.sharesOutstanding}
                            </Typography>
                            <Typography variant="body1">52주 최고: {activeRecommendationData['52WeekHigh']}</Typography>
                            <Typography variant="body1">52주 최저: {activeRecommendationData['52weekLow']}</Typography>
                            <Typography variant="body1">기초 지수: {activeRecommendationData.benchmark}</Typography>
                            <Typography variant="body1">상장일: {activeRecommendationData.ipoDate}</Typography>
                            <Typography variant="body1">운용보수: {activeRecommendationData.expenseRatio}</Typography>
                            <Typography variant="body1">자산운용사: {activeRecommendationData.fundManager}</Typography>
                            <Typography variant="body1">NAV: {activeRecommendationData.navPrice}</Typography>
                            <Typography variant="body1">
                                1개월 수익률: {activeRecommendationData.monthChange}
                            </Typography>
                            <Typography variant="body1">
                                3개월 수익률: {activeRecommendationData.quarterChange}
                            </Typography>
                            <Typography variant="body1">6개월 수익률: {activeRecommendationData.yearChange}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            )}
        </Grid>
    );
};

export default ETFDetailInfo;
