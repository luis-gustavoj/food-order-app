import { useContext } from "react";
import styled from "styled-components";
import CartContext from "../../../../contexts/CartContext";

import { MealItemForm } from "./MealItemForm";

const MealItemWrapper = styled.li`
  display: flex;
  justify-content: space-between;
  margin: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ccc;

  h3 {
    margin: 0 0 0.25rem 0;
  }

  .description {
    font-style: italic;
  }

  .price {
    margin-top: 0.25rem;
    font-weight: bold;
    color: #ad5502;
    font-size: 1.25rem;
  }
`;

export const MealItem = ({
  title,
  description,
  price,
  id,
}: {
  title: string;
  description: string;
  price: number;
  id: string;
}) => {
  const { addItem } = useContext(CartContext);

  const parsedPrice = `$${price.toFixed(2)}`;

  const handleAddItemToCart = (amount: number) => {
    addItem({
      id: id,
      title: title,
      amount: amount,
      price: price,
    });
  };

  return (
    <MealItemWrapper>
      <div>
        <h3>{title}</h3>
        <div className="description">{description}</div>
        <div className="price">{parsedPrice}</div>
      </div>
      <div>
        <MealItemForm id={id} onAddToCart={handleAddItemToCart} />
      </div>
    </MealItemWrapper>
  );
};
