import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import React from "react";

const PrimaryAdd = ({ formikHandlers }) => {
  const { values, handleChange } = formikHandlers;
  return (
    <div>
      <FormGroup sx={{ marginBlockEnd: 3 }}>
        <FormControlLabel
          control={
            <Switch
              name="primaryAddress"
              onChange={handleChange}
              value={values.primaryAddress}
            />
          }
          label="Set as Head Office Address"
        />
      </FormGroup>
    </div>
  );
};

export default PrimaryAdd;
