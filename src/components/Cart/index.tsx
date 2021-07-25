import { useContext } from "react";
import styled from "styled-components";

import CartContext from "../../contexts/CartContext";

import { Modal } from "../UI/Modal";
import { CartItem } from "./CartItem";

const CartItems = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  max-height: 20rem;
  overflow: auto;
`;

const TotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 1.5rem;
  margin: 1rem 0;
`;

const ActionsContainer = styled.div`
  text-align: right;

  button {
    font: inherit;
    cursor: pointer;
    background-color: transparent;
    border: 1px solid ${(props) => props.theme.littleDarkerPrimaryColor};
    padding: 0.5rem 2rem;
    border-radius: 25px;
    margin-left: 1rem;
  }

  button:hover,
  button:active {
    background-color: ${(props) => props.theme.darkPrimaryColor};
    border-color: ${(props) => props.theme.darkPrimaryColor};
    color: ${(props) => props.theme.textColor};
  }

  .button-alt {
    color: ${(props) => props.theme.darkPrimaryColor};
  }

  .button {
    background-color: ${(props) => props.theme.littleDarkerPrimaryColor};
    color: ${(props) => props.theme.textColor};
  }
`;

type CartProps = {
  onCloseCart: () => void;
};

type Item = {
  id: string;
  title: string;
  price: number;
  amount: number;
};

export const Cart = ({ onCloseCart }: CartProps) => {
  const { items, totalAmount, addItem, removeItem } = useContext(CartContext);

  const parsedTotalAmount = `$${totalAmount.toFixed(2)}`;
  const hasItems = items.length > 0;

  const handleDeleteItemFromCart = (id: string) => {
    removeItem(id);
  };

  const handleAddItemToCart = (item: Item) => {
    addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <CartItems>
      {items.map((item) => {
        return (
          <CartItem
            title={item.title}
            price={item.price}
            key={item.id}
            amount={item.amount}
            onRemove={handleDeleteItemFromCart.bind(null, item.id)}
            onAdd={handleAddItemToCart.bind(null, item)}
          />
        );
      })}
    </CartItems>
  );

  return (
    <Modal onClose={onCloseCart}>
      {cartItems}
      <TotalContainer>
        <span>Total amount</span>
        <span>{parsedTotalAmount}</span>
      </TotalContainer>
      <ActionsContainer>
        <button className="button-alt" onClick={onCloseCart}>
          Close
        </button>
        {hasItems && <button className="button">Order</button>}
      </ActionsContainer>
    </Modal>
  );
};
