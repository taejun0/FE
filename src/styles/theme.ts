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
  },

  fonts: {
    // 타이포그래피 스타일
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
