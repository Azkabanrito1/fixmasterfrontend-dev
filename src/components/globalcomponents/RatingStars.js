import styled from "styled-components";

export const Star = styled.div`
  --fill-color: ${({ fillClr }) => fillClr || "var(--clr-primary)"};
  --normal-color: ${({ baseClr }) => baseClr || "#a1a1a1"};
  --percent: ${({ percent }) => percent + "%"};

  display: inline-block;
  font-size: ${({ size }) => (size || "24px") + " !important"};
  font-family: Times;
  line-height: 1;

  &::before {
    content: "★★★★★";
    letter-spacing: 3px;
    background: linear-gradient(
      90deg,
      var(--fill-color) var(--percent),
      var(--normal-color) var(--percent)
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;
