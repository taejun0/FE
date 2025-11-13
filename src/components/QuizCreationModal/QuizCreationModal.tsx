import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import * as S from './QuizCreationModal.styles';
import fileImage from '../../assets/images/File.png';
import { createQuiz } from '@services/homeService';
import { ApiError } from '@services/apiClient';

export type QuizQuestionType = 'OX' | 'MULTIPLE_CHOICE' | 'FILL_IN';

interface QuizQuestion {
  id: string;
  type: QuizQuestionType;
  question: string;
  oxAnswer: 'O' | 'X' | '';
  choices: string[];
  answer: string;
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
}

const createEmptyQuestion = (): QuizQuestion => ({
  id: crypto.randomUUID(),
  type: 'OX',
  question: '',
  oxAnswer: '',
  choices: ['', '', '', ''],
  answer: '',
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
}: QuizCreationModalProps) => {
  const [creationMode, setCreationMode] = useState<QuizCreationMode>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([
    createEmptyQuestion(),
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const questionsRef = useRef(questions);

  // AI 생성 모드 state
  const [selectedPdfId, setSelectedPdfId] = useState<number | null>(null);
  const [aiQuestionType, setAiQuestionType] = useState<QuizQuestionType>('OX');
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
      // AI 모드 state 초기화
      setSelectedPdfId(null);
      setAiQuestionType('OX');
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
    () => questions.length > 0 && questions.every(isQuestionComplete),
    [questions]
  );

  const handleSubmit = () => {
    if (!isQuizFormValid) return;
    onSubmit?.(questions);
    onClose();
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

    const handleAiNext = async () => {
      if (!selectedPdfId || !aiQuestionCount || !aiDifficulty) return;

      try {
        setIsCreatingQuiz(true);
        const payload = {
          pdf_id: selectedPdfId,
          difficulty: aiDifficulty,
          question_types: [convertQuestionTypeToApi(aiQuestionType)],
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
              <S.Label>*PDF 파일 선택</S.Label>
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
              <S.Label>*문제 유형</S.Label>
              <S.SegmentedControl>
                <S.SegmentButton
                  type="button"
                  $active={aiQuestionType === 'OX'}
                  onClick={() => setAiQuestionType('OX')}
                >
                  O,X
                </S.SegmentButton>
                <S.SegmentButton
                  type="button"
                  $active={aiQuestionType === 'MULTIPLE_CHOICE'}
                  onClick={() => setAiQuestionType('MULTIPLE_CHOICE')}
                >
                  객관식
                </S.SegmentButton>
                <S.SegmentButton
                  type="button"
                  $active={aiQuestionType === 'FILL_IN'}
                  onClick={() => setAiQuestionType('FILL_IN')}
                >
                  빈칸문제
                </S.SegmentButton>
              </S.SegmentedControl>
            </S.FormSection>

            <S.FormSection>
              <S.Label>*문제 개수 (15개 이하만 가능)</S.Label>
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
              <S.Label>*시험 일자</S.Label>
              <S.Input
                type="text"
                placeholder="20xx.xx.xx"
                value={aiExamDate}
                onChange={(e) => setAiExamDate(e.target.value)}
              />
            </S.FormSection>

            <S.FormSection>
              <S.Label>*문제 난이도</S.Label>
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
                  <S.Label>문제 유형</S.Label>
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
                  <S.Label>문제</S.Label>
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
                  <S.Label>답안</S.Label>
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
                  <S.Label>이미지 추가</S.Label>
                  <S.UploadBox
                    role="button"
                    tabIndex={0}
                    $hasPreview={Boolean(question.imagePreview)}
                    onClick={() =>
                      document
                        .getElementById(`file-input-${question.id}`)
                        ?.click()
                    }
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        document
                          .getElementById(`file-input-${question.id}`)
                          ?.click();
                      }
                    }}
                  >
                    {question.imagePreview ? (
                      <S.UploadPreview>
                        <S.UploadPreviewImage
                          src={question.imagePreview}
                          alt="quiz"
                        />
                        <S.UploadPreviewFooter>
                          <span>{question.image?.name}</span>
                          <S.RemoveImageButton
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                          >
                            이미지 삭제
                          </S.RemoveImageButton>
                        </S.UploadPreviewFooter>
                      </S.UploadPreview>
                    ) : (
                      <S.UploadPlaceholder>jpeg, png</S.UploadPlaceholder>
                    )}
                  </S.UploadBox>
                  <S.HiddenFileInput
                    id={`file-input-${question.id}`}
                    type="file"
                    accept="image/png, image/jpeg"
                    data-question-index={index}
                    onChange={(event) => handleImageChange(index, event)}
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
            disabled={!isQuizFormValid}
          >
            문제 생성
          </S.SubmitButton>
        </S.FooterButtons>
      </S.Modal>
    </S.Overlay>
  );
};
