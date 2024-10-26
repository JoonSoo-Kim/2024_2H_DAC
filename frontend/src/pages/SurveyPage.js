import React, { useState } from 'react';
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

const SurveyPage = () => {
    const [responses, setResponses] = useState({
        riskTaking: '',
        stress: '',
        longTermGrowth: '',
        decisionChange: '',
        immediateSell: '',
        followPlan: '',
        etfInvestment: '',
        philosophy: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setResponses((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 제출 처리 로직 추가 예정
        console.log(responses);
    };

    return (
        <div style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>
                나의 성향 설문조사
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {/* 질문 1 */}
                    <Grid item xs={12}>
                        <FormControl>
                            <FormLabel>위험을 감수하면서 높은 수익을 추구하는 것이 중요하다고 생각하십니까?</FormLabel>
                            <RadioGroup name="riskTaking" value={responses.riskTaking} onChange={handleChange}>
                                <FormControlLabel value="1" control={<Radio />} label="1 전혀 아니다" />
                                <FormControlLabel value="2" control={<Radio />} label="2 약간 아니다" />
                                <FormControlLabel value="3" control={<Radio />} label="3 보통이다" />
                                <FormControlLabel value="4" control={<Radio />} label="4 약간 그렇다" />
                                <FormControlLabel value="5" control={<Radio />} label="5 매우 그렇다" />
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
                            <FormLabel>투자를 하는 것이 당신에게 스트레스나 불안을 유발합니까?</FormLabel>
                            <RadioGroup name="stress" value={responses.stress} onChange={handleChange}>
                                <FormControlLabel value="1" control={<Radio />} label="1 전혀 아니다" />
                                <FormControlLabel value="2" control={<Radio />} label="2 약간 아니다" />
                                <FormControlLabel value="3" control={<Radio />} label="3 보통이다" />
                                <FormControlLabel value="4" control={<Radio />} label="4 약간 그렇다" />
                                <FormControlLabel value="5" control={<Radio />} label="5 매우 그렇다" />
                            </RadioGroup>
                            <TextField
                                label="그 이유를 자세히 설명해주세요"
                                name="stressReason"
                                multiline
                                rows={4}
                                value={responses.stressReason}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                            />
                        </FormControl>
                    </Grid>

                    {/* 질문 3 */}
                    <Grid item xs={12}>
                        <FormControl>
                            <FormLabel>당신의 자산이 장기적으로 성장하는 것을 목표로 투자하십니까?</FormLabel>
                            <RadioGroup name="longTermGrowth" value={responses.longTermGrowth} onChange={handleChange}>
                                <FormControlLabel value="1" control={<Radio />} label="1 전혀 아니다" />
                                <FormControlLabel value="2" control={<Radio />} label="2 약간 아니다" />
                                <FormControlLabel value="3" control={<Radio />} label="3 보통이다" />
                                <FormControlLabel value="4" control={<Radio />} label="4 약간 그렇다" />
                                <FormControlLabel value="5" control={<Radio />} label="5 매우 그렇다" />
                            </RadioGroup>
                            <TextField
                                label="장기 투자에 대한 경험이나 생각을 공유해주세요"
                                name="longTermGrowthExperience"
                                multiline
                                rows={4}
                                value={responses.longTermGrowthExperience}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                            />
                        </FormControl>
                    </Grid>

                    {/* 질문 4 */}
                    <Grid item xs={12}>
                        <FormControl>
                            <FormLabel>
                                시장이 급격하게 변동할 때, 스스로의 투자 결정을 쉽게 바꿀 수 있습니까?
                            </FormLabel>
                            <RadioGroup name="decisionChange" value={responses.decisionChange} onChange={handleChange}>
                                <FormControlLabel value="1" control={<Radio />} label="1 전혀 아니다" />
                                <FormControlLabel value="2" control={<Radio />} label="2 약간 아니다" />
                                <FormControlLabel value="3" control={<Radio />} label="3 보통이다" />
                                <FormControlLabel value="4" control={<Radio />} label="4 약간 그렇다" />
                                <FormControlLabel value="5" control={<Radio />} label="5 매우 그렇다" />
                            </RadioGroup>
                            <TextField
                                label="만약 그렇다면, 어떤 기준으로 결정을 내리시는지 말씀해주세요."
                                name="decisionChangeReason"
                                multiline
                                rows={4}
                                value={responses.decisionChangeReason}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                            />
                        </FormControl>
                    </Grid>

                    {/* 질문 5 */}
                    <Grid item xs={12}>
                        <FormControl>
                            <FormLabel>투자한 상품에 손실이 발생했을 때, 즉각적으로 매도하는 편입니까?</FormLabel>
                            <RadioGroup name="immediateSell" value={responses.immediateSell} onChange={handleChange}>
                                <FormControlLabel value="1" control={<Radio />} label="1 전혀 아니다" />
                                <FormControlLabel value="2" control={<Radio />} label="2 약간 아니다" />
                                <FormControlLabel value="3" control={<Radio />} label="3 보통이다" />
                                <FormControlLabel value="4" control={<Radio />} label="4 약간 그렇다" />
                                <FormControlLabel value="5" control={<Radio />} label="5 매우 그렇다" />
                            </RadioGroup>
                            <TextField
                                label="손실 발생 시 어떤 감정이 드는지 설명해주세요."
                                name="immediateSellReason"
                                multiline
                                rows={4}
                                value={responses.immediateSellReason}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                            />
                        </FormControl>
                    </Grid>

                    {/* 질문 6 */}
                    <Grid item xs={12}>
                        <FormControl>
                            <FormLabel>투자 계획을 세우고 나서, 이를 철저하게 따르는 편입니까?</FormLabel>
                            <RadioGroup name="followPlan" value={responses.followPlan} onChange={handleChange}>
                                <FormControlLabel value="1" control={<Radio />} label="1 전혀 아니다" />
                                <FormControlLabel value="2" control={<Radio />} label="2 약간 아니다" />
                                <FormControlLabel value="3" control={<Radio />} label="3 보통이다" />
                                <FormControlLabel value="4" control={<Radio />} label="4 약간 그렇다" />
                                <FormControlLabel value="5" control={<Radio />} label="5 매우 그렇다" />
                            </RadioGroup>
                            <TextField
                                label="그 이유를 자세히 설명해주세요."
                                name="followPlanReason"
                                multiline
                                rows={4}
                                value={responses.followPlanReason}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                            />
                        </FormControl>
                    </Grid>

                    {/* 질문 7 */}
                    <Grid item xs={12}>
                        <FormControl>
                            <FormLabel>현재 혹은 미래의 ETF 투자 비율이 전체 자산에서 어느 정도입니까?</FormLabel>
                            <RadioGroup name="etfInvestment" value={responses.etfInvestment} onChange={handleChange}>
                                <FormControlLabel value="0-20%" control={<Radio />} label="0~20% 투자" />
                                <FormControlLabel value="21-50%" control={<Radio />} label="21~50% 투자" />
                                <FormControlLabel value="51-100%" control={<Radio />} label="51~100% 투자" />
                            </RadioGroup>
                            <TextField
                                label="ETF 외에 남은 자산은 어떻게 투자하고 있는지 설명해주세요."
                                name="etfInvestmentReason"
                                multiline
                                rows={4}
                                value={responses.etfInvestmentReason}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                            />
                        </FormControl>
                    </Grid>

                    {/* 질문 8 */}
                    <Grid item xs={12}>
                        <FormControl>
                            <FormLabel>투자에 대한 자신만의 생각이나 철학이 있으신가요?</FormLabel>
                            <TextField
                                label="투자에 대한 자신만의 생각이나 철학을 설명해주세요."
                                name="philosophyReason"
                                multiline
                                rows={4}
                                value={responses.philosophyReason}
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
