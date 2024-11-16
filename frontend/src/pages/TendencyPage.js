import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Grid, Paper, CircularProgress, Button } from '@mui/material';
import { getTendency } from '../utils/getTendency';
import TendencyGauge from '../components/TendencyGauge';
import TendencyBar from '../components/TendencyBar';
import './TendencyPage.css';
import robotImage from '../assets/noun-robot.png';

const TendencyPage = () => {
    const navigate = useNavigate();
    const [tendency, setTendency] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTendency = async () => {
            try {
                const data = await getTendency();
                setTendency(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTendency();
    }, []);

    if (loading) {
        return <CircularProgress />;
    }

    if (error === 'Tendency not found') {
        return (
            <Paper style={{ padding: '20px', marginTop: '20px' }}>
                <Typography variant="h6" color="error">
                    성향 분석을 위한 설문조사를 실시해주세요
                </Typography>
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <Button variant="contained" color="primary" onClick={() => navigate('/survey')}>
                        설문조사 하러 가기
                    </Button>
                </div>
            </Paper>
        );
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    if (!tendency) {
        return (
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <Button variant="contained" color="primary" onClick={() => navigate('/survey')}>
                    설문조사 하러 가기
                </Button>
            </div>
        );
    }

    const questions = [
        '당신은 높은 수익을 위해 큰 위험을 감수할 준비가 되어 있습니까? (-100: 전혀 그렇지 않다, -50: 약간 그렇지 않다, 0: 중립적, 50: 약간 그렇다, 100: 매우 그렇다)',
        '새로운 투자 기회를 발견했을 때, 빠르게 투자 결정을 내리십니까? (-100: 전혀 그렇지 않다, -50: 약간 그렇지 않다, 0: 중립적, 50: 약간 그렇다, 100: 매우 그렇다)',
        '당신은 주식이나 ETF 같은 고위험 상품에 투자하는 것을 선호합니까? (-100: 전혀 그렇지 않다, -50: 약간 그렇지 않다, 0: 중립적, 50: 약간 그렇다, 100: 매우 그렇다)',
        '시장의 변동성에 크게 흔들리지 않고 투자를 지속할 수 있습니까? (-100: 전혀 그렇지 않다, -50: 약간 그렇지 않다, 0: 중립적, 50: 약간 그렇다, 100: 매우 그렇다)',
        '투자 활동에서 오는 스트레스나 불안 같은 감정에 영향을 받지 않으십니까? (-100: 전혀 그렇지 않다, -50: 약간 그렇지 않다, 0: 중립적, 50: 약간 그렇다, 100: 매우 그렇다)',
        '리스크가 적은 안전한 투자보다는 고위험 고수익 투자에 더 매력을 느끼십니까? (-100: 전혀 그렇지 않다, -50: 약간 그렇지 않다, 0: 중립적, 50: 약간 그렇다, 100: 매우 그렇다)',
    ];

    return (
        <div style={{ marginTop: '20px' }}>
            <Paper style={{ padding: '20px', marginTop: '20px', width: '65%', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <div
                        class="tendency-result"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                            }}
                        >
                            <div>
                                <Typography variant="h5">당신의 성향 점수는 {tendency.score}점</Typography>
                            </div>
                            <div>
                                <Typography variant="h4">{tendency.tendency} 투자자</Typography>
                            </div>
                            <div>
                                <Typography variant="h5"></Typography>
                            </div>
                        </div>
                        <TendencyGauge score={tendency.score} />
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}
                    >
                        <Paper style={{ padding: '20px', marginTop: '20px', fontSize: '14px' }}>
                            공격적 투자자는 높은 수익을 위해 큰 위험을 감수할 준비가 되어있습니다.
                            <br />
                            시장의 변동성에 잘 흔들리지 않고 빠른 투자 결정을 내릴 수 있습니다.
                            <br />
                            하지만 리스크 관리와 스트레스 내성에 주의가 필요합니다.
                            <br />
                            <br />
                            당신은 ETF 상품을 구매할 때 당신의 성향 점수에 맞는
                            <br />
                            공격적 50%(100점) 에 위치한 ETF 상품 2개를 추천받습니다.
                        </Paper>
                    </div>
                </div>
                <hr style={{ border: '1px solid grey', width: '100%', margin: '20px 0' }} />
                <div
                    class="ai-comment"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                >
                    <div class="speech-bubble">{tendency.comment}</div>
                    <img
                        src={robotImage}
                        alt="Robot"
                        style={{ width: '200px', height: '200px', alignSelf: 'flex-end', marginRight: '30px' }}
                    />
                </div>
                <hr style={{ border: '1px solid grey', width: '100%', margin: '20px 0' }} />
                <div class="tendency-question">
                    <Typography variant="h6">
                        질문 1. 당신은 높은 수익을 위해 큰 위험을 감수할 준비가 되어 있습니까?
                    </Typography>
                    <TendencyBar score={tendency.score}></TendencyBar>
                    <details style={{ marginTop: '40px', marginBottom: '20px' }}>
                        <summary style={{ color: 'grey' }}>당신의 답변 보기</summary>
                        <Typography>당신의 답변 : {tendency.answer1} 점</Typography>
                        <Paper style={{ padding: '20px', marginTop: '10px', fontSize: '14px' }}>
                            " {tendency.reason1} "
                        </Paper>
                    </details>
                    <Typography variant="h6">
                        질문 2. 새로운 투자 기회를 발견했을 때, 빠르게 투자 결정을 내리십니까?
                    </Typography>
                    <TendencyBar score={tendency.score}></TendencyBar>
                    <details style={{ marginTop: '40px' }}>
                        <summary style={{ color: 'grey' }}>당신의 답변 보기</summary>
                        <Typography>당신의 답변 : {tendency.answer2} 점</Typography>
                        <Paper style={{ padding: '20px', marginTop: '10px', fontSize: '14px' }}>
                            " {tendency.reason2} "
                        </Paper>
                    </details>
                    <Typography variant="h6">
                        질문 3. 당신은 주식이나 ETF 같은 고위험 상품에 투자하는 것을 선호합니까?
                    </Typography>
                    <TendencyBar score={tendency.score}></TendencyBar>
                    <details style={{ marginTop: '40px' }}>
                        <summary style={{ color: 'grey' }}>당신의 답변 보기</summary>
                        <Typography>당신의 답변 : {tendency.answer3} 점</Typography>
                        <Paper style={{ padding: '20px', marginTop: '10px', fontSize: '14px' }}>
                            " {tendency.reason3} "
                        </Paper>
                    </details>
                </div>
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <Button variant="contained" color="primary" onClick={() => navigate('/survey')}>
                        설문조사 다시 하기
                    </Button>
                </div>
            </Paper>
        </div>
    );
};

export default TendencyPage;
