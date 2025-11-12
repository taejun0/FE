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
    default: 'rgba(106, 150, 255, 0.4)', // theme.colors.success with 0.4 opacity
    error: 'rgba(255, 91, 91, 0.4)', // theme.colors.error with 0.4 opacity
    success: 'rgba(106, 150, 255, 0.4)', // theme.colors.success with 0.4 opacity
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
  minWidth: 0,
  boxSizing: 'border-box',
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
    backgroundColor: theme.colors.white,
    gap: '8px',
    borderRadius: '12px',
    border: `1px solid ${statusBorder({ theme }, $status)}`,
    padding: '12px 16px',
    transition: 'border-color 0.2s ease',
    width: '100%',
    minWidth: 0,
    boxSizing: 'border-box',
    '@media (max-width: 480px)': {
      padding: '10px 14px',
      borderRadius: '10px',
      gap: '6px',
    },
    '@media (max-width: 360px)': {
      padding: '8px 12px',
      borderRadius: '8px',
      gap: '4px',
    },
    '&:focus-within': {
      borderColor: 'rgba(106, 150, 255, 0.4)', // theme.colors.success with 0.4 opacity
    },
  })
);

export const Input = styled.input<{ $status: FieldStatus }>(
  ({ $status, theme }) => ({
    flex: 1,
    minWidth: 0,
    border: 'none',
    outline: 'none',
    ...theme.fonts.body.Regular,
    color: statusMessageColor({ theme }, $status),
    backgroundColor: theme.colors.white,
    width: '100%',
    boxSizing: 'border-box',
    '@media (max-width: 480px)': {
      fontSize: '15px',
    },
    '@media (max-width: 360px)': {
      fontSize: '14px',
    },
    '&::placeholder': {
      color: 'rgba(86, 85, 85, 0.6)', // #565555 with 60% opacity
    },
  })
);

export const TrailingSection = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.colors.Font,
  flexShrink: 0,
  gap: '4px',
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
  flexShrink: 0,
  padding: '4px',
  '@media (max-width: 480px)': {
    padding: '2px',
    '& svg': {
      width: '18px',
      height: '18px',
    },
  },
  '@media (max-width: 360px)': {
    padding: '2px',
    '& svg': {
      width: '16px',
      height: '16px',
    },
  },
  '&:hover:not(:disabled)': {
    color: theme.colors.success,
  },
  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
}));
