import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as S from './SignupPage.styles';
import { TextField } from '@components/TextField';
import { Button } from '@components/Button';
import logoQroomText from '../../assets/images/Logo.png';
import { ROUTE_PATHS } from '@constants/RouteConstants';
import { login, persistAuth, signup } from '@services/authService';
import { ApiError } from '@services/apiClient';

const SignupPage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const signupResult = await signup({
        nickname: trimmedNickname,
        password: trimmedPassword,
        passwordCheck: trimmedPasswordConfirm,
      });

      setSuccessMessage(
        signupResult.message ||
          '회원가입이 완료되었습니다. 자동으로 로그인 중입니다...'
      );

      try {
        const loginResult = await login({
          nickname: trimmedNickname,
          password: trimmedPassword,
        });

        persistAuth(loginResult);
        setSuccessMessage('회원가입이 완료되었습니다. 자동으로 로그인했어요!');

        setTimeout(() => {
          navigate(ROUTE_PATHS.HOME, { replace: true });
        }, 800);
      } catch (loginError: unknown) {
        console.error('자동 로그인 실패:', loginError);
        setErrorMessage(
          '회원가입은 완료되었지만 자동 로그인에 실패했습니다. 로그인 페이지에서 다시 시도해 주세요.'
        );
        setTimeout(() => {
          navigate(ROUTE_PATHS.LOGIN, { replace: true });
        }, 1500);
      }
    } catch (error: unknown) {
      console.error('회원가입 요청 실패:', error);
      const message =
        error instanceof ApiError
          ? error.message || '회원가입에 실패했습니다. 다시 시도해 주세요.'
          : '회원가입에 실패했습니다. 다시 시도해 주세요.';
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
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
              <Button
                type="submit"
                variant="primary"
                disabled={!isFormValid || isSubmitting}
              >
                시작하기
              </Button>
            </S.ButtonContainer>
          </S.Form>
          <S.MessageArea $visible={Boolean(errorMessage || successMessage)}>
            {errorMessage ? (
              <S.ErrorMessage>{errorMessage}</S.ErrorMessage>
            ) : successMessage ? (
              <S.SuccessMessage>{successMessage}</S.SuccessMessage>
            ) : null}
          </S.MessageArea>
        </S.SignupCardContent>
      </S.SignupCard>
    </S.Container>
  );
};

export default SignupPage;
