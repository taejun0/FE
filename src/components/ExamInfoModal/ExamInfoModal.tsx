import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@components/Button';
import * as S from './ExamInfoModal.styles';
import { buildRoomDetailPath } from '@constants/RouteConstants';

export type ExamInfo = {
  id: number;
  lectureName: string;
  groupName: string;
  code: string;
  examDate: string;
  characterImage: string;
};

type ExamInfoModalProps = {
  isOpen: boolean;
  exam: ExamInfo | null;
  onClose: () => void;
};

export const ExamInfoModal = ({
  isOpen,
  exam,
  onClose,
}: ExamInfoModalProps) => {
  const navigate = useNavigate();

  if (!isOpen || !exam) return null;

  const handleOverlayClick = () => {
    onClose();
  };

  const handleModalClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleCopyCode = async () => {
    try {
      if (navigator.clipboard && 'writeText' in navigator.clipboard) {
        await navigator.clipboard.writeText(exam.code);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = exam.code;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      console.log('코드 복사 완료:', exam.code);
    } catch (error) {
      console.error('코드 복사 실패:', error);
    }
  };

  const handleConfirm = () => {
    onClose();
    navigate(buildRoomDetailPath(exam.id));
  };

  return (
    <S.Overlay onClick={handleOverlayClick}>
      <S.Modal onClick={handleModalClick}>
        <S.Content>
          <S.TextSection>
            <S.SectionLabel>{exam.lectureName}</S.SectionLabel>
            <S.GroupName>{exam.groupName}</S.GroupName>

            <S.MetaRow>
              <S.MetaLabel>코드 번호</S.MetaLabel>
              <S.MetaValue>{exam.code}</S.MetaValue>
            </S.MetaRow>
            <S.CopyButton type="button" onClick={handleCopyCode}>
              코드 복사
            </S.CopyButton>

            <S.MetaRow>
              <S.MetaLabel>시험 날짜</S.MetaLabel>
              <S.MetaValue>{exam.examDate}</S.MetaValue>
            </S.MetaRow>
          </S.TextSection>

          <S.CharacterImageWrapper>
            <S.CharacterImage src={exam.characterImage} alt="character" />
          </S.CharacterImageWrapper>
        </S.Content>

        <S.Footer>
          <Button type="button" variant="primary" onClick={handleConfirm}>
            확인
          </Button>
        </S.Footer>
      </S.Modal>
    </S.Overlay>
  );
};
