import styled from 'styled-components';

export const Overlay = styled.div({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  backdropFilter: 'blur(8px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1100,
  padding: '24px',
  boxSizing: 'border-box',
});

export const Modal = styled.div(({ theme }) => ({
  width: '100%',
  maxWidth: '520px',
  borderRadius: '28px',
  border: '4px solid transparent',
  backgroundImage: `linear-gradient(180deg, rgba(237, 246, 255, 1) 0%, rgba(244, 247, 255, 1) 35%, rgba(226, 241, 254, 1) 68%, rgba(193, 212, 255, 1) 100%), linear-gradient(180deg, rgba(234, 234, 234, 0.1) 0%, rgba(155, 179, 255, 0.3) 50%, rgba(91, 157, 255, 0.2) 100%)`,
  backgroundOrigin: 'padding-box, border-box',
  backgroundClip: 'padding-box, border-box',
  boxShadow:
    '0px 30px 60px rgba(0, 0, 0, 0.12), inset 0px 1px 4px rgba(0, 0, 0, 0.25)',
  padding: '40px 48px 48px',
  boxSizing: 'border-box',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  '@media (max-width: 768px)': {
    padding: '32px',
    borderRadius: '24px',
  },
  '@media (max-width: 480px)': {
    padding: '24px',
    borderRadius: '20px',
  },
}));

export const Content = styled.div({
  display: 'flex',
  alignItems: 'stretch',
  justifyContent: 'space-between',
  gap: '32px',
  '@media (max-width: 520px)': {
    flexDirection: 'column',
    alignItems: 'center',
    gap: '24px',
  },
});

export const TextSection = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '16px',
  flex: 1,
  ...theme.fonts.body.Regular,
  color: theme.colors.Font,
}));

export const SectionLabel = styled.span(({ theme }) => ({
  ...theme.fonts.emphasis,
  fontSize: '18px',
  color: 'rgba(62, 86, 139, 0.7)',
}));

export const GroupName = styled.h3(({ theme }) => ({
  ...theme.fonts.title,
  fontSize: '36px',
  color: theme.colors.hightlight,
  margin: 0,
  lineHeight: 1.1,
  '@media (max-width: 520px)': {
    fontSize: '36px',
  },
}));

export const MetaRow = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: '4px',
});

export const MetaLabel = styled.span(({ theme }) => ({
  ...theme.fonts.emphasis,
  fontSize: '20px',
  color: theme.colors.Font,
}));

export const MetaValue = styled.span(({ theme }) => ({
  ...theme.fonts.emphasis,
  fontSize: '28px',
  color: theme.colors.Font,
}));

export const CopyButton = styled.button(({ theme }) => ({
  alignSelf: 'flex-start',
  padding: '8px 16px',
  borderRadius: '12px',
  border: `1px solid ${theme.colors.hightlight}`,
  background: 'rgba(255, 255, 255, 0.65)',
  ...theme.fonts.body.Regular,
  fontSize: '16px',
  color: theme.colors.hightlight,
  cursor: 'pointer',
  transition: 'background 0.2s ease, transform 0.2s ease',
  boxShadow: '0px 4px 12px rgba(91, 157, 255, 0.15)',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.85)',
    transform: 'translateY(-2px)',
  },
}));

export const CharacterImageWrapper = styled.div({
  flexShrink: 0,
  position: 'relative',
  width: '45%',
  maxWidth: '220px',
  aspectRatio: '1 / 1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'flex-end',
  marginTop: 'auto',
  opacity: 0.95,
  '@media (max-width: 520px)': {
    width: '50%',
    maxWidth: '200px',
    opacity: 0.9,
  },
});

export const CharacterImage = styled.img({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
});

export const Footer = styled.div({
  display: 'flex',
  justifyContent: 'center',
});
