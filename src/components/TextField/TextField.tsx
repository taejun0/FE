import React, { forwardRef, useMemo, useState } from 'react';
import { Search, Eye, EyeOff } from 'react-feather';
import * as S from './TextField.styles';

type TextFieldProps = {
  label: string;
  placeholder?: string;
  helperText?: string;
  feedbackText?: string;
  status?: S.FieldStatus;
  trailingAddon?: React.ReactNode;
  showCheckButton?: boolean;
  onCheckButtonClick?: () => void;
  checkButtonDisabled?: boolean;
  enablePasswordToggle?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      placeholder,
      helperText,
      feedbackText,
      status = 'default',
      trailingAddon,
      showCheckButton = false,
      onCheckButtonClick,
      checkButtonDisabled = false,
      enablePasswordToggle,
      type = 'text',
      ...rest
    },
    ref
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    // 비밀번호 타입일 때만 보기/숨기기 토글 활성화
    // type이 'password'가 아니면 무조건 false
    const actualEnablePasswordToggle =
      type === 'password' && (enablePasswordToggle ?? true);

    const resolvedType = useMemo(() => {
      if (!actualEnablePasswordToggle) return type;
      return isPasswordVisible ? 'text' : 'password';
    }, [actualEnablePasswordToggle, isPasswordVisible, type]);

    return (
      <S.Wrapper $status={status}>
        <S.LabelRow>
          <S.Label>{label}</S.Label>
        </S.LabelRow>

        <S.InputWrapper $status={status}>
          <S.Input
            $status={status}
            ref={ref}
            placeholder={placeholder}
            aria-invalid={status === 'error'}
            type={resolvedType}
            {...rest}
          />
          {(actualEnablePasswordToggle || trailingAddon || showCheckButton) && (
            <S.TrailingSection>
              {trailingAddon}
              {showCheckButton && (
                <S.IconButton
                  type="button"
                  onClick={onCheckButtonClick}
                  disabled={checkButtonDisabled}
                  aria-label="중복 확인"
                >
                  <Search size={20} />
                </S.IconButton>
              )}
              {actualEnablePasswordToggle && (
                <S.IconButton
                  type="button"
                  onClick={() => setIsPasswordVisible((prev) => !prev)}
                  aria-label={
                    isPasswordVisible ? '비밀번호 숨기기' : '비밀번호 보기'
                  }
                >
                  {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
                </S.IconButton>
              )}
            </S.TrailingSection>
          )}
        </S.InputWrapper>

        {feedbackText ? (
          <S.HelperText $status={status}>{feedbackText}</S.HelperText>
        ) : (
          helperText && <S.Description>{helperText}</S.Description>
        )}
      </S.Wrapper>
    );
  }
);

TextField.displayName = 'TextField';
