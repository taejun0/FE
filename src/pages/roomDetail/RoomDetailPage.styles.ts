import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {
  InfoCard,
  ActionButton,
  ActionButtonBackgroundImage,
  ActionButtonSmallText,
  ActionButtonMainText,
} from '@pages/mainpage/MainPage.styles';

export const Wrapper = styled.div(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  background: theme.colors.backgroundGradient,
  paddingBottom: '48px',
  gap: '24px',
  '@media (max-width: 768px)': {
    gap: '32px',
    paddingBottom: '36px',
  },
  '@media (max-width: 480px)': {
    gap: '28px',
    paddingBottom: '28px',
  },
}));

export const Header = styled.header({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '32px 76px 24px',
  '@media (max-width: 768px)': {
    padding: '24px 28px 20px',
  },
});

export const LogoLink = styled(Link)({
  display: 'inline-flex',
  alignItems: 'center',
  textDecoration: 'none',
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

  cursor: 'pointer',
});

export const MyPageButton = styled.button({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  '@media (max-width: 768px)': {
    gap: '8px',
  },
  '@media (max-width: 480px)': {
    flexDirection: 'row',
    gap: '12px',
  },
});

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
  fontSize: '16px',
  color: theme.colors.Font,
  '@media (max-width: 768px)': {
    fontSize: '14px',
  },
  '@media (max-width: 480px)': {
    fontSize: '13px',
  },
}));

export const Content = styled.main({
  display: 'flex',
  gap: '32px',
  padding: '0 76px',
  '@media (max-width: 1024px)': {
    flexDirection: 'column',
  },
  '@media (max-width: 768px)': {
    padding: '0 24px',
    gap: '24px',
  },
});

export const HeaderSection = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  padding: '0 76px',
  '@media (max-width: 1024px)': {
    padding: '0 48px',
  },
  '@media (max-width: 768px)': {
    padding: '0 24px',
    gap: '24px',
  },
  '@media (max-width: 480px)': {
    padding: '0 20px',
    gap: '20px',
  },
});

export const LeftColumn = styled.div({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '28px',
  '@media (max-width: 768px)': {
    gap: '24px',
  },
  '@media (max-width: 480px)': {
    gap: '20px',
  },
});

export const RightColumn = styled.aside({
  width: '320px',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  flexShrink: 0,
  '@media (max-width: 1024px)': {
    width: '100%',
    flexDirection: 'row',
    gap: '16px',
    flexWrap: 'wrap',
  },
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    width: '100%',
    gap: '20px',
  },
  '@media (max-width: 480px)': {
    gap: '16px',
  },
});

export const Card = styled.div({
  borderRadius: '28px',
  border: '5px solid transparent',
  backgroundImage:
    'linear-gradient(180deg, rgba(255, 255, 255, 0.65) 0%, rgba(255, 255, 255, 0.45) 100%), linear-gradient(180deg, rgba(234, 234, 234, 0.35) 0%, rgba(155, 179, 255, 0.25) 50%, rgba(91, 157, 255, 0.2) 100%)',
  backgroundOrigin: 'padding-box, border-box',
  backgroundClip: 'padding-box, border-box',
  boxShadow:
    '0px 32px 64px rgba(91, 157, 255, 0.18), inset 0px 1px 4px rgba(255, 255, 255, 0.6)',
});

export const WelcomeCard = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '28px',
  padding: '32px 36px 0 36px',
  '@media (max-width: 1024px)': {
    padding: '28px 32px 0 32px',
  },
  '@media (max-width: 768px)': {
    padding: '24px 0 0 0',
    gap: '24px',
  },
  '@media (max-width: 560px)': {
    padding: '20px 0 0 0',
    gap: '20px',
  },
});

export const WelcomeHeader = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  flexWrap: 'wrap',
  '@media (max-width: 560px)': {
    gap: '16px',
  },
});

