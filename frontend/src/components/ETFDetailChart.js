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

    const processedData = data.map((item) => ({
        ...item,
        firstPrice: Math.round(item.firstPrice),
        secondPrice: Math.round(item.secondPrice),
        averagePrice: Math.round(item.averagePrice),
    }));

    // Calculate min and max values
    const allPrices = processedData.flatMap((item) => [item.firstPrice, item.secondPrice]);
    const minValue = Math.min(...allPrices);
    const maxValue = Math.max(...allPrices);

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ResponsiveContainer width="80%" height={400}>
                <LineChart data={processedData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tick={false} />
                    <YAxis domain={[minValue, maxValue]} />
                    <Tooltip />
                    <Legend content={renderLegend} />
                    <Line
                        type="monotone"
                        dataKey="firstPrice"
                        stroke="red"
                        dot={false}
                        name="기준 상품"
                        hide={!showFirst}
                    />
                    <Line
                        type="monotone"
                        dataKey="secondPrice"
                        stroke="blue"
                        dot={false}
                        name="선택 추천 상품"
                        hide={!showSecond}
                    />
                    <Line
                        type="monotone"
                        dataKey="averagePrice"
                        stroke="#9370DB"
                        dot={false}
                        name="헤지 예상값"
                        hide={!showAverage}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default ETFDetailChart;
