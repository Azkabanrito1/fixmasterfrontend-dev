import { Badge } from "@mui/material";
import { BsBell } from "react-icons/bs";
import { Link } from "react-router-dom";

const SingleFixCard = ({ fix }) => {
  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <img src={fix.icon} alt="" />
        {fix.notificationCount > 0 && (
          <Badge badgeContent={fix.notificationCount} color="error" showZero>
            <BsBell style={{ color: "#252525", fontSize: "1.5rem" }} />
          </Badge>
        )}
      </div>

      <Link
        to={fix.to}
        className="d-flex justify-content-between align-items-center mb-3"
      >
        <span style={{ color: fix.color, fontSize: "1.3rem", fontWeight: 700 }}>
          {fix.title}
        </span>
        <i className="fa fa-chevron-right text-dark"></i>
      </Link>

      <p className="me-3 text-muted">{fix.description}</p>
    </div>
  );
};

export default SingleFixCard;
