import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CardsAction = ({ fixId, confirmJobDate, status, confirmSupplies, tech=false }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
      {tech ? (
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
            <i
              className="fa fa-clipboard me-3"
              style={{ fontSize: "1.2em" }}
            ></i>
            <span>View Job</span>
          </MenuItem>
          {/* <MenuItem onClick={openAssignTech} className="mb-1">
          <i className="fa fa-user-plus me-3" style={{ fontSize: "1.2em" }}></i>
          <span>Assign Technician</span>
        </MenuItem> */}
        </Menu>
      ) : (
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
            <i
              className="fa fa-clipboard me-3"
              style={{ fontSize: "1.2em" }}
            ></i>
            <span>View Job</span>
          </MenuItem>
          {/* <MenuItem onClick={openAssignTech} className="mb-1">
          <i className="fa fa-user-plus me-3" style={{ fontSize: "1.2em" }}></i>
          <span>Assign Technician</span>
        </MenuItem> */}
          <MenuItem onClick={handleClose} className="mb-1">
            <i className="fa fa-message me-3" style={{ fontSize: "1.2em" }}></i>
            <span>Send Message</span>
          </MenuItem>
          {status.toLowerCase() === "quotation accepted" && (
            <MenuItem onClick={() => confirmJobDate(fixId)} className="mb-1">
              <i
                className="fa fa-wrench me-3"
                style={{ fontSize: "1.2em" }}
              ></i>
              <span>Set Job Completion Date</span>
            </MenuItem>
          )}
          <MenuItem
            onClick={() => {
              handleClose();
              confirmSupplies(fixId);
            }}
            className="mb-1"
          >
            <i
              className="fa fa-check-circle me-3"
              style={{ fontSize: "1.2em" }}
            ></i>
            <span>Confirm supplies</span>
          </MenuItem>
        </Menu>
      )}
    </>
  );
};

export default CardsAction;