export const WelcomeTextGroup = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  ...theme.fonts.title,
  fontSize: '32px',
  color: theme.colors.Font,
  flexWrap: 'wrap',

  borderBottom: '2px solid rgba(64, 115, 255, 0.2)',
  paddingBottom: '12px',
  '@media (max-width: 768px)': {
    fontSize: '28px',
    gap: '10px',
  },
  '@media (max-width: 560px)': {
    fontSize: '24px',
  },
  '@media (max-width: 420px)': {
    fontSize: '22px',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '6px',
  },
}));

export const GroupName = styled.span(({ theme }) => ({
  fontFamily:
    'OnglThinker, Pretendard, -apple-system, BlinkMacSystemFont, "Malgun Gothic", "맑은 고딕", sans-serif',
  fontSize: '58px',
  color: theme.colors.Font,
  fontWeight: 400,
  '@media (max-width: 1024px)': {
    fontSize: '48px',
  },
  '@media (max-width: 768px)': {
    fontSize: '40px',
  },
  '@media (max-width: 560px)': {
    fontSize: '34px',
  },
  '@media (max-width: 420px)': {
    fontSize: '30px',
  },
}));

export const WelcomeCharacter = styled.div({
  width: '110px',
  height: '110px',
  borderRadius: '50%',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background:
    'linear-gradient(180deg, rgba(243, 248, 255, 1) 0%, rgba(222, 237, 255, 1) 100%)',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  '@media (max-width: 768px)': {
    width: '90px',
    height: '90px',
  },
  '@media (max-width: 560px)': {
    width: '80px',
    height: '80px',
  },
});

export const MateSection = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '24px',
  padding: '24px 32px',
  width: 'fit-content',
  borderRadius: '28px',
  border: '2px solid transparent',
  backgroundImage:
    'linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.45) 100%), linear-gradient(180deg, rgba(234, 234, 234, 0.35) 0%, rgba(155, 179, 255, 0.25) 50%, rgba(91, 157, 255, 0.2) 100%)',
  backgroundOrigin: 'padding-box, border-box',
  backgroundClip: 'padding-box, border-box',
  boxShadow:
    '0px 32px 64px rgba(91, 157, 255, 0.18), inset 0px 1px 4px rgba(255, 255, 255, 0.6)',
  '@media (max-width: 1024px)': {
    width: '100%',
    justifyContent: 'space-between',
  },
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '20px',
    width: '100%',
  },
  '@media (max-width: 560px)': {
    padding: '20px',
    gap: '16px',
  },
});

export const MateRow = styled.div({
  display: 'flex',
  gap: '20px',
  alignItems: 'center',
  flexWrap: 'wrap',
  '@media (max-width: 768px)': {
    justifyContent: 'space-between',
  },
  '@media (max-width: 560px)': {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '14px',
  },
});

export const MateInfo = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  justifyContent: 'center',
  '@media (max-width: 768px)': {
    gap: '10px',
  },
  '@media (max-width: 560px)': {
    textAlign: 'left',
  },
});

export const MateTitle = styled.span(({ theme }) => ({
  ...theme.fonts.emphasis,
  fontSize: '24px',
  color: theme.colors.Font,
  '@media (max-width: 768px)': {
    fontSize: '22px',
  },
  '@media (max-width: 560px)': {
    fontSize: '20px',
  },
}));

export const MateList = styled.div({
  display: 'flex',
  gap: '12px',
  flexWrap: 'wrap',
  flex: 1,
  justifyContent: 'center',
  '@media (max-width: 768px)': {
    justifyContent: 'flex-start',
  },
  '@media (max-width: 560px)': {
    justifyContent: 'center',
  },
});

export const MateAvatar = styled.div(({ theme }) => ({
  width: '64px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: theme.colors.Font,
  fontSize: '14px',
  ...theme.fonts.body.Regular,
  '@media (max-width: 768px)': {
    width: '56px',
    fontSize: '13px',
  },
  '@media (max-width: 480px)': {
    width: '52px',
  },
}));

export const MateAvatarImage = styled.div({
  width: '100%',
  aspectRatio: '1/1',
  borderRadius: '50%',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& img': {
    width: '80%',
    height: '80%',
    objectFit: 'contain',
  },
});

