import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as S from './LoginPage.styles';
import { TextField } from '@components/TextField';
import { Button } from '@components/Button';
import logoQroomText from '../../assets/images/Logo.png';
import { ROUTE_PATHS } from '@constants/RouteConstants';

const LoginPage = () => {
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 로그인 로직 구현
    console.log('로그인 시도:', { nickname, password });
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
              <Button type="submit" variant="primary">
                시작하기
              </Button>
            </S.ButtonContainer>
          </S.Form>
        </S.LoginCardContent>
      </S.LoginCard>
    </S.Container>
  );
};

export default LoginPage;
