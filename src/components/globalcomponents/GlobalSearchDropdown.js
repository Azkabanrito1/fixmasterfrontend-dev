import React, { useState, useMemo } from "react";
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  ListSubheader,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const containsText = (text, searchText) =>
  text?.toLowerCase().indexOf(searchText?.toLowerCase()) > -1;

const GlobalSearchDropdown = ({ formikHandlers, data, selectName }) => {
  const { values, handleChange } = formikHandlers;

  const [searchText, setSearchText] = useState("");
  const displayedOptions = useMemo(
    () =>
      data?.filter((option) =>
        containsText(option.name.toString(), searchText)
      ),
    [searchText, data]
  );

  return (
    <Box sx={{ width: 310 }}>
      <div className="text-muted">{selectName}</div>
      <FormControl fullWidth>
        {values.selectedOption ? (
          ""
        ) : (
          <InputLabel id="search-select-label">{`Select ${selectName}`}</InputLabel>
        )}
        <Select
          MenuProps={{ autoFocus: false }}
          labelId="search-select-label"
          id="selectedOption"
          name="selectedOption"
          value={values.selectedOption || ""}
          label={`Select ${selectName}`}
          onChange={handleChange}
          onClose={() => setSearchText("")}
          renderValue={() => values.selectedOption || ""}
          required
          sx={{ borderRadius: 3, width: 320 }}
        >
          <ListSubheader>
            <TextField
              size="small"
              autoFocus
              placeholder="Type to search..."
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== "Escape") {
                  e.stopPropagation();
                }
              }}
            />
          </ListSubheader>
          {displayedOptions?.map((option) => (
            <MenuItem key={option.id} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default GlobalSearchDropdown;
