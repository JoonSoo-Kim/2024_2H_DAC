import React, { useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ETFAddChart = ({ data, showFirst, showSecond, showAverage }) => {
    useEffect(() => {
        console.log('Chart data:', data);
        console.log('Show First:', showFirst);
        console.log('Show Second:', showSecond);
        console.log('Show Average:', showAverage);
    }, [data, showFirst, showSecond, showAverage]);

    const processData = (inputData) => {
        const now = new Date();
        const threeYearsAgo = new Date(now.getFullYear() - 3, now.getMonth(), now.getDate());

        return inputData
            .filter((item) => {
                const date = new Date(item.date);
                return date >= threeYearsAgo;
            })
            .map((item) => ({
                ...item,
                firstPrice: Math.round(item.firstPrice),
                secondPrice: Math.round(item.secondPrice),
                averagePrice: Math.round(item.averagePrice),
            }));
    };

    const processedData = processData(data);

    // Calculate min and max values
    const allPrices = processedData.flatMap((item) => [item.firstPrice, item.secondPrice]);
    const minValue = Math.min(...allPrices);
    const maxValue = Math.max(...allPrices);

    return (
        <div>
            {processedData.length > 0 ? (
                <div style={{ width: '1000px', height: '500px' }}>
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={processedData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tick={false} />
                            <YAxis domain={[minValue, maxValue]} />
                            <Tooltip />
                            <Legend />
                            {showFirst && (
                                <Line type="monotone" dataKey="firstPrice" stroke="red" dot={false} name="기준 상품" />
                            )}
                            {showSecond && (
                                <Line
                                    type="monotone"
                                    dataKey="secondPrice"
                                    stroke="blue"
                                    dot={false}
                                    name="추천 선택 상품"
                                />
                            )}
                            {showAverage && (
                                <Line
                                    type="monotone"
                                    dataKey="averagePrice"
                                    stroke="#9370DB"
                                    dot={false}
                                    name="헤지 예상값"
                                />
                            )}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <p>Loading chart data...</p>
            )}
        </div>
    );
};

export default ETFAddChart;
