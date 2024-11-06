import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";

const CardFilters = ({
  filters,
  setFilterKey,
  filterKeys,
  filterName,
  presentFilter,
  setPresentFilter,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const updateFilterKeyValue = (key) => {
    setFilterKey({
      ...filterKeys,
      [filterName]: key,
    });
  };

  const handleBtnClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const optionsTemplate = filters.details.map((item) => {
    return (
      <MenuItem
        key={item.id}
        onClick={() => {
          setPresentFilter(item.name);
          updateFilterKeyValue(item.key);
          handleClose();
        }}
      >
        {item.name}
      </MenuItem>
    );
  });

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleBtnClick}
        sx={{
          textTransform: "capitalize",
          color: "#676767",
          fontSize: "10px",
          paddingInline: "0",
        }}
      >
        {presentFilter} ▼
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "basic-button" }}
      >
        {optionsTemplate}
      </Menu>
    </>
  );
};

export default CardFilters;
