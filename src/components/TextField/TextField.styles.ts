import styled from 'styled-components';

export type FieldStatus = 'default' | 'error' | 'success';

export type WrapperProps = {
  $status: FieldStatus;
};

export type InputWrapperProps = {
  $status: FieldStatus;
};

const statusBorder = ({ theme }: { theme: any }, status: FieldStatus) => {
  const borderColors = {
    default: theme.colors.Font,
    error: theme.colors.error,
    success: theme.colors.success,
  };
  return borderColors[status];
};

const statusMessageColor = ({ theme }: { theme: any }, status: FieldStatus) => {
  const colors = {
    default: theme.colors.Font,
    error: theme.colors.error,
    success: theme.colors.success,
  };
  return colors[status];
};

export const Wrapper = styled.label<WrapperProps>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
}));

export const LabelRow = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '8px',
}));

export const Label = styled.span(({ theme }) => ({
  ...theme.fonts.body.Regular,
  color: theme.colors.Font,
}));

export const InputWrapper = styled.div<InputWrapperProps>(
  ({ $status, theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    borderRadius: '12px',
    border: `1px solid ${statusBorder({ theme }, $status)}`,
    padding: '12px 16px',
    transition: 'border-color 0.2s ease',
    '&:focus-within': {
      borderColor: theme.colors.success,
    },
  })
);

export const Input = styled.input<{ $status: FieldStatus }>(
  ({ $status, theme }) => ({
    flex: 1,
    border: 'none',
    outline: 'none',
    ...theme.fonts.body.Regular,
    color: statusMessageColor({ theme }, $status),
    '&::placeholder': {
      color: statusMessageColor({ theme }, $status),
    },
  })
);

export const TrailingSection = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.colors.Font,
}));

export const HelperText = styled.p<{ $status: FieldStatus }>(
  ({ $status, theme }) => ({
    margin: 0,
    ...theme.fonts.body.Regular,
    color: statusMessageColor({ theme }, $status),
  })
);

export const Description = styled.p(({ theme }) => ({
  margin: 0,
  ...theme.fonts.body.Regular,
  color: theme.colors.Font,
}));

export const IconButton = styled.button(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
  color: theme.colors.Font,
  cursor: 'pointer',
  borderRadius: '4px',
  transition: 'background-color 0.2s ease, color 0.2s ease',
  '&:hover:not(:disabled)': {
    color: theme.colors.success,
  },
  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
}));
