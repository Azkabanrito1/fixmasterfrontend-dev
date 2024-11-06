import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";

const TechManageAction = ({ tech }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button
        id="tech-button"
        aria-controls={open ? "job-menu" : undefined}
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
      >
        <i
          style={{ color: "var(--clr-primary)", fontSize: "2em" }}
          className="fa-solid fa-ellipsis-vertical"
        ></i>
      </Button>
      <Menu
        id="tech-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "tech-button" }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
          }}
          className="mb-1"
        >
          <span style={{ color: "var(--clr-primary)" }}>
            View Analysis Report
          </span>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
          }}
          className="mb-1"
        >
          <span style={{ color: "var(--clr-primary)" }}>
            Update Tech Status
          </span>
        </MenuItem>
      </Menu>
    </>
  );
};

export default TechManageAction;
