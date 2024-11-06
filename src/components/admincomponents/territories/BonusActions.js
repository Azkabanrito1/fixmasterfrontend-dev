import { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PATH_ADMIN } from "../../../routes/paths";

const BonusActions = ({ bonusId, territoryId }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const editBonus = () => {
    navigate(`${PATH_ADMIN.editBonus(territoryId)}/${bonusId}`);
    handleClose();
  };
  // const deactivate = () => {
  //   navigate(`${PATH_ADMIN.territoryInfo}/${bonusId}`);
  //   handleClose();
  // };
  // const setUpCollabs = () => {
  //   navigate(`${PATH_ADMIN.territoryCollabs}/${bonusId}`);
  //   handleClose();
  // };
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
        <MenuItem disabled onClick={editBonus}>
          Edit Bonus Details
        </MenuItem>
        <MenuItem disabled onClick={deactivate}>
          De-activate Bonus
        </MenuItem>
      </Menu>
    </>
  );
};

export default BonusActions;
