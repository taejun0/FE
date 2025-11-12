import styled from 'styled-components';

export const Card = styled.div(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'rgba(255, 255, 255, 0.55)',
  borderRadius: '20px',
  padding: '24px',
  minWidth: '220px',
  flexShrink: 0,
  gap: '16px',
  boxSizing: 'border-box',
  overflow: 'hidden',
  '&::before': {
    content: "''",
    position: 'absolute',
    inset: 0,
    borderRadius: '20px',
    padding: '5px',
    background:
      'linear-gradient(180deg, rgba(234, 234, 234, 0.1) 0%, rgba(155, 179, 255, 0.3) 50%, rgba(91, 157, 255, 0.2) 100%)',
    boxSizing: 'border-box',
    WebkitMask:
      'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    pointerEvents: 'none',
    zIndex: 0,
  },
  '> *': {
    position: 'relative',
    zIndex: 1,
  },
}));

export const Difficulty = styled.span(({ theme }) => ({
  ...theme.fonts.body.Regular,
  fontSize: '14px',
  color: theme.colors.hightlight,
  alignSelf: 'flex-end',
  padding: '4px 10px',
  borderRadius: '12px',
  backgroundColor: 'rgba(83, 155, 255, 0.15)',
}));

export const Title = styled.h3(({ theme }) => ({
  ...theme.fonts.title,
  color: theme.colors.hightlight,
  margin: 0,
}));

export const ParticipantInfo = styled.span(({ theme }) => ({
  ...theme.fonts.body.Regular,
  fontSize: '16px',
  color: 'rgba(62, 86, 139, 0.7)',
}));

export const SolveButton = styled.button(({ theme }) => ({
  marginTop: 'auto',
  ...theme.fonts.body.Regular,
  border: 'none',
  color: theme.colors.white,
  background:
    'linear-gradient(90deg, rgba(114, 167, 255, 1) 0%, rgba(170, 200, 255, 1) 100%)',
  borderRadius: '12px',
  padding: '10px 16px',
  cursor: 'pointer',
  transition: 'transform 0.2s ease, opacity 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    opacity: 0.95,
  },
  '&:active': {
    transform: 'translateY(0)',
    opacity: 0.85,
  },
}));
