import { useState } from "react";
import { useContext, useEffect } from "react";
import styled from "styled-components";
import CartContext from "../../../contexts/CartContext";

import { CartIcon } from "../../Cart/CartIcon";

type ButtonProps = {
  bump: boolean;
};

const Button = styled.button<ButtonProps>`
  cursor: pointer;
  font: inherit;
  border: none;
  background-color: ${(props) => props.theme.darkPrimaryColor};
  color: ${(props) => props.theme.textColor};
  padding: 0.75rem 3rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-radius: 25px;
  font-weight: bold;
  animation: ${(props) => (props.bump ? "bump 300ms ease-out" : "")};

  &:hover,
  &:active {
    filter: brightness(0.9);
  }

  .icon {
    width: 1.35rem;
    height: 1.35rem;
    margin-right: 0.5rem;
  }

  .badge {
    background-color: ${(props) => props.theme.littleDarkerPrimaryColor};
    padding: 0.25rem 1rem;
    border-radius: 25px;
    margin-left: 1rem;
    font-weight: bold;
  }

  &:hover .badge,
  &:active .badge {
    filter: brightness(0.9);
  }

  @keyframes bump {
    0% {
      transform: scale(1);
    }
    10% {
      transform: scale(0.9);
    }
    30% {
      transform: scale(1.1);
    }
    50% {
      transform: scale(1.15);
    }
    100% {
      transform: scale(1);
    }
  }
`;

type HeaderCartButtonProps = {
  onClick: () => void;
};

export const HeaderCartButton = ({ onClick }: HeaderCartButtonProps) => {
  const { items } = useContext(CartContext);
  const [bumpButton, setBumpButton] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBumpButton(true);

    const timer = setTimeout(() => {
      setBumpButton(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  return (
    <Button bump={bumpButton} onClick={onClick}>
      <span className="icon">
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className="badge">{numberOfCartItems}</span>
    </Button>
  );
};
