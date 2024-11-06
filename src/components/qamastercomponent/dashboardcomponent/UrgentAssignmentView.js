import { Button } from "@mui/material";
import { useState } from "react";

const UrgentAssignmentView = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  return (
    <div>
      <Button
        id="techOnboarding-button"
        aria-controls={open ? "job-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{ backgroundColor: "#f16222", color: "#ffffff" }}
      >
        View All
      </Button>
    </div>
  );
};

export default UrgentAssignmentView;
