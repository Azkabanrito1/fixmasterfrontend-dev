import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${({ pb }) => pb || "1rem"};
  border-bottom: 1px solid rgba(192, 190, 190, 0.29);
  margin-bottom: ${({ mb }) => mb || "1.75rem"};
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 32px;
  right: 32px;
  appearance: none;
  display: block;
  margin-left: auto;
  padding: 10px 0 10px 10px;
  border: none;

  background-color: #fff;
  font-size: 16px;
  color: var(--clr-primary);

  cursor: pointer;
`;

export const CloseXBtn = styled.button`
  appearance: none;
  display: grid;
  place-items: center;
  padding: 0.6rem;
  border: none;
  font-size: 24px;
  cursor: pointer;
  background-color: rgba(242, 98, 34, 0.1);
`;

export const Heading = styled.h2`
  color: var(--clr-primary);
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: ${({ mb }) => mb || "2rem"};
  margin-left: 13px;
`;
