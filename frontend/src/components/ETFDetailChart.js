// ETFDetailChart.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ETFDetailChart = ({ data, showVixm, showAaxj, showAverage }) => {
    return (
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
    );
};

export default ETFDetailChart;
