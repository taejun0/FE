import { useMemo, useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as S from './RoomDetailPage.styles';
import logoQroomText from '../../assets/images/Logo.png';
import ggoom1Image from '../../assets/images/ggoom/ggoom1.png';
import folderImage from '../../assets/images/File.png';
import moreIcon from '../../assets/images/threedot.png';
import qeImage from '../../assets/images/qe.png';
import { QuizCard } from '@components/QuizCard';
import { QnACard } from '@components/QnACard';
import { CHARACTER_IMAGES } from '@constants/characterImages';
import {
  ROUTE_PATHS,
  buildQuizPath,
  buildQuizQaPath,
} from '@constants/RouteConstants';
import { ExamInfo } from '@components/ExamInfoModal/ExamInfoModal';
import { QuizCreationModal } from '@components/QuizCreationModal';
import {
  getGroupDetail,
  uploadPdf,
  getPdfList,
  PdfListItem,
  startQuiz,
} from '@services/homeService';
import { trackEvent } from '@utils/analytics';

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

const getDifficultyLabel = (difficulty: string | null): string => {
  if (!difficulty) {
    return '사용자 지정';
  }
  const difficultyMap: Record<string, string> = {
    상: '난이도 상',
    중: '난이도 중',
    하: '난이도 하',
  };
  return difficultyMap[difficulty] || `난이도 ${difficulty}`;
};

export const RoomDetailPage = () => {
  const navigate = useNavigate();
  const { roomId } = useParams<{ roomId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [groupData, setGroupData] = useState<Awaited<
    ReturnType<typeof getGroupDetail>
  > | null>(null);
  const [pdfList, setPdfList] = useState<PdfListItem[]>([]);

  const fetchGroupDetail = useCallback(async () => {
    if (!roomId) {
      navigate(ROUTE_PATHS.HOME, { replace: true });
      return;
    }

    try {
      setIsLoading(true);
      const [data, pdfData] = await Promise.all([
        getGroupDetail(Number(roomId)),
        getPdfList(Number(roomId)),
      ]);
      setGroupData(data);
      setPdfList(pdfData.pdfList);
    } catch (error) {
      console.error('그룹 디테일 조회 실패:', error);
      navigate(ROUTE_PATHS.HOME, { replace: true });
    } finally {
      setIsLoading(false);
    }
  }, [navigate, roomId]);

  useEffect(() => {
    fetchGroupDetail();
  }, [fetchGroupDetail]);

  const groupName = groupData?.group.name ?? '';
  const examDate = groupData?.group.examDate
    ? formatExamDate(groupData.group.examDate)
    : '';
  const entranceCode = groupData?.group.groupCode ?? '';
  const participantCount = groupData?.group.memberCount ?? 0;
  const characterId = useMemo(() => {
    if (!groupData?.group.id) return 1;
    return ((groupData.group.id - 1) % 9) + 1;
  }, [groupData?.group.id]);

  const characterImage = useMemo(() => {
    return CHARACTER_IMAGES[characterId] ?? CHARACTER_IMAGES[1];
  }, [characterId]);

  const mates = useMemo(() => {
    return groupData?.group.members ?? [];
  }, [groupData?.group.members]);

  const rankingData = useMemo(() => {
    return (
      groupData?.ranking.all_ranks.map((rank) => ({
        rank: rank.position,
        name: rank.nickname,
      })) ?? []
    );
  }, [groupData?.ranking.all_ranks]);

  const currentRank = groupData?.ranking.my_rank ?? 0;

  const quizCards = useMemo(() => {
    return (
      groupData?.quizzes.map((quiz) => ({
        id: quiz.id,
        difficulty: getDifficultyLabel(quiz.difficulty),
        title: quiz.title,
        participantInfo: `${quiz.participants_count}명 참여 중`,
      })) ?? []
    );
  }, [groupData?.quizzes]);

  const qnaData = useMemo(() => {
    return (
      groupData?.qa_boards.map((qa) => ({
        id: qa.board_id,
        boardId: qa.board_id,
        tag: '오답풀이 및 질문',
        title: qa.title,
        performance: qa.progress,
      })) ?? []
    );
  }, [groupData?.qa_boards]);

  const pdfFiles = useMemo(() => {
    return pdfList.map((pdf) => ({
      id: pdf.id,
      title: pdf.title,
      fileUrl: pdf.fileUrl,
    }));
  }, [pdfList]);

  const handlePdfClick = (fileUrl: string) => {
    setSelectedPdfUrl(fileUrl);
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

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !roomId || !groupData) return;

    // PDF 파일만 허용
    if (
      file.type !== 'application/pdf' &&
      !file.name.toLowerCase().endsWith('.pdf')
    ) {
      alert('PDF 파일만 업로드 가능합니다.');
      return;
    }

    try {
      setIsUploading(true);
      await uploadPdf(Number(roomId), file);
      // 업로드 성공 후 그룹 디테일 다시 불러오기
      await fetchGroupDetail();
    } catch (error) {
      console.error('PDF 업로드 실패:', error);
      alert('PDF 업로드에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setIsUploading(false);
      // 파일 입력 초기화
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleQuizSolve = async (quizId: number) => {
    try {
      const result = await startQuiz({ quiz_id: quizId });
      // quiz_result_id를 localStorage에 저장
      localStorage.setItem('quiz_result_id', result.quiz_result_id.toString());
      
      // GA 이벤트 추적
      trackEvent('Quiz', 'Start', `quiz_${quizId}`, quizId);
      
      // 퀴즈 페이지로 이동
      navigate(buildQuizPath(quizId));
    } catch (error) {
      console.error('퀴즈 시작 실패:', error);
      alert('퀴즈를 시작할 수 없습니다. 다시 시도해 주세요.');
    }
  };

  const handleQnAEnter = (boardId: number) => {
    // GA 이벤트 추적
    trackEvent('Q&A', 'Enter', `board_${boardId}`, boardId);
    navigate(buildQuizQaPath(boardId));
  };

  if (isLoading || !groupData) {
    return null;
  }

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

        <S.MateSectionWrapper>
          <S.MateSection>
            <S.MateInfo>
              <S.MateTitle>Mate ({participantCount})</S.MateTitle>
              <S.CopyCodeButton type="button" onClick={handleCopyCode}>
                입장 코드 복사
              </S.CopyCodeButton>
            </S.MateInfo>
            <S.MateList>
              {mates.map((mate) => (
                <S.MateAvatar key={mate.id}>
                  <S.MateAvatarImage>
                    <img src={characterImage} alt={mate.nickname} />
                  </S.MateAvatarImage>
                  <span>{mate.nickname}</span>
                </S.MateAvatar>
              ))}
            </S.MateList>
          </S.MateSection>
        </S.MateSectionWrapper>
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
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                style={{ display: 'none' }}
                onChange={handleFileChange}
                disabled={isUploading}
              />
              <S.UploadLeft
                onClick={handleFileSelect}
                style={{ cursor: isUploading ? 'not-allowed' : 'pointer' }}
              >
                <S.UploadFolderImage src={folderImage} alt="folder" />
                <S.UploadLeftLabel>
                  {isUploading ? '업로드 중...' : 'PDF 파일 업로드'}
                </S.UploadLeftLabel>
              </S.UploadLeft>
              <S.UploadDivider />
              <S.UploadRight>
                <S.UploadRightHeader>
                  <S.UploadRightTitle>업로드된 파일</S.UploadRightTitle>
                  <S.MoreButton type="button">
                    <S.MoreIcon src={moreIcon} alt="더보기" />
                  </S.MoreButton>
                </S.UploadRightHeader>
                {pdfFiles.length === 0 ? (
                  <S.UploadDescription>
                    아직 업로드된 파일이 없어요!
                  </S.UploadDescription>
                ) : (
                  <S.PdfList>
                    {pdfFiles.map((pdf) => (
                      <S.PdfItem
                        key={pdf.id}
                        onClick={() => handlePdfClick(pdf.fileUrl)}
                      >
                        {pdf.title}
                      </S.PdfItem>
                    ))}
                  </S.PdfList>
                )}
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
                    key={quiz.id}
                    difficulty={quiz.difficulty}
                    title={quiz.title}
                    participantInfo={quiz.participantInfo}
                    onSolve={() => handleQuizSolve(quiz.id)}
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
                {qnaData.map((item) => (
                  <QnACard
                    key={item.id}
                    tag={item.tag}
                    title={item.title}
                    performance={item.performance}
                    onEnter={() => handleQnAEnter(item.boardId)}
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
        onSuccess={() => {
          // 퀴즈 생성 성공 시 데이터 새로고침
          fetchGroupDetail();
        }}
        pdfFiles={pdfFiles}
        groupId={roomId ? Number(roomId) : undefined}
      />
      {selectedPdfUrl && (
        <S.PdfModalOverlay onClick={() => setSelectedPdfUrl(null)}>
          <S.PdfModalContent onClick={(e) => e.stopPropagation()}>
            <S.PdfModalHeader>
              <S.PdfModalTitle>PDF 보기</S.PdfModalTitle>
              <S.PdfModalCloseButton
                type="button"
                onClick={() => setSelectedPdfUrl(null)}
              >
                ✕
              </S.PdfModalCloseButton>
            </S.PdfModalHeader>
            <S.PdfModalBody>
              <iframe
                src={selectedPdfUrl}
                title="PDF Viewer"
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
              />
            </S.PdfModalBody>
          </S.PdfModalContent>
        </S.PdfModalOverlay>
      )}
    </S.Wrapper>
  );
};

export default RoomDetailPage;
