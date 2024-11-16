import React, { useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ETFAddChart = ({ data, showFirst, showSecond, showAverage }) => {
    useEffect(() => {
        console.log('Chart data:', data);
        console.log('Show First:', showFirst);
        console.log('Show Second:', showSecond);
        console.log('Show Average:', showAverage);
    }, [data, showFirst, showSecond, showAverage]);

    return (
        <div>
            {data.length > 0 ? (
                <div style={{ width: '1000px', height: '500px' }}>
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" tick={false} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            {showFirst && (
                                <Line type="monotone" dataKey="firstPrice" stroke="red" dot={false} name="First" />
                            )}
                            {showSecond && (
                                <Line type="monotone" dataKey="secondPrice" stroke="blue" dot={false} name="Second" />
                            )}
                            {showAverage && (
                                <Line
                                    type="monotone"
                                    dataKey="averagePrice"
                                    stroke="#9370DB"
                                    dot={false}
                                    name="Average"
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
