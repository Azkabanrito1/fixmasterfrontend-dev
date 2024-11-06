import { useState } from "react";
import styled from "styled-components";
import { Button, Menu, MenuItem } from "@mui/material";

const Filter = ({ setFilter, filter }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const setDescription = async () => {
    setFilter("description");
    handleClose();
  };

  const setDate = async () => {
    setFilter("date");
    handleClose();
  };

  const setTime = async () => {
    setFilter("time");
    handleClose();
  };

  return (
    <>
      <Button
        id="filter-button"
        aria-controls={open ? "filter-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          textTransform: "capitalize",
          color: "#676767",
          padding: "0",
          display: "inline-block",
          minWidth: "18px !important",
          overflow: "hidden",
        }}
        className="primary ms-2 mt-3"
      >
        <img src="/images/filter.png" alt="" />
      </Button>
      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "filter-button" }}
      >
        <MenuItem
          className="flex-column align-items-start"
          onClick={setDescription}
          style={{ backgroundColor: filter === "description" ? "#F8E9E2" : "" }}
        >
          <span className="fw-bold">Job Type</span>{" "}
          <MenuDescribe>Sort jobs by type</MenuDescribe>
        </MenuItem>
        <MenuItem
          className="flex-column align-items-start"
          onClick={setDate}
          style={{ backgroundColor: filter === "date" ? "#F8E9E2" : "" }}
        >
          <span className="fw-bold">Job Category</span>{" "}
          <MenuDescribe>Sort jobs by category</MenuDescribe>
        </MenuItem>
        <MenuItem
          className="flex-column align-items-start"
          onClick={setTime}
          style={{ backgroundColor: filter === "time" ? "#F8E9E2" : "" }}
        >
          <span className="fw-bold">Job Class</span>{" "}
          <MenuDescribe>Sort jobs by class</MenuDescribe>
        </MenuItem>
      </Menu>
    </>
  );
};

export default Filter;

const MenuDescribe = styled.span`
  display: block;
  font-size: 12px;
`;
