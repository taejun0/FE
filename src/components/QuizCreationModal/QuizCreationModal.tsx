import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import * as S from './QuizCreationModal.styles';
import fileImage from '../../assets/images/File.png';
import { createQuiz, createUserQuiz } from '@services/homeService';
import { ApiError } from '@services/apiClient';

export type QuizQuestionType = 'OX' | 'MULTIPLE_CHOICE' | 'FILL_IN';

interface QuizQuestion {
  id: string;
  type: QuizQuestionType;
  question: string;
  oxAnswer: 'O' | 'X' | '';
  choices: string[];
  answer: string;
  explanation: string;
  image: File | null | undefined;
  imagePreview: string;
}

interface PdfFile {
  id: number;
  title: string;
  fileUrl: string;
}

interface QuizCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (questions: QuizQuestion[]) => void;
  onSuccess?: () => void;
  pdfFiles?: PdfFile[];
  groupId?: number; // 사용자 지정 퀴즈 생성 시 필요
}

const createEmptyQuestion = (): QuizQuestion => ({
  id: crypto.randomUUID(),
  type: 'OX',
  question: '',
  oxAnswer: '',
  choices: ['', '', '', ''],
  answer: '',
  explanation: '',
  image: null,
  imagePreview: '',
});

export type QuizCreationMode = 'AI' | 'MANUAL' | null;

