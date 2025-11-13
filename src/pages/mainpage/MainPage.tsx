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
import {
  getHomeData,
  createGroup,
  joinGroup,
  leaveGroup,
} from '@services/homeService';

const generateExamCode = () =>
  Math.floor(1000 + Math.random() * 9000).toString();

const formatExamDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${month}.${day}`;
  } catch {
    return dateString;
  }
};

const calculateDaysUntilExam = (dateString: string): number => {
  try {
    const examDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    examDate.setHours(0, 0, 0, 0);
    const diffTime = examDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  } catch {
    return 0;
  }
};

const normalizeDateToApiFormat = (dateString: string): string => {
  // "2025.11.15" 또는 "2025-11-15" 형식을 "2025-11-15"로 변환
  const normalized = dateString.replace(/\./g, '-');
  // 이미 올바른 형식인지 확인
  if (/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
    return normalized;
  }
  // 다른 형식 시도 (예: "2025/11/15")
  const date = new Date(normalized);
  if (!isNaN(date.getTime())) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  // 변환 실패 시 원본 반환 (서버에서 에러 처리)
  return dateString;
};

type QuizRoom = {
  id: number;
  examTag: string;
  roomName: string;
  participantCount: number;
  isJoined: boolean;
  characterId: number;
  daysUntil: number;
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

  const [examSchedules, setExamSchedules] = useState<ExamInfo[]>([]);
  const [quizRooms, setQuizRooms] = useState<QuizRoom[]>([]);
  const [qnaPosts, setQnaPosts] = useState<
    Array<{ id: number; tag: string; title: string; performance: string }>
  >([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleExitConfirm = async () => {
    if (!roomPendingExit) return;

    try {
      // 그룹 퇴장 API 호출
      await leaveGroup(roomPendingExit.id);

      // 퇴장 성공 후 홈 데이터 재조회
      await fetchAndUpdateHomeData();

      // 모달 닫기
      setRoomPendingExit(null);
      setIsExitModalOpen(false);
    } catch (error) {
      console.error('그룹 퇴장 실패:', error);
      // TODO: 에러 메시지 표시 (토스트 등)
    }
  };

  const handleQnAEnter = (postId: number) => {
    console.log('Q&A 입장:', postId);
  };

  const handleNewRoomClick = () => {
    setIsNewRoomModalOpen(true);
  };

  const handleNewRoomSubmit = async (data: {
    groupName: string;
    examDate: string;
    characterId: number;
  }) => {
    try {
      const newCharacterId = data.characterId || 1;
      const imageNum = newCharacterId;

      // API 호출로 그룹 생성
      const normalizedDate = normalizeDateToApiFormat(data.examDate);
      const groupData = await createGroup({
        name: data.groupName,
        examDate: normalizedDate,
        imageNum,
      });

      // 응답 데이터를 기존 형식으로 변환
      const newExam: ExamInfo = {
        id: groupData.id,
        lectureName: groupData.groupName,
        groupName: groupData.groupName,
        code: groupData.groupCode,
        examDate: formatExamDate(groupData.examDate),
        characterImage: CHARACTER_IMAGES[imageNum] ?? CHARACTER_IMAGES[1],
      };

      const daysUntil = calculateDaysUntilExam(groupData.examDate);
      const examTag =
        daysUntil > 0
          ? `시험 D-${daysUntil}`
          : daysUntil === 0
          ? '시험 D-Day'
          : '시험 종료';

      const newQuizRoom: QuizRoom = {
        id: groupData.id,
        examTag,
        roomName: groupData.groupName,
        participantCount: 1,
        isJoined: true,
        characterId: imageNum,
        daysUntil,
      };

      // State 업데이트
      setExamSchedules((prev) => [newExam, ...prev]);
      setQuizRooms((prev) => {
        const updated = [newQuizRoom, ...prev];
        // 시험이 얼마 남지 않은 순으로 정렬
        return updated.sort((a, b) => {
          if (a.daysUntil < 0 && b.daysUntil < 0) {
            return b.daysUntil - a.daysUntil;
          }
          if (a.daysUntil < 0) return 1;
          if (b.daysUntil < 0) return -1;
          return a.daysUntil - b.daysUntil;
        });
      });

      // 모달 표시
      setSelectedExamInfo(newExam);
      setIsExamInfoModalOpen(true);
      setIsNewRoomModalOpen(false);
    } catch (error) {
      console.error('그룹 생성 실패:', error);
      // TODO: 에러 메시지 표시 (토스트 등)
    }
  };

  const handleEntryCodeClick = () => {
    setIsEntryCodeModalOpen(true);
  };

  // 홈 데이터 조회 및 변환 함수
  const fetchAndUpdateHomeData = async () => {
    try {
      setIsLoading(true);
      const data = await getHomeData();

      // groups를 quizRooms로 변환
      const convertedQuizRooms: QuizRoom[] = data.groups
        .map((group, index) => {
          const daysUntil = calculateDaysUntilExam(group.exam_date);
          const examTag =
            daysUntil > 0
              ? `시험 D-${daysUntil}`
              : daysUntil === 0
              ? '시험 D-Day'
              : '시험 종료';
          const characterId = ((group.id - 1) % 9) + 1;

          return {
            id: group.id,
            examTag,
            roomName: group.name,
            participantCount: group.member_count,
            isJoined: true,
            characterId,
            daysUntil,
          };
        })
        .sort((a, b) => {
          // 시험이 얼마 남지 않은 순으로 정렬
          // 음수(시험 종료)는 맨 뒤로
          if (a.daysUntil < 0 && b.daysUntil < 0) {
            return b.daysUntil - a.daysUntil; // 종료된 것 중에서는 최근 것이 먼저
          }
          if (a.daysUntil < 0) return 1; // a가 종료됨 -> 뒤로
          if (b.daysUntil < 0) return -1; // b가 종료됨 -> 뒤로
          return a.daysUntil - b.daysUntil; // 양수면 작은 값(가까운 시험)이 먼저
        });

      // qa_board를 qnaPosts로 변환
      const convertedQnaPosts = data.qa_board.map((qa) => ({
        id: qa.id,
        tag: '오답풀이 및 질문',
        title: qa.title,
        performance: qa.progress,
      }));

      // exam_schedule를 examSchedules로 변환
      const convertedExamSchedules: ExamInfo[] = data.exam_schedule.map(
        (exam, index) => {
          const group = data.groups.find((g) => g.name === exam.course_name);
          const characterId = group
            ? ((group.id - 1) % 9) + 1
            : (index % 9) + 1;

          return {
            id: group?.id ?? index + 1,
            lectureName: exam.course_name,
            groupName: exam.course_name,
            code: generateExamCode(),
            examDate: formatExamDate(exam.exam_date),
            characterImage:
              CHARACTER_IMAGES[characterId] ?? CHARACTER_IMAGES[1],
          };
        }
      );

      setQuizRooms(convertedQuizRooms);
      setQnaPosts(convertedQnaPosts);
      setExamSchedules(convertedExamSchedules);
    } catch (error) {
      console.error('홈 데이터 조회 실패:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleEntryCodeSubmit = async (code: string) => {
    try {
      // 그룹 입장 API 호출
      await joinGroup({ groupCode: code.trim().toUpperCase() });

      // 입장 성공 후 홈 데이터 재조회 (API 문서 권장사항)
      await fetchAndUpdateHomeData();

      // 모달 닫기
      setIsEntryCodeModalOpen(false);
    } catch (error) {
      console.error('그룹 입장 실패:', error);
      // TODO: 에러 메시지 표시 (토스트 등)
    }
  };

  // 홈 데이터 조회
  useEffect(() => {
    fetchAndUpdateHomeData();
  }, []);

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
              <S.SectionTitle>Quiz Room</S.SectionTitle>
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
              <S.SectionTitle>Q&A 게시판</S.SectionTitle>
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
              <S.ActionButtonSmallText>입장코드</S.ActionButtonSmallText>
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
