import React, { useState, useEffect } from 'react';
import {
    Typography,
    TextField,
    Button,
    Grid,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@mui/material';
import { createTendency } from '../utils/createTendency';
import { getTendency } from '../utils/getTendency';

const SurveyPage = () => {
    const [responses, setResponses] = useState({
        riskTaking: '',
        riskTakingReason: '',
        quickDecision: '',
        quickDecisionReason: '',
        highRiskPreference: '',
        highRiskPreferenceReason: '',
        marketVolatility: '',
        marketVolatilityReason: '',
        stressImpact: '',
        stressImpactReason: '',
        highRiskAttraction: '',
        highRiskAttractionReason: '',
    });

    useEffect(() => {
        const fetchTendency = async () => {
            const data = await getTendency();
            if (data) {
                setResponses({
                    riskTaking: data.answer1.toString(),
                    riskTakingReason: data.reason1,
                    quickDecision: data.answer2.toString(),
                    quickDecisionReason: data.reason2,
                    highRiskPreference: data.answer3.toString(),
                    highRiskPreferenceReason: data.reason3,
                    marketVolatility: data.answer4.toString(),
                    marketVolatilityReason: data.reason4,
                    stressImpact: data.answer5.toString(),
                    stressImpactReason: data.reason5,
                    highRiskAttraction: data.answer6.toString(),
                    highRiskAttractionReason: data.reason6,
                });
            }
        };

        fetchTendency();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setResponses((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 유효성 검사
        const isValid = Object.values(responses).every((response) => response !== '');
        if (!isValid) {
            alert('모든 질문에 답변해 주세요.');
            return; // 서버 요청을 하지 않고 반환
        }

        const answers = [
            responses.riskTaking,
            responses.quickDecision,
            responses.highRiskPreference,
            responses.marketVolatility,
            responses.stressImpact,
            responses.highRiskAttraction,
        ];

        const reasons = [
            responses.riskTakingReason,
            responses.quickDecisionReason,
            responses.highRiskPreferenceReason,
            responses.marketVolatilityReason,
            responses.stressImpactReason,
            responses.highRiskAttractionReason,
        ];

        try {
            await createTendency(answers, reasons);
            window.location.href = '/'; // 메인 페이지로 이동
        } catch (error) {
            console.error('설문조사 제출 중 에러 발생:', error);
            alert('설문조사 제출 중 에러가 발생했습니다.');
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
            }}
        >
            <Typography variant="h4" gutterBottom>
                나의 성향 설문조사
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {/* 질문 1 */}
                    <Grid item xs={12}>
                        <FormControl>
                            <FormLabel style={{ fontSize: '1.5rem' }}>
                                당신은 높은 수익을 위해 큰 위험을 감수할 준비가 되어 있습니까? (-100: 전혀 그렇지 않다,
                                -50: 약간 그렇지 않다, 0: 중립적, 50: 약간 그렇다, 100: 매우 그렇다)
                            </FormLabel>
                            <RadioGroup name="riskTaking" value={responses.riskTaking} onChange={handleChange}>
                                <FormControlLabel value="-100" control={<Radio />} label="-100 전혀 그렇지 않다" />
                                <FormControlLabel value="-50" control={<Radio />} label="-50 약간 그렇지 않다" />
                                <FormControlLabel value="0" control={<Radio />} label="0 중립적" />
                                <FormControlLabel value="50" control={<Radio />} label="50 약간 그렇다" />
                                <FormControlLabel value="100" control={<Radio />} label="100 매우 그렇다" />
                            </RadioGroup>
                            <TextField
                                label="그 이유를 자세히 설명해주세요"
                                name="riskTakingReason"
                                multiline
                                rows={4}
                                value={responses.riskTakingReason}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                            />
                        </FormControl>
                    </Grid>

                    {/* 질문 2 */}
                    <Grid item xs={12}>
                        <FormControl>
                            <FormLabel style={{ fontSize: '1.5rem' }}>
                                새로운 투자 기회를 발견했을 때, 빠르게 투자 결정을 내리십니까? (-100: 전혀 그렇지 않다,
                                -50: 약간 그렇지 않다, 0: 중립적, 50: 약간 그렇다, 100: 매우 그렇다)
                            </FormLabel>
                            <RadioGroup name="quickDecision" value={responses.quickDecision} onChange={handleChange}>
                                <FormControlLabel value="-100" control={<Radio />} label="-100 전혀 그렇지 않다" />
                                <FormControlLabel value="-50" control={<Radio />} label="-50 약간 그렇지 않다" />
                                <FormControlLabel value="0" control={<Radio />} label="0 중립적" />
                                <FormControlLabel value="50" control={<Radio />} label="50 약간 그렇다" />
                                <FormControlLabel value="100" control={<Radio />} label="100 매우 그렇다" />
                            </RadioGroup>
                            <TextField
                                label="그 이유를 자세히 설명해주세요"
                                name="quickDecisionReason"
                                multiline
                                rows={4}
                                value={responses.quickDecisionReason}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                            />
                        </FormControl>
                    </Grid>

                    {/* 질문 3 */}
                    <Grid item xs={12}>
                        <FormControl>
                            <FormLabel style={{ fontSize: '1.5rem' }}>
                                당신은 주식이나 ETF 같은 고위험 상품에 투자하는 것을 선호합니까? (-100: 전혀 그렇지
                                않다, -50: 약간 그렇지 않다, 0: 중립적, 50: 약간 그렇다, 100: 매우 그렇다)
                            </FormLabel>
                            <RadioGroup
                                name="highRiskPreference"
                                value={responses.highRiskPreference}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="-100" control={<Radio />} label="-100 전혀 그렇지 않다" />
                                <FormControlLabel value="-50" control={<Radio />} label="-50 약간 그렇지 않다" />
                                <FormControlLabel value="0" control={<Radio />} label="0 중립적" />
                                <FormControlLabel value="50" control={<Radio />} label="50 약간 그렇다" />
                                <FormControlLabel value="100" control={<Radio />} label="100 매우 그렇다" />
                            </RadioGroup>
                            <TextField
                                label="그 이유를 자세히 설명해주세요"
                                name="highRiskPreferenceReason"
                                multiline
                                rows={4}
                                value={responses.highRiskPreferenceReason}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                            />
                        </FormControl>
                    </Grid>

                    {/* 질문 4 */}
                    <Grid item xs={12}>
                        <FormControl>
                            <FormLabel style={{ fontSize: '1.5rem' }}>
                                시장의 변동성에 크게 흔들리지 않고 투자를 지속할 수 있습니까? (-100: 전혀 그렇지 않다,
                                -50: 약간 그렇지 않다, 0: 중립적, 50: 약간 그렇다, 100: 매우 그렇다)
                            </FormLabel>
                            <RadioGroup
                                name="marketVolatility"
                                value={responses.marketVolatility}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="-100" control={<Radio />} label="-100 전혀 그렇지 않다" />
                                <FormControlLabel value="-50" control={<Radio />} label="-50 약간 그렇지 않다" />
                                <FormControlLabel value="0" control={<Radio />} label="0 중립적" />
                                <FormControlLabel value="50" control={<Radio />} label="50 약간 그렇다" />
                                <FormControlLabel value="100" control={<Radio />} label="100 매우 그렇다" />
                            </RadioGroup>
                            <TextField
                                label="만약 그렇다면, 어떤 기준을 갖고 결정을 내리시는지 공유해주세요."
                                name="marketVolatilityReason"
                                multiline
                                rows={4}
                                value={responses.marketVolatilityReason}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                            />
                        </FormControl>
                    </Grid>

                    {/* 질문 5 */}
                    <Grid item xs={12}>
                        <FormControl>
                            <FormLabel style={{ fontSize: '1.5rem' }}>
                                투자 활동에서 오는 스트레스나 불안 같은 감정에 영향을 받지 않으십니까? (-100: 전혀
                                그렇지 않다, -50: 약간 그렇지 않다, 0: 중립적, 50: 약간 그렇다, 100: 매우 그렇다)
                            </FormLabel>
                            <RadioGroup name="stressImpact" value={responses.stressImpact} onChange={handleChange}>
                                <FormControlLabel value="-100" control={<Radio />} label="-100 전혀 그렇지 않다" />
                                <FormControlLabel value="-50" control={<Radio />} label="-50 약간 그렇지 않다" />
                                <FormControlLabel value="0" control={<Radio />} label="0 중립적" />
                                <FormControlLabel value="50" control={<Radio />} label="50 약간 그렇다" />
                                <FormControlLabel value="100" control={<Radio />} label="100 매우 그렇다" />
                            </RadioGroup>
                            <TextField
                                label="손실 발생 시 어떤 감정이 드는지 설명해주세요."
                                name="stressImpactReason"
                                multiline
                                rows={4}
                                value={responses.stressImpactReason}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                            />
                        </FormControl>
                    </Grid>

                    {/* 질문 6 */}
                    <Grid item xs={12}>
                        <FormControl>
                            <FormLabel style={{ fontSize: '1.5rem' }}>
                                리스크가 적은 안전한 투자보다는 고위험 고수익 투자에 더 매력을 느끼십니까? (-100: 전혀
                                그렇지 않다, -50: 약간 그렇지 않다, 0: 중립적, 50: 약간 그렇다, 100: 매우 그렇다)
                            </FormLabel>
                            <RadioGroup
                                name="highRiskAttraction"
                                value={responses.highRiskAttraction}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="-100" control={<Radio />} label="-100 전혀 그렇지 않다" />
                                <FormControlLabel value="-50" control={<Radio />} label="-50 약간 그렇지 않다" />
                                <FormControlLabel value="0" control={<Radio />} label="0 중립적" />
                                <FormControlLabel value="50" control={<Radio />} label="50 약간 그렇다" />
                                <FormControlLabel value="100" control={<Radio />} label="100 매우 그렇다" />
                            </RadioGroup>
                            <TextField
                                label="그 이유를 자세히 설명해주세요"
                                name="highRiskAttractionReason"
                                multiline
                                rows={4}
                                value={responses.highRiskAttractionReason}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                            />
                        </FormControl>
                    </Grid>
                </Grid>
                {/* 제출 버튼 */}
                <div style={{ marginTop: '20px' }}>
                    <Button type="submit" variant="contained" color="primary">
                        제출
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default SurveyPage;
