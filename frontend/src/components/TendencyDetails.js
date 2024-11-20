import React from 'react';
import { Typography, Paper } from '@mui/material';
import TendencyBar from './TendencyBar';
import robotImage from '../assets/noun-robot.png';

const TendencyDetails = ({ tendency }) => {
    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}
            >
                <div
                    className="ai-comment"
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                    }}
                >
                    <div className="speech-bubble">{tendency.comment}</div>
                    <img
                        src={robotImage}
                        alt="Robot"
                        style={{ width: '200px', height: '200px', alignSelf: 'flex-end', marginRight: '30px' }}
                    />
                </div>
                <hr style={{ border: '1px solid grey', width: '100%', margin: '20px 0' }} />
                <div
                    className="tendency-question"
                    style={{
                        maxWidth: '800px',
                        width: '100%',
                    }}
                >
                    <Typography variant="h6">
                        질문 1. 당신은 높은 수익을 위해 큰 위험을 감수할 준비가 되어 있습니까?
                    </Typography>
                    <TendencyBar score={tendency.answer1}></TendencyBar>
                    <details style={{ marginTop: '40px', marginBottom: '50px' }}>
                        <summary style={{ color: 'grey' }}>당신의 답변 보기</summary>
                        <Typography>당신의 답변 : {tendency.answer1} 점</Typography>
                        <Paper style={{ padding: '20px', marginTop: '10px', fontSize: '14px' }}>
                            " {tendency.reason1} "
                        </Paper>
                    </details>
                    <Typography variant="h6">
                        질문 2. 새로운 투자 기회를 발견했을 때, 빠르게 투자 결정을 내리십니까?
                    </Typography>
                    <TendencyBar score={tendency.answer2}></TendencyBar>
                    <details style={{ marginTop: '40px', marginBottom: '50px' }}>
                        <summary style={{ color: 'grey' }}>당신의 답변 보기</summary>
                        <Typography>당신의 답변 : {tendency.answer2} 점</Typography>
                        <Paper style={{ padding: '20px', marginTop: '10px', fontSize: '14px' }}>
                            " {tendency.reason2} "
                        </Paper>
                    </details>
                    <Typography variant="h6">
                        질문 3. 당신은 주식이나 ETF 같은 고위험 상품에 투자하는 것을 선호합니까?
                    </Typography>
                    <TendencyBar score={tendency.answer3}></TendencyBar>
                    <details style={{ marginTop: '40px', marginBottom: '50px' }}>
                        <summary style={{ color: 'grey' }}>당신의 답변 보기</summary>
                        <Typography>당신의 답변 : {tendency.answer3} 점</Typography>
                        <Paper style={{ padding: '20px', marginTop: '10px', fontSize: '14px' }}>
                            " {tendency.reason3} "
                        </Paper>
                    </details>
                    <Typography variant="h6">
                        질문 4. 시장의 변동성에 크게 흔들리지 않고 투자를 지속할 수 있습니까?
                    </Typography>
                    <TendencyBar score={tendency.answer4}></TendencyBar>
                    <details style={{ marginTop: '40px', marginBottom: '50px' }}>
                        <summary style={{ color: 'grey' }}>당신의 답변 보기</summary>
                        <Typography>당신의 답변 : {tendency.answer4} 점</Typography>
                        <Paper style={{ padding: '20px', marginTop: '10px', fontSize: '14px' }}>
                            " {tendency.reason4} "
                        </Paper>
                    </details>
                    <Typography variant="h6">
                        질문 5. 투자 활동에서 오는 스트레스나 불안 같은 감정에 영향을 받지 않으십니까?
                    </Typography>
                    <TendencyBar score={tendency.answer5}></TendencyBar>
                    <details style={{ marginTop: '40px', marginBottom: '50px' }}>
                        <summary style={{ color: 'grey' }}>당신의 답변 보기</summary>
                        <Typography>당신의 답변 : {tendency.answer5} 점</Typography>
                        <Paper style={{ padding: '20px', marginTop: '10px', fontSize: '14px' }}>
                            " {tendency.reason5} "
                        </Paper>
                    </details>
                    <Typography variant="h6">
                        질문 6. 리스크가 적은 안전한 투자보다는 고위험 고수익 투자에 더 매력을 느끼십니까?
                    </Typography>
                    <TendencyBar score={tendency.answer6}></TendencyBar>
                    <details style={{ marginTop: '40px', marginBottom: '50px' }}>
                        <summary style={{ color: 'grey' }}>당신의 답변 보기</summary>
                        <Typography>당신의 답변 : {tendency.answer6} 점</Typography>
                        <Paper style={{ padding: '20px', marginTop: '10px', fontSize: '14px' }}>
                            " {tendency.reason6} "
                        </Paper>
                    </details>
                </div>
            </div>
        </div>
    );
};

export default TendencyDetails;
