import React from 'react';
import { Typography } from '@mui/material';
import TendencyGauge from './TendencyGauge';

const TendencyGaugeSection = ({ tendency, style }) => {
    if (!tendency) {
        return null; // or a loading indicator, or a default message
    }

    return (
        <div
            className="tendency-result"
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                ...style,
            }}
        >
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <div>
                    <Typography variant="h5">당신의 성향 점수는 {tendency.score}점</Typography>
                </div>
                <div>
                    <Typography variant="h4">{tendency.tendency} 투자자</Typography>
                </div>
                <div>
                    <Typography variant="h5"></Typography>
                </div>
            </div>
            <TendencyGauge score={tendency.score} />
        </div>
    );
};

export default TendencyGaugeSection;
