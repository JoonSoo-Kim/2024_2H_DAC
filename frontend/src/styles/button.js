import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const PortFolioToEtfButton = styled(Button)(({ theme }) => ({
    fontFamily: 'Jua, sans-serif',
    fontSize: '3rem',
    marginTop: '20px',
    width: '103%',
    height: '50px',
    alignContent: 'center',
    // 필요한 경우 hover 상태 추가
    '&:hover': {
        backgroundColor: theme.palette.primary.main, // hover 색상 변경
    },
}));

export const ToEtfDetailButton = styled(Button)(({ theme }) => ({
    fontFamily: 'Jua, sans-serif',
    fontSize: '2rem',
    marginTop: '10px',
    marginLeft: '20px',
    width: '200px',
    height: '70px',
    alignContent: 'flex-end',
    // 필요한 경우 hover 상태 추가
    '&:hover': {
        backgroundColor: theme.palette.primary.main, // hover 색상 변경
    },
}));
