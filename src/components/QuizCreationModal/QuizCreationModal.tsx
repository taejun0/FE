import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import * as S from './QuizCreationModal.styles';

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

interface QuizCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (questions: QuizQuestion[]) => void;
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

export const QuizCreationModal = ({
  isOpen,
  onClose,
  onSubmit,
}: QuizCreationModalProps) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([
    createEmptyQuestion(),
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const questionsRef = useRef(questions);

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

  return (
    <S.Overlay onClick={onClose}>
      <S.Modal onClick={(event) => event.stopPropagation()}>
        <S.Header>
          <S.Title>NEW Quiz</S.Title>
          <S.Subtitle>사용자 직접 생성 (스킬 가능)</S.Subtitle>
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
