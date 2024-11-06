import { Badge } from "@mui/material";
import React from "react";
import { MdPhoneMissed } from "react-icons/md";
import { Link } from "react-router-dom";

const SingleCallCard = ({ call, openCustomerType }) => {
  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <img src={call.icon} alt="" />
        {call.notificationCount > 0 && (
          <Badge badgeContent={call.notificationCount} color="error" showZero>
            <MdPhoneMissed style={{ color: "#252525", fontSize: "1.5rem" }} />
          </Badge>
        )}
      </div>
      {call.to ? (
        <Link
          to={call.to}
          className="d-flex justify-content-between align-items-center mb-3"
        >
          <span
            style={{ color: call.color, fontSize: "1.3rem", fontWeight: 700 }}
          >
            {call.title}
          </span>
          <i className="fa fa-chevron-right text-dark"></i>
        </Link>
      ) : (
        <Link
          to={openCustomerType}
          className="d-flex justify-content-between align-items-center mb-3"
        >
          <span
            style={{ color: call.color, fontSize: "1.3rem", fontWeight: 700 }}
            onCanPlay={() => openCustomerType()}
          >
            {call.title}
          </span>
          <i className="fa fa-chevron-right text-dark"></i>
        </Link>
      )}

      <p className="me-3 text-muted">{call.description}</p>
    </div>
  );
};

export default SingleCallCard;
