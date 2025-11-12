import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './MainPage.styles';
import logoQroomText from '../../assets/images/Logo.png';
import ggoom1Image from '../../assets/images/ggoom/ggoom1.png';
import qeImage from '../../assets/images/qe.png';
import sImage from '../../assets/images/s.png';
import { QuizRoomCard } from '@components/QuizRoomCard';
import { QnACard } from '@components/QnACard';
import { NewRoomModal } from '@components/NewRoomModal';
import { EntryCodeModal } from '@components/EntryCodeModal';
import { ExamInfoModal, ExamInfo } from '@components/ExamInfoModal';
import { ExitRoomModal } from '@components/ExitRoomModal';
import { buildRoomDetailPath } from '@constants/RouteConstants';
import { CHARACTER_IMAGES } from '@constants/characterImages';

const generateExamCode = () =>
  Math.floor(1000 + Math.random() * 9000).toString();

type QuizRoom = {
  id: number;
  examTag: string;
  roomName: string;
  participantCount: number;
  isJoined: boolean;
  characterId: number;
};

const MainPage = () => {
  const quizRoomScrollRef = useRef<HTMLDivElement>(null);
  const qnaScrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isNewRoomModalOpen, setIsNewRoomModalOpen] = useState(false);
  const [isEntryCodeModalOpen, setIsEntryCodeModalOpen] = useState(false);
  const [isExamInfoModalOpen, setIsExamInfoModalOpen] = useState(false);
  const [selectedExamInfo, setSelectedExamInfo] = useState<ExamInfo | null>(
    null
  );
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [roomPendingExit, setRoomPendingExit] = useState<QuizRoom | null>(null);

  const [examSchedules, setExamSchedules] = useState<ExamInfo[]>([
    {
      id: 1,
      lectureName: '강의명',
      groupName: '그룹 이름',
      code: '1234',
      examDate: '12.08',
      characterImage: CHARACTER_IMAGES[1],
    },
    {
      id: 2,
      lectureName: '디지털 광고',
      groupName: '4호선톤',
      code: '9876',
      examDate: '11.20',
      characterImage: CHARACTER_IMAGES[2],
    },
  ]);

  const [quizRooms, setQuizRooms] = useState<QuizRoom[]>([
    {
      id: 1,
      examTag: '시험 D-14',
      roomName: '멋사팀',
      participantCount: 5,
      isJoined: true,
      characterId: 1,
    },
    {
      id: 2,
      examTag: '시험 D-14',
      roomName: '4호선톤',
      participantCount: 5,
      isJoined: false,
      characterId: 2,
    },
    {
      id: 3,
      examTag: '시험 D-14',
      roomName: '해보자고요',
      participantCount: 5,
      isJoined: false,
      characterId: 3,
    },
  ]);

  const [qnaPosts] = useState([
    {
      id: 1,
      tag: '오답풀이 및 질문',
      title: '4호선톤 챕터 1~3',
      performance: '19/20 (정답률: 95%)',
    },
    {
      id: 2,
      tag: '오답풀이 및 질문',
      title: '퀴즈 이름',
      performance: '19/20 (정답률: 95%)',
    },
    {
      id: 3,
      tag: '오답풀이 및 질문',
      title: '퀴즈 이름ㅇㅇ ○○○○○',
      performance: '19/20 (정답률: 95%)',
    },
  ]);

  const handleExamModalClose = () => {
    setIsExamInfoModalOpen(false);
    setSelectedExamInfo(null);
  };

  const handleQuizRoomEnter = (room: QuizRoom) => {
    const examInfo = examSchedules.find(
      (exam) => exam.groupName === room.roomName
    ) ?? {
      id: room.id,
      lectureName: room.roomName,
      groupName: room.roomName,
      code: generateExamCode(),
      examDate: room.examTag.replace('시험', '').trim() || '미정',
      characterImage: CHARACTER_IMAGES[room.characterId],
    };

    navigate(buildRoomDetailPath(room.id), { state: { room, examInfo } });
  };

  const handleExitRequest = (room: QuizRoom) => {
    setRoomPendingExit(room);
    setIsExitModalOpen(true);
  };

  const handleExitCancel = () => {
    setIsExitModalOpen(false);
    setRoomPendingExit(null);
  };

  const handleExitConfirm = () => {
    if (!roomPendingExit) return;
    setQuizRooms((prev) =>
      prev.filter((room) => room.id !== roomPendingExit.id)
    );
    console.log('퀴즈룸 퇴장:', roomPendingExit.id);
    setRoomPendingExit(null);
    setIsExitModalOpen(false);
  };

  const handleQnAEnter = (postId: number) => {
    console.log('Q&A 입장:', postId);
  };

  const handleNewRoomClick = () => {
    setIsNewRoomModalOpen(true);
  };

  const handleNewRoomSubmit = (data: {
    groupName: string;
    examDate: string;
    characterId: number;
  }) => {
    const newCharacterId = data.characterId || 1;

    const newExam: ExamInfo = {
      id: Date.now(),
      lectureName: '강의명',
      groupName: data.groupName,
      code: generateExamCode(),
      examDate: data.examDate || '미정',
      characterImage: CHARACTER_IMAGES[newCharacterId] ?? CHARACTER_IMAGES[1],
    };

    setExamSchedules((prev) => [newExam, ...prev]);
    setSelectedExamInfo(newExam);
    setIsExamInfoModalOpen(true);

    setQuizRooms((prev) => [
      {
        id: newExam.id,
        examTag: '시험 예정',
        roomName: data.groupName,
        participantCount: 1,
        isJoined: true,
        characterId: newCharacterId,
      },
      ...prev,
    ]);

    console.log('새 방 생성:', data);
  };

  const handleEntryCodeClick = () => {
    setIsEntryCodeModalOpen(true);
  };

  const handleEntryCodeSubmit = (code: string) => {
    console.log('입장 코드:', code);
    // TODO: 입장 코드 처리 로직
  };

  // 마우스 휠로 가로 스크롤 처리
  useEffect(() => {
    const handleWheel = (
      e: WheelEvent,
      scrollRef: React.RefObject<HTMLDivElement | null>
    ) => {
      if (!scrollRef.current) return;

      const element = scrollRef.current;
      const isScrollable = element.scrollWidth > element.clientWidth;

      if (isScrollable) {
        const isAtLeft = element.scrollLeft <= 0;
        const isAtRight =
          element.scrollLeft >= element.scrollWidth - element.clientWidth - 1;

        // 위아래 스크롤을 좌우로 변환
        if ((e.deltaY > 0 && !isAtRight) || (e.deltaY < 0 && !isAtLeft)) {
          e.preventDefault();
          element.scrollLeft += e.deltaY;
        }
      }
    };

    const quizRoomElement = quizRoomScrollRef.current;
    const qnaElement = qnaScrollRef.current;

    const handleQuizRoomWheel = (e: WheelEvent) =>
      handleWheel(e, quizRoomScrollRef);
    const handleQnAWheel = (e: WheelEvent) => handleWheel(e, qnaScrollRef);

    if (quizRoomElement) {
      quizRoomElement.addEventListener('wheel', handleQuizRoomWheel, {
        passive: false,
      });
    }
    if (qnaElement) {
      qnaElement.addEventListener('wheel', handleQnAWheel, { passive: false });
    }

    return () => {
      if (quizRoomElement) {
        quizRoomElement.removeEventListener('wheel', handleQuizRoomWheel);
      }
      if (qnaElement) {
        qnaElement.removeEventListener('wheel', handleQnAWheel);
      }
    };
  }, []);

  return (
    <S.Wrapper>
      <S.Header>
        <S.Logo src={logoQroomText} alt="Qroom" />
        <S.MyPageButton>
          <S.MyPageIcon>
            <img src={ggoom1Image} alt="ggoom" />
          </S.MyPageIcon>
          <S.MyPageText>마이페이지</S.MyPageText>
        </S.MyPageButton>
      </S.Header>

      <S.Content>
        <S.LeftSection>
          <S.QuizRoomSectionWrapper>
            <S.QuizRoomSection>
              <S.SectionTitle>Study Room</S.SectionTitle>
              <S.ScrollContainer ref={quizRoomScrollRef}>
                {quizRooms.length === 0 ? (
                  <S.EmptyStateContainer>
                    <S.EmptyStateIcon src={ggoom1Image} alt="ggoom" />
                    <S.EmptyStateText>
                      아직 스터디 그룹이 없어요!
                    </S.EmptyStateText>
                  </S.EmptyStateContainer>
                ) : (
                  quizRooms.map((room) => (
                    <QuizRoomCard
                      key={room.id}
                      examTag={room.examTag}
                      roomName={room.roomName}
                      participantCount={room.participantCount}
                      isJoined={room.isJoined}
                      avatarImage={
                        CHARACTER_IMAGES[room.characterId] ??
                        CHARACTER_IMAGES[1]
                      }
                      onEnter={() => handleQuizRoomEnter(room)}
                      onExit={
                        room.isJoined
                          ? () => handleExitRequest(room)
                          : undefined
                      }
                    />
                  ))
                )}
              </S.ScrollContainer>
            </S.QuizRoomSection>
          </S.QuizRoomSectionWrapper>

          <S.QnASectionWrapper>
            <S.QnASection>
              <S.SectionTitle>Feedback Room</S.SectionTitle>
              <S.ScrollContainer ref={qnaScrollRef}>
                {qnaPosts.length === 0 ? (
                  <S.EmptyStateContainer>
                    <S.EmptyStateIcon src={ggoom1Image} alt="ggoom" />
                    <S.EmptyStateText>
                      아직 참여한 퀴즈가 없어요!
                    </S.EmptyStateText>
                  </S.EmptyStateContainer>
                ) : (
                  qnaPosts.map((post) => (
                    <QnACard
                      key={post.id}
                      tag={post.tag}
                      title={post.title}
                      performance={post.performance}
                      onEnter={() => handleQnAEnter(post.id)}
                    />
                  ))
                )}
              </S.ScrollContainer>
            </S.QnASection>
          </S.QnASectionWrapper>
        </S.LeftSection>

        <S.RightSection>
          {examSchedules.length > 0 && (
            <S.InfoCard>
              <S.InfoCardHeader>
                <S.InfoCardTitle>Exam Date</S.InfoCardTitle>
              </S.InfoCardHeader>
              <S.InfoCardList>
                {examSchedules.map((exam) => (
                  <S.InfoCardItem key={exam.id}>
                    <S.InfoCardItemName>{exam.groupName}</S.InfoCardItemName>
                    <S.InfoCardItemDate>{exam.examDate}</S.InfoCardItemDate>
                  </S.InfoCardItem>
                ))}
              </S.InfoCardList>
            </S.InfoCard>
          )}

          <S.ActionButtonGroup>
            <S.ActionButton $variant="room" onClick={handleNewRoomClick}>
              <S.ActionButtonBackgroundImage
                $variant="room"
                src={qeImage}
                alt=""
              />
              <S.ActionButtonSmallText>NEW</S.ActionButtonSmallText>
              <S.ActionButtonMainText $variant="room">
                room
              </S.ActionButtonMainText>
            </S.ActionButton>
            <S.ActionButton $variant="code" onClick={handleEntryCodeClick}>
              <S.ActionButtonBackgroundImage
                $variant="code"
                src={sImage}
                alt=""
              />
              <S.ActionButtonSmallText>NEW</S.ActionButtonSmallText>
              <S.ActionButtonMainText $variant="code">
                입장코드
              </S.ActionButtonMainText>
            </S.ActionButton>
          </S.ActionButtonGroup>
        </S.RightSection>
      </S.Content>

      <NewRoomModal
        isOpen={isNewRoomModalOpen}
        onClose={() => setIsNewRoomModalOpen(false)}
        onSubmit={handleNewRoomSubmit}
      />

      <EntryCodeModal
        isOpen={isEntryCodeModalOpen}
        onClose={() => setIsEntryCodeModalOpen(false)}
        onSubmit={handleEntryCodeSubmit}
      />

      <ExamInfoModal
        isOpen={isExamInfoModalOpen}
        exam={selectedExamInfo}
        onClose={handleExamModalClose}
      />

      <ExitRoomModal
        isOpen={isExitModalOpen}
        roomName={roomPendingExit?.roomName ?? ''}
        characterImage={
          roomPendingExit
            ? CHARACTER_IMAGES[roomPendingExit.characterId]
            : undefined
        }
        onCancel={handleExitCancel}
        onConfirm={handleExitConfirm}
      />
    </S.Wrapper>
  );
};

export default MainPage;
