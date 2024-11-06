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

  const setToReferralType = async () => {
    setFilter("processing");
    handleClose();
  };

  const setToReferralTypes = async () => {
    setFilter("completed");
    handleClose();
  };

  //   const setToJobClass = async () => {
  //     setFilter("class");
  //     handleClose();
  //   };

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
          onClick={setToReferralType}
          style={{ backgroundColor: filter === "processing" ? "#ffc907" : "" }}
        >
          <span className="fw-bold">Refeeral Type</span>{" "}
          <MenuDescribe>Sort referral by status</MenuDescribe>
        </MenuItem>
        <MenuItem
          className="flex-column align-items-start"
          onClick={setToReferralTypes}
          style={{ backgroundColor: filter === "completed" ? "#3eed99" : "" }}
        >
          <span className="fw-bold">Refeerals Type</span>{" "}
          <MenuDescribe>Sort referral by status</MenuDescribe>
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
