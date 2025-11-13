import styled from 'styled-components';

export const Overlay = styled.div({
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  backdropFilter: 'blur(8px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1200,
  padding: '24px',
  boxSizing: 'border-box',
  '@media (max-width: 480px)': {
    padding: '16px',
  },
});

export const Modal = styled.div(({ theme }) => ({
  width: '100%',
  maxWidth: '480px',
  borderRadius: '28px',
  border: '5px solid transparent',
  backgroundImage:
    'linear-gradient(180deg, rgba(232, 242, 255, 0.8) 0%, rgba(244, 248, 255, 1) 100%), linear-gradient(180deg, rgba(234, 234, 234, 0.35) 0%, rgba(155, 179, 255, 0.25) 50%, rgba(91, 157, 255, 0.2) 100%)',
  backgroundClip: 'padding-box, border-box',
  backgroundOrigin: 'padding-box, border-box',
  boxShadow:
    '0px 24px 48px rgba(91, 157, 255, 0.18), inset 0px 1px 4px rgba(255, 255, 255, 0.6)',
  padding: '40px 40px 36px',
  display: 'flex',
  flexDirection: 'column',
  gap: '28px',
  boxSizing: 'border-box',
  '@media (max-width: 520px)': {
    padding: '32px 28px',
    borderRadius: '24px',
  },
  '@media (max-width: 400px)': {
    padding: '26px 20px',
    gap: '24px',
    borderRadius: '20px',
  },
}));

export const Header = styled.div({
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const Title = styled.h2(({ theme }) => ({
  ...theme.fonts.emphasis,
  fontSize: '28px',
  color: theme.colors.hightlight,
  margin: 0,
  '@media (max-width: 520px)': {
    fontSize: '24px',
  },
  '@media (max-width: 400px)': {
    fontSize: '22px',
  },
}));

export const Subtitle = styled.span(({ theme }) => ({
  ...theme.fonts.body.Regular,
  fontSize: '16px',
  color: 'rgba(62, 86, 139, 0.8)',
  '@media (max-width: 520px)': {
    fontSize: '14px',
  },
  '@media (max-width: 400px)': {
    fontSize: '13px',
  },
}));

export const TrackWrapper = styled.div({
  overflow: 'hidden',
  width: '100%',
});

export const Track = styled.div({
  display: 'flex',
  transition: 'transform 0.3s ease',
});

export const Slide = styled.div({
  width: '100%',
  flexShrink: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
  boxSizing: 'border-box',
  '@media (max-width: 400px)': {
    gap: '16px',
  },
});

export const FormSection = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  '@media (max-width: 400px)': {
    gap: '10px',
  },
});

export const Label = styled.span(({ theme }) => ({
  ...theme.fonts.body.Regular,
  fontSize: '16px',
  color: theme.colors.Font,
  '@media (max-width: 520px)': {
    fontSize: '15px',
  },
  '@media (max-width: 400px)': {
    fontSize: '14px',
  },
}));

export const SegmentedControl = styled.div({
  display: 'flex',
  gap: '10px',
  flexWrap: 'wrap',
});

export const SegmentButton = styled.button<{ $active: boolean }>(
  ({ theme, $active }) => ({
    padding: '8px 16px',
    borderRadius: '18px',
    border: $active
      ? `1px solid ${theme.colors.hightlight}`
      : '1px solid rgba(83, 155, 255, 0.25)',
    backgroundColor: $active
      ? 'rgba(83, 155, 255, 0.15)'
      : 'rgba(255, 255, 255, 0.6)',
    color: $active ? theme.colors.hightlight : 'rgba(62, 86, 139, 0.7)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '@media (max-width: 400px)': {
      flex: '1 1 calc(50% - 6px)',
      textAlign: 'center',
    },
  })
);

export const Input = styled.input({
  width: '100%',
  padding: '12px 16px',
  borderRadius: '14px',
  border: '1px solid rgba(83, 155, 255, 0.4)',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  outline: 'none',
  fontSize: '16px',
  transition: 'border-color 0.2s ease',
  '&:focus': {
    borderColor: 'rgba(83, 155, 255, 0.8)',
  },
  '@media (max-width: 520px)': {
    padding: '10px 14px',
  },
  '@media (max-width: 400px)': {
    fontSize: '15px',
  },
});

export const OXButtonGroup = styled.div({
  display: 'flex',
  gap: '12px',
  '@media (max-width: 400px)': {
    gap: '10px',
  },
});

