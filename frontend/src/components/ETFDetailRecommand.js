import React, { useEffect } from 'react';
import { Button, ButtonGroup } from '@mui/material';

const ETFDetailRecommand = ({ recommendations, selectedRecommendation, onSelect }) => {
    const recommendationKeys = Object.keys(recommendations);

    useEffect(() => {
        if (recommendationKeys.length > 0 && !selectedRecommendation) {
            console.log('recKeys', recommendationKeys);
            const [firstKey] = recommendationKeys;
            const [firstCode] = recommendations[firstKey];
            onSelect(firstCode);
        }
    }, [recommendations, recommendationKeys, selectedRecommendation, onSelect]);

    return (
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
            {recommendationKeys.map((key) => {
                const [code] = recommendations[key];
                return (
                    <Button
                        key={code}
                        color={selectedRecommendation === code ? 'primary' : 'default'}
                        onClick={() => onSelect(code)}
                    >
                        {code}
                    </Button>
                );
            })}
        </ButtonGroup>
    );
};

export default ETFDetailRecommand;
