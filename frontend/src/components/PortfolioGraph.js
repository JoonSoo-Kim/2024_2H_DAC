import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PortfolioGraph = ({ data, options }) => {
    const formatAmount = (amount) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const formattedData = {
        ...data,
        datasets: data.datasets.map((dataset) => ({
            ...dataset,
            data: dataset.data.map((amount) => formatAmount(amount)),
        })),
    };

    return (
        <div
            style={{
                width: '100%',
                height: '600px',
                position: 'relative',
                border: '2px solid #ccc',
                borderRadius: '8px',
                padding: '10px',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                display: 'flex', // Add flexbox
                justifyContent: 'center', // Center horizontally
                alignItems: 'center', // Center vertically
            }}
        >
            <div style={{ width: '80%', height: '80%' }}>
                <Pie data={formattedData} options={options} />
            </div>
        </div>
    );
};

export default PortfolioGraph;