export const CopyCodeButton = styled.button(({ theme }) => ({
  padding: '2px 4px',
  borderRadius: '12px',
  border: `1px solid ${theme.colors.hightlight}`,
  background: 'transparent',
  ...theme.fonts.body.Regular,
  color: theme.colors.hightlight,
  cursor: 'pointer',
  minWidth: '88px',
  '@media (max-width: 768px)': {
    padding: '4px 8px',
    fontSize: '14px',
  },
  '@media (max-width: 560px)': {
    alignSelf: 'flex-start',
  },
}));

export const UtilityRow = styled.div({
  display: 'grid',
  gridTemplateColumns: '1fr 1.5fr',
  gap: '20px',
  '@media (max-width: 960px)': {
    gridTemplateColumns: '1fr',
  },
});

export const NewQuizCard = styled(ActionButton).attrs({ $variant: 'room' })({
  minHeight: '200px',
});

export const NewQuizBackground = styled(ActionButtonBackgroundImage).attrs({
  $variant: 'room',
})({});

export const NewQuizLabel = styled(ActionButtonSmallText)({});
export const NewQuizTitle = styled(ActionButtonMainText).attrs({
  $variant: 'room',
})({});

export const UploadCard = styled.div({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  padding: '24px',
  borderRadius: '20px',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
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
  '@media (max-width: 768px)': {
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: '16px',
    padding: '20px',
  },
  '@media (max-width: 480px)': {
    gap: '14px',
    padding: '18px',
  },
});

export const UploadLeft = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '16px',
  textAlign: 'center',
  '@media (max-width: 768px)': {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  '@media (max-width: 560px)': {
    flexDirection: 'column',
    gap: '12px',
  },
});

export const UploadFolderImage = styled.img({
  width: '96px',
  height: '72px',
  objectFit: 'contain',
  opacity: 0.9,
  '@media (max-width: 768px)': {
    width: '80px',
    height: '60px',
  },
  '@media (max-width: 560px)': {
    width: '72px',
    height: '54px',
  },
});

export const UploadLeftLabel = styled.span(({ theme }) => ({
  ...theme.fonts.emphasis,
  fontSize: '18px',
  color: theme.colors.Font,
  '@media (max-width: 768px)': {
    fontSize: '16px',
  },
  '@media (max-width: 560px)': {
    fontSize: '15px',
  },
}));

export const UploadDivider = styled.div({
  width: '1px',
  alignSelf: 'stretch',
  background: 'rgba(155, 179, 255, 0.3)',
  '@media (max-width: 768px)': {
    display: 'none',
  },
});

export const UploadRight = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  flex: 1,
  height: '100%',
  justifyContent: 'flex-start',
  '@media (max-width: 768px)': {
    gap: '10px',
  },
});

export const UploadRightHeader = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
  '@media (max-width: 768px)': {
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
});

export const UploadRightTitle = styled.h3(({ theme }) => ({
  ...theme.fonts.emphasis,
  fontSize: '22px',
  color: theme.colors.Font,
  margin: 0,
  '@media (max-width: 768px)': {
    fontSize: '20px',
  },
  '@media (max-width: 560px)': {
    fontSize: '18px',
  },
}));

export const UploadDescription = styled.span(({ theme }) => ({
  ...theme.fonts.body.Regular,
  fontSize: '18px',
  color: 'rgba(62, 86, 139, 0.7)',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  '@media (max-width: 768px)': {
    fontSize: '16px',
  },
  '@media (max-width: 560px)': {
    fontSize: '15px',
  },
}));

