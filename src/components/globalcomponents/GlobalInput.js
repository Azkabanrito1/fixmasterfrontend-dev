import { forwardRef } from "react";
import styled from "styled-components";

const GlobalInput = forwardRef((props, ref) => {
  const {
    iconSrc,
    width,
    height,
    fullWidth,
    inputName,
    inputPlaceholder,
    labelText,
    descriptionText,
    labelColor,
    inputType,
    borderLeft,
    borderRight,
    borderTop,
    borderBottom,
    inputPadding,
    labelFontW,
    labelFont,
    inputRadius,
    inputFont,
    inputBgColor,
    inputRef,
    placeholderColor,
    handleBlur,
    handleChange,
    inputValue,
    error,
    errorMessage,
    required,
    isNotShowing,
    maxLength,
    className,
    ...rest
  } = props;

  return (
    <InputGroup
      className={className || ""}
      width={width}
      height={height}
      fullWidth={fullWidth}
      labelColor={labelColor}
      inputPadding={inputPadding}
      inputRadius={inputRadius}
      inputFont={inputFont}
      inputBgColor={inputBgColor}
      borderLeft={borderLeft}
      borderRight={borderRight}
      borderTop={borderTop}
      borderBottom={borderBottom}
      placeholderColor={placeholderColor}
      labelFontW={labelFontW}
      labelFont={labelFont}
    >
      {labelText && !isNotShowing && (
        <label htmlFor={inputName}>
          {labelText}
          {required && <span className="text-danger">*</span>}
        </label>
      )}
      {descriptionText && (
        <p className="description text-muted">{descriptionText}</p>
      )}
      <div className="input-block">
        <input
          type={inputType || "text"}
          placeholder={inputPlaceholder}
          name={inputName}
          id={inputName}
          value={inputValue}
          onBlur={handleBlur}
          onChange={(e) => handleChange(e)}
          className={`${error ? "invalid" : ""} ${className}`}
          ref={ref}
          maxLength={maxLength}
          autoComplete={inputType === "password" ? "false" : "true"}
          required={required}
          style={{ display: isNotShowing ? "none" : "block" }}
          onWheel={(e) => e.target.blur()}
          onKeyDown={(e) => {
            if (e.key === "ArrowUp" || e.key === "ArrowDown") {
              e.preventDefault(); // Prevent arrow key default increment/decrement
            }
          }}
          {...rest}
        />
        {iconSrc && <img className="icon" src={iconSrc} alt="" />}
      </div>
      {error && <FieldError>{errorMessage}</FieldError>}
    </InputGroup>
  );
});

export default GlobalInput;

export const InputGroup = styled.div`
  grid-column: ${({ fullWidth }) => (fullWidth ? "1 / -1" : "")};

  & label {
    display: block;
    margin-bottom: 8px;
    color: ${({ labelColor }) => labelColor || "#696f79"};
    font-family: "Roboto";
    font-style: normal;
    font-weight: ${({ labelFontW }) => labelFontW || "400px"};
    font-size: ${({ labelFont }) => labelFont || "16px"};
    line-height: 20px;
  }

  input,
  select,
  textarea {
    width: ${({ width }) => width || "100%"};
    padding: ${({ inputPadding }) => inputPadding || "10px"};
    border: ${({ border }) => border || "2px solid #a1a1a1"};
    border-radius: ${({ inputRadius }) => inputRadius || "8px 8px 8px 8px"};
    font-size: ${({ inputFont }) => inputFont || "16px"};
    background-color: ${({ inputBgColor }) => inputBgColor || "#ffffff"};
    line-height: 1.25;
    resize: none;
    //outline-color: var(--clr-primary);

    &::-webkit-calendar-picker-indicator {
      color: var(--clr-primary);
    }

    &:disabled {
      background-color: #d4d4d4;
      cursor: not-allowed;
    }
  }

  input,
  select {
    height: ${({ height }) => height || "48px"};
  }

  .invalid {
    border-color: red;
    outline-color: red;
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

  p.description {
    font-size: 0.8rem;
    color: #4a4a4a;
  }

  .input-block {
    position: relative;

    .icon {
      position: absolute;
      right: 16px;
      top: 50%;
      translate: 0 -50%;
    }
  }

  /* Hide AM/PM for inputs with the 'sla' class */
  .sla::-webkit-calendar-picker-indicator {
    display: block;
  }

  .sla::-webkit-datetime-edit-ampm-field {
    display: none;
  }

  .sla::-webkit-datetime-edit-hour-field,
  .sla::-webkit-datetime-edit-minute-field {
    padding: 0;
  }
`;

export const FieldError = styled.div`
  margin-top: ${({ mt }) => mt || "6px"};
  margin-left: ${({ ml }) => ml || "none"};
  margin-right: ${({ mr }) => mr || "none"};
  margin-bottom: ${({ mb }) => mb || 0};
  text-align: ${({ align }) => align || "left"};
  color: red;
  font-size: ${({ fs }) => fs || "13px"};
`;
