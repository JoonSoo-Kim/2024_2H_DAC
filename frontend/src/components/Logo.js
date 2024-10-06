import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
    const navigate = useNavigate();

    return (
        <img
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt="로고"
            style={{ height: '40px', cursor: 'pointer' }}
            onClick={() => navigate('/')}
        />
    );
};

export default Logo;
