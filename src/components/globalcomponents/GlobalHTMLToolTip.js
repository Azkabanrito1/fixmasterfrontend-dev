import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import { fontWeight } from "@mui/system";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "var(--clr-primary)",
    color: "rgba(255, 255, 255, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
  },
}));

const GlobalHTMLToolTip = ({ text, color }) => {
  return (
    <div style={{ position: "absolute", top: "0px", right: "0px" }}>
      <HtmlTooltip
        title={
          <>
            <p style={{fontSize: "16px", fontWeight: "bold", textDecoration:"underline"}}>Folder description:</p>
            <p>{text || "-"}</p>
          </>
        }
      >
        <IconButton>
          <i
            style={{ fontSize: "1rem", color: color }}
            className="fa-solid fa-info"
          ></i>
        </IconButton>
      </HtmlTooltip>
    </div>
  );
};
export default GlobalHTMLToolTip;
