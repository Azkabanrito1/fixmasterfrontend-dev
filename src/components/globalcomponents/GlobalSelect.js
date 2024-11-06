import React from "react";
import { InputGroup, FieldError } from "./GlobalInput";

function GlobalSelect({
  labelText,
  descriptionText,
  labelColor,
  options = [],
  selectName,
  selectValue,
  valueType,
  defaultOption,
  defaultValue,
  handleBlur,
  handleChange,
  handleSelect,
  error,
  errorMessage,
  multiple,
  disabled,
  readOnly,
  required,
  ...rest
}) {
  return (
    <>
      <InputGroup labelColor={labelColor} {...rest}>
        {!!labelText && (
          <label htmlFor={selectName}>
            {labelText}
            {required && <span className="text-danger">*</span>}
          </label>
        )}
        {descriptionText && <p className="description">{descriptionText}</p>}
        <select
          className={error ? "invalid" : ""}
          name={selectName}
          id={selectName}
          onBlur={handleBlur}
          onChange={(e) => {
            handleChange(e);
            if (handleSelect) {
              handleSelect(e.target.value);
            }
          }}
          value={selectValue}
          multiple={multiple}
          disabled={disabled}
          required={required}
          readOnly={readOnly}
        >
          <option value={defaultValue || ""}>{defaultOption}</option>
          {Array.isArray(options) &&
            options?.map((option) => (
              <option
                value={
                  valueType !== "string"
                    ? option.id
                    : !!option.value
                    ? option.value
                    : option.name
                }
                key={option.id || option.name}
                disabled={
                  option.hasOwnProperty("recordStatus")
                    ? !option.recordStatus
                    : false
                }
              >
                {option?.name || option.longName}
              </option>
            ))}
        </select>
        {error && <FieldError>{errorMessage}</FieldError>}
      </InputGroup>
    </>
  );
}

export default GlobalSelect;
