import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div(({ theme }) => ({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  padding: '20px',
  boxSizing: 'border-box',
  '@media (max-width: 1200px)': {
    padding: '16px',
  },
  '@media (max-width: 768px)': {
    padding: '12px',
  },
  '@media (max-width: 480px)': {
    padding: '8px',
  },
  '@media (max-width: 360px)': {
    padding: '4px',
  },
}));

export const LogoLink = styled(Link)({
  position: 'absolute',
  top: '5vh',
  left: '10vw',
  zIndex: 10,
  textDecoration: 'none',
  display: 'inline-block',
  '@media (max-width: 1200px)': {
    top: '4vh',
    left: '8vw',
  },
  '@media (max-width: 1024px)': {
    top: '3vh',
    left: '6vw',
  },
  '@media (max-width: 768px)': {
    top: '2.5vh',
    left: '5vw',
  },
  '@media (max-width: 480px)': {
    top: '2vh',
    left: '4vw',
  },
  '@media (max-width: 360px)': {
    top: '1.5vh',
    left: '3vw',
  },
});

export const Logo = styled.img({
  height: '100px',
  width: 'auto',
  display: 'block',
  '@media (max-width: 1200px)': {
    height: '90px',
  },
  '@media (max-width: 1024px)': {
    height: '80px',
  },
  '@media (max-width: 768px)': {
    height: '70px',
  },
  '@media (max-width: 480px)': {
    height: '60px',
  },
  '@media (max-width: 360px)': {
    height: '50px',
  },
});

export const SignupCard = styled.div(({ theme }) => ({
  width: '40%',
  borderRadius: '30px',
  background: theme.colors.modalBorderGradient,
  padding: '4px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  '@media (max-width: 1200px)': {
    width: '50%',
  },
  '@media (max-width: 1024px)': {
    width: '60%',
  },
  '@media (max-width: 768px)': {
    width: '65%',
    borderRadius: '24px',
    padding: '3px',
  },
  '@media (max-width: 480px)': {
    width: '75%',
    borderRadius: '20px',
    padding: '3px',
  },
  '@media (max-width: 360px)': {
    width: '90%',
    borderRadius: '16px',
    padding: '2px',
  },
}));

export const SignupCardContent = styled.div(({ theme }) => ({
  width: '100%',
  background: theme.colors.cardGradient,
  borderRadius: '26px',
  padding: '77px 77px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '36px',
  '@media (max-width: 1200px)': {
    padding: '60px 60px',
    gap: '32px',
  },
  '@media (max-width: 1024px)': {
    padding: '50px 50px',
    gap: '28px',
  },
  '@media (max-width: 768px)': {
    padding: '40px 32px',
    gap: '24px',
    borderRadius: '22px',
  },
  '@media (max-width: 480px)': {
    padding: '32px 24px',
    gap: '20px',
    borderRadius: '18px',
  },
  '@media (max-width: 360px)': {
    padding: '24px 16px',
    gap: '16px',
    borderRadius: '14px',
  },
}));

export const Title = styled.h1(({ theme }) => ({
  ...theme.fonts.title,
  color: theme.colors.hightlight,
  textAlign: 'center',
  '@media (max-width: 768px)': {
    fontSize: '32px',
  },
  '@media (max-width: 480px)': {
    fontSize: '28px',
  },
  '@media (max-width: 360px)': {
    fontSize: '24px',
  },
}));

export const Form = styled.form({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  justifyContent: 'center',
  alignContent: 'center',
  '@media (max-width: 768px)': {
    gap: '18px',
  },
  '@media (max-width: 480px)': {
    gap: '16px',
  },
  '@media (max-width: 360px)': {
    gap: '14px',
  },
});

export const ButtonContainer = styled.div({
  width: '216px',
  display: 'flex',
  justifyContent: 'center',
  alignSelf: 'center',
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

const baseMessageStyle = {
  width: '100%',
  textAlign: 'center' as const,
  fontSize: '16px',
  lineHeight: 1.4,
  margin: 0,
};

export const ErrorMessage = styled.p(({ theme }) => ({
  ...theme.fonts.body.Regular,
  ...baseMessageStyle,
  color: theme.colors.error ?? '#FF6B6B',
}));

export const SuccessMessage = styled.p(({ theme }) => ({
  ...theme.fonts.body.Regular,
  ...baseMessageStyle,
  color: theme.colors.hightlight,
}));

export const MessageArea = styled.div<{ $visible: boolean }>(({ $visible }) => ({
  width: '100%',
  minHeight: '32px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'opacity 0.2s ease',
  opacity: $visible ? 1 : 0,
}));
