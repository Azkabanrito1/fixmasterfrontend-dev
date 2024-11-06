import styled from "styled-components";

export const PageContainer = styled.div`
  display: grid;
  grid-template-columns: 7fr 3fr;
  gap: 1.5rem;

  & > div {
    display: grid;
    gap: 1.5rem;
  }

  @media screen and (width <= 1200px) {
    grid-template-columns: 1fr;
  }
`;

export const PageAside = styled.aside`
  gap: 1.5rem;

  @media screen and (width <= 1200px) {
    display: none;
  }
`;
