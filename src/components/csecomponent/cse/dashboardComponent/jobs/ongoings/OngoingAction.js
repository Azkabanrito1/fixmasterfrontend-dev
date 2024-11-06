import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AssignTechnician from "../../../../../franchiseecomponents/jobsmanagement/modals/AssignTechnician";

const OngoingAction = ({ fixId, openRequestEqp }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openTech, setOpenTech] = useState(false);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openAssignTech = () => {
    setOpenTech(true);
    handleClose();
  };
  const closeAssignTech = () => {
    setOpenTech(false);
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
            navigate(`../job-management/ongoing/${fixId}/job-details`);
          }}
          className="mb-1"
        >
          <i className="fa fa-clipboard me-3" style={{ fontSize: "1.2em" }}></i>
          <span>View Job</span>
        </MenuItem>
        {/* <MenuItem onClick={() => openAssignTech(fixId)} className="mb-1">
          <i className="fa fa-user-plus me-3" style={{ fontSize: "1.2em" }}></i>
          <span>Assign Technician</span>
        </MenuItem> */}
        <MenuItem onClick={handleClose} className="mb-1">
          <i className="fa fa-message me-3" style={{ fontSize: "1.2em" }}></i>
          <span>Send Message</span>
        </MenuItem>
        {/* <MenuItem onClick={requestEqp} className="mb-1">
          <i
            className="fa fa-file-circle-plus me-3"
            style={{ fontSize: "1.2em" }}
          ></i>
          <span>Request Item</span>
        </MenuItem> */}
      </Menu>
      <AssignTechnician
        isOpen={openTech}
        closeModal={closeAssignTech}
        fixId={fixId}
      />
    </>
  );
};

export default OngoingAction;
