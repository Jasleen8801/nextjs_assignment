import styled from 'styled-components';

interface ContainerProps {
  $themeType: string;
}

export const Container = styled.div<ContainerProps>`
  background-color: ${({ $themeType }) => ($themeType === 'light' ? 'white' : '#111827')};
  min-height: 100vh;
  color: ${({ $themeType }) => ($themeType === 'light' ? 'black' : 'white')};
  padding: 20px 30px;
`;
