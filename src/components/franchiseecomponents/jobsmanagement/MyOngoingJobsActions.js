import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MyOngoingJobActions = ({ fixId, openAssignTech, openRequestEqp }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const assignTech = () => {
    openAssignTech();
    handleClose();
  };

  const requestEqp = () => {
    openRequestEqp();
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
          style={{ color: "#fff", fontSize: "2em" }}
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
            navigate(`${fixId}/job-details`);
          }}
          className="mb-1"
        >
          <i className="fa fa-clipboard me-3" style={{ fontSize: "1.2em" }}></i>
          <span>View Job</span>
        </MenuItem>
        <MenuItem onClick={assignTech} className="mb-1">
          <i className="fa fa-user-plus me-3" style={{ fontSize: "1.2em" }}></i>
          <span>Assign Technician</span>
        </MenuItem>
        <MenuItem onClick={handleClose} className="mb-1">
          <i className="fa fa-message me-3" style={{ fontSize: "1.2em" }}></i>
          <span>Send Message</span>
        </MenuItem>
        <MenuItem onClick={requestEqp} className="mb-1">
          <i
            className="fa fa-file-circle-plus me-3"
            style={{ fontSize: "1.2em" }}
          ></i>
          <span>Request Item</span>
        </MenuItem>
      </Menu>
    </>
  );
};

export default MyOngoingJobActions;
