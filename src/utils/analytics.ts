import ReactGA from 'react-ga4';

// GA 추적 ID (환경 변수 또는 하드코딩)
const GA_MEASUREMENT_ID =
  (import.meta.env.VITE_GOOGLE_ANALYTICS_ID as string | undefined) || '';

// GA 초기화
export const initGA = () => {
  if (GA_MEASUREMENT_ID) {
    ReactGA.initialize(GA_MEASUREMENT_ID, {
      // 개발 모드에서도 실제 데이터를 전송하려면 testMode: false로 설정
      // testMode: false,
    });
    console.log('Google Analytics initialized:', GA_MEASUREMENT_ID);
  } else {
    console.warn('GA_MEASUREMENT_ID is not defined');
  }
};

// 페이지 뷰 추적
export const trackPageView = (path: string, title?: string) => {
  if (import.meta.env.MODE === 'development') {
    console.log('[GA] Page View:', path, title);
  }
  ReactGA.send({ hitType: 'pageview', page: path, title });
};

// 이벤트 추적
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
) => {
  if (import.meta.env.MODE === 'development') {
    console.log('[GA] Event:', { category, action, label, value });
  }
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};

// 커스텀 이벤트 추적
export const trackCustomEvent = (
  eventName: string,
  params?: Record<string, any>
) => {
  ReactGA.event(eventName, params);
};
