// ETFDetailUnitButton.js
import React from 'react';
import Button from '@mui/material/Button';

const ETFDetailUnitButton = ({
    aggregation,
    setAggregation,
    filteredData,
    combinedData,
    aggregateMonthly,
    aggregateYearly,
    setFilteredData,
}) => {
    return (
        <div style={{ marginBottom: '10px', display: 'flex', flexDirection: 'row' }}>
            <Button
                variant={aggregation === 'monthly' ? 'contained' : 'outlined'}
                onClick={() => {
                    setAggregation('monthly');
                    aggregateMonthly(filteredData.length > 0 ? filteredData : combinedData);
                }}
                style={{ marginLeft: '10px' }}
            >
                월별
            </Button>
            <Button
                variant={aggregation === 'yearly' ? 'contained' : 'outlined'}
                onClick={() => {
                    setAggregation('yearly');
                    aggregateYearly(filteredData.length > 0 ? filteredData : combinedData);
                }}
                style={{ marginLeft: '10px' }}
            >
                연도별
            </Button>
            <Button
                variant={aggregation === 'daily' ? 'contained' : 'outlined'}
                onClick={() => {
                    setAggregation('daily');
                    setFilteredData(combinedData); // 일별 데이터로 설정
                }}
                style={{ marginLeft: '10px' }}
            >
                일별
            </Button>
        </div>
    );
};

export default ETFDetailUnitButton;
