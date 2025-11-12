import styled from 'styled-components';

export const Wrapper = styled.div(({ theme }) => ({
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  background: theme.colors.backgroundGradient,
  overflowX: 'hidden',
  overflowY: 'auto',
}));

export const Header = styled.header({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 20px',
  boxSizing: 'border-box',
  width: '100%',
  flexShrink: 0,
  '@media (max-width: 768px)': {
    padding: '12px 16px',
  },
  '@media (max-width: 480px)': {
    padding: '10px 12px',
  },
});

export const Logo = styled.img({
  height: '100px',
  width: 'auto',
  '@media (max-width: 768px)': {
    height: '60px',
  },
  '@media (max-width: 480px)': {
    height: '50px',
  },
});

export const MyPageButton = styled.button(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6px',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  transition: 'opacity 0.2s ease',
  padding: 0,
  '@media (max-width: 768px)': {
    gap: '5px',
  },
  '@media (max-width: 480px)': {
    gap: '4px',
  },
}));

export const MyPageIcon = styled.div(({ theme }) => ({
  position: 'relative',
  width: '80px',
  height: '80px',
  borderRadius: '50%',
  padding: '12px',
  background:
    'linear-gradient(180deg, rgba(245, 245, 254, 1) 0%, rgba(226, 241, 254, 1) 100%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
  overflow: 'hidden',
  flexShrink: 0,
  '&::before': {
    content: "''",
    position: 'absolute',
    inset: 0,
    borderRadius: '50%',
    padding: '5px',
    background:
      'linear-gradient(180deg, rgba(106, 150, 255, 1) 0%, rgba(175, 190, 245, 1) 100%)',
    WebkitMask:
      'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
    WebkitMaskComposite: 'xor',
    maskComposite: 'exclude',
    pointerEvents: 'none',
    zIndex: 0,
    boxSizing: 'border-box',
  },
  '&::after': {
    content: "''",
    position: 'absolute',
    inset: '5px',
    borderRadius: '50%',
    background:
      'linear-gradient(180deg, rgba(245, 245, 254, 1) 0%, rgba(226, 241, 254, 1) 100%)',
    zIndex: 0,
  },
  '& img': {
    position: 'relative',
    zIndex: 1,
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    display: 'block',
    flexShrink: 0,
  },
  '@media (max-width: 768px)': {
    width: '70px',
    height: '70px',
    padding: '10px',
    '&::after': {
      inset: '5px',
    },
  },
  '@media (max-width: 480px)': {
    width: '60px',
    height: '60px',
    padding: '8px',
    '&::after': {
      inset: '5px',
    },
  },
}));

export const MyPageText = styled.span(({ theme }) => ({
  ...theme.fonts.body.Regular,
  fontSize: '14px',
  color: theme.colors.Font,
  fontWeight: '400',
  '@media (max-width: 768px)': {
    fontSize: '13px',
  },
  '@media (max-width: 480px)': {
    fontSize: '12px',
  },
}));

export const Content = styled.div({
  display: 'flex',
  gap: '24px',
  alignItems: 'stretch',
  padding: '0 20px 20px 20px',
  boxSizing: 'border-box',
  width: '100%',
  flex: 1,
  minHeight: 0,
  overflowX: 'hidden',
  overflowY: 'visible',
  '@media (max-width: 1200px)': {
    gap: '20px',
    padding: '0 16px 16px 16px',
  },
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    gap: '16px',
    padding: '0 12px 12px 12px',
  },
  '@media (max-width: 480px)': {
    padding: '0 8px 8px 8px',
  },
});

export const LeftSection = styled.div({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  minHeight: 0,
  overflowX: 'hidden',
  overflowY: 'visible',
  '@media (max-width: 768px)': {
    gap: '20px',
  },
  '@media (max-width: 480px)': {
    gap: '16px',
  },
});

export const QuizRoomSectionWrapper = styled.div({
  borderRadius: '20px',
  boxShadow: '0px 1px 20px 0px rgba(91, 157, 255, 0.2)',
  boxSizing: 'border-box',
  overflow: 'visible',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  '@media (max-width: 768px)': {
    borderRadius: '16px',
  },
  '@media (max-width: 480px)': {
    borderRadius: '12px',
  },
});

export const QuizRoomSection = styled.div(({ theme }) => ({
  position: 'relative',
  borderRadius: '20px',
  padding: '32px 32px 32px 32px',
  paddingRight: '16px',
  boxSizing: 'border-box',
  width: '100%',
  background: 'transparent',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'visible',

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
  '@media (max-width: 768px)': {
    padding: '24px 24px 24px 24px',
    paddingRight: '12px',
    borderRadius: '16px',
    '&::before': {
      borderRadius: '16px',
      padding: '4px',
    },
  },
  '@media (max-width: 480px)': {
    padding: '20px 20px 20px 20px',
    paddingRight: '10px',
    borderRadius: '12px',
    '&::before': {
      borderRadius: '12px',
      padding: '4px',
    },
  },
}));

