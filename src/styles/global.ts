import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
*{box-sizing:border-box}
body, button, dd, dl, dt, fieldset, form, h1, h2, h3, h4, h5, h6, input, legend, li, ol, p, select, table, td, textarea, th, ul {margin:0;padding:0}
body, button, input, select, table, textarea {font-size:12px;line-height:16px;color:#202020;font-family: "Pretendard", -apple-system, BlinkMacSystemFont, "Malgun Gothic", "맑은 고딕", helvetica, sans-serif}
h1, h2, h3, h4, h5, h6 {font-size:inherit;line-height:inherit}
textarea {-webkit-backface-visibility:hidden;backface-visibility:hidden;background-color:transparent;border:0;word-break:keep-all;word-wrap:break-word}
button, input {-webkit-border-radius:0;border-radius:0;border:0}
button {background-color:transparent}
fieldset, img {border:0}
img {vertical-align:top}
ol, ul {list-style:none}
address, em {font-style:normal}
a {display:flex;text-decoration:none;cursor:pointer;}
iframe {overflow:hidden;margin:0;border:0;padding:0;vertical-align:top}
mark {background-color:transparent}
i {font-style:normal}

#root {
	display: flex;
	flex-direction: column;
	overflow: hidden;
	min-height: 100vh;
}

@font-face {
  font-family: 'Pretendard-Thin';
  src: url('/fonts/Pretendard-Thin.otf') format('opentype');
  font-weight: 100;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Pretendard-ExtraLight';
  src: url('/fonts/Pretendard-ExtraLight.otf') format('opentype');
  font-weight: 200;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Pretendard-Light';
  src: url('/fonts/Pretendard-Light.otf') format('opentype');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Pretendard-Regular';
  src: url('/fonts/Pretendard-Regular.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Pretendard-Medium';
  src: url('/fonts/Pretendard-Medium.otf') format('opentype');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Pretendard-SemiBold';
  src: url('/fonts/Pretendard-SemiBold.otf') format('opentype');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Pretendard-Bold';
  src: url('/fonts/Pretendard-Bold.otf') format('opentype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Pretendard-ExtraBold';
  src: url('/fonts/Pretendard-ExtraBold.otf') format('opentype');
  font-weight: 800;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Pretendard-Black';
  src: url('/fonts/Pretendard-Black.otf') format('opentype');
  font-weight: 900;
  font-style: normal;
  font-display: swap;
} 
@font-face {
  font-family: 'OnglThinker';
  src: url('/fonts/ongl_thinker.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
// 초기 html 설정
html {
	background: linear-gradient(180deg, rgba(245, 245, 254, 1) 0%, rgba(236, 241, 253, 1) 25%, rgba(226, 241, 254, 1) 50%, rgba(226, 246, 255, 1) 75%, rgba(226, 246, 255, 1) 100%);
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;

	-webkit-touch-callout: none;
    -webkit-tap-highlight-color:rgb(0 0 0 / 0%);
    scroll-behavior: smooth; 

}

body {
	width: 100%;
	max-width: 100%;
	overflow-x: hidden;
	min-height: 100vh;
	font-family: "Pretendard", -apple-system, BlinkMacSystemFont, "Malgun Gothic", "맑은 고딕", sans-serif;
	background: linear-gradient(180deg, rgba(245, 245, 254, 1) 0%, rgba(236, 241, 253, 1) 25%, rgba(226, 241, 254, 1) 50%, rgba(226, 246, 255, 1) 75%, rgba(226, 246, 255, 1) 100%);
	background-attachment: fixed;
}

#root {
	min-height: 100vh;
	background: linear-gradient(180deg, rgba(245, 245, 254, 1) 0%, rgba(236, 241, 253, 1) 25%, rgba(226, 241, 254, 1) 50%, rgba(226, 246, 255, 1) 75%, rgba(226, 246, 255, 1) 100%);
	background-attachment: fixed;
}
`;

export default GlobalStyle;
