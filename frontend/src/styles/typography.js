import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const SystemTypography = styled(Typography)({
    fontFamily: 'Jua, sans-serif',
});

export const TitleTypography = styled(Typography)({
    fontSize: '4rem', // 제목 크기 조정
    fontWeight: 500, // 제목 굵기 조정
});

export const ExplainTypography = styled(Typography)({
    fontFamily: 'Do Hyeon, sans-serif',
    fontSize: '1.3rem', // 설명 크기 조정
    fontWeight: 400, // 설명 굵기 조정
});

export const EtfTitleTypography = styled(Typography)({
    fontFamily: 'Do Hyeon,sans-serif',
    fontSize: '2rem',
    fontWeight: 500,
});

export const EtfContentTypography = styled(Typography)({
    fontFamily: 'Do Hyeon,sans-serif',
    fontSize: '1.5rem',
    fontWeight: 200,
});
