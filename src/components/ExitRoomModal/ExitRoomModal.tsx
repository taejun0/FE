import { MouseEvent } from 'react';
import * as S from './ExitRoomModal.styles';

type ExitRoomModalProps = {
  isOpen: boolean;
  roomName: string;
  characterImage?: string;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
  isDelete?: boolean; // 삭제 모달인지 여부
};

export const ExitRoomModal = ({
  isOpen,
  roomName,
  characterImage,
  onConfirm,
  onCancel,
  isDelete = false,
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
          <S.Highlight>{roomName}</S.Highlight>
          {isDelete
            ? '을(를) 정말 삭제하시겠습니까?'
            : '에서 정말 퇴장하시겠습니까?'}
        </S.Message>
        <S.ButtonRow>
          <S.SecondaryButton type="button" onClick={onCancel}>
            돌아가기
          </S.SecondaryButton>
          <S.PrimaryButton
            type="button"
            onClick={onConfirm}
            $isDelete={isDelete}
          >
            {isDelete ? '삭제하기' : '퇴장하기'}
          </S.PrimaryButton>
        </S.ButtonRow>
      </S.Modal>
    </S.Overlay>
  );
};
