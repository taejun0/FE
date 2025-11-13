import { MouseEvent } from 'react';
import * as S from './ExitRoomModal.styles';

type ExitRoomModalProps = {
  isOpen: boolean;
  roomName: string;
  characterImage?: string;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
};

export const ExitRoomModal = ({
  isOpen,
  roomName,
  characterImage,
  onConfirm,
  onCancel,
}: ExitRoomModalProps) => {
  if (!isOpen) return null;

  const handleOverlayClick = () => {
    onCancel();
  };

  const handleModalClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const characterSrc = characterImage ?? S.exitCharacter;

  return (
    <S.Overlay onClick={handleOverlayClick}>
      <S.Modal onClick={handleModalClick}>
        <S.CharacterWrapper>
          <S.CharacterImage src={characterSrc} alt="exit character" />
        </S.CharacterWrapper>
        <S.Message>
          <S.Highlight>{roomName}</S.Highlight>에서 정말 퇴장하시겠습니까?
        </S.Message>
        <S.ButtonRow>
          <S.SecondaryButton type="button" onClick={onCancel}>
            돌아가기
          </S.SecondaryButton>
          <S.PrimaryButton type="button" onClick={onConfirm}>
            퇴장하기
          </S.PrimaryButton>
        </S.ButtonRow>
      </S.Modal>
    </S.Overlay>
  );
};
