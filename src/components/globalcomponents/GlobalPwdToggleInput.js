import { useState } from "react";
import { PropTypes } from "prop-types";
import styled from "styled-components";
import { FieldError, InputGroup } from "./GlobalInput";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const PasswordToggleInput = ({ formikHandlers, inputName, labelText }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const { values, touched, errors, handleBlur, handleChange } = formikHandlers;

  return (
    <InputGroup>
      <label htmlFor="password">
        {labelText}
        <span className="text-danger">*</span>
      </label>
      <div style={{ position: "relative" }}>
        <input
          type={isPasswordShown ? "text" : "password"}
          name={inputName}
          id={inputName}
          placeholder="**********"
          value={values[inputName]}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors[inputName] && touched[inputName] ? "invalid" : ""}
        />
        <PasswordToggle>
          {isPasswordShown ? (
            <AiOutlineEyeInvisible onClick={() => setIsPasswordShown(false)} />
          ) : (
            <AiOutlineEye onClick={() => setIsPasswordShown(true)} />
          )}
        </PasswordToggle>
      </div>
      {touched[inputName] && <FieldError>{errors[inputName]}</FieldError>}
    </InputGroup>
  );
};

export default PasswordToggleInput;

PasswordToggleInput.propTypes = {
  formikHandlers: PropTypes.object.isRequired,
  inputName: PropTypes.string.isRequired,
};

const PasswordToggle = styled.button.attrs({ type: "button" })`
  appearance: none;
  border: none;
  position: absolute;
  top: 50%;
  right: 15px;
  height: 90%;
  display: flex;
  align-items: center;
  transform: translateY(-50%);
  background-color: transparent;

  svg {
    color: var(--clr-primary);
    font-size: 2rem;
    cursor: pointer;
  }
`;