export const MoreButton = styled.button({
  border: 'none',
  background: 'transparent',
  padding: 0,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const MoreIcon = styled.img({
  width: '24px',
  height: '24px',
  objectFit: 'contain',
});

export const UploadListCard = styled(Card)({
  padding: '28px',
  minHeight: '150px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  color: '#4C5B7C',
  fontSize: '18px',
  gap: '8px',
});

export const UploadIcon = styled.div({
  width: '64px',
  height: '48px',
  borderRadius: '16px',
  background:
    'linear-gradient(180deg, rgba(228, 238, 255, 1) 0%, rgba(213, 228, 255, 1) 100%)',
});

export const SectionCard = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const SectionTitle = styled.h2(({ theme }) => ({
  ...theme.fonts.emphasis,
  fontSize: '26px',
  color: theme.colors.hightlight,
  margin: 0,
  '@media (max-width: 768px)': {
    fontSize: '24px',
  },
  '@media (max-width: 560px)': {
    fontSize: '22px',
  },
}));

export const EmptyState = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '24px',
  border: `2px dashed rgba(83, 155, 255, 0.5)`,
  backgroundColor: 'rgba(255, 255, 255, 0)',
  padding: '36px',
  textAlign: 'center',
  color: 'rgba(62, 86, 139, 0.65)',
  '@media (max-width: 768px)': {
    padding: '28px',
  },
  '@media (max-width: 560px)': {
    padding: '24px',
  },
}));

export const EmptyStateImage = styled.div({
  width: '104px',
  height: '104px',
  borderRadius: '50%',
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    opacity: 0.65,
  },
  '@media (max-width: 560px)': {
    width: '88px',
    height: '88px',
  },
});

export const SidebarCard = styled(InfoCard)({
  padding: '28px 24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  '@media (max-width: 768px)': {
    padding: '24px 20px',
    gap: '14px',
  },
});

export const SidebarTitle = styled.h3(({ theme }) => ({
  ...theme.fonts.emphasis,
  fontSize: '24px',
  color: theme.colors.hightlight,
  margin: 0,
  '@media (max-width: 768px)': {
    fontSize: '22px',
  },
  '@media (max-width: 560px)': {
    fontSize: '20px',
  },
}));

export const CurrentRankText = styled.span(({ theme }) => ({
  ...theme.fonts.body.Regular,
  fontSize: '18px',
  color: theme.colors.Font,
  '@media (max-width: 768px)': {
    fontSize: '16px',
  },
  '@media (max-width: 560px)': {
    fontSize: '15px',
  },
}));

export const RankingList = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  '@media (max-width: 768px)': {
    gap: '10px',
  },
});

export const RankingItem = styled.div<{ $highlight?: boolean }>(
  ({ $highlight }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    opacity: $highlight ? 1 : 0.75,
  })
);

export const RankingBadge = styled.div(({ theme }) => ({
  width: '42px',
  height: '42px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background:
    'linear-gradient(180deg, rgba(234, 234, 234, 0.35) 0%, rgba(155, 179, 255, 0.25) 60%, rgba(91, 157, 255, 0.2) 100%)',
  color: theme.colors.hightlight,
  fontWeight: 600,
  fontSize: '18px',
  '@media (max-width: 768px)': {
    width: '38px',
    height: '38px',
    fontSize: '16px',
  },
  '@media (max-width: 560px)': {
    width: '34px',
    height: '34px',
    fontSize: '15px',
  },
}));

export const RankingName = styled.span(({ theme }) => ({
  ...theme.fonts.body.Regular,
  fontSize: '18px',
  color: theme.colors.Font,
  '@media (max-width: 768px)': {
    fontSize: '16px',
  },
  '@media (max-width: 560px)': {
    fontSize: '15px',
  },
}));

export const HorizontalScrollArea = styled.div({
  position: 'relative',
  display: 'flex',
  gap: '16px',
  overflowX: 'auto',
  paddingBottom: '8px',
  scrollBehavior: 'smooth',
  WebkitOverflowScrolling: 'touch',
  '&::-webkit-scrollbar': {
    height: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'rgba(106, 150, 255, 0.3)',
    borderRadius: '4px',
  },
  '@media (max-width: 560px)': {
    gap: '12px',
  },
});

export const QuizCardList = styled(HorizontalScrollArea)({});
export const QnaCardList = styled(HorizontalScrollArea)({});
