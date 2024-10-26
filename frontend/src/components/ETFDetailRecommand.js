import React from 'react';
import { Button, ButtonGroup } from '@mui/material';

const ETFDetailRecommand = ({ selectedCode, onSelect }) => {
    const etfCodes = ['006950', '006951', '006952', '006953', '006954'];

    return (
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
            {etfCodes.map((code) => (
                <Button key={code} color={selectedCode === code ? 'primary' : 'default'} onClick={() => onSelect(code)}>
                    {code}
                </Button>
            ))}
        </ButtonGroup>
    );
};

export default ETFDetailRecommand;
