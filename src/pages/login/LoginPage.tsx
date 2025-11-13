import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as S from './LoginPage.styles';
import { TextField } from '@components/TextField';
import { Button } from '@components/Button';
import logoQroomText from '../../assets/images/Logo.png';
import { ROUTE_PATHS } from '@constants/RouteConstants';
import { login, persistAuth } from '@services/authService';
import { ApiError } from '@services/apiClient';

const LoginPage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const trimmedNickname = nickname.trim();
  const trimmedPassword = password.trim();

  const isFormValid =
    trimmedNickname.length > 0 && trimmedPassword.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const loginResult = await login({
        nickname: trimmedNickname,
        password: trimmedPassword,
      });

      persistAuth(loginResult);
      setSuccessMessage('로그인에 성공했습니다!');

      setTimeout(() => {
        navigate(ROUTE_PATHS.HOME, { replace: true });
      }, 600);
    } catch (error: unknown) {
      console.error('로그인 요청 실패:', error);
      const message =
        error instanceof ApiError
          ? error.message || '로그인에 실패했습니다. 다시 시도해 주세요.'
          : '로그인에 실패했습니다. 다시 시도해 주세요.';
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
      <S.LoginCard>
        <S.LoginCardContent>
          <S.Title>로그인</S.Title>
          <S.Form onSubmit={handleSubmit}>
            <TextField
              label="닉네임"
              placeholder="닉네임을 입력해 주세요"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <TextField
              label="비밀번호"
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
        </S.LoginCardContent>
      </S.LoginCard>
    </S.Container>
  );
};

export default LoginPage;