export const OXButton = styled.button<{ $active: boolean }>(
  ({ theme, $active }) => ({
    flex: 1,
    padding: '12px 0',
    borderRadius: '14px',
    border: `1px solid ${theme.colors.hightlight}`,
    backgroundColor: $active
      ? 'rgba(83, 155, 255, 0.2)'
      : 'rgba(255, 255, 255, 0.8)',
    color: $active ? theme.colors.hightlight : theme.colors.Font,
    fontSize: '18px',
    fontWeight: 600,
    cursor: 'pointer',
    '@media (max-width: 520px)': {
      fontSize: '16px',
      padding: '10px 0',
    },
    '@media (max-width: 400px)': {
      fontSize: '15px',
    },
  })
);

export const MultipleChoiceGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  '@media (max-width: 400px)': {
    gap: '8px',
  },
});

export const UploadBox = styled.div<{ $hasPreview: boolean }>(
  ({ $hasPreview }) => ({
    border: $hasPreview ? 'none' : '2px dashed rgba(83, 155, 255, 0.4)',
    borderRadius: '16px',
    minHeight: $hasPreview ? 'auto' : '120px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'rgba(83, 155, 255, 0.7)',
    backgroundColor: $hasPreview ? 'transparent' : 'rgba(255, 255, 255, 0.6)',
    cursor: 'pointer',
    textAlign: 'center',
    padding: $hasPreview ? '0' : '12px',
    transition: 'border 0.2s ease, background-color 0.2s ease',
    '@media (max-width: 400px)': {
      minHeight: $hasPreview ? 'auto' : '100px',
      padding: $hasPreview ? '0' : '10px',
    },
  })
);

export const UploadPlaceholder = styled.span({
  fontSize: '14px',
  color: 'rgba(83, 155, 255, 0.7)',
  '@media (max-width: 400px)': {
    fontSize: '13px',
  },
});

export const UploadPreview = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '100%',
  '@media (max-width: 400px)': {
    gap: '10px',
  },
});

export const UploadPreviewImage = styled.img({
  width: '100%',
  height: '160px',
  objectFit: 'cover',
  borderRadius: '12px',

  '@media (max-width: 400px)': {
    height: '140px',
  },
});

export const UploadPreviewFooter = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: 'rgba(62, 86, 139, 0.85)',
  fontSize: '13px',
  gap: '8px',
  '& span': {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '70%',
  },
  '@media (max-width: 400px)': {
    fontSize: '12px',
    gap: '6px',
  },
});

export const RemoveImageButton = styled.button({
  border: 'none',
  background: 'rgba(255, 255, 255, 0.9)',
  color: 'rgba(255, 91, 91, 0.9)',
  cursor: 'pointer',
  fontSize: '12px',
  padding: '6px 10px',
  borderRadius: '999px',
  boxShadow: '0 4px 8px rgba(255, 91, 91, 0.25)',
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'translateY(-1px)',
  },
  '@media (max-width: 400px)': {
    fontSize: '11px',
    padding: '5px 9px',
  },
});

export const HiddenFileInput = styled.input({
  display: 'none',
});

export const QuestionFooter = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
  '@media (max-width: 480px)': {
    justifyContent: 'center',
  },
});

export const RemoveButton = styled.button({
  border: 'none',
  background: 'transparent',
  color: 'rgba(255, 91, 91, 0.9)',
  cursor: 'pointer',
  fontSize: '14px',
  '@media (max-width: 400px)': {
    fontSize: '13px',
  },
});

export const SliderControls = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '12px',
  '@media (max-width: 480px)': {
    flexDirection: 'column',
    gap: '10px',
    alignItems: 'stretch',
  },
});

export const SliderButton = styled.button<{ disabled?: boolean }>(
  ({ theme, disabled }) => ({
    border: 'none',
    borderRadius: '12px',
    padding: '10px 18px',
    backgroundColor: disabled
      ? 'rgba(83, 155, 255, 0.2)'
      : theme.colors.hightlight,
    color: disabled ? 'rgba(255, 255, 255, 0.7)' : theme.colors.white,
    cursor: disabled ? 'default' : 'pointer',
    transition: 'opacity 0.2s ease',
    '&:hover': {
      opacity: disabled ? 0.7 : 0.9,
    },
    '@media (max-width: 480px)': {
      width: '100%',
    },
  })
);

export const SliderIndicator = styled.span(({ theme }) => ({
  ...theme.fonts.body.Regular,
  fontSize: '16px',
  color: theme.colors.Font,
  '@media (max-width: 480px)': {
    textAlign: 'center',
  },
  '@media (max-width: 400px)': {
    fontSize: '14px',
  },
}));

