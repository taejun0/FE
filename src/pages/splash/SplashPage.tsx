import * as S from './SplashPage.styles';
import { Button } from '@components/Button';
import logoQroomText from '../../assets/images/MainLogo.png';
import questionMarkImg from '../../assets/images/Q!.png';
import { ROUTE_PATHS } from '@constants/RouteConstants';

const SplashPage = () => {
  return (
    <S.Container>
      <S.BackgroundDecoration>
        {/* 좌위 - 두 번째로 큰 크기 (가로의 28%), 좌우반전 */}
        <S.QuestionMark
          $top="5%"
          $left="3%"
          $size="28vw"
          $opacity={1}
          src={questionMarkImg}
          alt=""
        />
        {/* 우위 - 작은 크기 (가로의 22%) */}
        <S.QuestionMark
          $top="5%"
          $right="3%"
          $size="22vw"
          $opacity={1}
          $flip={true}
          src={questionMarkImg}
          alt=""
        />
        {/* 좌아래 - 작은 크기 (가로의 22%) */}
        <S.QuestionMark
          $bottom="5%"
          $left="3%"
          $size="22vw"
          $opacity={1}
          $flip={true}
          src={questionMarkImg}
          alt=""
        />
        {/* 우아래 - 가장 큰 크기 (가로의 35%) */}
        <S.QuestionMark
          $bottom="5%"
          $right="3%"
          $size="35vw"
          $opacity={1}
          $flip={true}
          src={questionMarkImg}
          alt=""
        />
      </S.BackgroundDecoration>

      <S.Content>
        <S.ServiceDescription>
          <S.DescriptionText>대학생 그룹 스터디 웹 서비스</S.DescriptionText>
          <S.Tagline>같이 문제 내고, 같이 성장하는 공간</S.Tagline>
        </S.ServiceDescription>

        <S.LogoSection>
          <S.LogoText src={logoQroomText} alt="Qroom" />
        </S.LogoSection>

        <S.ButtonGroup>
          <S.ButtonLink to={ROUTE_PATHS.LOGIN}>
            <S.ButtonContainer>
              <Button variant="primary">로그인</Button>
            </S.ButtonContainer>
          </S.ButtonLink>
          <S.ButtonLink to={ROUTE_PATHS.SIGNUP}>
            <S.ButtonContainer>
              <Button variant="secondary">회원가입</Button>
            </S.ButtonContainer>
          </S.ButtonLink>
        </S.ButtonGroup>
      </S.Content>
    </S.Container>
  );
};

export default SplashPage;
