import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";

const ChangeCseStatus = ({ cseId, cseStatus }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const activate = () => {
    handleClose();
    console.log(cseId);
  };

  const setDormant = () => {
    handleClose();
    console.log(cseId);
  };

  const suspend = () => {
    handleClose();
    console.log(cseId);
  };

  const sack = () => {
    handleClose();
    console.log(cseId);
  };

  return (
    <>
      <Button
        id="editStatus-button"
        aria-controls={open ? "editStatus-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className={`edit-status ${cseStatus}`}
      >
        {cseStatus} <img src="/images/edit.png" alt="" />
      </Button>
      <Menu
        id="editStatus-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "editStatus-button" }}
      >
        <MenuItem onClick={activate}>Active</MenuItem>
        <MenuItem onClick={setDormant}>Dormant</MenuItem>
        <MenuItem onClick={suspend}>Suspended</MenuItem>
        <MenuItem onClick={sack}>Sacked</MenuItem>
      </Menu>
    </>
  );
};

export default ChangeCseStatus;
