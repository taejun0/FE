import { useEffect } from 'react';
import GlobalStyle from './styles/global';
import { Outlet, useLocation } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { initGA, trackPageView } from './utils/analytics';

function App() {
  const location = useLocation();

  // GA 초기화 (앱 시작 시 한 번만)
  useEffect(() => {
    initGA();
  }, []);

  // 페이지 뷰 추적 (경로 변경 시마다)
  useEffect(() => {
    trackPageView(location.pathname + location.search, document.title);
  }, [location]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Outlet />
      </ThemeProvider>
    </>
  );
}

export default App;
