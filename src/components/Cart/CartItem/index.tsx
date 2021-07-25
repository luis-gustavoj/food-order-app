import styled from "styled-components";

const CartItemWrapper = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid ${(props) => props.theme.darkPrimaryColor};
  padding: 1rem 0;
  margin: 1rem 0;

  .cart-item h2 {
    margin: 0 0 0.5rem 0;
    color: ${(props) => props.theme.littleDarkTextColor};
  }

  .summary {
    width: 10rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .price {
    font-weight: bold;
    color: ${(props) => props.theme.darkPrimaryColor};
  }

  .amount {
    font-weight: bold;
    border: 1px solid #ccc;
    padding: 0.25rem 0.75rem;
    border-radius: 6px;
    color: ${(props) => props.theme.littleDarkTextColor};
  }

  .actions {
    display: flex;
    flex-direction: column;
  }

  @media (min-width: 768px) {
    .actions {
      flex-direction: row;
    }
  }

  button {
    font: inherit;
    font-weight: bold;
    font-size: 1.25rem;
    color: ${(props) => props.theme.darkPrimaryColor};
    border: 1px solid ${(props) => props.theme.darkPrimaryColor};
    width: 3rem;
    text-align: center;
    border-radius: 6px;
    background-color: transparent;
    cursor: pointer;
    margin-left: 1rem;
    margin: 0.25rem;
  }

  button:hover,
  button:active {
    background-color: ${(props) => props.theme.darkPrimaryColor};
    color: ${(props) => props.theme.textColor};
  }
`;

export const CartItem = ({
  title,
  price,
  amount,
  onRemove,
  onAdd,
}: {
  title: string;
  price: number;
  amount: number;
  onRemove: () => void;
  onAdd: () => void;
}) => {
  const parsedPrice = `$${price.toFixed(2)}`;

  return (
    <CartItemWrapper>
      <div>
        <h2>{title}</h2>
        <div className="summary">
          <span className="price">{parsedPrice}</span>
          <span className="amount">x {amount}</span>
        </div>
      </div>
      <div className="actions">
        <button onClick={onRemove}>−</button>
        <button onClick={onAdd}>+</button>
      </div>
    </CartItemWrapper>
  );
};
