import React from 'react';
import { Paper } from '@mui/material';

const TendencyDescriptionSection = ({ tendency, style }) => {
    const fontStyle = {
        fontFamily: 'GmarketSansLight, sans-serif !important',
        fontWeight: 'normal !important',
    };

    const getDescription = (tendency) => {
        if (tendency.tendency === '공격적') {
            return (
                <div>
                    공격적 투자자는 높은 수익을 위해 큰 위험을 감수할 준비가 되어있습니다.
                    <br />
                    시장의 변동성에 잘 흔들리지 않고 빠른 투자 결정을 내릴 수 있습니다.
                    <br />
                    하지만 리스크 관리와 스트레스 내성에 주의가 필요합니다.
                    <br />
                    <br />
                    당신은 ETF 상품을 구매할 때 당신의 성향 점수에 맞는
                    <br />
                    상관계수 상위 {Math.round(tendency.score / 2)}%({tendency.score}점) 에 위치한 ETF 상품 2개를
                    추천받습니다.
                </div>
            );
        } else if (tendency.tendency === '보수적') {
            return (
                <div>
                    보수적 투자자는 큰 위험을 피하고 안정적인 수익을 선호합니다.
                    <br />
                    시장의 변동성에 흔들리지 않도록 노력하여, 장기적 목표를 유지하는 것이 중요합니다.
                    <br />
                    특히나 새로운 기회가 보여도 충분한 검토가 필요합니다.
                    <br />
                    <br />
                    당신은 ETF 상품을 구매할 때 당신의 성향 점수에 맞는
                    <br />
                    상관계수 하위 {Math.round((tendency.score + 200) / 2)}%({tendency.score}점) 에 위치한 ETF 상품 2개를
                    추천받습니다.
                </div>
            );
        } else if (tendency.tendency === '중립적') {
            return (
                <div>
                    중립적 투자자는 높은 수익을 추구하면서도 지나치게 큰 위험은 피하려고 합니다.
                    <br />
                    기회를 발견하면 신속하게 판단해야 하지만, 충분히 검토하고 분석을 한 뒤 결정하는 것이 중요합니다.
                    <br />
                    위험 고수익 투자도 흥미롭지만, 리스크가 적은 안전한 투자도 중요하다고 생각합니다. 두 가지 방식 모두
                    중요합니다.
                    <br />
                    <br />
                    당신은 ETF 상품을 구매할 때 당신의 성향 점수에 맞는
                    <br />
                    상관계수 중위({tendency.score}점)에 위치한 ETF 상품 2개를 추천받습니다.
                </div>
            );
        }
    };

    return (
        <>
            <style>
                {`
                @font-face {
                    font-family: 'GmarketSansLight';
                    src: url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansLight.woff2') format('woff2'),
                         url('https://cdn.jsdelivr.net/gh/webfontworld/gmarket/GmarketSansLight.woff') format('woff');
                    font-weight: normal;
                    font-style: normal;
                }
                `}
            </style>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    ...style,
                }}
            >
                <Paper style={{ padding: '20px', marginTop: '20px', fontSize: '14px', ...fontStyle }}>
                    {getDescription(tendency)}
                </Paper>
            </div>
        </>
    );
};

export default TendencyDescriptionSection;
