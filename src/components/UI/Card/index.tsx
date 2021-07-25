import styled from "styled-components";

const CardContainer = styled.div`
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
  border-radius: 14px;
  background: ${(props) => props.theme.lightBackgroundColor};
`;

export const Card = ({ children }: { children: JSX.Element }) => {
  return <CardContainer>{children}</CardContainer>;
};
