import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as S from './SignupPage.styles';
import { TextField } from '@components/TextField';
import { Button } from '@components/Button';
import logoQroomText from '../../assets/images/Logo.png';
import { ROUTE_PATHS } from '@constants/RouteConstants';

const SignupPage = () => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const trimmedNickname = nickname.trim();
  const trimmedPassword = password.trim();
  const trimmedPasswordConfirm = passwordConfirm.trim();

  const isFormValid =
    trimmedNickname.length > 0 &&
    trimmedPassword.length > 0 &&
    trimmedPasswordConfirm.length > 0 &&
    password === passwordConfirm;

  const handleNicknameCheck = () => {
    // TODO: 닉네임 중복 확인 로직 구현
    console.log('닉네임 중복 확인:', nickname);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      return;
    }
    // TODO: 회원가입 로직 구현
    console.log('회원가입 시도:', {
      nickname: trimmedNickname,
      password: trimmedPassword,
      passwordConfirm: trimmedPasswordConfirm,
    });
  };

  return (
    <S.Container>
      <S.LogoLink to={ROUTE_PATHS.MAIN}>
        <S.Logo src={logoQroomText} alt="Qroom" />
      </S.LogoLink>
      <S.SignupCard>
        <S.SignupCardContent>
          <S.Title>회원가입</S.Title>
          <S.Form onSubmit={handleSubmit}>
            <TextField
              label="닉네임"
              placeholder="닉네임을 입력해 주세요"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              showCheckButton
              onCheckButtonClick={handleNicknameCheck}
              helperText="중복 여부를 확인해주세요!"
            />
            <TextField
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              enablePasswordToggle
              helperText="영문자(대,소문자), 숫자를 포함하여 최소 4자 이상 입력해주세요."
            />
            <TextField
              label="비밀번호 확인"
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              enablePasswordToggle
            />
            <S.ButtonContainer>
              <Button type="submit" variant="primary" disabled={!isFormValid}>
                시작하기
              </Button>
            </S.ButtonContainer>
          </S.Form>
        </S.SignupCardContent>
      </S.SignupCard>
    </S.Container>
  );
};

export default SignupPage;
