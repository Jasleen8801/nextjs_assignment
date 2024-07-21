import styled from "styled-components";

export const BoxSizer = styled.div<{ height: number }>`
  height: ${({ height }) => height}px;
`;