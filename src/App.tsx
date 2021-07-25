import { useState } from "react";

import { ThemeProvider } from "styled-components";

import { lightTheme } from "./components/Themes";
import { GlobalStyles } from "./components/GlobalStyles";

import { Header } from "./components/Layout/Header";
import { Meals } from "./components/Layout/Meals";
import { Cart } from "./components/Cart";

import { CartContextProvider } from "./contexts/CartContext";

function App() {
  const [cartIsVisible, setCartIsVisible] = useState(false);

  const toggleCardVisiblity = () => {
    setCartIsVisible(!cartIsVisible);
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <CartContextProvider>
        {cartIsVisible && <Cart onCloseCart={toggleCardVisiblity} />}
        <Header onShowCart={toggleCardVisiblity} />
        <main>
          <Meals />
        </main>
      </CartContextProvider>
    </ThemeProvider>
  );
}

export default App;
