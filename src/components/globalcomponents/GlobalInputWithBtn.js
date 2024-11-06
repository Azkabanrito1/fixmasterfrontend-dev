import { Button, FormGroup, InputLabel, Stack, TextField } from "@mui/material";

const GlobalInputWithBtn = ({ inputOptions = {}, btnOptions = {} }) => {
  const {
    border,
    labelClr,
    placeholder,
    inputName,
    disabled,
    readOnly,
    handleChange,
    handleBlur,
    errors,
    value,
    touched,
    labelText,
  } = inputOptions;
  const { bgColor, onClick, btnText } = btnOptions;

  return (
    <Stack spacing={1}>
      <InputLabel>{labelText}</InputLabel>
      <FormGroup row>
        <TextField
          sx={{
            border: "none",
            outline: "none",
            "& input": {
              padding: "10px",
              border: border || "1px solid #a1a1a1",
              borderRadius: "8px 0 0 8px",
              fontSize: "16px",
              backgroundColor: "#ffffff",
              lineHeight: 1.25,
            },
            "& label": {
              display: "block",
              marginBottom: "8px",
              color: labelClr || "#696f79",
              fontFamily: "Roboto",
              fontStyle: "normal",
              lineHeight: "20px",
            },
            "& fieldset": {
              border: "none",
              outline: "none",
            },
          }}
          placeholder={placeholder}
          id={inputName}
          name={inputName}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched && Boolean(errors)}
          helperText={touched && errors}
          disabled={disabled}
          readOnly={readOnly}
        />
        <Button
          variant="contained"
          disableElevation
          sx={{
            borderRadius: "0 8px 8px 0",
            backgroundColor: bgColor || "#a1a1a1",
          }}
          onClick={onClick}
        >
          {btnText}
        </Button>
      </FormGroup>
    </Stack>
  );
};

export default GlobalInputWithBtn;
