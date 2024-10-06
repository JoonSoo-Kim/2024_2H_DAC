import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ToETFButton = ({ onClick }) => {
    const navigate = useNavigate();

    return (
        <Button
            variant="contained"
            style={{
                fontFamily: 'Jua, sans-serif',
                fontSize: '2rem',
                marginTop: '30px',
                width: '103%',
                height: '70px',
            }}
            onClick={() => navigate('/etf')}
        >
            포트폴리오에 ETF 추가하기
        </Button>
    );
};

export default ToETFButton;
