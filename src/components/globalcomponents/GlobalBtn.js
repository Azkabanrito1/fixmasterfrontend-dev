import styled from "styled-components";

const sizes = {
  large: {
    normalWidth: "520px",
    smallWidth: "260px",
  },
  big: {
    normalWidth: "300px",
    smallWidth: "250px",
  },
  small: {
    normalWidth: "171px",
    smallWidth: "171px",
  },
};

const GlobalBtn = styled.button`
  box-sizing: border-box;
  display: ${({ display }) => display || "flex"};
  justify-content: center;
  align-items: center;
  gap: 10px;

  width: ${({ size, width }) =>
    size ? sizes[size].normalWidth : width ? width : "402px"};
  height: ${({ height }) => height || "auto"};
  margin-inline: ${({ mx }) => mx};
  margin-block: ${({ my }) => my};
  padding-block: ${({ py }) => py || "1rem"};
  padding-inline: ${({ px }) => px};
  border: ${({ border }) => border || "none"};
  border-radius: ${({ bdRad }) => bdRad || "8px"};

  background-color: ${({ bgClr }) => bgClr || "var(--clr-primary)"};

  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: ${({ fw }) => fw || "700"};
  font-size: ${({ fs }) => fs || "18px"};
  line-height: 18px;
  text-decoration: none;
  text-align: center;
  color: ${({ color }) => (color ? color : "white")};

  transition: 0.3s ease;
  cursor: pointer;

  &:disabled {
    filter: opacity(60%);
    cursor: not-allowed;
  }

  &:hover {
    background-color: ${({ hoverBg }) => (hoverBg ? hoverBg : "#404040")};
    color: ${({ hoverClr }) => (hoverClr ? hoverClr : "#fff")};
  }

  img {
    width: ${({ iconWidth }) => iconWidth};
    height: ${({ iconHeight }) => iconHeight};
  }

  @media only screen and (max-width: 768px) {
    width: ${({ size, width }) =>
      size ? sizes[size].smallWidth : width ? width : "250px"};
    font-size: 16px;
    padding-inline: 1rem;
    padding-block: 0.8rem;
  }
`;

export default GlobalBtn;
