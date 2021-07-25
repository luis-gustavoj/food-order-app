import { forwardRef } from "react";
import { InputHTMLAttributes } from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;

  label {
    font-weight: bold;
    margin-right: 1rem;
  }

  input {
    width: 3rem;
    border-radius: 5px;
    border: 1px solid #ccc;
    font: inherit;
    padding-left: 0.5rem;
  }
`;

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...props }: InputProps, ref) => {
    return (
      <InputWrapper>
        <label htmlFor={props.id}>{label}</label>
        <input ref={ref} {...props}></input>
      </InputWrapper>
    );
  }
);
