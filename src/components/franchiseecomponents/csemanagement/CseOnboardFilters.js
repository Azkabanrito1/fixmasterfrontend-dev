import { useState } from "react";
import styled from "styled-components";
import { Button, Menu, MenuItem } from "@mui/material";

export const Stage1Filter = ({ setFilter, filter }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const showAll = () => {
    setFilter("All");
    handleClose();
  };

  const showApproved = () => {
    setFilter("Approved");
    handleClose();
  };

  const showRejected = () => {
    setFilter("Rejected");
    handleClose();
  };

  const showNotActed = () => {
    setFilter("Not Acted");
    handleClose();
  };

  return (
    <>
      <FilterButton
        id="filter-button"
        aria-controls={open ? "filterCSE" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="primary"
      >
        <span>{filter}</span>{" "}
        <span>
          <i className="fas fa-chevron-down"></i>
        </span>
      </FilterButton>
      <Menu
        id="filterCSE"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "filter-button" }}
      >
        <MenuItem onClick={showAll}>All</MenuItem>
        <MenuItem onClick={showApproved}>Approved</MenuItem>
        <MenuItem onClick={showRejected}>Rejected</MenuItem>
        <MenuItem onClick={showNotActed}>Not Acted</MenuItem>
      </Menu>
    </>
  );
};

export const Stage2Filter = ({ setFilter, filter }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const showAll = () => {
    setFilter("All");
    handleClose();
  };

  const showPassed = () => {
    setFilter("Passed");
    handleClose();
  };

  const showFailed = () => {
    setFilter("Failed");
    handleClose();
  };

  return (
    <>
      <FilterButton
        id="filter-button"
        aria-controls={open ? "filterCSE" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="primary"
      >
        <span>{filter}</span>{" "}
        <span>
          <i className="fas fa-chevron-down"></i>
        </span>
      </FilterButton>
      <Menu
        id="filterCSE"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "filter-button" }}
      >
        <MenuItem onClick={showAll}>All</MenuItem>
        <MenuItem onClick={showPassed}>Passed</MenuItem>
        <MenuItem onClick={showFailed}>Failed</MenuItem>
      </Menu>
    </>
  );
};

export const Stage3Filter = ({ setFilter, filter }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const showAll = () => {
    setFilter("All");
    handleClose();
  };

  const showGraded = () => {
    setFilter("Graded");
    handleClose();
  };

  const showNotGraded = () => {
    setFilter("Not Graded");
    handleClose();
  };

  return (
    <>
      <FilterButton
        id="filter-button"
        aria-controls={open ? "filterCSE" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="primary"
      >
        <span>{filter}</span>{" "}
        <span>
          <i className="fas fa-chevron-down"></i>
        </span>
      </FilterButton>
      <Menu
        id="filterCSE"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "filter-button" }}
      >
        <MenuItem onClick={showAll}>All</MenuItem>
        <MenuItem onClick={showGraded}>Graded</MenuItem>
        <MenuItem onClick={showNotGraded}>Not Graded</MenuItem>
      </Menu>
    </>
  );
};

export const Stage4Filter = ({ setFilter, filter }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const showAll = () => {
    setFilter("All");
    handleClose();
  };

  const showPassed = () => {
    setFilter("Passed");
    handleClose();
  };

  const showFailed = () => {
    setFilter("Failed");
    handleClose();
  };

  return (
    <>
      <FilterButton
        id="filter-button"
        aria-controls={open ? "filterCSE" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="primary"
      >
        <span>{filter}</span>{" "}
        <span>
          <i className="fas fa-chevron-down"></i>
        </span>
      </FilterButton>
      <Menu
        id="filterCSE"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "filter-button" }}
      >
        <MenuItem onClick={showAll}>All</MenuItem>
        <MenuItem onClick={showPassed}>Passed</MenuItem>
        <MenuItem onClick={showFailed}>Failed</MenuItem>
      </Menu>
    </>
  );
};

export const Stage5Filter = ({ setFilter, filter }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const showAll = () => {
    setFilter("All");
    handleClose();
  };

  const showActivated = () => {
    setFilter("Activated");
    handleClose();
  };

  const showNotActivated = () => {
    setFilter("Not Activated");
    handleClose();
  };

  return (
    <>
      <FilterButton
        id="filter-button"
        aria-controls={open ? "filterCSE" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="primary"
      >
        <span>{filter}</span>{" "}
        <span>
          <i className="fas fa-chevron-down"></i>
        </span>
      </FilterButton>
      <Menu
        id="filterCSE"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "filter-button" }}
      >
        <MenuItem onClick={showAll}>All</MenuItem>
        <MenuItem onClick={showActivated}>Activated</MenuItem>
        <MenuItem onClick={showNotActivated}>Not Activated</MenuItem>
      </Menu>
    </>
  );
};

export const FolderFilter = ({ setFilter, filter }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const showCumulative = () => {
    setFilter("Cumulative");
    handleClose();
  };

  const showFolder = (no) => {
    console.log(no);
    setFilter(`Folder ${no}`);
    handleClose();
  };

  return (
    <>
      <FilterButton
        id="filter-button"
        aria-controls={open ? "filterCSE" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="primary"
      >
        <span>{filter}</span>{" "}
        <span>
          <i className="fas fa-chevron-down"></i>
        </span>
      </FilterButton>
      <Menu
        id="filterCSE"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "filter-button" }}
      >
        <MenuItem onClick={showCumulative}>Cumulative</MenuItem>
        <MenuItem onClick={() => showFolder(1)}>Folder 1</MenuItem>
        <MenuItem onClick={() => showFolder(2)}>Folder 2</MenuItem>
      </Menu>
    </>
  );
};

const FilterButton = styled(Button)`
  display: flex !important;
  justify-content: space-between !important;
  align-items: center !important;
  width: 85% !important;
  padding: 0.35em 0.5em !important;
  border: 2px solid #a1a1a1 !important;
  border-radius: 8px !important;
  text-transform: capitalize !important;
  font-size: 18px !important;
  color: #676767 !important;
  background-color: #fff !important;
`;
