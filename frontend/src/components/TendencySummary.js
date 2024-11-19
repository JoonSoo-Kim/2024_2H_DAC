import React from 'react';
import { Typography, Paper } from '@mui/material';
import TendencyGaugeSection from './TendencyGaugeSection';
import TendencyDescriptionSection from './TendencyDescriptionSection';

const TendencySummary = ({ tendency }) => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                gap: '50px',
            }}
        >
            <TendencyGaugeSection tendency={tendency} />
            <TendencyDescriptionSection tendency={tendency} />
        </div>
    );
};

export default TendencySummary;
