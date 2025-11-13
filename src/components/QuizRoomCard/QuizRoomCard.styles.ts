import styled from 'styled-components';

export const Card = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: '16px',
  padding: '20px',
  minWidth: '250px',
  flexShrink: 0,
  gap: '12px',
  boxSizing: 'border-box',
  border: '4px solid transparent',
  backgroundImage: `linear-gradient(180deg, rgba(244, 249, 255, 1) 0%, rgba(0, 0, 0, 0) 100%), linear-gradient(180deg, rgba(245, 245, 254, 1) 0%, rgba(236, 241, 253, 1) 33%, rgba(226, 241, 254, 1) 66%, rgba(226, 246, 255, 1) 100%)`,
  backgroundOrigin: 'border-box',
  backgroundClip: 'padding-box, border-box',
  boxShadow: 'inset 0px 4px 10px 0px rgba(255, 255, 255, 1)',
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

export const ExamTag = styled.span(({ theme }) => ({
  ...theme.fonts.small,
  color: theme.colors.hightlight,
  backgroundColor: 'rgba(83, 155, 255, 0.2)',
  padding: '4px 12px',
  borderRadius: '8px',
  fontWeight: '500',
  alignSelf: 'flex-end',
  '@media (max-width: 480px)': {
    fontSize: '11px',
    padding: '3px 10px',
  },
}));

export const AvatarWrapper = styled.div({
  width: '96px',
  height: '96px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background:
    'linear-gradient(180deg, rgba(243, 248, 255, 1) 0%, rgba(222, 237, 255, 1) 100%)',
  padding: '10px',
  '@media (max-width: 768px)': {
    width: '84px',
    height: '84px',
    padding: '8px',
  },
  '@media (max-width: 480px)': {
    width: '72px',
    height: '72px',
    padding: '6px',
  },
});

export const AvatarImage = styled.img({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
});

export const AvatarFallback = styled.div(({ theme }) => ({
  width: '100%',
  height: '100%',
  borderRadius: '50%',
  backgroundColor: theme.colors.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.colors.hightlight,
  fontSize: '18px',
  fontWeight: 600,
}));

export const RoomName = styled.h3(({ theme }) => ({
  ...theme.fonts.title,
  color: theme.colors.hightlight,
  margin: 0,
  textAlign: 'center',
  '@media (max-width: 768px)': {
    fontSize: '24px',
  },
  '@media (max-width: 480px)': {
    fontSize: '16px',
  },
}));

export const ParticipantCount = styled.p(({ theme }) => ({
  ...theme.fonts.small,
  fontSize: '14px',
  color: theme.colors.Font,
  margin: 0,
  '@media (max-width: 480px)': {
    fontSize: '13px',
  },
}));

export const ButtonGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
  '@media (max-width: 480px)': {
    gap: '6px',
  },
});

export const EnterButton = styled.button(({ theme }) => ({
  ...theme.fonts.body.Regular,
  color: theme.colors.white,
  background: `linear-gradient(90deg, ${theme.colors.button.primary.gradientStart} 0%, ${theme.colors.button.primary.gradientEnd} 100%)`,
  border: 'none',
  borderRadius: '8px',
  padding: '10px 16px',
  cursor: 'pointer',
  width: '100%',
  transition: 'opacity 0.2s ease',
  '&:hover': {
    opacity: 0.9,
  },
  '&:active': {
    opacity: 0.8,
  },
  '@media (max-width: 480px)': {
    fontSize: '13px',
    padding: '8px 14px',
  },
}));

export const ExitButton = styled.button<{ $isLeader?: boolean }>(
  ({ theme, $isLeader }) => ({
    ...theme.fonts.body.Regular,
    backgroundColor: theme.colors.white,
    color: $isLeader ? '#ff6b6b' : theme.colors.hightlight,
    border: $isLeader
      ? '1px solid #ff6b6b'
      : `1px solid ${theme.colors.button.secondary.border}`,
    borderRadius: '8px',
    padding: '10px 16px',
    cursor: 'pointer',
    width: '100%',
    transition: 'opacity 0.2s ease',

    '&:hover': {
      opacity: 0.9,
    },
    '&:active': {
      opacity: 0.8,
    },
    '@media (max-width: 480px)': {
      fontSize: '13px',
      padding: '8px 14px',
    },
  })
);
