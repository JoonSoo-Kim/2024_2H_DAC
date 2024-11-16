// ETFDetailChart.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Button from '@mui/material/Button';

const ETFDetailChart = ({ data, showFirst, showSecond, showAverage, setShowFirst, setShowSecond, setShowAverage }) => {
    return (
        <div>
            <div style={{ marginBottom: '10px', display: 'flex', flexDirection: 'row' }}>
                <Button
                    variant={showFirst ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={() => setShowFirst(!showFirst)}
                >
                    {showFirst ? 'Hide First' : 'Show First'}
                </Button>
                <Button
                    variant={showSecond ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={() => setShowSecond(!showSecond)}
                    style={{ marginLeft: '10px' }}
                >
                    {showSecond ? 'Hide Second' : 'Show Second'}
                </Button>
                <Button
                    variant={showAverage ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={() => setShowAverage(!showAverage)}
                    style={{ marginLeft: '10px' }}
                >
                    {showAverage ? 'Hide Average' : 'Show Average'}
                </Button>
            </div>

            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={false} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {showFirst && <Line type="monotone" dataKey="firstPrice" stroke="red" dot={false} name="First" />}
                    {showSecond && (
                        <Line type="monotone" dataKey="secondPrice" stroke="blue" dot={false} name="Second" />
                    )}
                    {showAverage && (
                        <Line type="monotone" dataKey="averagePrice" stroke="#9370DB" dot={false} name="Average" />
                    )}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ETFDetailChart;
