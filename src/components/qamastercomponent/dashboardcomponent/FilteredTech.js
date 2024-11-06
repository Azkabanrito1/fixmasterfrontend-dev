import { useState } from "react";
import { Button, Menu, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const FilteredTech = ({ filterResults }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (e) => {
    filterResults(e.target.value);
  };

  return (
    <div className="d-inline-flex flex-row justify-content-end gap-5">
      <div>
        <SelectOption name="stageNumber" onChange={handleChange}>
          <option value={1}>Stage 1</option>
          <option value={2}> Stage 2</option>
          <option value={3}> Stage 3</option>
          <option value={4}> Stage 4</option>
          <option value={5}> Stage 5</option>
        </SelectOption>
      </div>
      <Button
        id="techOnboarding-button"
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={() => navigate("/qamaster/tech-onboarding")}
        sx={{
          backgroundColor: "#f16222",
          color: "#ffffff",
          "&.MuiButton-root:hover": {
            backgroundColor: "#f16222",
          },
        }}
      >
        View All
      </Button>
    </div>
  );
};

export default FilteredTech;

const SelectOption = styled.select`
  width: 100%;
  padding: 6px 6px;
  border-radius: 6px;
  border: none;
  background-color: #f8e9e2;
`;
