import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
// import { useDispatch } from "react-redux";

const ManagementActions = ({
  equipmentId,
  openDetailsModal,
  openUpdateConditionModal,
  openUpdateInfoModal,
  openDeleteModal,
  availability = "",
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  // const dispatch = useDispatch();
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const viewDetails = () => {
    openDetailsModal(equipmentId);
    handleClose();
  };

  const updateInfo = () => {
    openUpdateInfoModal(equipmentId);
    handleClose();
  };

  const updateCondition = () => {
    openUpdateConditionModal(equipmentId);
    handleClose();
  };

  const deleteEquipment = () => {
    openDeleteModal(equipmentId);
    handleClose();
  };

  return (
    <>
      <Button
        id="onboard-button"
        aria-controls={open ? "onboard-menu" : undefined}
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
        id="onboard-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "onboard-button" }}
      >
        <MenuItem onClick={viewDetails}>View Equipment Details</MenuItem>
        {!availability.toLowerCase() === "in-store" && (
          <MenuItem onClick={updateInfo}>Update Equipment Information</MenuItem>
        )}
        <MenuItem onClick={updateCondition}>
          Update Equipment Condition
        </MenuItem>
        <MenuItem onClick={deleteEquipment}>Delete Equipment</MenuItem>
      </Menu>
    </>
  );
};

export default ManagementActions;
