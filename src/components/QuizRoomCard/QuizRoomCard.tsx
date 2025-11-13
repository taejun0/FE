import * as S from './QuizRoomCard.styles';

type QuizRoomCardProps = {
  examTag: string;
  roomName: string;
  participantCount: number;
  isJoined?: boolean;
  avatarImage?: string;
  onEnter: () => void;
  onExit?: () => void;
  isLeader?: boolean;
};

export const QuizRoomCard = ({
  examTag,
  roomName,
  participantCount,
  isJoined = false,
  avatarImage,
  onEnter,
  onExit,
  isLeader = false,
}: QuizRoomCardProps) => {
  return (
    <S.Card>
      <S.ExamTag>{examTag}</S.ExamTag>
      <S.AvatarWrapper>
        {avatarImage ? (
          <S.AvatarImage src={avatarImage} alt={roomName} />
        ) : (
          <S.AvatarFallback />
        )}
      </S.AvatarWrapper>
      <S.RoomName>{roomName}</S.RoomName>
      <S.ParticipantCount>{participantCount}명 참여 중</S.ParticipantCount>
      <S.ButtonGroup>
        <S.EnterButton onClick={onEnter}>입장하기</S.EnterButton>
        {isJoined && onExit && (
          <S.ExitButton onClick={onExit} $isLeader={isLeader}>
            {isLeader ? '삭제하기' : '퇴장하기'}
          </S.ExitButton>
        )}
      </S.ButtonGroup>
    </S.Card>
  );
};
