import { useState } from "react";
import styled from "styled-components";
import { Button, Menu, MenuItem } from "@mui/material";

const TechnicianOnboardingFilter = ({ setFilter, filter }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const showAll = () => {
    setFilter("All");
    handleClose();
  };

  const showApproved = () => {
    setFilter("Approved");
    handleClose();
  };

  const showRejected = () => {
    setFilter("Rejected");
    handleClose();
  };

  return (
    <>
      <FilterButton
        id="filter-button"
        aria-controls={open ? "filterTechnician" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="primary"
      >
        <span>{filter}</span>{" "}
        <span>
          <i className="fas fa-chevron-down"></i>
        </span>
      </FilterButton>
      <Menu
        id="filterTechnician"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "filter-button" }}
      >
        <MenuItem onClick={showAll}>All</MenuItem>
        <MenuItem onClick={showApproved}>Approved</MenuItem>
        <MenuItem onClick={showRejected}>Rejected</MenuItem>
      </Menu>
    </>
  );
};

export default TechnicianOnboardingFilter;
const FilterButton = styled(Button)`
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  width: 85% !important;
  padding: 0.35em 0.5em !important;
  border: 2px solid #a1a1a1 !important;
  border-radius: 8px !important;
  text-transform: capitalize !important;
  font-size: 18px !important;
  color: #676767 !important;
  background-color: #fff !important;
`;
