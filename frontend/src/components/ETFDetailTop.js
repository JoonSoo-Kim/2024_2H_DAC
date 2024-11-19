import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import ETFDetailChart from './ETFDetailChart';
import ETFDetailPeriodButton from './ETFDetailPeriodButton';
import ETFDetailUnitButton from './ETFDetailUnitButton';
import getETFPrice from '../utils/getETFPrice';

const ETFDetailTop = ({ etfCode, selectedRecommendation }) => {
    const [firstData, setFirstData] = useState([]);
    const [secondData, setSecondData] = useState([]);
    const [averageData, setAverageData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    const [showFirst, setShowFirst] = useState(true);
    const [showSecond, setShowSecond] = useState(true);
    const [showAverage, setShowAverage] = useState(true);

    const [filterDuration, setFilterDuration] = useState('3년');
    const [aggregation, setAggregation] = useState('daily');

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

        if (aggregation === 'monthly') {
            aggregateMonthly(filtered);
        } else if (aggregation === 'yearly') {
            aggregateYearly(filtered);
        } else {
            setFilteredData(filtered);
        }
    };

    useEffect(() => {
        const fetchFirstData = async () => {
            try {
                const data = await getETFPrice(etfCode);
                setFirstData(data);
            } catch (error) {
                console.error('Failed to fetch first data:', error);
            }
        };

        fetchFirstData();
    }, [etfCode]);

    useEffect(() => {
        const fetchSecondData = async () => {
            if (selectedRecommendation) {
                try {
                    const data = await getETFPrice(selectedRecommendation);
                    setSecondData(data);
                } catch (error) {
                    console.error('Failed to fetch second data:', error);
                }
            }
        };

        fetchSecondData();
    }, [selectedRecommendation]);

    useEffect(() => {
        if (firstData.length > 0 && secondData.length > 0) {
            calculateAverage(firstData, secondData);
        }
    }, [firstData, secondData]);

    useEffect(() => {
        if (averageData.length > 0) {
            filterData(filterDuration);
        }
    }, [averageData, filterDuration]);

    const calculateAverage = (data1, data2) => {
        const combinedData = data1.map((item, index) => {
            const price2 = index < data2.length ? data2[index].price : 0;
            return {
                date: item.date,
                averagePrice: (Number(item.price) + Number(price2)) / 2,
            };
        });
        setAverageData(combinedData);
    };

    const combinedData = firstData.map((item, index) => ({
        date: item.date,
        firstPrice: item.price,
        secondPrice: secondData[index] ? secondData[index].price : 0,
        averagePrice: averageData[index] ? averageData[index].averagePrice : 0,
    }));

    const aggregateMonthly = (data) => {
        const monthlyData = data.reduce((acc, item) => {
            const date = new Date(item.date);
            const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
            if (!acc[monthYear]) {
                acc[monthYear] = {
                    date: monthYear,
                    firstPrice: 0,
                    secondPrice: 0,
                    averagePrice: 0,
                    count: 0,
                };
            }
            acc[monthYear].firstPrice += item.firstPrice;
            acc[monthYear].secondPrice += item.secondPrice;
            acc[monthYear].averagePrice += item.averagePrice;
            acc[monthYear].count += 1;
            return acc;
        }, {});

        const result = Object.values(monthlyData).map((item) => ({
            date: item.date,
            firstPrice: item.firstPrice / item.count,
            secondPrice: item.secondPrice / item.count,
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
                    firstPrice: 0,
                    secondPrice: 0,
                    averagePrice: 0,
                    count: 0,
                };
            }
            acc[year].firstPrice += item.firstPrice;
            acc[year].secondPrice += item.secondPrice;
            acc[year].averagePrice += item.averagePrice;
            acc[year].count += 1;
            return acc;
        }, {});

        const result = Object.values(yearlyData).map((item) => ({
            date: item.date,
            firstPrice: item.firstPrice / item.count,
            secondPrice: item.secondPrice / item.count,
            averagePrice: item.averagePrice / item.count,
        }));

        setFilteredData(result);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <ETFDetailChart
                data={filteredData.length > 0 ? filteredData : combinedData}
                showFirst={showFirst}
                showSecond={showSecond}
                showAverage={showAverage}
                setShowFirst={setShowFirst}
                setShowSecond={setShowSecond}
                setShowAverage={setShowAverage}
            />
            <div>
                <ETFDetailPeriodButton
                    filterDuration={filterDuration}
                    setFilterDuration={setFilterDuration}
                    filterData={filterData}
                />
                {/* <ETFDetailUnitButton
                    aggregation={aggregation}
                    setAggregation={setAggregation}
                    filteredData={filteredData}
                    combinedData={combinedData}
                    aggregateMonthly={aggregateMonthly}
                    aggregateYearly={aggregateYearly}
                    setFilteredData={setFilteredData}
                /> */}
            </div>
        </div>
    );
};

export default ETFDetailTop;
