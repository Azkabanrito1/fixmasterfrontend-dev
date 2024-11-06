import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PATH_ADMIN } from "../../../routes/paths";

const TerritoryActions = ({ territoryId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const editDetails = () => {
    navigate(`${PATH_ADMIN.editTerritory}/${territoryId}`);
    handleClose();
  };
  const viewInfo = () => {
    navigate(`${PATH_ADMIN.territoryInfo}/${territoryId}`);
    handleClose();
  };
  const setUpCollabs = () => {
    navigate(`${PATH_ADMIN.territoryCollabs}/${territoryId}`);
    handleClose();
  };
  const deactivate = () => {
    console.log("deactivated");
    handleClose();
  };

  return (
    <>
      <Button
        id="territory-button"
        aria-controls={open ? "territory-menu" : undefined}
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
        className="primary"
      >
        <img src="/images/triple-colon.png" alt="" />
      </Button>
      <Menu
        id="territory-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "territory-button" }}
      >
        <MenuItem onClick={viewInfo}>View Territory Info</MenuItem>
        <MenuItem onClick={editDetails}>Edit Territory Details</MenuItem>
        <MenuItem onClick={setUpCollabs}>Edit Collaborator Settings</MenuItem>
        {/* <MenuItem onClick={deactivate}>De-activate Territory</MenuItem> */}
      </Menu>
    </>
  );
};

export default TerritoryActions;
