// ETFDetailChart.js
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ETFDetailChart = ({ data }) => {
    const [showFirst, setShowFirst] = useState(true);
    const [showSecond, setShowSecond] = useState(true);
    const [showAverage, setShowAverage] = useState(true);

    const handleLegendClick = (payload) => {
        const { value } = payload;
        if (value === 'First') {
            setShowFirst(!showFirst);
        } else if (value === 'Second') {
            setShowSecond(!showSecond);
        } else if (value === 'Average') {
            setShowAverage(!showAverage);
        }
    };

    const renderLegend = (props) => {
        const { payload } = props;
        return (
            <div style={{ textAlign: 'center' }}>
                {payload.map((entry, index) => (
                    <span
                        key={`item-${index}`}
                        onClick={() => handleLegendClick(entry)}
                        style={{
                            marginRight: 10,
                            color:
                                entry.value === 'First' && !showFirst
                                    ? 'black'
                                    : entry.value === 'Second' && !showSecond
                                    ? 'black'
                                    : entry.value === 'Average' && !showAverage
                                    ? 'black'
                                    : entry.color,
                            cursor: 'pointer',
                        }}
                    >
                        {entry.value}
                    </span>
                ))}
            </div>
        );
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ResponsiveContainer width="80%" height={400}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={false} />
                    <YAxis />
                    <Tooltip />
                    <Legend content={renderLegend} />
                    <Line
                        type="monotone"
                        dataKey="firstPrice"
                        stroke="red"
                        dot={false}
                        name="First"
                        hide={!showFirst}
                    />
                    <Line
                        type="monotone"
                        dataKey="secondPrice"
                        stroke="blue"
                        dot={false}
                        name="Second"
                        hide={!showSecond}
                    />
                    <Line
                        type="monotone"
                        dataKey="averagePrice"
                        stroke="#9370DB"
                        dot={false}
                        name="Average"
                        hide={!showAverage}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ETFDetailChart;
