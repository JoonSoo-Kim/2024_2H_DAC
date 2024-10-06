import React, { useState } from 'react';
import {
    Button,
    Grid,
    Paper,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
} from '@mui/material';
import { SystemTypography } from '../styles/typography';
import { createUser } from '../utils/createUser';

const SignUp = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [birthYear, setBirthYear] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();

        // 비밀번호와 비밀번호 확인이 일치하는지 확인
        if (password !== confirmPassword) {
            setPasswordError('비밀번호가 일치하지 않습니다.');
            return;
        } else {
            setPasswordError(''); // 오류 메시지 초기화
        }

        try {
            const response = await createUser(id, password, email, birthYear, gender);

            if (response.status === 204) {
                alert('회원가입에 성공했습니다! 로그인 해주세요.');
            } else if (response.status === 400) {
                alert('아이디 생성 규칙을 위반했습니다.');
            } else if (response.status === 409) {
                alert('이메일 혹은 아이디가 중복되었습니다.');
            } else {
                alert('회원가입 실패!');
            }
        } catch (error) {
            console.log(error);
            alert('서버와의 통신 중 오류가 발생했습니다.');
        }
    };

    return (
        <Grid
            container
            style={{ height: '100vh', justifyContent: 'center', alignItems: 'center' }} // 중앙 정렬
        >
            <Paper style={{ padding: '20px', maxWidth: '500px', width: '100%' }}>
                <SystemTypography variant="h4" align="center">
                    회원가입
                </SystemTypography>
                <form onSubmit={handleSignUp}>
                    <TextField
                        label="아이디"
                        fullWidth
                        margin="normal"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                    />
                    <TextField
                        label="비밀번호"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <TextField
                        label="비밀번호 확인"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    {passwordError && <FormHelperText error>{passwordError}</FormHelperText>} {/* 오류 메시지 표시 */}
                    <TextField
                        label="이메일 주소"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>성별</InputLabel>
                        <Select value={gender} onChange={(e) => setGender(e.target.value)} required>
                            <MenuItem value="">
                                <em>선택하세요</em>
                            </MenuItem>
                            <MenuItem value="male">남자</MenuItem>
                            <MenuItem value="female">여자</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>출생연도</InputLabel>
                        <Select value={birthYear} onChange={(e) => setBirthYear(e.target.value)} required>
                            <MenuItem value="">
                                <em>선택하세요</em>
                            </MenuItem>
                            {Array.from({ length: 100 }, (_, index) => {
                                const year = new Date().getFullYear() - index;
                                return (
                                    <MenuItem key={year} value={year}>
                                        {year}
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                        <Button type="submit" variant="contained" color="primary">
                            회원가입
                        </Button>
                    </div>
                </form>
            </Paper>
        </Grid>
    );
};

export default SignUp;
