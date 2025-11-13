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
  }) => void | Promise<void>;
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

  // 시험일 형식 검증 (YYYY.MM.DD)
  const isValidDateFormat = (date: string): boolean => {
    const dateRegex = /^\d{4}\.\d{2}\.\d{2}$/;
    if (!dateRegex.test(date)) return false;
    
    const [year, month, day] = date.split('.').map(Number);
    if (year < 1900 || year > 2100) return false;
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;
    
    return true;
  };

  const handleExamDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // 숫자만 추출
    const numbers = value.replace(/\D/g, '');
    
    // 최대 8자리까지만 허용 (YYYYMMDD)
    const limitedNumbers = numbers.slice(0, 8);
    
    // 자동 포맷팅: YYYY.MM.DD 형식으로 변환
    let formatted = '';
    if (limitedNumbers.length > 0) {
      formatted = limitedNumbers.slice(0, 4); // YYYY
      if (limitedNumbers.length > 4) {
        formatted += '.' + limitedNumbers.slice(4, 6); // MM
      }
      if (limitedNumbers.length > 6) {
        formatted += '.' + limitedNumbers.slice(6, 8); // DD
      }
    }
    
    setExamDate(formatted);
  };

  const isFormValid =
    groupName.trim().length > 0 &&
    examDate.trim().length > 0 &&
    isValidDateFormat(examDate) &&
    selectedCharacter !== null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || selectedCharacter === null) {
      return;
    }

    const trimmedGroupName = groupName.trim();
    const trimmedExamDate = examDate.trim();

    if (trimmedGroupName && trimmedExamDate) {
      try {
        await onSubmit({
          groupName: trimmedGroupName,
          examDate: trimmedExamDate,
          characterId: selectedCharacter,
        });
        // Reset form only on success
        setGroupName('');
        setExamDate('');
        setSelectedCharacter(1);
        // Note: Modal will be closed by parent component on success
      } catch (error) {
        // Error handling is done in parent component
        console.error('그룹 생성 중 오류:', error);
      }
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
                placeholder="YYYY.MM.DD (예: 2025.12.25)"
                value={examDate}
                onChange={handleExamDateChange}
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
