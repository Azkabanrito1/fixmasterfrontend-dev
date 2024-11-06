import {
  Checkbox,
  FormControl,
  ListItemIcon,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  styled,
} from "@mui/material";
import { PropTypes } from "prop-types";
import { FieldError } from "./GlobalInput";

const MenuProps = {
  // getContentAnchorEl: "null",
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "center",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "center",
  },
  variant: "menu",
};

const GlobalMultipleSelect = ({
  labelText,
  initData = [],
  inputName,
  formikHandlers = {},
  required,
}) => {
  const { values, errors, touched, handleBlur, setFieldValue } = formikHandlers;
  const selected = values?.[inputName] ?? [];

  const isAllSelected =
    initData?.length > 0 && selected?.length === initData?.length;

  const isError = !!errors[inputName] && touched[inputName];

  const handleSelectChange = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "All") {
      setFieldValue(
        inputName,
        selected.length === initData?.length
          ? []
          : initData?.map((data) => data.name)
      );
      return;
    }
    setFieldValue(inputName, value);
  };

  return (
    <>
      <FormControl>
        <label
          style={{
            marginBottom: "8px",
            color: "#696f79",
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "20px",
          }}
          id="mutiple-select-label"
        >
          {labelText}
          {!!required && <span className="text-danger">*</span>}
        </label>
        <StyledSelect
          multiple
          fullWidth
          displayEmpty
          name={inputName}
          labelId="mutiple-select-label"
          value={selected}
          onBlur={handleBlur}
          onChange={handleSelectChange}
          MenuProps={MenuProps}
          input={<OutlinedInput />}
          className={isError ? "invalid" : ""}
          renderValue={(selected) => {
            if (selected?.length === 0) {
              return <>Select</>;
            }
            return selected?.join(", ");
          }}
          sx={{
            backgroundColor: "#ffffff",
            border: "1px solid #a1a1a1",
            borderRadius: "8px",
            fontSize: "16px",
          }}
          error={isError}
        >
          <MenuItem disabled value="">
            <>Select</>
          </MenuItem>
          <MenuItem value="All">
            <ListItemIcon>
              <Checkbox
                checked={isAllSelected}
                indeterminate={
                  selected?.length > 0 && selected?.length < initData?.length
                }
              />
            </ListItemIcon>
            <ListItemText primary="Select All" />
          </MenuItem>
          {initData?.map((component) => (
            <MenuItem key={component.id} value={component.name}>
              <ListItemIcon>
                <Checkbox checked={selected?.includes(component.name)} />
              </ListItemIcon>
              <ListItemText primary={component.name} />
            </MenuItem>
          ))}
        </StyledSelect>
        {isError && <FieldError>{errors[inputName]}</FieldError>}
      </FormControl>
    </>
  );
};

export default GlobalMultipleSelect;

const StyledSelect = styled(Select)`
  .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input {
    padding: 12px 14px;
  }
  .Mui-error {
    border: 1px solid red;
  }
`;

GlobalMultipleSelect.propTypes = {
  initData: PropTypes.array.isRequired,
  inputName: PropTypes.string,
  required: PropTypes.bool,
  formikHandlers: PropTypes.shape({
    values: PropTypes.object.isRequired,
    handleBlur: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    errors: PropTypes.object,
    touched: PropTypes.object,
  }),
};
