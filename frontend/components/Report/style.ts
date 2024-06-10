import { styled } from "styled-components";

export const Container = styled.div`
  margin: 20px;
  font-family: Arial, sans-serif;
`;

export const ReloadButton = styled.button`
  background-color: #0E76FD;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  margin-top: 10px;

  &:hover {
    background-color: #0b5ec0;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
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