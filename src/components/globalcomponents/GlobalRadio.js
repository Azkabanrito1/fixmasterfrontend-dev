import styled from "styled-components";
import { FieldError } from "./GlobalInput";

const GlobalRadio = ({
  inputName,
  labelText,
  inputValue,
  handleChange,
  handleBlur,
  error,
  errorMessage,
  checked,
  fs,
  bRad,
  width,
  mb,
  gap,
  ...rest
}) => {
  return (
    <RadioContainer bRad={bRad} mb={mb} fs={fs}>
      <label>
        <input
          type="radio"
          name={inputName}
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          checked={checked}
          {...rest}
        />
        {labelText}
      </label>
      {error && <FieldError>{errorMessage}</FieldError>}
    </RadioContainer>
  );
};

export default GlobalRadio;

const RadioContainer = styled.div`
  margin-bottom: ${({ mb }) => mb || "24px"};
  --width: 24px;

  input[type="radio"] {
    position: relative;
    aspect-ratio: 1;
    width: var(--width);
    border: 2px solid var(--clr-primary);
    accent-color: var(--clr-primary);
    border-radius: ${({ bRad }) => bRad || "0"};
    vertical-align: middle;
    -webkit-appearance: none;
    appearance: none;
    outline: none;
    cursor: pointer;
    width: fit-content;
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
    display: flex;
    align-items: center;
    gap: ${({ gap }) => gap || "12px"};
    font-size: ${({ fs }) => fs || "20px"};
    line-height: 1.75;
  }

  @media screen and (max-width: 750px) {
    label {
      font-size: 16px;
    }
  }
`;
