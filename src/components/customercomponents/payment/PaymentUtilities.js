import styled from "styled-components";

export const PaymentHeader = styled.div`
  position: relative;
  background-color: #feefe9;
  box-shadow: 0 0 0 34px #feefe9;
  margin-block: 3.5rem;

  & > div {
    display: flex;
    justify-content: space-between;
  }

  h2 {
    color: var(--clr-primary);
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  .orange {
    color: var(--clr-primary);
    font-weight: 600;
  }
`;

export const PaymentContent = styled.div`
  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.2rem;

    h3 {
      font-weight: 700;
    }
  }

  .fee h3 {
    font-size: 1rem;
  }

  .total h3 {
    font-size: 1.1rem;
  }

  .method h3 {
    font-size: 1.3rem;
  }
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;

export const StyledOption = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #feefe9;
  padding: 0.8rem;
  cursor: pointer;

  & > div {
    display: flex;
    align-items: center;
    gap: 1.5rem;

    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  p {
    margin-bottom: 0;
  }

  button {
    border: none;
    padding: 1em;
    background-color: transparent;
  }
`;
