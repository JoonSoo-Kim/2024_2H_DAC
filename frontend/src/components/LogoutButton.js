import React from 'react';
import { Typography } from '@mui/material';
import { logoutUser } from '../utils/logoutUser';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser();
            if (window.location.pathname === '/') {
                window.location.reload();
            } else {
                window.location.reload();
            }
        } catch (error) {
            console.error('로그아웃 실패:', error);
        }
    };

    return (
        <Typography
            onClick={handleLogout}
            style={{
                fontFamily: 'Jua, sans-serif',
                fontSize: '1rem',
                marginTop: '10px',
                width: '60px',
                height: '40px',
                backgroundColor: 'white',
                color: 'black',
                textDecoration: 'underline',
                position: 'absolute',
                right: '20px',
                lineHeight: '50px',
                textAlign: 'center',
                cursor: 'pointer',
            }}
        >
            로그아웃
        </Typography>
    );
};

export default LogoutButton;
