import styled from "styled-components";

interface TableDataProps {
  $isNumeric?: number;
  $isBold?: boolean;
}

export const TableData = styled.td<TableDataProps>`
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji",
    "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 0.8rem;
  line-height: 1.25rem;
  color: ${({ $isNumeric }) =>
    $isNumeric ? ($isNumeric > 0 ? "green" : "red") : ""};
  letter-spacing: 0.05em;
  font-weight: ${({ $isBold }) => ($isBold ? "500" : "400")};
  flex: 1;
  &:first-child {
    flex: 2; 
  }
`;
