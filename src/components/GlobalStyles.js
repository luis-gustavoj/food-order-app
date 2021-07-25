import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box; 
  }

  body {
    color: ${(props) => props.theme.darkTextColor};
    background: ${(props) => props.theme.backgroundColor};
    font-family: 'Roboto', sans-serif;
  }
`;