export const QuizCreationModal = ({
  isOpen,
  onClose,
  onSubmit,
  onSuccess,
  pdfFiles = [],
  groupId,
}: QuizCreationModalProps) => {
  const [creationMode, setCreationMode] = useState<QuizCreationMode>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([
    createEmptyQuestion(),
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const questionsRef = useRef(questions);
  const [quizTitle, setQuizTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // AI 생성 모드 state
  const [selectedPdfId, setSelectedPdfId] = useState<number | null>(null);
  const [aiQuestionTypes, setAiQuestionTypes] = useState<QuizQuestionType[]>(
    []
  );
  const [aiQuestionCount, setAiQuestionCount] = useState<string>('');
  const [aiExamDate, setAiExamDate] = useState<string>('');
  const [aiDifficulty, setAiDifficulty] = useState<'상' | '중' | '하' | ''>('');
  const [isCreatingQuiz, setIsCreatingQuiz] = useState(false);

  useEffect(() => {
    questionsRef.current = questions;
  }, [questions]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        const target = trackRef.current?.querySelector<HTMLInputElement>(
          `input[data-question-index="${currentIndex}"]`
        );
        target?.focus();
      }, 0);
    }
  }, [isOpen, currentIndex]);

  useEffect(
    () => () => {
      questionsRef.current.forEach((question) => {
        if (question.imagePreview) {
          URL.revokeObjectURL(question.imagePreview);
        }
      });
    },
    []
  );

  useEffect(() => {
    if (!isOpen) {
      questionsRef.current.forEach((question) => {
        if (question.imagePreview) {
          URL.revokeObjectURL(question.imagePreview);
        }
      });
      setQuestions([createEmptyQuestion()]);
      setCurrentIndex(0);
      setCreationMode(null);
      setQuizTitle('');
      setIsSubmitting(false);
      // AI 모드 state 초기화
      setSelectedPdfId(null);
      setAiQuestionTypes([]);
      setAiQuestionCount('');
      setAiExamDate('');
      setAiDifficulty('');
      setIsCreatingQuiz(false);
    }
  }, [isOpen]);

  const previousLengthRef = useRef(questions.length);
  useEffect(() => {
    if (questions.length > previousLengthRef.current) {
      setCurrentIndex(questions.length - 1);
    } else if (currentIndex >= questions.length) {
      setCurrentIndex(Math.max(0, questions.length - 1));
    }
    previousLengthRef.current = questions.length;
  }, [questions.length, currentIndex]);

  const handleTypeChange = (index: number, type: QuizQuestionType) => {
    setQuestions((prev) =>
      prev.map((question, idx) =>
        idx === index
          ? {
              ...question,
              type,
              oxAnswer: type === 'OX' ? question.oxAnswer : '',
              choices:
                type === 'MULTIPLE_CHOICE'
                  ? question.choices
                  : ['', '', '', ''],
              answer:
                type === 'FILL_IN' || type === 'MULTIPLE_CHOICE'
                  ? question.answer
                  : '',
            }
          : question
      )
    );
  };

  const handleQuestionChange = (index: number, value: string) => {
    setQuestions((prev) =>
      prev.map((question, idx) =>
        idx === index ? { ...question, question: value } : question
      )
    );
  };

  const handleOXAnswer = (index: number, value: 'O' | 'X') => {
    setQuestions((prev) =>
      prev.map((question, idx) =>
        idx === index ? { ...question, oxAnswer: value } : question
      )
    );
  };

  const handleChoiceChange = (
    questionIdx: number,
    choiceIdx: number,
    value: string
  ) => {
    setQuestions((prev) =>
      prev.map((question, idx) =>
        idx === questionIdx
          ? {
              ...question,
              choices: question.choices.map((choice, cIdx) =>
                cIdx === choiceIdx ? value : choice
              ),
            }
          : question
      )
    );
  };

  const handleAnswerChange = (index: number, value: string) => {
    setQuestions((prev) =>
      prev.map((question, idx) =>
        idx === index ? { ...question, answer: value } : question
      )
    );
  };

  const handleExplanationChange = (index: number, value: string) => {
    setQuestions((prev) =>
      prev.map((question, idx) =>
        idx === index ? { ...question, explanation: value } : question
      )
    );
  };

  const handleAddQuestion = () => {
    setQuestions((prev) => [...prev, createEmptyQuestion()]);
  };

  const handleRemoveQuestion = (index: number) => {
    if (questions.length === 1) {
      if (questions[0].imagePreview) {
        URL.revokeObjectURL(questions[0].imagePreview);
      }
      setQuestions([createEmptyQuestion()]);
      setCurrentIndex(0);
      return;
    }

    if (questions[index].imagePreview) {
      URL.revokeObjectURL(questions[index].imagePreview);
    }
    setQuestions((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleImageChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setQuestions((prev) => {
      const next = [...prev];
      const target = next[index];
      if (!target) return prev;

      if (target.imagePreview) {
        URL.revokeObjectURL(target.imagePreview);
      }

      next[index] = {
        ...target,
        image: file,
        imagePreview: URL.createObjectURL(file),
      };

      return next;
    });
  };

  const handleRemoveImage = (index: number) => {
    setQuestions((prev) => {
      const next = [...prev];
      const target = next[index];
      if (!target) return prev;

      if (target.imagePreview) {
        URL.revokeObjectURL(target.imagePreview);
      }

      const clearedQuestion: QuizQuestion = {
        ...target,
        image: null,
        imagePreview: '',
      };

      next[index] = clearedQuestion;

      return next;
    });
  };

  const isQuestionComplete = (question: QuizQuestion) => {
    const hasPrompt = question.question.trim().length > 0;
    if (!hasPrompt) return false;

    if (question.type === 'OX') {
      return question.oxAnswer !== '';
    }

    if (question.type === 'MULTIPLE_CHOICE') {
      const allChoicesFilled = question.choices.every(
        (choice) => choice.trim().length > 0
      );
      return allChoicesFilled;
    }

    return question.answer.trim().length > 0;
  };

  const isQuizFormValid = useMemo(
    () =>
      quizTitle.trim().length > 0 &&
      questions.length > 0 &&
      questions.every(isQuestionComplete),
    [questions, quizTitle]
  );

  const handleSubmit = async () => {
    if (!isQuizFormValid || isSubmitting) return;

    // groupId가 있으면 API 호출, 없으면 기존 onSubmit 콜백 사용
    if (groupId) {
      try {
        setIsSubmitting(true);
        // QuizQuestion을 API 형식으로 변환
        const apiQuestions = questions
          .filter((q) => isQuestionComplete(q)) // 완성된 문제만 필터링
          .map((q, index) => {
            const baseQuestion = {
              question_number: index + 1,
              question_text: q.question.trim(),
              explanation: q.explanation?.trim() || '',
            };

            if (q.type === 'OX') {
              if (
                q.oxAnswer === '' ||
                (q.oxAnswer !== 'O' && q.oxAnswer !== 'X')
              ) {
                throw new Error('OX 문제의 정답을 선택해주세요.');
              }
              return {
                ...baseQuestion,
                type: 'OX' as const,
                correct_answer: q.oxAnswer,
              };
            } else if (q.type === 'MULTIPLE_CHOICE') {
              // 첫 번째 choice가 정답
              if (!q.choices || q.choices.length === 0) {
                throw new Error('객관식 문제의 보기를 입력해주세요.');
              }
              // 모든 choice가 채워져 있어야 함 (isQuestionComplete에서 검증됨)
              const correctIndex = 0;
              const correctAnswer = String.fromCharCode(65 + correctIndex); // 'A', 'B', 'C', 'D'
              return {
                ...baseQuestion,
                type: '객관식' as const,
                correct_answer: correctAnswer,
                options: q.choices.map((choice, idx) => ({
                  option_text: `${String.fromCharCode(
                    65 + idx
                  )}. ${choice.trim()}`,
                })),
              };
            } else {
              // FILL_IN
              if (!q.answer || q.answer.trim() === '') {
                throw new Error('단답형 문제의 정답을 입력해주세요.');
              }
              return {
                ...baseQuestion,
                type: '단답형' as const,
                correct_answer: q.answer.trim(),
              };
            }
          });

        await createUserQuiz({
          group_id: groupId,
          title: quizTitle.trim(),
          questions: apiQuestions,
        });

        onSuccess?.();
        onClose();
      } catch (error) {
        console.error('사용자 지정 퀴즈 생성 실패:', error);
        let errorMessage = '퀴즈 생성에 실패했습니다. 다시 시도해 주세요.';

        if (error instanceof ApiError) {
          if (
            error.body &&
            typeof error.body === 'object' &&
            'message' in error.body
          ) {
            errorMessage = (error.body as { message: string }).message;
          } else if (error.message) {
            errorMessage = error.message;
          }
        }

        alert(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // 기존 방식 (onSubmit 콜백)
      onSubmit?.(questions);
      onClose();
    }
  };

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < questions.length - 1;

  if (!isOpen) return null;

  // 초기 선택 화면
  if (creationMode === null) {
    return (
      <S.Overlay onClick={onClose}>
        <S.Modal onClick={(event) => event.stopPropagation()}>
          <S.Header>
            <S.Title>NEW Quiz</S.Title>
          </S.Header>

          <S.ModeSelectionContainer>
            <S.ModeOption type="button" onClick={() => setCreationMode('AI')}>
              <S.ModeTitle>AI 생성</S.ModeTitle>
            </S.ModeOption>
            <S.ModeOption
              type="button"
              onClick={() => setCreationMode('MANUAL')}
            >
              <S.ModeTitle>사용자 직접 생성</S.ModeTitle>
            </S.ModeOption>
          </S.ModeSelectionContainer>
        </S.Modal>
      </S.Overlay>
    );
  }

  // AI 생성 모드 UI
  if (creationMode === 'AI') {
    const isAiFormValid =
      selectedPdfId !== null &&
      aiQuestionTypes.length > 0 &&
      aiQuestionCount !== '' &&
      parseInt(aiQuestionCount) > 0 &&
      parseInt(aiQuestionCount) <= 15 &&
      aiExamDate !== '' &&
      aiDifficulty !== '';

    const convertQuestionTypeToApi = (type: QuizQuestionType): string => {
      const typeMap: Record<QuizQuestionType, string> = {
        OX: 'OX',
        MULTIPLE_CHOICE: '객관식',
        FILL_IN: '단답형',
      };
      return typeMap[type];
    };

    const handleQuestionTypeToggle = (type: QuizQuestionType) => {
      setAiQuestionTypes((prev) => {
        const newTypes = prev.includes(type)
          ? prev.filter((t) => t !== type)
          : [...prev, type];
        console.log('문제 유형 선택:', newTypes);
        return newTypes;
      });
    };

    const handleAiNext = async () => {
      if (
        !selectedPdfId ||
        !aiQuestionCount ||
        !aiDifficulty ||
        aiQuestionTypes.length === 0
      )
        return;

      try {
        setIsCreatingQuiz(true);
        const questionTypesArray = aiQuestionTypes.map(
          convertQuestionTypeToApi
        );
        console.log('전송할 문제 유형 배열:', questionTypesArray);
        const payload = {
          pdf_id: selectedPdfId,
          difficulty: aiDifficulty,
          question_types: questionTypesArray,
          total_questions: parseInt(aiQuestionCount),
        };

        const result = await createQuiz(payload);
        console.log('퀴즈 생성 성공:', result);
        // 성공 시 모달 닫기 및 콜백 호출
        onClose();
        onSuccess?.();
      } catch (error) {
        console.error('퀴즈 생성 실패:', error);
        let errorMessage = '퀴즈 생성에 실패했습니다. 다시 시도해 주세요.';

        if (error instanceof ApiError) {
          // API 응답에서 메시지 추출
          if (
            error.body &&
            typeof error.body === 'object' &&
            'message' in error.body
          ) {
            errorMessage = (error.body as { message: string }).message;
          } else if (error.message) {
            errorMessage = error.message;
          }
        }

        alert(errorMessage);
      } finally {
        setIsCreatingQuiz(false);
      }
    };

    return (
      <S.Overlay onClick={onClose}>
        <S.Modal onClick={(event) => event.stopPropagation()}>
          <S.Header>
            <S.Title>NEW Quiz</S.Title>
            <S.Subtitle>AI 생성</S.Subtitle>
          </S.Header>

          <S.AiFormContainer>
            <S.FormSection>
              <S.Label>* PDF 파일 선택</S.Label>
              <S.PdfFileGrid>
                {pdfFiles.length === 0 ? (
                  <S.EmptyPdfMessage>
                    업로드된 PDF 파일이 없습니다.
                  </S.EmptyPdfMessage>
                ) : (
                  pdfFiles.map((pdf) => (
                    <S.PdfFileCard
                      key={pdf.id}
                      type="button"
                      $selected={selectedPdfId === pdf.id}
                      onClick={() => setSelectedPdfId(pdf.id)}
                    >
                      <S.PdfFileIcon>
                        <img src={fileImage} alt="PDF file" />
                      </S.PdfFileIcon>
                      <S.PdfFileName>{pdf.title}</S.PdfFileName>
                    </S.PdfFileCard>
                  ))
                )}
              </S.PdfFileGrid>
            </S.FormSection>

            <S.FormSection>
              <S.Label>*문제 유형 (중복 선택 가능)</S.Label>
              <S.SegmentedControl>
                <S.SegmentButton
                  type="button"
                  $active={aiQuestionTypes.includes('OX')}
                  onClick={() => handleQuestionTypeToggle('OX')}
                >
                  O,X
                </S.SegmentButton>
                <S.SegmentButton
                  type="button"
                  $active={aiQuestionTypes.includes('MULTIPLE_CHOICE')}
                  onClick={() => handleQuestionTypeToggle('MULTIPLE_CHOICE')}
                >
                  객관식
                </S.SegmentButton>
                <S.SegmentButton
                  type="button"
                  $active={aiQuestionTypes.includes('FILL_IN')}
                  onClick={() => handleQuestionTypeToggle('FILL_IN')}
                >
                  빈칸문제
                </S.SegmentButton>
              </S.SegmentedControl>
            </S.FormSection>

            <S.FormSection>
              <S.Label>* 문제 개수 (15개 이하만 가능)</S.Label>
              <S.Input
                type="number"
                min="1"
                max="15"
                placeholder="00개"
                value={aiQuestionCount}
                onChange={(e) => {
                  const value = e.target.value;
                  if (
                    value === '' ||
                    (parseInt(value) >= 1 && parseInt(value) <= 15)
                  ) {
                    setAiQuestionCount(value);
                  }
                }}
              />
            </S.FormSection>

            <S.FormSection>
              <S.Label>* 시험 일자</S.Label>
              <S.Input
                type="text"
                placeholder="20xx.xx.xx"
                value={aiExamDate}
                onChange={(e) => setAiExamDate(e.target.value)}
              />
            </S.FormSection>

            <S.FormSection>
              <S.Label>* 문제 난이도</S.Label>
              <S.SegmentedControl>
                <S.SegmentButton
                  type="button"
                  $active={aiDifficulty === '상'}
                  onClick={() => setAiDifficulty('상')}
                >
                  상
                </S.SegmentButton>
                <S.SegmentButton
                  type="button"
                  $active={aiDifficulty === '중'}
                  onClick={() => setAiDifficulty('중')}
                >
                  중
                </S.SegmentButton>
                <S.SegmentButton
                  type="button"
                  $active={aiDifficulty === '하'}
                  onClick={() => setAiDifficulty('하')}
                >
                  하
                </S.SegmentButton>
              </S.SegmentedControl>
            </S.FormSection>

            <S.AiNextButton
              type="button"
              onClick={handleAiNext}
              disabled={!isAiFormValid || isCreatingQuiz}
            >
              {isCreatingQuiz ? '생성 중...' : '다음'}
            </S.AiNextButton>
          </S.AiFormContainer>
        </S.Modal>
      </S.Overlay>
    );
  }

  // 사용자 직접 생성 모드 UI
  return (
    <S.Overlay onClick={onClose}>
      <S.Modal onClick={(event) => event.stopPropagation()}>
        <S.Header>
          <S.Title>NEW Quiz</S.Title>
          <S.Subtitle>사용자 직접 생성</S.Subtitle>
        </S.Header>

        <S.FormSection>
          <S.Label>* 퀴즈 제목</S.Label>
          <S.Input
            placeholder="퀴즈 제목을 입력하세요."
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
          />
        </S.FormSection>

        <S.TrackWrapper>
          <S.Track
            ref={trackRef}
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {questions.map((question, index) => (
              <S.Slide key={question.id}>
                <S.FormSection>
                  <S.Label>* 문제 유형</S.Label>
                  <S.SegmentedControl>
                    <S.SegmentButton
                      type="button"
                      $active={question.type === 'OX'}
                      onClick={() => handleTypeChange(index, 'OX')}
                    >
                      O,X
                    </S.SegmentButton>
                    <S.SegmentButton
                      type="button"
                      $active={question.type === 'MULTIPLE_CHOICE'}
                      onClick={() => handleTypeChange(index, 'MULTIPLE_CHOICE')}
                    >
                      객관식
                    </S.SegmentButton>
                    <S.SegmentButton
                      type="button"
                      $active={question.type === 'FILL_IN'}
                      onClick={() => handleTypeChange(index, 'FILL_IN')}
                    >
                      빈칸문제
                    </S.SegmentButton>
                  </S.SegmentedControl>
                </S.FormSection>

                <S.FormSection>
                  <S.Label>* 문제</S.Label>
                  <S.Input
                    placeholder="퀴즈 문제를 입력하세요."
                    value={question.question}
                    data-question-index={index}
                    onChange={(e) =>
                      handleQuestionChange(index, e.target.value)
                    }
                  />
                </S.FormSection>

                <S.FormSection>
                  <S.Label>* 답안</S.Label>
                  {question.type === 'OX' && (
                    <S.OXButtonGroup>
                      <S.OXButton
                        type="button"
                        $active={question.oxAnswer === 'O'}
                        onClick={() => handleOXAnswer(index, 'O')}
                      >
                        O
                      </S.OXButton>
                      <S.OXButton
                        type="button"
                        $active={question.oxAnswer === 'X'}
                        onClick={() => handleOXAnswer(index, 'X')}
                      >
                        X
                      </S.OXButton>
                    </S.OXButtonGroup>
                  )}

                  {question.type === 'MULTIPLE_CHOICE' && (
                    <S.MultipleChoiceGroup>
                      {question.choices.map((choice, choiceIdx) => (
                        <S.Input
                          key={choiceIdx}
                          placeholder={
                            choiceIdx === 0
                              ? '퀴즈의 답을 적어주세요.'
                              : '보기를 적어주세요.'
                          }
                          value={choice}
                          data-question-index={index}
                          onChange={(e) =>
                            handleChoiceChange(index, choiceIdx, e.target.value)
                          }
                        />
                      ))}
                    </S.MultipleChoiceGroup>
                  )}

                  {question.type === 'FILL_IN' && (
                    <S.Input
                      placeholder="퀴즈의 답을 적어주세요."
                      value={question.answer}
                      data-question-index={index}
                      onChange={(e) =>
                        handleAnswerChange(index, e.target.value)
                      }
                    />
                  )}
                </S.FormSection>

                <S.FormSection>
                  <S.Label>* 설명</S.Label>
                  <S.Input
                    placeholder="문제에 대한 설명을 입력하세요."
                    value={question.explanation}
                    data-question-index={index}
                    onChange={(e) =>
                      handleExplanationChange(index, e.target.value)
                    }
                  />
                </S.FormSection>

                <S.QuestionFooter>
                  <S.RemoveButton
                    type="button"
                    onClick={() => handleRemoveQuestion(index)}
                  >
                    문제 삭제
                  </S.RemoveButton>
                </S.QuestionFooter>
              </S.Slide>
            ))}
          </S.Track>
        </S.TrackWrapper>

        <S.SliderControls>
          <S.SliderButton
            type="button"
            disabled={!canGoPrev}
            onClick={() => setCurrentIndex((prev) => prev - 1)}
          >
            이전
          </S.SliderButton>
          <S.SliderIndicator>
            {currentIndex + 1} / {questions.length}
          </S.SliderIndicator>
          <S.SliderButton
            type="button"
            disabled={!canGoNext}
            onClick={() => setCurrentIndex((prev) => prev + 1)}
          >
            다음
          </S.SliderButton>
        </S.SliderControls>

        <S.FooterButtons>
          <S.AddQuestionButton type="button" onClick={handleAddQuestion}>
            + 문제 추가
          </S.AddQuestionButton>
          <S.SubmitButton
            type="button"
            onClick={handleSubmit}
            disabled={!isQuizFormValid || isSubmitting}
          >
            {isSubmitting ? '생성 중...' : '문제 생성'}
          </S.SubmitButton>
        </S.FooterButtons>
      </S.Modal>
    </S.Overlay>
  );
};
