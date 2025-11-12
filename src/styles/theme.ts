const fontGenerator = (
  fontSize = '0.9375rem',
  fontWeight = 'normal',
  lineHeight = 'normal',
  letterSpacing = 'normal',
  fontFamily = 'Pretendard, -apple-system, BlinkMacSystemFont, "Malgun Gothic", "맑은 고딕", sans-serif'
) => ({
  'font-family': fontFamily,
  'font-size': fontSize,
  'font-weight': fontWeight,
  'line-height': lineHeight,
  'letter-spacing': letterSpacing,
});

export const theme = {
  colors: {
    //색상
    hightlight: '#539BFF',
    background: '#F4F9FF',
    Font: '#565555',
    error: '#FF5B5B',
    success: '#6A96FF',
    white: '#FFFFFF',
    // 배경 그라데이션
    backgroundGradient: `linear-gradient(180deg, rgba(245, 245, 254, 1) 0%, rgba(236, 241, 253, 1) 25%, rgba(226, 241, 254, 1) 50%, rgba(226, 246, 255, 1) 75%, rgba(226, 246, 255, 1) 100%)`,
    // 모달 테두리 그라데이션
    modalBorderGradient: `linear-gradient(180deg, rgba(234, 234, 234, 0.1) 0%, rgba(155, 179, 255, 0.3) 50%, rgba(91, 157, 255, 0.2) 100%)`,
    // 카드 배경 그라데이션 (흰색에서 연한 파란색으로)
    cardGradient: `linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 50%, rgba(244, 249, 255, 1) 100%)`,
    // 버튼 색상
    button: {
      primary: {
        gradientStart: '#6A96FF',
        gradientEnd: '#AFBEF5',
        text: '#FFFFFF',
      },
      secondary: {
        background: '#F4F9FF',
        border: '#6A96FF',
        text: '#6A96FF',
      },
    },
  },

  fonts: {
    // 타이포그래피 스타일
    body: {
      Regular: fontGenerator(
        '17px',
        '400',
        '22px',
        '-0.43px',
        'Pretendard-Regular, -apple-system, BlinkMacSystemFont, "Malgun Gothic", "맑은 고딕", sans-serif'
      ),
    },
    small: fontGenerator(
      '18px',
      '400',
      '34px',
      '0.38px',
      'Pretendard-Regular, -apple-system, BlinkMacSystemFont, "Malgun Gothic", "맑은 고딕", sans-serif'
    ),
    normal: fontGenerator(
      '24px',
      '400',
      '34px',
      '0.38px',
      'Pretendard-Regular, -apple-system, BlinkMacSystemFont, "Malgun Gothic", "맑은 고딕", sans-serif'
    ),
    emphasis: fontGenerator(
      '24px',
      '600',
      '34px',
      '0.38px',
      'Pretendard-SemiBold, -apple-system, BlinkMacSystemFont, "Malgun Gothic", "맑은 고딕", sans-serif'
    ),
    title: fontGenerator(
      '36px',
      '700',
      '34px',
      '0.38px',
      'Pretendard-Bold, -apple-system, BlinkMacSystemFont, "Malgun Gothic", "맑은 고딕", sans-serif'
    ),
  },
};
