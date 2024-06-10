import { styled } from "styled-components";

export const Container = styled.div`
  margin: 20px;
  font-family: Arial, sans-serif;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 5px;
`;

export const InputField = styled.input`
  margin-right: 10px;
  padding: 8px;
  font-size: 16px;
`;

export const SendButton = styled.button`
  background-color: black;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  margin-top: 10px;

  &:hover {
    background-color: gray;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

export const TableHeader = styled.thead`
  background-color: #f4f4f4;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const TableCell = styled.td`
  border: 1px solid #ddd;
  padding: 8px;
`;

export const NoDataCell = styled.td`
  text-align: center;
  padding: 20px;
  font-size: 18px;
`;