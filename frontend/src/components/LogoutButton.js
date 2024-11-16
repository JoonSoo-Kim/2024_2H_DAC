import React from 'react';
import { Button } from '@mui/material';
import { logoutUser } from '../utils/logoutUser';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser();
            if (window.location.pathname === '/') {
                window.location.reload(); // 현재 위치가 '/'라면 새로고침
            } else {
                navigate('/'); // 그렇지 않으면 '/'로 이동
            }
        } catch (error) {
            console.error('로그아웃 실패:', error);
        }
    };

    return (
        <Button
            variant="contained"
            style={{
                fontFamily: 'Jua, sans-serif',
                fontSize: '2rem',
                marginTop: '10px',
                width: '150px',
                height: '50px',
            }}
            onClick={handleLogout}
        >
            로그아웃
        </Button>
    );
};

export default LogoutButton;
