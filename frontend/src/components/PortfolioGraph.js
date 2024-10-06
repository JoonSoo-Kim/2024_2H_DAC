import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PortfolioGraph = ({ data, options }) => {
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
            }}
        >
            <h2 style={{ margin: '0 0 10px 0' }}>나의 포트폴리오</h2>
            <div style={{ height: '80%', position: 'relative' }}>
                <Pie data={data} options={options} />
            </div>
        </div>
    );
};

export default PortfolioGraph;
