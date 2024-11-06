import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  approveCseFirstStage,
  rejectCseFirstStage,
} from "../../../redux/franchisee/actions";

const OnboardActions = ({ applicantId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const ApproveCSE = async () => {
    const response = await dispatch(approveCseFirstStage(applicantId));
    handleClose();
  };

  const RejectCSE = async () => {
    const response = await dispatch(rejectCseFirstStage(applicantId));
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
        <MenuItem onClick={ApproveCSE}>Approve</MenuItem>
        <MenuItem onClick={RejectCSE}>Reject</MenuItem>
      </Menu>
    </>
  );
};

export default OnboardActions;
