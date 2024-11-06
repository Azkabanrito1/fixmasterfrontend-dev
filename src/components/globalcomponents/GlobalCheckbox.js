import styled from "styled-components";
import { FieldError } from "./GlobalInput";

const GlobalCheckbox = ({
  inputName,
  groupLabel,
  labelClr,
  labelText,
  inputValue,
  inputId,
  inputType,
  handleChange,
  handleBlur,
  error,
  errorMessage,
  checked,
  fs,
  bRad,
  mb,
  required,
  ...rest
}) => {
  return (
    <CheckboxContainer bRad={bRad} mb={mb} fs={fs}>
      {groupLabel && (
        <div className="mb-2" style={{ color: labelClr }}>
          {groupLabel}
        </div>
      )}
      <AlignCenter>
        <div>
          <input
            type={inputType || "checkbox"}
            name={inputName}
            value={inputValue}
            id={inputId || inputName}
            onChange={handleChange}
            onBlur={handleBlur}
            checked={checked}
            {...rest}
          />
        </div>
        <label htmlFor={inputId || inputName}>
          {labelText}
          {required && <span className="text-danger">*</span>}
        </label>
      </AlignCenter>
      {error && <FieldError>{errorMessage}</FieldError>}
    </CheckboxContainer>
  );
};

export default GlobalCheckbox;

const CheckboxContainer = styled.div`
  margin-bottom: ${({ mb }) => mb || "24px"};
  --width: 22px;

  input {
    position: relative;
    width: var(--width);
    /* min-width: var(--width); */
    aspect-ratio: 1;
    border: 2px solid var(--clr-primary);
    accent-color: var(--clr-primary);
    border-radius: ${({ bRad }) => bRad || "0"};
    vertical-align: middle;
    appearance: none;
    -webkit-appearance: none;
    outline: none;
    cursor: pointer;
  }

  input:checked {
    background-color: #fff;
    color: #fff;
  }

  input:checked::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: calc(var(--width) / 2);
    aspect-ratio: 1;
    border-radius: ${({ bRad }) => bRad || "0"};
    background-color: var(--clr-primary);
    transform: translate(-50%, -50%);
  }

  label {
    font-size: ${({ fs }) => fs || "20px"};
    line-height: 1.5;
    width: calc(100% - 50px);
    word-break: break-all;
    word-wrap: break-word;
  }

  @media screen and (max-width: 750px) {
    label {
      font-size: 16px;
    }
  }
`;

const AlignCenter = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  & > div {
    width: 30px;
  }
`;
