import { useState, useRef, useEffect } from 'react';
import * as S from './EntryCodeModal.styles';
import { Button } from '@components/Button';

type EntryCodeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (code: string) => void | Promise<void>;
};

export const EntryCodeModal = ({
  isOpen,
  onClose,
  onSubmit,
}: EntryCodeModalProps) => {
  const [code, setCode] = useState(['', '', '', '']);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    if (isOpen && inputRefs[0].current) {
      inputRefs[0].current.focus();
    }
  }, [isOpen]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }

    const newCode = [...code];
    newCode[index] = value.toUpperCase();
    setCode(newCode);

    // 다음 입력 필드로 이동
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 4).toUpperCase();
    const newCode = [...code];
    for (let i = 0; i < 4; i++) {
      newCode[i] = pastedData[i] || '';
    }
    setCode(newCode);
    const nextIndex = Math.min(pastedData.length, 3);
    inputRefs[nextIndex].current?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length === 4) {
      try {
        await onSubmit(fullCode);
        // 성공 시에만 폼 리셋 및 모달 닫기
        setCode(['', '', '', '']);
        // Note: Modal will be closed by parent component on success
      } catch (error) {
        // Error handling is done in parent component
        console.error('입장 코드 처리 중 오류:', error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <S.Overlay onClick={onClose}>
      <S.Modal onClick={(e) => e.stopPropagation()}>
        <S.ModalContent>
          <S.Title>입장 코드</S.Title>
          <S.Form onSubmit={handleSubmit}>
            <S.CodeInputContainer>
              {code.map((digit, index) => (
                <S.CodeInput
                  key={index}
                  ref={inputRefs[index]}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  autoComplete="off"
                />
              ))}
            </S.CodeInputContainer>
            <S.InstructionText>
              공유받은 코드를 입력해 주세요!
            </S.InstructionText>
            <S.SubmitButton type="submit" variant="primary">
              입장하기
            </S.SubmitButton>
          </S.Form>
        </S.ModalContent>
      </S.Modal>
    </S.Overlay>
  );
};

