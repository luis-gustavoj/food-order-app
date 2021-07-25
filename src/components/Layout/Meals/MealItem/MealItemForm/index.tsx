import { useRef, useState } from "react";
import styled from "styled-components";

import { Input } from "../../../../UI/Input";

const MealItemFormContainer = styled.form`
  text-align: right;

  button {
    font: inherit;
    cursor: pointer;
    background-color: ${(props) => props.theme.darkPrimaryColor};
    border: 1px solid ${(props) => props.theme.darkPrimaryColor};
    color: ${(props) => props.theme.textColor};
    padding: 0.25rem 2rem;
    border-radius: 20px;
    font-weight: bold;
  }

  button:hover,
  button:active {
    filter: brightness(0.95);
  }
`;

export const MealItemForm = ({
  id,
  onAddToCart,
}: {
  id: string;
  onAddToCart: (arg0: number) => void;
}) => {
  const [amountIsValid, setAmountIsValid] = useState(true);

  const amountInputRef = useRef<HTMLInputElement>(null);

  const handleSubmitForm = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (amountInputRef.current != null) {
      const enteredAmount = amountInputRef.current.value;
      const enteredAmountNumber = +enteredAmount;

      if (
        enteredAmount.trim().length === 5 ||
        enteredAmountNumber < 1 ||
        enteredAmountNumber > 5
      ) {
        setAmountIsValid(false);
        return;
      }

      onAddToCart(enteredAmountNumber);
    }
  };

  return (
    <MealItemFormContainer onSubmit={handleSubmitForm}>
      <Input
        ref={amountInputRef}
        label="Amount"
        id={`amount_${id}`}
        type="number"
        min="1"
        max="5"
        step="1"
        defaultValue="1"
      />
      <button>+ Add</button>
      {!amountIsValid && <small>Please enter a valid amount (1-5)</small>}
    </MealItemFormContainer>
  );
};
