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
  background: `linear-gradient(180deg, #F5F5FE 0%, #ECF1FD 33.33%, #E2F1FE 66.66%, #E2F6FF 100%)`,
  borderRadius: '20px',
  border: '4px solid transparent',
  backgroundImage: `linear-gradient(180deg, #F5F5FE 0%, #ECF1FD 33.33%, #E2F1FE 66.66%, #E2F6FF 100%), linear-gradient(180deg, #EAEAEA 10%, #9BB3FF 30%, #5B9DFF 20%)`,
  backgroundOrigin: 'border-box',
  backgroundClip: 'padding-box, border-box',
  boxShadow: '0px 2px 30px 0px rgba(255, 255, 255, 1)',
  width: '100%',
  maxWidth: '500px',
  maxHeight: '90vh',
  overflowY: 'auto',
  '@media (max-width: 768px)': {
    maxWidth: '90%',
    borderRadius: '16px',
    borderWidth: '3px',
  },
  '@media (max-width: 480px)': {
    maxWidth: '95%',
    borderRadius: '12px',
    borderWidth: '3px',
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
  '@media (max-width: 768px)': {
    gap: '20px',
  },
  '@media (max-width: 480px)': {
    gap: '16px',
  },
});

export const FormGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  '@media (max-width: 480px)': {
    gap: '10px',
  },
});

export const Label = styled.label(({ theme }) => ({
  ...theme.fonts.body.Regular,
  color: theme.colors.Font,
  fontWeight: '500',
  '@media (max-width: 480px)': {
    fontSize: '15px',
  },
}));

export const CharacterGrid = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: '12px',
  '@media (max-width: 768px)': {
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '10px',
  },
  '@media (max-width: 480px)': {
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '8px',
  },
});

export const CharacterButton = styled.button<{ $isSelected: boolean }>(
  ({ $isSelected, theme }) => ({
    aspectRatio: '1',
    border: 'none',
    borderRadius: '12px',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    padding: 0,
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    boxShadow: $isSelected
      ? `0px 0px 0px 3px ${theme.colors.hightlight}`
      : 'none',
    '&:hover': {
      boxShadow: `0px 0px 0px 2px ${theme.colors.hightlight}`,
    },
    '@media (max-width: 480px)': {
      borderRadius: '10px',
    },
  })
);

export const CharacterImage = styled.img({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  display: 'block',
});

export const SubmitButton = styled(Button)({
  marginTop: '8px',
  '@media (max-width: 480px)': {
    marginTop: '4px',
  },
});
