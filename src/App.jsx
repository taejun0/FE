import GlobalStyle from "./styles/global";
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import React from "react";
import { theme } from "./styles/theme.js";

function App() {
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