export const QnASectionWrapper = styled.div({
  borderRadius: '20px',
  boxShadow: '0px 1px 20px 0px rgba(91, 157, 255, 0.2)',
  boxSizing: 'border-box',
  overflow: 'visible',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  '@media (max-width: 768px)': {
    borderRadius: '16px',
  },
  '@media (max-width: 480px)': {
    borderRadius: '12px',
  },
});

export const QnASection = styled.div(({ theme }) => ({
  position: 'relative',
  borderRadius: '20px',
  padding: '32px 32px 32px 32px',
  paddingRight: '16px',
  boxSizing: 'border-box',
  width: '100%',
  background: 'transparent',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'visible',
  gap: '24px',

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
  '@media (max-width: 768px)': {
    padding: '24px 24px 24px 24px',
    paddingRight: '12px',
    borderRadius: '16px',
    '&::before': {
      borderRadius: '16px',
      padding: '4px',
    },
  },
  '@media (max-width: 480px)': {
    padding: '20px 20px 20px 20px',
    paddingRight: '10px',
    borderRadius: '12px',
    '&::before': {
      borderRadius: '12px',
      padding: '4px',
    },
  },
}));

export const SectionTitle = styled.h2(({ theme }) => ({
  ...theme.fonts.title,
  color: theme.colors.hightlight,
  marginBottom: '24px',
  flexShrink: 0,
  '@media (max-width: 768px)': {
    marginBottom: '20px',
    fontSize: '32px',
  },
  '@media (max-width: 480px)': {
    marginBottom: '16px',
    fontSize: '28px',
  },
}));

export const ScrollContainer = styled.div({
  display: 'flex',
  overflowX: 'auto',
  overflowY: 'visible',
  gap: '16px',
  paddingBottom: '8px',
  scrollBehavior: 'smooth',
  WebkitOverflowScrolling: 'touch',
  flex: 1,
  alignItems: 'center',
  width: '100%',
  '&::-webkit-scrollbar': {
    height: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(106, 150, 255, 0.3)',
    borderRadius: '4px',
    '&:hover': {
      background: 'rgba(106, 150, 255, 0.5)',
    },
  },
  '@media (max-width: 768px)': {
    gap: '12px',
  },
  '@media (max-width: 480px)': {
    gap: '10px',
  },
});

export const EmptyStateContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  minWidth: '100%',
  border: '2px dashed rgba(106, 150, 255, 0.3)',
  borderRadius: '12px',
  padding: '20px',
  flexShrink: 0,
  gap: '10px',
  boxSizing: 'border-box',
  '@media (max-width: 768px)': {
    padding: '16px',
  },
  '@media (max-width: 480px)': {
    padding: '12px',
  },
});

export const EmptyStateIcon = styled.img({
  width: '60px',
  height: '60px',
  marginBottom: '16px',
  opacity: 0.5,
  objectFit: 'contain',
  '@media (max-width: 768px)': {
    width: '50px',
    height: '50px',
    marginBottom: '12px',
  },
  '@media (max-width: 480px)': {
    width: '40px',
    height: '40px',
    marginBottom: '10px',
  },
});

export const EmptyStateText = styled.p(({ theme }) => ({
  ...theme.fonts.body.Regular,
  color: `rgba(83, 155, 255, 0.5)`, // theme.colors.hightlight (#539BFF) with 50% opacity
  textAlign: 'center',
  '@media (max-width: 480px)': {
    fontSize: '15px',
  },
}));

export const RightSection = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  alignItems: 'stretch',
  position: 'sticky',
  top: '20px',
  width: '320px',
  minWidth: '280px',
  flexShrink: 0,
  '@media (max-width: 1024px)': {
    width: '280px',
  },
  '@media (max-width: 768px)': {
    position: 'static',
    width: '100%',
    minWidth: 'auto',
    gap: '20px',
  },
  '@media (max-width: 480px)': {
    gap: '16px',
  },
});

export const InfoCard = styled.div({
  position: 'relative',
  width: '100%',
  borderRadius: '20px',
  padding: '32px',
  background: 'transparent',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  boxSizing: 'border-box',
  overflow: 'hidden',
  '&::before': {
    content: "''",
    position: 'absolute',
    inset: 0,
    borderRadius: '20px',
    padding: '6px',
    background:
      'linear-gradient(180deg, rgba(234, 234, 234, 0.6) 0%, rgba(155, 179, 255, 0.3) 50%, rgba(91, 157, 255, 0.2) 100%)',
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
});

export const InfoCardHeader = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const InfoCardTitle = styled.h3(({ theme }) => ({
  ...theme.fonts.emphasis,
  fontSize: '24px',
  color: theme.colors.hightlight,
  margin: 0,
}));

export const InfoCardList = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

export const InfoCardItem = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '8px',
  borderRadius: '16px',
  textAlign: 'left',
  ...theme.fonts.body.Regular,
  color: theme.colors.Font,
}));

