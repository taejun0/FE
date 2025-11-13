import styled from 'styled-components';
import exitCharacterImage from '../../assets/images/ggoom/ggoom1.png';

export const exitCharacter = exitCharacterImage;

export const Overlay = styled.div({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.6)',
  backdropFilter: 'blur(6px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px',
  zIndex: 1100,
});

export const Modal = styled.div(({ theme }) => ({
  width: '100%',
  maxWidth: '420px',
  borderRadius: '32px',
  padding: '36px 32px 28px',
  background:
    'linear-gradient(180deg, rgba(232, 242, 255, 1) 0%, rgba(244, 248, 255, 1) 100%)',
  border: '5px solid transparent',
  backgroundImage:
    'linear-gradient(180deg, rgba(232, 242, 255, 1) 0%, rgba(244, 248, 255, 1) 100%), linear-gradient(180deg, rgba(234, 234, 234, 0.4) 0%, rgba(155, 179, 255, 0.25) 50%, rgba(91, 157, 255, 0.2) 100%)',
  backgroundClip: 'padding-box, border-box',
  backgroundOrigin: 'padding-box, border-box',
  boxShadow:
    '0px 24px 48px rgba(91, 157, 255, 0.18), inset 0px 1px 4px rgba(255, 255, 255, 0.6)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: '24px',
  '@media (max-width: 520px)': {
    padding: '28px 24px 24px',
    borderRadius: '24px',
  },
}));

export const Content = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: '16px',
});

export const CharacterWrapper = styled.div({
  width: '120px',
  height: '110px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '4px',
  opacity: 0.95,
});

export const CharacterImage = styled.img({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
});

export const Message = styled.p(({ theme }) => ({
  ...theme.fonts.normal,
  margin: 0,
  color: 'rgba(62, 86, 139, 0.9)',
}));

export const Highlight = styled.span(({ theme }) => ({
  fontFamily:
    'OnglThinker, Pretendard, -apple-system, BlinkMacSystemFont, "Malgun Gothic", "맑은 고딕", sans-serif',
  fontSize: '32px',
  color: theme.colors.Font,
  letterSpacing: '-0.02em',
  marginRight: '4px',
}));

export const ButtonRow = styled.div({
  display: 'flex',
  width: '100%',
  gap: '14px',
  justifyContent: 'center',
});

export const SecondaryButton = styled.button(({ theme }) => ({
  flex: 1,
  borderRadius: '12px',
  border: `1px solid ${theme.colors.hightlight}`,
  background: 'transparent',
  padding: '12px 0',
  ...theme.fonts.body.Regular,
  color: theme.colors.hightlight,
  cursor: 'pointer',
  transition: 'background 0.2s ease, color 0.2s ease',
  '&:hover': {
    background: 'rgba(83, 155, 255, 0.08)',
  },
}));

export const PrimaryButton = styled.button<{ $isDelete?: boolean }>(
  ({ theme, $isDelete }) => ({
    flex: 1,
    borderRadius: '12px',
    border: 'none',
    padding: '12px 0',
    ...theme.fonts.body.Regular,
    color: theme.colors.white,
    background: $isDelete
      ? 'linear-gradient(90deg, rgba(255, 95, 95, 1) 0%, rgba(255, 148, 148, 1) 100%)'
      : 'linear-gradient(90deg, rgba(95, 142, 255, 1) 0%, rgba(148, 182, 255, 1) 100%)',
    cursor: 'pointer',
    transition: 'opacity 0.2s ease, transform 0.2s ease',
    boxShadow: $isDelete
      ? '0px 10px 20px rgba(255, 95, 95, 0.25)'
      : '0px 10px 20px rgba(91, 157, 255, 0.25)',
    '&:hover': {
      opacity: 0.9,
      transform: 'translateY(-1px)',
    },
  })
);
