import { useState } from "react";
import { Button, Menu, MenuItem, styled } from "@mui/material";

const InitialContactDropdowns = ({ action, options }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const performAction = (id) => {
    action(id);
    handleClose();
  };

  const menuTemplate = options?.map((option) => {
    return (
      <MenuItem
        key={option.id}
        onClick={() => {
          performAction(option.id);
        }}
        className="mb-1"
      >
        {option.name}
      </MenuItem>
    );
  });

  return (
    <>
      <StyledButton
        id="listing-button"
        aria-controls={open ? "listing-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <i
          style={{ color: "#fff", fontSize: "0.6em" }}
          className="fa fa-plus"
        ></i>
      </StyledButton>
      <Menu
        id="listing-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "listing-button" }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {menuTemplate}
      </Menu>
    </>
  );
};

export default InitialContactDropdowns;

const StyledButton = styled(Button)`
  display: grid;
  place-items: center;
  min-width: 18px !important;
  border-radius: 5px 5px 5px 0;
  color: #ffffff;
  padding: 0.3em;
  background-color: var(--clr-primary);
  overflow: hidden;

  &:hover {
    background-color: #222;
  }
`;
