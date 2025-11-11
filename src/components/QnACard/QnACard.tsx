import * as S from './QnACard.styles';

type QnACardProps = {
  tag: string;
  title: string;
  performance: string;
  onEnter: () => void;
};

export const QnACard = ({ tag, title, performance, onEnter }: QnACardProps) => {
  return (
    <S.Card>
      <S.Tag>{tag}</S.Tag>
      <S.Title>{title}</S.Title>
      <S.Performance>{performance}</S.Performance>
      <S.EnterButton onClick={onEnter}>입장하기</S.EnterButton>
    </S.Card>
  );
};
