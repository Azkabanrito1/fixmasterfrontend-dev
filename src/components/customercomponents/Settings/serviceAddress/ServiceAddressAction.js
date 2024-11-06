import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
// import { useDispatch } from "react-redux";

const ServiceAction = ({ addid, openEditAddressModal, openDeleteModal }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  // const dispatch = useDispatch();
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const editAddress = () => {
    openEditAddressModal(addid);
    handleClose();
  };

  const deleteAddress = () => {
    openDeleteModal(addid);
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
        <MenuItem onClick={editAddress}>Edit Address</MenuItem>
        <MenuItem onClick={deleteAddress}>Delete Address</MenuItem>
      </Menu>
    </>
  );
};

export default ServiceAction;
