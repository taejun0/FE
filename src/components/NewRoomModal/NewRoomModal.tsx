import { useState } from 'react';
import * as S from './NewRoomModal.styles';
import { TextField } from '@components/TextField';
import { CHARACTER_IMAGE_ENTRIES } from '@constants/characterImages';

type NewRoomModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    groupName: string;
    examDate: string;
    characterId: number;
  }) => void;
};

const CHARACTERS = CHARACTER_IMAGE_ENTRIES;

export const NewRoomModal = ({
  isOpen,
  onClose,
  onSubmit,
}: NewRoomModalProps) => {
  const [groupName, setGroupName] = useState('');
  const [examDate, setExamDate] = useState('');
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(1);

  const isFormValid =
    groupName.trim().length > 0 &&
    examDate.trim().length > 0 &&
    selectedCharacter !== null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || selectedCharacter === null) {
      return;
    }

    const trimmedGroupName = groupName.trim();
    const trimmedExamDate = examDate.trim();

    if (trimmedGroupName && trimmedExamDate) {
      onSubmit({
        groupName: trimmedGroupName,
        examDate: trimmedExamDate,
        characterId: selectedCharacter,
      });
      // Reset form
      setGroupName('');
      setExamDate('');
      setSelectedCharacter(1);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <S.Overlay onClick={onClose}>
      <S.Modal onClick={(e) => e.stopPropagation()}>
        <S.ModalContent>
          <S.Title>New Qroom</S.Title>
          <S.Form onSubmit={handleSubmit}>
            <S.FormGroup>
              <TextField
                label="그룹(스터디) 이름"
                placeholder="그룹 or 스터디 이름을 입력해 주세요"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </S.FormGroup>

            <S.FormGroup>
              <TextField
                label="시험일 (날짜)"
                placeholder="ex) 20xx.xx.xx"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
              />
            </S.FormGroup>

            <S.FormGroup>
              <S.Label>그룹 캐릭터 선택</S.Label>
              <S.CharacterGrid>
                {CHARACTERS.map((character) => (
                  <S.CharacterButton
                    key={character.id}
                    type="button"
                    $isSelected={selectedCharacter === character.id}
                    onClick={() => setSelectedCharacter(character.id)}
                  >
                    <S.CharacterImage
                      src={character.image}
                      alt={`Character ${character.id}`}
                    />
                  </S.CharacterButton>
                ))}
              </S.CharacterGrid>
            </S.FormGroup>

            <S.SubmitButton
              type="submit"
              variant="primary"
              disabled={!isFormValid}
            >
              그룹 생성
            </S.SubmitButton>
          </S.Form>
        </S.ModalContent>
      </S.Modal>
    </S.Overlay>
  );
};
