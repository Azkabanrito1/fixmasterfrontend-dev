import { Badge } from "@mui/material";
import { BsBell } from "react-icons/bs";
import { Link } from "react-router-dom";

const JobsCard = ({ job }) => {
  return (
    <div className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <img src={job.icon} alt="" />
        {typeof job.notificationCount === "number" ? (
          <Badge badgeContent={job.notificationCount} color="error" showZero>
            <BsBell style={{ color: "#252525", fontSize: "1.5rem" }} />
          </Badge>
        ) : (
          <BsBell style={{ color: "#C4C4C4", fontSize: "1.5rem" }} />
        )}
      </div>

      <p style={{ color: job.color, fontSize: "1.3rem", fontWeight: 700 }}>
        {job.title}
      </p>

      <Link
        to={job.to}
        className="d-flex justify-content-between align-items-center mb-3"
      >
        <span className="me-3 text-muted">{job.description}</span>
        <i className="fa fa-chevron-right text-dark"></i>
      </Link>
    </div>
  );
};

export default JobsCard;
