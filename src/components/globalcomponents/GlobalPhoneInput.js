import styled from "styled-components";
import { AsYouType } from "libphonenumber-js";
import ReactFlagsSelect from "react-flags-select";
import { FieldError, InputGroup } from "./GlobalInput";
import countries from "../../utils/countries";

const GlobalPhoneInput = ({
  inputName,
  inputPlaceholder,
  labelText,
  labelColor,
  width,
  height,
  borderRight,
  borderLeft,
  borderTop,
  borderBottom,
  inputPadding,
  inputRadius,
  flagInputRadius,
  inputFont,
  required,
  inputBgColor,
  flagBorderLeft,
  flagBorderRight,
  flagBorderTop,
  selectSize,
  flagBorderBottom,
  phHeight,
  phWidth,
  handleBlur,
  handleChange, // handleChange will be setfield value if using formik
  inputValue,
  selectedCountry,
  setSelectedCountry,
  error,
  errorMessage,
  ...rest
}) => {
  const size = {
    x: window.innerWidth,
    y: window.innerHeight,
  };

  // this will check and format the phone number based on the national code
  const phone = new AsYouType();

  return (
    <PhoneInputGroup
      labelColor={labelColor}
      width={width}
      height={height}
      inputPadding={inputPadding}
      inputRadius={inputRadius}
      inputFont={inputFont}
      borderRight={borderRight}
      borderTop={borderTop}
      borderBottom={borderBottom}
      borderLeft={borderLeft}
      inputBgColor={inputBgColor}
      flagInputRadius={flagInputRadius}
      flagBorderLeft={flagBorderLeft}
      flagBorderRight={flagBorderRight}
      flagBorderTop={flagBorderTop}
      flagBorderBottom={flagBorderBottom}
      phHeight={phHeight}
      phWidth={phWidth}
    >
      {labelText && (
        <label htmlFor={inputName}>
          {labelText}
          {required && <span className="text-danger">*</span>}
        </label>
      )}
      <div>
        <ReactFlagsSelect
          selectedSize={selectSize}
          showSelectedLabel={false}
          optionsSize={18}
          className={`menu-flags ${error ? "invalid" : ""}`}
          customLabels={countries}
          selected={selectedCountry.abbr}
          onSelect={(abbr) => {
            // update state with selected country and code
            setSelectedCountry({ code: countries[abbr].secondary, abbr: abbr });
          }}
          showSecondarySelectedLabel={size.x < 600 ? false : true}
          searchable={true}
          {...rest}
        />
        <input
          type={"tel"}
          placeholder={inputPlaceholder}
          name={inputName}
          id={inputName}
          value={inputValue}
          onBlur={handleBlur}
          onChange={(e) => {
            phone.input(`${selectedCountry.code}${e.target.value}`);
            handleChange(
              [e.target.name],
              phone.formattedOutput
                ?.replace(`${selectedCountry.code}`, "")
                .trim()
            );
          }}
          className={error ? "invalid" : ""}
          minLength={10}
          maxLength={12}
          {...rest}
        />
      </div>
      {error && <FieldError>{errorMessage}</FieldError>}
    </PhoneInputGroup>
  );
};

export default GlobalPhoneInput;

const PhoneInputGroup = styled(InputGroup)`
  display: flex;
  flex-direction: column;

  & > div {
    display: flex;
    flex-direction: row;
    position: relative;
  }

  .menu-flags {
    height: ${({ phHeight }) => phHeight || "48px"};
    width: ${({ phWidth }) => phWidth || "100%"};
    border-left: ${({ flagBorderLeft }) =>
      flagBorderLeft || "2px solid #a1a1a1"};
    border-right: ${({ flagBorderRight }) =>
      flagBorderRight || "2px solid #a1a1a1"};
    border-top: ${({ flagBorderTop }) => flagBorderTop || "2px solid #a1a1a1"};
    border-bottom: ${({ flagBorderBottom }) =>
      flagBorderBottom || "2px solid #a1a1a1"};
    border-radius: ${({ flagInputRadius }) =>
      flagInputRadius || "8px 8px 8px 8px"};
    background-color: #e0e0e0;
    z-index: 1;

    .ReactFlagsSelect-module_filterBox__3m8EU {
      position: relative;
      margin-bottom: 0.8rem;

      input {
        left: 0;
        width: 100%;
        margin: 0;
        padding-block: 0;
        border: none;
        border-bottom: 1px solid #a1a1a1;
        border-radius: 0;
      }
    }

    button {
      appearance: none;
      outline: none;
      border: none;
      height: 48px;
      background: none;
      background-color: transparent;
      //background-image: url("/images/solid-chevron-down.png");
      background-repeat: no-repeat;
      background-position: 98px;
      background-size: 10px;
    }

    span {
      color: #000;
      margin: 0;
    }
  }

  .invalid {
    border-color: red;
    outline-color: red;
  }

  input {
    position: absolute;
    top: 0;
    right: 0;
    width: calc(100% - 95px);
    border-radius: 0 8px 8px 0;
    z-index: 2;
  }
`;
