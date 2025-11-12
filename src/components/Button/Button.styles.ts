import styled from 'styled-components';
import { ButtonVariant } from './Button';

export const Button = styled.button<{ $variant: ButtonVariant }>(
  ({ $variant, theme }) => ({
    minHeight: '50px',
    borderRadius: '12px',
    border: $variant === 'primary' ? 'none' : `1px solid ${theme.colors.button.secondary.border}`,
    padding: '14px 20px',
    gap: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    ...theme.fonts.body.Regular,
    fontWeight: '600',
    transition: 'opacity 0.2s ease',
    width: '100%',
    '@media (max-width: 768px)': {
      minHeight: '48px',
      padding: '12px 18px',
      borderRadius: '10px',
      fontSize: '16px',
    },
    '@media (max-width: 480px)': {
      minHeight: '46px',
      padding: '10px 16px',
      borderRadius: '8px',
      fontSize: '15px',
    },
    '@media (max-width: 360px)': {
      minHeight: '44px',
      padding: '8px 14px',
      borderRadius: '8px',
      fontSize: '14px',
    },
    '&:hover': {
      opacity: 0.9,
    },
    '&:active': {
      opacity: 0.8,
    },
    '&:disabled': {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
    ...($variant === 'primary'
      ? {
          background: `linear-gradient(90deg, ${theme.colors.button.primary.gradientStart} 0%, ${theme.colors.button.primary.gradientEnd} 100%)`,
          color: theme.colors.button.primary.text,
        }
      : {
          background: theme.colors.button.secondary.background,
          color: theme.colors.button.secondary.text,
        }),
  })
);

