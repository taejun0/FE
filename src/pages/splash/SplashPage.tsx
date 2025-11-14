import * as S from './SplashPage.styles';
import { Button } from '@components/Button';
import logoQroomText from '../../assets/images/MainLogo.png';
import questionMarkImg from '../../assets/images/Q!.png';
import { ROUTE_PATHS } from '@constants/RouteConstants';

const SplashPage = () => {
  return (
    <S.Container>
      <S.BackgroundDecoration>
        {/* 좌위 - 1440x1024 기준: 441px, Top: 71px, Left: -22px, Rotation: -180°, Opacity: 40% */}
        <S.QuestionMark
          $top="6.93%"
          $left="-1.53%"
          $size="30.625vw"
          $opacity={1}
          $rotation={0}
          src={questionMarkImg}
          alt=""
        />
        {/* 우위 - 1440x1024 기준: 224px, Top: 45px, Left: 1123px, Opacity: 40% */}
        <S.QuestionMark
          $top="4.39%"
          $left="77.99%"
          $size="15.556vw"
          $opacity={1}
          src={questionMarkImg}
          $flip={true}
          alt=""
        />
        {/* 좌아래 - 1440x1024 기준: 198px, Top: 756px, Left: 101px, Opacity: 40% */}
        <S.QuestionMark
          $top="73.83%"
          $left="7.01%"
          $size="13.75vw"
          $opacity={1}
          src={questionMarkImg}
          $flip={true}
          alt=""
        />
        {/* 우아래 - 1440x1024 기준: 697px, Top: 361px, Left: 907px, Opacity: 40% */}
        <S.QuestionMark
          $top="35.25%"
          $left="62.99%"
          $size="48.333vw"
          $opacity={1}
          src={questionMarkImg}
          $flip={true}
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
