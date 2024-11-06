import React from "react";
import styled from "styled-components";

function GlobalSearchBar({
  placeHolder,
  searchId,
  searchName,
  searchValue,
  width,
  height,
  inputPlaceholder,
  borderLeft,
  borderRight,
  borderTop,
  borderBottom,
  inputPadding,
  inputRadius,
  inputFont,
  inputBgColor,
  iconWidth,
  iconHeight,
  iconMl,
  placeholderColor,
  onChange,
}) {
  return (
    <Container
      width={width}
      height={height}
      inputPadding={inputPadding}
      inputRadius={inputRadius}
      inputFont={inputFont}
      inputBgColor={inputBgColor}
      borderLeft={borderLeft}
      borderRight={borderRight}
      borderTop={borderTop}
      borderBottom={borderBottom}
      iconHeight={iconHeight}
      iconWidth={iconWidth}
      iconMl={iconMl}
      placeholderColor={placeholderColor}
    >
      <input
        type="text"
        id={searchId}
        name={searchName}
        value={searchValue}
        placeholder={inputPlaceholder}
        onChange={onChange}
      />
      <img src="/images/searchIcon.svg" alt="search icon" />
    </Container>
  );
}

export default GlobalSearchBar;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;

  && input {
    outline: none;
    width: ${({ width }) => width || "100%"};
    height: ${({ height }) => height || "48px"};
    padding: ${({ inputPadding }) => inputPadding || "10px"};
    border-left: ${({ borderLeft }) => borderLeft || "2px solid #a1a1a1"};
    border-right: ${({ borderRight }) => borderRight || "2px solid #a1a1a1"};
    border-top: ${({ borderTop }) => borderTop || "2px solid #a1a1a1"};
    border-bottom: ${({ borderBottom }) => borderBottom || "2px solid #a1a1a1"};
    border-radius: ${({ inputRadius }) => inputRadius || "8px 8px 8px 8px"};
    font-size: ${({ inputFont }) => inputFont || "16px"};
    background-color: ${({ inputBgColor }) => inputBgColor || "#ffffff"};
  }
  input::placeholder {
    color: ${({ placeholderColor }) =>
      placeholderColor || "#8c8c8c"}; /* Firefox */
  }

  input:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: ${({ placeholderColor }) => placeholderColor || "#8c8c8c"};
  }

  input::-ms-input-placeholder {
    /* Microsoft Edge */
    color: ${({ placeholderColor }) => placeholderColor || "#8c8c8c"};
  }

  && img {
    position: absolute;
    width: ${({ iconWidth }) => iconWidth || "20px"};
    height: ${({ iconHeight }) => iconHeight || "20px"};
    margin-left: ${({ iconMl }) => iconMl || "250px"};
  }
`;
