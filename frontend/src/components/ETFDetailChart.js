// ETFDetailChart.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Button from '@mui/material/Button';

const ETFDetailChart = ({ data, showVixm, showAaxj, showAverage, setShowVixm, setShowAaxj, setShowAverage }) => {
    return (
        <div>
            <div style={{ marginBottom: '10px', display: 'flex', flexDirection: 'row' }}>
                <Button
                    variant={showVixm ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={() => setShowVixm(!showVixm)}
                >
                    {showVixm ? 'Hide VIXM' : 'Show VIXM'}
                </Button>
                <Button
                    variant={showAaxj ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={() => setShowAaxj(!showAaxj)}
                    style={{ marginLeft: '10px' }}
                >
                    {showAaxj ? 'Hide AAXJ' : 'Show AAXJ'}
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
                    {showVixm && <Line type="monotone" dataKey="vixmPrice" stroke="red" dot={false} name="VIXM" />}
                    {showAaxj && <Line type="monotone" dataKey="aaxjPrice" stroke="blue" dot={false} name="AAXJ" />}
                    {showAverage && (
                        <Line type="monotone" dataKey="averagePrice" stroke="#9370DB" dot={false} name="헷지 예상값" />
                    )}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ETFDetailChart;
