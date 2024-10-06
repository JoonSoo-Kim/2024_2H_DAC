import React from 'react';
import { Grid, Paper } from '@mui/material';
import { TitleTypography, ExplainTypography } from '../styles/typography';
import mainGraph from '../assets/main_graph.png';
const Description = () => {
    return (
        <Grid item xs={6} style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper style={{ padding: '20px', height: 'auto', boxShadow: 'none', border: 'none', textAlign: 'center' }}>
                <TitleTypography>리스크 헷지는</TitleTypography>
                <img src={mainGraph} alt="비회원 그래프" style={{ width: '100%', margin: '20px 0' }} />
                <ExplainTypography>
                    1:1 상관 분석을 통해 주가가 서로 반대로 이동하는 경향성을 가진 ETF들을 발견합니다. <br />
                    사용자가 ETF를 선택했을 때 이에 맞는 반대 경향성 ETF를 추천하여 리스크를 헤지하도록 돕습니다.
                </ExplainTypography>
            </Paper>
        </Grid>
    );
};

export default Description;