export const InfoCardItemName = styled.span(({ theme }) => ({
  ...theme.fonts.emphasis,
  fontSize: '20px',
  color: theme.colors.Font,
  flex: 1,
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

export const InfoCardItemDate = styled.span(({ theme }) => ({
  ...theme.fonts.body.Regular,
  fontSize: '18px',
  color: 'rgba(62, 86, 139, 0.8)',
  flexShrink: 0,
}));

export const ActionButtonGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  width: '100%',
  '@media (max-width: 768px)': {
    flexDirection: 'row',
    gap: '16px',
  },
  '@media (max-width: 480px)': {
    flexDirection: 'column',
    gap: '14px',
  },
});

export const ActionButton = styled.button<{ $variant?: 'room' | 'code' }>(
  ({ $variant }) => {
    const roomFill =
      'linear-gradient(180deg, rgba(226, 246, 255, 1) 0%, rgba(226, 241, 254, 1) 33%, rgba(236, 241, 253, 1) 66%, rgba(245, 245, 254, 1) 100%)';
    const roomBorder =
      'linear-gradient(90deg, rgba(234, 234, 234, 0.7) 0%, rgba(155, 179, 255, 0.3) 70%, rgba(91, 157, 255, 0.2) 100%)';
    const codeFill =
      'linear-gradient(180deg, rgba(227, 227, 255, 1) 0%, rgba(236, 241, 253, 1) 33%, rgba(226, 241, 254, 1) 66%, rgba(231, 248, 255, 1) 100%)';
    const codeBorder =
      'linear-gradient(90deg, rgba(234, 234, 234, 0.7) 0%, rgba(155, 179, 255, 0.3) 70%, rgba(91, 157, 255, 0.2) 100%)';

    const isRoom = $variant === 'room';
    const fill = isRoom ? roomFill : codeFill;
    const borderGradient = isRoom ? roomBorder : codeBorder;

    return {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: isRoom ? 'center' : 'flex-end',
      textAlign: 'center',
      border: '5px solid transparent',
      borderRadius: '20px',
      padding: isRoom ? '28px 32px' : '32px 32px 28px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      minWidth: '220px',
      minHeight: '160px',
      gap: '8px',
      overflow: 'hidden',
      backgroundImage: `${fill}, ${borderGradient}`,
      backgroundOrigin: 'padding-box, border-box',
      backgroundClip: 'padding-box, border-box',
      boxShadow: '0px 16px 32px rgba(91, 157, 255, 0.18)',
      '&:hover': {
        transform: 'translateY(-4px)',
      },
      '@media (max-width: 1024px)': {
        minWidth: '200px',
        minHeight: '150px',
        padding: isRoom ? '24px 28px' : '28px 28px 24px',
      },
      '@media (max-width: 768px)': {
        flex: 1,
        minWidth: '160px',
        minHeight: '140px',
        padding: isRoom ? '20px 24px' : '24px 24px 20px',
        borderWidth: '4px',
      },
      '@media (max-width: 480px)': {
        minWidth: '140px',
        minHeight: '130px',
        padding: isRoom ? '18px 20px' : '22px 20px 18px',
        borderRadius: '16px',
        borderWidth: '4px',
      },
    } as const;
  }
);

export const ActionButtonBackgroundImage = styled.img<{
  $variant?: 'room' | 'code';
}>(({ $variant }) => ({
  position: 'absolute',
  top: $variant === 'room' ? '20%' : '60%',
  left: '40%',
  transform:
    $variant === 'room' ? 'translate(-50%, -50%)' : 'translate(-50%, -60%)',
  width: $variant === 'room' ? '130%' : '120%',
  height: $variant === 'room' ? '130%' : '120%',
  opacity: 1,
  objectFit: 'contain',
  pointerEvents: 'none',
  zIndex: 0,
}));

export const ActionButtonSmallText = styled.span(({ theme }) => ({
  ...theme.fonts.title,
  fontSize: '30px',
  lineHeight: 1.1,
  position: 'relative',
  zIndex: 1,
  color: theme.colors.Font,
}));

export const ActionButtonMainText = styled.span<{ $variant?: 'room' | 'code' }>(
  ({ theme, $variant }) => ({
    ...theme.fonts.emphasis,
    fontSize: '40px',
    lineHeight: 1.1,
    position: 'relative',
    zIndex: 1,
    color: $variant === 'room' ? theme.colors.hightlight : theme.colors.Font,
    '@media (max-width: 768px)': {
      fontSize: '26px',
    },
    '@media (max-width: 480px)': {
      fontSize: '22px',
    },
  })
);

export const ActionButtonDescription = styled.span(({ theme }) => ({
  ...theme.fonts.body.Regular,
  color: 'rgba(62, 86, 139, 0.7)',
  position: 'relative',
  zIndex: 1,
  maxWidth: '90%',
  '@media (max-width: 768px)': {
    fontSize: '14px',
  },
}));
