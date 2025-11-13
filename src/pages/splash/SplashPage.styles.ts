import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div(({ theme }) => ({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  overflow: 'hidden',
}));

export const BackgroundDecoration = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  pointerEvents: 'none',
});

interface QuestionMarkProps {
  $top?: string;
  $right?: string;
  $bottom?: string;
  $left?: string;
  $size: string;
  $opacity: number;
  $flip?: boolean;
  $rotation?: number;
}

export const QuestionMark = styled.img<QuestionMarkProps>(
  ({ $top, $right, $bottom, $left, $size, $opacity, $flip, $rotation }) => {
    const transforms: string[] = [];
    if ($flip) transforms.push('scaleX(-1)');
    if ($rotation !== undefined) transforms.push(`rotate(${$rotation}deg)`);

    return {
      position: 'absolute',
      ...($top && { top: $top }),
      ...($right && { right: $right }),
      ...($bottom && { bottom: $bottom }),
      ...($left && { left: $left }),
      width: $size,
      height: 'auto',
      maxWidth: $size,
      maxHeight: $size,
      objectFit: 'contain',
      opacity: $opacity,
      userSelect: 'none',
      pointerEvents: 'none',
      zIndex: 0,
      transform: transforms.length > 0 ? transforms.join(' ') : 'none',
    };
  }
);

export const Content = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1,
  position: 'relative',
});

export const ServiceDescription = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
});

export const DescriptionText = styled.div(({ theme }) => ({
  ...theme.fonts.emphasis,
  color: theme.colors.hightlight,
}));

export const Tagline = styled.div(({ theme }) => ({
  ...theme.fonts.body.Regular,
  color: theme.colors.hightlight,
}));

export const LogoSection = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  position: 'relative',
});

export const LogoText = styled.img({
  width: '40%',
});

export const ButtonGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  alignItems: 'center',
});

export const ButtonLink = styled(Link)({
  textDecoration: 'none',
  display: 'inline-block',
  width: '100%',
});

export const ButtonContainer = styled.div({
  width: '216px',
  display: 'flex',
  justifyContent: 'center',
  '@media (max-width: 1200px)': {
    width: '200px',
  },
  '@media (max-width: 1024px)': {
    width: '190px',
  },
  '@media (max-width: 768px)': {
    width: '180px',
  },
  '@media (max-width: 480px)': {
    width: '100%',
    maxWidth: '170px',
  },
  '@media (max-width: 360px)': {
    width: '100%',
    maxWidth: '160px',
  },
});
