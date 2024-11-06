import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

const JobDetails = ({ supplyId, openAcceptedJob }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const accptJob = () => {
    openAcceptedJob();
    handleClose();
  };
  return (
    <>
      <Button
        id="job-button"
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
          style={{ color: "#f16222", fontSize: "2em" }}
          className="fa-solid fa-ellipsis-vertical"
        ></i>
      </Button>
      <Menu
        id="job-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "job-button" }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
          }}
          className="mb-1"
        >
          <span style={{ color: "#f16222" }}>Deleted Request</span>
        </MenuItem>
        <MenuItem onClick={accptJob} className="mb-1">
          <span style={{ color: "#f16222" }}>Edit Request</span>
        </MenuItem>
        <MenuItem onClick={accptJob} className="mb-1">
          <span style={{ color: "#f16222" }}>Accepted supplies</span>
        </MenuItem>
        <MenuItem onClick={accptJob} className="mb-1">
          <span style={{ color: "#f16222" }}>Rejected supplies</span>
        </MenuItem>
      </Menu>
    </>
  );
};

export default JobDetails;