export const FooterButtons = styled.div({
  display: 'flex',
  gap: '12px',
  justifyContent: 'space-between',
  alignItems: 'center',
  '@media (max-width: 560px)': {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
});

export const AddQuestionButton = styled.button(({ theme }) => ({
  borderRadius: '14px',
  border: `1px solid ${theme.colors.hightlight}`,
  background: 'rgba(255, 255, 255, 0.8)',
  color: theme.colors.hightlight,
  padding: '12px 16px',
  cursor: 'pointer',
  flex: '0 0 auto',
  '@media (max-width: 560px)': {
    width: '100%',
    textAlign: 'center',
  },
}));

export const SubmitButton = styled.button(({ theme }) => ({
  borderRadius: '14px',
  border: 'none',
  background:
    'linear-gradient(90deg, rgba(114, 167, 255, 1) 0%, rgba(170, 200, 255, 1) 100%)',
  color: theme.colors.white,
  padding: '12px 24px',
  cursor: 'pointer',
  flex: 1,
  '@media (max-width: 560px)': {
    width: '100%',
  },
  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
}));

export const ModeSelectionContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: '100%',
  '@media (max-width: 400px)': {
    gap: '12px',
  },
});

export const ModeOption = styled.button(({ theme }) => ({
  width: '100%',
  padding: '24px 32px',
  borderRadius: '16px',
  border: `2px solid ${theme.colors.hightlight}`,
  background: 'rgba(255, 255, 255, 0.9)',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0px 4px 12px rgba(91, 157, 255, 0.1)',
  '&:hover': {
    background: 'rgba(91, 157, 255, 0.1)',
    transform: 'translateY(-2px)',
    boxShadow: '0px 6px 16px rgba(91, 157, 255, 0.2)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
  '@media (max-width: 520px)': {
    padding: '20px 28px',
    borderRadius: '14px',
  },
  '@media (max-width: 400px)': {
    padding: '18px 24px',
    borderRadius: '12px',
  },
}));

export const ModeTitle = styled.span(({ theme }) => ({
  ...theme.fonts.emphasis,
  fontSize: '20px',
  color: theme.colors.hightlight,
  '@media (max-width: 520px)': {
    fontSize: '18px',
  },
  '@media (max-width: 400px)': {
    fontSize: '16px',
  },
}));

export const AiFormContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  width: '100%',
  '@media (max-width: 400px)': {
    gap: '20px',
  },
});

export const PdfFileGrid = styled.div({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
  gap: '12px',
  width: '100%',
  '@media (max-width: 400px)': {
    gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
    gap: '10px',
  },
});

export const PdfFileCard = styled.button<{ $selected?: boolean }>(
  ({ theme, $selected }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '16px 12px',
    borderRadius: '12px',
    border: `2px solid ${
      $selected ? theme.colors.hightlight : 'rgba(91, 157, 255, 0.2)'
    }`,
    background: $selected
      ? 'rgba(91, 157, 255, 0.1)'
      : 'rgba(255, 255, 255, 0.8)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    '&:hover': {
      borderColor: theme.colors.hightlight,
      background: 'rgba(91, 157, 255, 0.1)',
      transform: 'translateY(-2px)',
    },
    '@media (max-width: 400px)': {
      padding: '12px 8px',
      gap: '6px',
    },
  })
);

export const PdfFileIcon = styled.span({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 'fit-content',
  height: 'fit-content',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
});

export const PdfFileName = styled.span(({ theme }) => ({
  ...theme.fonts.body.Regular,
  fontSize: '12px',
  color: theme.colors.Font,
  textAlign: 'center',
  wordBreak: 'break-word',
  '@media (max-width: 400px)': {
    fontSize: '11px',
  },
}));

export const EmptyPdfMessage = styled.div(({ theme }) => ({
  ...theme.fonts.body.Regular,
  fontSize: '14px',
  color: 'rgba(62, 86, 139, 0.6)',
  textAlign: 'center',
  padding: '20px',
  '@media (max-width: 400px)': {
    fontSize: '13px',
    padding: '16px',
  },
}));

export const AiNextButton = styled.button(({ theme }) => ({
  width: '100%',
  borderRadius: '14px',
  border: 'none',
  background:
    'linear-gradient(90deg, rgba(114, 167, 255, 1) 0%, rgba(170, 200, 255, 1) 100%)',
  color: theme.colors.white,
  padding: '14px 24px',
  cursor: 'pointer',
  ...theme.fonts.emphasis,
  fontSize: '18px',
  marginTop: '8px',
  '@media (max-width: 520px)': {
    padding: '12px 20px',
    fontSize: '16px',
  },
  '@media (max-width: 400px)': {
    padding: '10px 16px',
    fontSize: '15px',
  },
  '&:disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
}));
