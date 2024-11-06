import { FieldError, InputGroup } from "./GlobalInput";

const GlobalTextArea = ({
  className,
  labelText,
  inputPlaceholder,
  handleBlur,
  handleChange,
  inputValue,
  error,
  required,
  errorMessage,
  descriptionText,
  width,
  height,
  fullWidth,
  inputName,
  labelColor,
  border,
  inputPadding,
  labelFontW,
  labelFont,
  inputRadius,
  inputFont,
  inputBgColor,
  placeholderColor,
  rows,
  ...rest
}) => {
  return (
    <InputGroup
      className={className}
      width={width}
      height={height}
      fullWidth={fullWidth}
      labelColor={labelColor}
      inputPadding={inputPadding}
      inputRadius={inputRadius}
      inputFont={inputFont}
      inputBgColor={inputBgColor}
      border={border}
      placeholderColor={placeholderColor}
      labelFontW={labelFontW}
      labelFont={labelFont}
    >
      {labelText && (
        <label htmlFor={inputName}>
          {labelText}
          {required && <span className="text-danger">*</span>}
        </label>
      )}
      {descriptionText && <p className="description">{descriptionText}</p>}
      <div className="input-block">
        <textarea
          placeholder={inputPlaceholder}
          name={inputName}
          id={inputName}
          value={inputValue}
          onBlur={handleBlur}
          onChange={(e) => handleChange(e)}
          className={error ? "invalid" : ""}
          rows={rows || "4"}
          required={required}
          {...rest}
        />
      </div>
      {error && <FieldError>{errorMessage}</FieldError>}
    </InputGroup>
  );
};

export default GlobalTextArea;
