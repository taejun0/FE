import { useMemo, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as S from './RoomDetailPage.styles';
import logoQroomText from '../../assets/images/Logo.png';
import ggoom1Image from '../../assets/images/ggoom/ggoom1.png';
import folderImage from '../../assets/images/File.png';
import moreIcon from '../../assets/images/threedot.png';
import qeImage from '../../assets/images/qe.png';
import { QuizCard } from '@components/QuizCard';
import { QnACard } from '@components/QnACard';
import { CHARACTER_IMAGES } from '@constants/characterImages';
import { ROUTE_PATHS } from '@constants/RouteConstants';
import { ExamInfo } from '@components/ExamInfoModal/ExamInfoModal';
import { QuizCreationModal } from '@components/QuizCreationModal';

interface RoomRouteState {
  room?: {
    id: number;
    roomName: string;
    participantCount: number;
    examTag: string;
    characterId: number;
  };
  examInfo?: ExamInfo;
}

const mateNames = ['뭐요뭐요', '뭐요뭐요', '뭐요뭐요', '뭐요뭐요', '뭐요뭐요'];

export const RoomDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state as RoomRouteState | undefined) ?? {};

  const room = state.room;
  const examInfo = state.examInfo;

  useEffect(() => {
    if (!room) {
      navigate(ROUTE_PATHS.HOME, { replace: true });
    }
  }, [navigate, room]);

  if (!room) {
    return null;
  }

  const groupName = room.roomName;
  const examDate = examInfo?.examDate ?? '11.20';
  const entranceCode = examInfo?.code ?? '0000';
  const participantCount = room.participantCount ?? mateNames.length;
  const characterId = room.characterId ?? 1;

  const characterImage = useMemo(() => {
    if (CHARACTER_IMAGES[characterId]) {
      return CHARACTER_IMAGES[characterId];
    }
    return CHARACTER_IMAGES[1];
  }, [characterId]);

  const mates = useMemo(
    () =>
      Array.from(
        { length: participantCount },
        (_, index) => mateNames[index % mateNames.length]
      ),
    [participantCount]
  );

  const rankingData = useMemo(
    () => [
      { rank: 1, name: '멋쟁이사자처럼' },
      { rank: 2, name: '야후' },
      { rank: 3, name: '오오오' },
      { rank: 4, name: '오오오' },
      { rank: 5, name: '오오오' },
    ],
    []
  );
  const currentRank = 5;

  const quizCards = useMemo(
    () => [
      {
        difficulty: '난이도 상',
        title: '퀴즈 챕터 1~3',
        participantInfo: '5명 참여 중',
      },
      {
        difficulty: '난이도 중',
        title: '퀴즈 챕터 1~3',
        participantInfo: '5명 참여 중',
      },
      {
        difficulty: '난이도 하',
        title: '퀴즈 챕터 1~3',
        participantInfo: '5명 참여 중',
      },
    ],
    []
  );

  const qnaData = useMemo(
    () => [
      {
        tag: '오답풀이 및 질문',
        title: '퀴즈 챕터 1~3',
        performance: '19/20 (정답률: 95%)',
      },
      {
        tag: '오답풀이 및 질문',
        title: '퀴즈 챕터 1~3',
        performance: '19/20 (정답률: 95%)',
      },
    ],
    []
  );

  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);

  const handleCopyCode = async () => {
    try {
      if (navigator.clipboard && 'writeText' in navigator.clipboard) {
        await navigator.clipboard.writeText(entranceCode);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = entranceCode;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
    } catch (error) {
      console.error('입장 코드 복사 실패:', error);
    }
  };

  const quizScrollRef = useRef<HTMLDivElement>(null);
  const qnaScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheel = (
      e: WheelEvent,
      scrollRef: React.RefObject<HTMLDivElement | null>
    ) => {
      const element = scrollRef.current;
      if (!element) return;

      const isScrollable = element.scrollWidth > element.clientWidth;
      if (!isScrollable) return;

      const isAtLeft = element.scrollLeft <= 0;
      const isAtRight =
        element.scrollLeft >= element.scrollWidth - element.clientWidth - 1;

      if ((e.deltaY > 0 && !isAtRight) || (e.deltaY < 0 && !isAtLeft)) {
        e.preventDefault();
        element.scrollLeft += e.deltaY;
      }
    };

    const quizElement = quizScrollRef.current;
    const qnaElement = qnaScrollRef.current;

    const handleQuizWheel = (event: WheelEvent) =>
      handleWheel(event, quizScrollRef);
    const handleQnaWheel = (event: WheelEvent) =>
      handleWheel(event, qnaScrollRef);

    if (quizElement) {
      quizElement.addEventListener('wheel', handleQuizWheel, {
        passive: false,
      });
    }
    if (qnaElement) {
      qnaElement.addEventListener('wheel', handleQnaWheel, { passive: false });
    }

    return () => {
      if (quizElement) {
        quizElement.removeEventListener('wheel', handleQuizWheel);
      }
      if (qnaElement) {
        qnaElement.removeEventListener('wheel', handleQnaWheel);
      }
    };
  }, []);

  return (
    <S.Wrapper>
      <S.Header>
        <S.LogoLink to={ROUTE_PATHS.HOME}>
          <S.Logo src={logoQroomText} alt="Qroom" />
        </S.LogoLink>
        <S.MyPageButton>
          <S.MyPageIcon>
            <img src={ggoom1Image} alt="mypage" />
          </S.MyPageIcon>
          <S.MyPageText>마이페이지</S.MyPageText>
        </S.MyPageButton>
      </S.Header>

      <S.HeaderSection>
        <S.WelcomeCard>
          <S.WelcomeHeader>
            <S.WelcomeTextGroup>
              <S.GroupName>{groupName}</S.GroupName>
              <span>에 오신 걸 환영합니다</span>
            </S.WelcomeTextGroup>
            <S.WelcomeCharacter>
              <img src={characterImage} alt="character" />
            </S.WelcomeCharacter>
          </S.WelcomeHeader>
        </S.WelcomeCard>

        <S.MateSection>
          <S.MateInfo>
            <S.MateTitle>Mate ({participantCount})</S.MateTitle>
            <S.CopyCodeButton type="button" onClick={handleCopyCode}>
              입장 코드 복사
            </S.CopyCodeButton>
          </S.MateInfo>
          <S.MateList>
            {mates.map((name, index) => (
              <S.MateAvatar key={`${name}-${index}`}>
                <S.MateAvatarImage>
                  <img src={characterImage} alt={name} />
                </S.MateAvatarImage>
                <span>{name}</span>
              </S.MateAvatar>
            ))}
          </S.MateList>
        </S.MateSection>
      </S.HeaderSection>

      <S.Content>
        <S.LeftColumn>
          <S.UtilityRow>
            <S.NewQuizCard onClick={() => setIsQuizModalOpen(true)}>
              <S.NewQuizBackground src={qeImage} alt="background" />
              <S.NewQuizLabel>NEW</S.NewQuizLabel>
              <S.NewQuizTitle $variant="room">Quiz</S.NewQuizTitle>
            </S.NewQuizCard>
            <S.UploadCard>
              <S.UploadLeft>
                <S.UploadFolderImage src={folderImage} alt="folder" />
                <S.UploadLeftLabel>PDF 파일 업로드</S.UploadLeftLabel>
              </S.UploadLeft>
              <S.UploadDivider />
              <S.UploadRight>
                <S.UploadRightHeader>
                  <S.UploadRightTitle>업로드된 파일</S.UploadRightTitle>
                  <S.MoreButton type="button">
                    <S.MoreIcon src={moreIcon} alt="더보기" />
                  </S.MoreButton>
                </S.UploadRightHeader>
                <S.UploadDescription>
                  아직 업로드된 파일이 없어요!
                </S.UploadDescription>
              </S.UploadRight>
            </S.UploadCard>
          </S.UtilityRow>

          <S.SectionCard>
            <S.SectionTitle>Quiz</S.SectionTitle>
            {quizCards.length === 0 ? (
              <S.EmptyState>
                <S.EmptyStateImage>
                  <img src={characterImage} alt="empty quiz" />
                </S.EmptyStateImage>
                <span>아직 만들어진 퀴즈가 없어요.</span>
                <span>재밌는 퀴즈 만들어보세요!</span>
              </S.EmptyState>
            ) : (
              <S.QuizCardList ref={quizScrollRef}>
                {quizCards.map((quiz) => (
                  <QuizCard
                    key={`${quiz.difficulty}-${quiz.title}`}
                    difficulty={quiz.difficulty}
                    title={quiz.title}
                    participantInfo={quiz.participantInfo}
                    onSolve={() => console.log('문제 풀기 클릭')}
                  />
                ))}
              </S.QuizCardList>
            )}
          </S.SectionCard>

          <S.SectionCard>
            <S.SectionTitle>Q&A</S.SectionTitle>
            {qnaData.length === 0 ? (
              <S.EmptyState>
                <S.EmptyStateImage>
                  <img src={characterImage} alt="empty qna" />
                </S.EmptyStateImage>
                <span>아직 참여한 퀴즈가 없어요!</span>
                <span>퀴즈에 참여해보세요.</span>
              </S.EmptyState>
            ) : (
              <S.QnaCardList ref={qnaScrollRef}>
                {qnaData.map((item, index) => (
                  <QnACard
                    key={`${item.title}-${index}`}
                    tag={item.tag}
                    title={item.title}
                    performance={item.performance}
                    onEnter={() => console.log('Q&A 입장')}
                  />
                ))}
              </S.QnaCardList>
            )}
          </S.SectionCard>
        </S.LeftColumn>

        <S.RightColumn>
          <S.SidebarCard>
            <S.SidebarTitle>Exam Date</S.SidebarTitle>
            <span>{examDate}</span>
          </S.SidebarCard>
          <S.SidebarCard>
            <S.SidebarTitle>Ranking</S.SidebarTitle>
            <S.CurrentRankText>현재 내 등수: #{currentRank}</S.CurrentRankText>
            <S.RankingList>
              {rankingData.map((item) => (
                <S.RankingItem
                  key={item.rank}
                  $highlight={item.rank === currentRank}
                >
                  <S.RankingBadge>{item.rank}</S.RankingBadge>
                  <S.RankingName>{item.name}</S.RankingName>
                </S.RankingItem>
              ))}
            </S.RankingList>
          </S.SidebarCard>
        </S.RightColumn>
      </S.Content>
      <QuizCreationModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
        onSubmit={(payload) => console.log('quiz 생성', payload)}
      />
    </S.Wrapper>
  );
};

export default RoomDetailPage;
