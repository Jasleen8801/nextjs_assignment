import styled from "styled-components";

export const ContentWrapper = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;

  .main-content {
    flex: 3 1 60%;
  }
`;

export const SidebarWrapper = styled.div`
  flex: 2 1 35%;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    flex: 1 1 100%;
  }
`;