import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Menu, MenuItem } from "@mui/material";

const GlobalTableActions = ({ actions = [], id = "" }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  if (!actions) return;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuTemplate = actions.map((action) => (
    <MenuItem
      key={action.id}
      onClick={() => {
        action.action();
        handleClose();
      }}
      disabled={action.disabled}
    >
      {action.name}
    </MenuItem>
  ));

  return (
    <>
      <Button
        id={`${id}-button`}
        aria-controls={open ? `${id}-menu` : undefined}
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
        id={`${id}-menu`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": `${id}-button` }}
        sx={{
          ".css-kk1bwy-MuiButtonBase-root-MuiMenuItem-root:hover, .css-6hp17o-MuiList-root-MuiMenu-list":
            {
              backgroundColor: "#fff",
            },
        }}
      >
        {menuTemplate}
      </Menu>
    </>
  );
};

export default GlobalTableActions;

GlobalTableActions.propTypes = {
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      action: PropTypes.func.isRequired,
      disabled: PropTypes.bool,
    })
  ),
};
