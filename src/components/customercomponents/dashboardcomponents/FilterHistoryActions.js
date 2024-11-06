import { useState } from "react";
import styled from "styled-components";
import { Button, Menu, MenuItem } from "@mui/material";

const FilterActions = ({ setFilter, filter }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const setToJobType = async () => {
    setFilter("type");
    handleClose();
  };

  const setToPaymentStatus = async () => {
    setFilter("paymentStatus");
    handleClose();
  };

  const setToJobClass = async () => {
    setFilter("class");
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
          onClick={setToJobType}
          style={{ backgroundColor: filter === "type" ? "#F8E9E2" : "" }}
        >
          <span className="fw-bold">Job Type</span>{" "}
          <MenuDescribe>Sort jobs by type</MenuDescribe>
        </MenuItem>
        <MenuItem
          className="flex-column align-items-start"
          onClick={setToJobClass}
          style={{ backgroundColor: filter === "class" ? "#F8E9E2" : "" }}
        >
          <span className="fw-bold">Job Class</span>{" "}
          <MenuDescribe>Sort jobs by class</MenuDescribe>
        </MenuItem>
        <MenuItem
          className="flex-column align-items-start"
          onClick={setToPaymentStatus}
          style={{
            backgroundColor: filter === "paymentStatus" ? "#F8E9E2" : "",
          }}
        >
          <span className="fw-bold">Payment Status</span>{" "}
          <MenuDescribe>Sort jobs by payment status</MenuDescribe>
        </MenuItem>
      </Menu>
    </>
  );
};

export default FilterActions;

const MenuDescribe = styled.span`
  display: block;
  font-size: 12px;
`;
