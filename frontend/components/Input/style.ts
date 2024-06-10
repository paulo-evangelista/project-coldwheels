import { styled } from "styled-components";

export const Main = styled.main`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
`;

export const Button = styled.button`
  padding: 7px 20px;
  margin: 10px 10px;
  border: none;
  border-radius: 4px;
  background-color: black;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: gray;
  }
`;

export const InputField = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-right: 10px;
`;