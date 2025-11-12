import * as S from './QuizCard.styles';

interface QuizCardProps {
  difficulty: string;
  title: string;
  participantInfo: string;
  onSolve: () => void;
}

export const QuizCard = ({ difficulty, title, participantInfo, onSolve }: QuizCardProps) => {
  return (
    <S.Card>
      <S.Difficulty>{difficulty}</S.Difficulty>
      <S.Title>{title}</S.Title>
      <S.ParticipantInfo>{participantInfo}</S.ParticipantInfo>
      <S.SolveButton onClick={onSolve}>문제 풀기</S.SolveButton>
    </S.Card>
  );
};
