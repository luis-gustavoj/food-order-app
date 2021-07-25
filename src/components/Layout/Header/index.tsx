import styled from "styled-components";

import { HeaderCartButton } from "../HeaderCartButton";

import mealsImg from "../../../assets/images/meals.jpg";

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 5rem;
  background-color: ${(props) => props.theme.primaryColor};
  color: ${(props) => props.theme.textColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  z-index: 10;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 25rem;
  z-index: 0;
  overflow: hidden;

  img {
    width: 110%;
    height: 100%;
    object-fit: cover;
    transform: rotateZ(-5deg) translateY(-4rem) translateX(-1rem);
  }
`;

type HeaderProps = {
  onShowCart: () => void;
};

export const Header = ({ onShowCart }: HeaderProps) => {
  return (
    <>
      <HeaderContainer>
        <h1>food-order-app</h1>
        <HeaderCartButton onClick={onShowCart} />
      </HeaderContainer>
      <ImageContainer>
        <img src={mealsImg} alt="A table with some delicious food!" />
      </ImageContainer>
    </>
  );
};
