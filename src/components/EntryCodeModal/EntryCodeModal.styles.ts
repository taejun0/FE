import styled from 'styled-components';
import { Button } from '@components/Button';

export const Overlay = styled.div({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  padding: '20px',
  boxSizing: 'border-box',
});

export const Modal = styled.div(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  borderRadius: '20px',
  border: '1px solid transparent',
  backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), linear-gradient(180deg, rgba(234, 234, 234, 0.1) 0%, rgba(155, 179, 255, 0.3) 50%, rgba(91, 157, 255, 0.2) 100%)`,
  backgroundOrigin: 'border-box',
  backgroundClip: 'padding-box, border-box',
  boxShadow: 'inset 0px 1px 4px 0px rgba(0, 0, 0, 0.25)',
  width: '100%',
  maxWidth: '400px',
  '@media (max-width: 768px)': {
    maxWidth: '90%',
    borderRadius: '16px',
  },
  '@media (max-width: 480px)': {
    maxWidth: '95%',
    borderRadius: '12px',
  },
}));

export const ModalContent = styled.div({
  padding: '40px',
  '@media (max-width: 768px)': {
    padding: '32px',
  },
  '@media (max-width: 480px)': {
    padding: '24px',
  },
});

export const Title = styled.h2(({ theme }) => ({
  ...theme.fonts.title,
  color: theme.colors.hightlight,
  marginBottom: '32px',
  textAlign: 'center',
  '@media (max-width: 768px)': {
    marginBottom: '24px',
    fontSize: '32px',
  },
  '@media (max-width: 480px)': {
    marginBottom: '20px',
    fontSize: '28px',
  },
}));

export const Form = styled.form({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  alignItems: 'center',
  '@media (max-width: 768px)': {
    gap: '20px',
  },
  '@media (max-width: 480px)': {
    gap: '16px',
  },
});

export const CodeInputContainer = styled.div({
  display: 'flex',
  gap: '16px',
  justifyContent: 'center',
  width: '100%',
  '@media (max-width: 768px)': {
    gap: '12px',
  },
  '@media (max-width: 480px)': {
    gap: '10px',
  },
});

export const CodeInput = styled.input(({ theme }) => ({
  width: '60px',
  height: '70px',
  textAlign: 'center',
  ...theme.fonts.title,
  fontSize: '32px',
  fontWeight: '700',
  color: theme.colors.Font,
  backgroundColor: theme.colors.white,
  border: 'none',
  borderRadius: '12px',
  outline: 'none',
  boxShadow: 'inset 0px 1px 4px 0px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.2s ease',
  '&:focus': {
    boxShadow: `inset 0px 1px 4px 0px rgba(0, 0, 0, 0.1), 0px 0px 0px 2px ${theme.colors.hightlight}`,
  },
  '@media (max-width: 768px)': {
    width: '55px',
    height: '65px',
    fontSize: '28px',
    borderRadius: '10px',
  },
  '@media (max-width: 480px)': {
    width: '50px',
    height: '60px',
    fontSize: '24px',
    borderRadius: '8px',
  },
}));

export const InstructionText = styled.p(({ theme }) => ({
  ...theme.fonts.body.Regular,
  color: theme.colors.Font,
  textAlign: 'center',
  margin: 0,
  '@media (max-width: 480px)': {
    fontSize: '15px',
  },
}));

export const SubmitButton = styled(Button)({
  width: '100%',
  marginTop: '8px',
  '@media (max-width: 480px)': {
    marginTop: '4px',
  },
});
