import Switch from "@mui/material/Switch";
import { useState } from "react";
import { alpha, styled } from "@mui/material/styles";

const FmToggle = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#f26222",
    "&:hover": {
      backgroundColor: alpha("#f26222", theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#f26222",
  },
}));


const GlobalToggleSwitch = ({isChecked, handleChange}) => {
  // const [checked, setChecked] = useState(true);

  // const handleChange = (event) => {
  //   setChecked(event.target.checked);
  // };

  return (
    <FmToggle
      checked={isChecked}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
};
export default GlobalToggleSwitch;
