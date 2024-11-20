import React from 'react';
import { createTheme, Grid, Paper, ThemeProvider, Typography } from '@mui/material';
import { TitleTypography, ExplainTypography } from '../styles/typography';
import mainGraph from '../assets/main_graph.png';
import logo from '../assets/logo.png';
const Description = () => {
    const theme = createTheme({
        typography: {
            fontFamily: " 'GmarketSansLight', sans-serif",
        },
    });

    const fontStyle = {
        fontFamily: 'GmarketSansMedium, sans-serif',
        fontWeight: 'normal',
        fontStyle: 'normal',
    };

    return (
        <ThemeProvider theme={theme}>
            <style>
                {`
@font-face {
    font-family: 'GmarketSansMedium';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
                `}
            </style>
            <Grid
                item
                xs={6}
                style={{
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    ...fontStyle,
                }}
            >
                <Paper
                    style={{ padding: '20px', height: 'auto', boxShadow: 'none', border: 'none', textAlign: 'center' }}
                >
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <img src={logo} alt="로고" style={{ width: '40%', margin: '20px 0' }}></img>
                        <div style={{ fontSize: '35px', color: '#8400ff', ...fontStyle }}>
                            {' '}
                            - 리스크 헷지 기반 ETF 추천 서비스
                        </div>
                    </div>
                    <img src={mainGraph} alt="비회원 그래프" style={{ width: '80%', margin: '20px 0' }} />
                    <ExplainTypography>
                        VIN - 리스크 헷지 기반 ETF 추천 서비스는 상관관계 분석을 통해 개인 투자자들이 시장 변동성에
                        대비해 안정적인 포트폴리오를 구성하도록 돕는 것을 목표로 합니다. 특히, 개별 주식보다 변동성이
                        낮고 다양한 섹터에 분산 투자된 ETF(Exchange-Traded Funds)를 분석 대상으로 삼아 보다 안정적인
                        헷징 효과를 제공하고자 합니다. 이를 통해 사용자는 특정 종목 선택 시 반대 경향성을 가진 ETF를
                        추천받아 리스크를 효과적으로 관리할 수 있습니다.
                    </ExplainTypography>
                </Paper>
            </Grid>
        </ThemeProvider>
    );
};

export default Description;
