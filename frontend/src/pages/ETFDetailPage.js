import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Grid } from '@mui/material';
import Logo from '../components/Logo';
import ETFDetailChart from '../components/ETFDetailChart';
import ETFDetailPeriodButton from '../components/ETFDetailPeriodButton';
import ETFDetailUnitButton from '../components/ETFDetailUnitButton';
import { getETFDetailCsv } from '../utils/getETFDetailCsv';

const ETFDetailPage = () => {
    const [vixmData, setVixmData] = useState([]);
    const [aaxjData, setAaxjData] = useState([]);
    const [averageData, setAverageData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const [showVixm, setShowVixm] = useState(true);
    const [showAaxj, setShowAaxj] = useState(true);
    const [showAverage, setShowAverage] = useState(true);

    const [filterDuration, setFilterDuration] = useState('3년');
    const [aggregation, setAggregation] = useState('daily');

    useEffect(() => {
        getETFDetailCsv('/VIXM.csv').then(setVixmData).catch(console.error);
        getETFDetailCsv('/AAXJ.csv').then(setAaxjData).catch(console.error);
    }, []);

    useEffect(() => {
        if (vixmData.length > 0 && aaxjData.length > 0) {
            calculateAverage(vixmData, aaxjData);
            filterData(filterDuration);
        }
    }, [vixmData, aaxjData, filterDuration]);

    const calculateAverage = (data1, data2) => {
        const combinedData = data1.map((item, index) => {
            const price2 = index < data2.length ? data2[index].price : 0;
            return {
                date: item.date,
                averagePrice: (item.price + price2) / 2,
            };
        });
        setAverageData(combinedData);
    };

    const combinedData = vixmData.map((item, index) => ({
        date: item.date,
        vixmPrice: item.price,
        aaxjPrice: aaxjData[index] ? aaxjData[index].price : 0,
        averagePrice: averageData[index] ? averageData[index].averagePrice : 0,
    }));

    const filterData = (duration) => {
        const now = new Date();
        const filtered = combinedData.filter((item) => {
            const date = new Date(item.date);
            switch (duration) {
                case '3년':
                    return date >= new Date(now.getFullYear() - 3, now.getMonth(), now.getDate());
                case '1년':
                    return date >= new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
                case '6개월':
                    return date >= new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
                case '3개월':
                    return date >= new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
                case '10년':
                    return date >= new Date(now.getFullYear() - 10, now.getMonth(), now.getDate());
                default:
                    return true;
            }
        });

        // 집계 방식에 따라 데이터 집계
        if (aggregation === 'monthly') {
            aggregateMonthly(filtered);
        } else if (aggregation === 'yearly') {
            aggregateYearly(filtered);
        } else {
            setFilteredData(filtered);
        }
    };

    const aggregateMonthly = (data) => {
        const monthlyData = data.reduce((acc, item) => {
            const date = new Date(item.date);
            const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`; // "YYYY-MM" 형식
            if (!acc[monthYear]) {
                acc[monthYear] = {
                    date: monthYear,
                    vixmPrice: 0,
                    aaxjPrice: 0,
                    averagePrice: 0,
                    count: 0,
                };
            }
            acc[monthYear].vixmPrice += item.vixmPrice;
            acc[monthYear].aaxjPrice += item.aaxjPrice;
            acc[monthYear].averagePrice += item.averagePrice;
            acc[monthYear].count += 1;
            return acc;
        }, {});

        const result = Object.values(monthlyData).map((item) => ({
            date: item.date,
            vixmPrice: item.vixmPrice / item.count,
            aaxjPrice: item.aaxjPrice / item.count,
            averagePrice: item.averagePrice / item.count,
        }));

        setFilteredData(result);
    };

    const aggregateYearly = (data) => {
        const yearlyData = data.reduce((acc, item) => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            if (!acc[year]) {
                acc[year] = {
                    date: year,
                    vixmPrice: 0,
                    aaxjPrice: 0,
                    averagePrice: 0,
                    count: 0,
                };
            }
            acc[year].vixmPrice += item.vixmPrice;
            acc[year].aaxjPrice += item.aaxjPrice;
            acc[year].averagePrice += item.averagePrice;
            acc[year].count += 1;
            return acc;
        }, {});

        const result = Object.values(yearlyData).map((item) => ({
            date: item.date,
            vixmPrice: item.vixmPrice / item.count,
            aaxjPrice: item.aaxjPrice / item.count,
            averagePrice: item.averagePrice / item.count,
        }));

        setFilteredData(result);
    };

    return (
        <div>
            <AppBar position="static" style={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
                <Toolbar>
                    <Logo />
                </Toolbar>
            </AppBar>
            <ETFDetailChart
                data={filteredData.length > 0 ? filteredData : combinedData}
                showVixm={showVixm}
                showAaxj={showAaxj}
                showAverage={showAverage}
            />
            <ETFDetailPeriodButton
                filterDuration={filterDuration}
                setFilterDuration={setFilterDuration}
                filterData={filterData}
            />
            <ETFDetailUnitButton
                aggregation={aggregation}
                setAggregation={setAggregation}
                filteredData={filteredData}
                combinedData={combinedData}
                aggregateMonthly={aggregateMonthly}
                aggregateYearly={aggregateYearly}
                setFilteredData={setFilteredData}
            />
        </div>
    );
};

export default ETFDetailPage;
