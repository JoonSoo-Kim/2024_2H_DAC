// ETFDetailPeriodButton.js
import React from 'react';
import Button from '@mui/material/Button';

const ETFDetailPeriodButton = ({ filterDuration, setFilterDuration, filterData }) => {
    return (
        <div
            style={{
                marginBottom: '10px',
                display: 'flex',
                flexDirection: 'row',
                marginTop: '-40px',
                justifyContent: 'flex-start',
                marginLeft: '10%', // Adjust this value to move the buttons slightly to the right
            }}
        >
            <Button
                variant={filterDuration === '10년' ? 'contained' : 'outlined'}
                onClick={() => {
                    filterData('10년');
                    setFilterDuration('10년');
                }}
                style={{ marginLeft: '10px' }}
            >
                최근 10년
            </Button>
            <Button
                variant={filterDuration === '3년' ? 'contained' : 'outlined'}
                onClick={() => {
                    filterData('3년');
                    setFilterDuration('3년');
                }}
                style={{ marginLeft: '10px' }}
            >
                최근 3년
            </Button>
            <Button
                variant={filterDuration === '1년' ? 'contained' : 'outlined'}
                onClick={() => {
                    filterData('1년');
                    setFilterDuration('1년');
                }}
                style={{ marginLeft: '10px' }}
            >
                최근 1년
            </Button>
            <Button
                variant={filterDuration === '6개월' ? 'contained' : 'outlined'}
                onClick={() => {
                    filterData('6개월');
                    setFilterDuration('6개월');
                }}
                style={{ marginLeft: '10px' }}
            >
                최근 6개월
            </Button>
            <Button
                variant={filterDuration === '3개월' ? 'contained' : 'outlined'}
                onClick={() => {
                    filterData('3개월');
                    setFilterDuration('3개월');
                }}
                style={{ marginLeft: '10px' }}
            >
                최근 3개월
            </Button>
        </div>
    );
};

export default ETFDetailPeriodButton;
