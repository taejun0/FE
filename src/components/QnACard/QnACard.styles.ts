import styled from 'styled-components';

export const Card = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.colors.white,
  borderRadius: '16px',
  padding: '20px',
  height: '100%',
  minWidth: '250px',
  flexShrink: 0,
  gap: '12px',
  boxSizing: 'border-box',
  '@media (max-width: 768px)': {
    minWidth: '180px',
    padding: '16px',
    borderRadius: '12px',
    gap: '10px',
  },
  '@media (max-width: 480px)': {
    minWidth: '160px',
    padding: '14px',
    borderRadius: '10px',
    gap: '8px',
  },
}));

export const Tag = styled.span(({ theme }) => ({
  ...theme.fonts.small,
  color: theme.colors.hightlight,
  backgroundColor: 'rgba(83, 155, 255, 0.2)',
  padding: '4px 12px',
  borderRadius: '8px',
  fontWeight: '500',
  alignSelf: 'flex-start',
  '@media (max-width: 480px)': {
    fontSize: '11px',
    padding: '3px 10px',
  },
}));

export const Title = styled.h3(({ theme }) => ({
  ...theme.fonts.title,
  color: theme.colors.Font,
  margin: 0,
  maxWidth: '160px',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  '@media (max-width: 768px)': {
    fontSize: '24px',
    maxWidth: '140px',
  },
  '@media (max-width: 480px)': {
    fontSize: '16px',
    maxWidth: '120px',
  },
}));

export const Performance = styled.p(({ theme }) => ({
  ...theme.fonts.small,

  color: '#A1A1A1',
  margin: 0,
  '@media (max-width: 480px)': {
    fontSize: '13px',
  },
}));

export const EnterButton = styled.button(({ theme }) => ({
  ...theme.fonts.body.Regular,
  color: theme.colors.button.secondary.text,

  border: `1px solid ${theme.colors.button.secondary.border}`,
  borderRadius: '8px',
  padding: '10px 16px',
  cursor: 'pointer',
  width: '100%',
  transition: 'opacity 0.2s ease',
  marginTop: 'auto',
  '&:hover': {
    opacity: 0.9,
  },
  '&:active': {
    opacity: 0.8,
  },
  '@media (max-width: 480px)': {
    fontSize: '16px',
    padding: '8px 14px',
  },
}));
