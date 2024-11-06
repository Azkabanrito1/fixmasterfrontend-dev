import { AssignmentContainer } from "../../../../../../franchiseecomponents/dashboardcomponents/DashboardHomeSection";
import { useState } from "react";
import { FormGroup } from "../../../../../../globalcomponents/Utilities";
import GlobalBtn from "../../../../../../globalcomponents/GlobalBtn";
import GlobalInput from "../../../../../../globalcomponents/GlobalInput";
import { Rating } from "@mui/material";

const TechnicianRating = () => {
  const [comment, setComment] = useState("");
  const [showRating, setShowRating] = useState(false);
  console.log(comment);
  const handleSubmit = (e) => {
    e.preventDefault();
    // const payload = {
    //   comments: value.comment
    // };
  };
  const handleTech = function () {
    setShowRating((prev) => !prev);
  };
  return (
    <section>
      <AssignmentContainer onClick={handleTech}>
        <span
          className="d-flex justify-content-between"
          style={{ cursor: "pointer", fontWeight: "bolder" }}
        >
          Technician
          <i className="fa fa-chevron-right"></i>
        </span>
      </AssignmentContainer>
      {showRating ? (
        <div className="d-grid gap-4 mt-2">
          <div className="d-flex justify">
            <span
              style={{
                cursor: "pointer",
                fontWeight: "bold",
                marginLeft: "10px",
              }}
            >
              Technician Name:{" "}
            </span>
            <p style={{ marginLeft: "10px" }}></p>
          </div>
          <div className="d-flex justify">
            <span
              style={{
                cursor: "pointer",
                fontWeight: "bold",
                marginLeft: "10px",
              }}
            >
              Area of Specialization:{" "}
            </span>
            <p style={{ marginLeft: "10px" }}></p>
          </div>
          <div clas>
            <span
              style={{
                cursor: "pointer",
                fontWeight: "bold",
                marginLeft: "10px",
              }}
            >
              Technician Ratings
            </span>
            <div className="d-flex gap-5">
              <Rating className="ms-2" />

              <p>Communication</p>
            </div>
            <div className="d-flex gap-5">
              <Rating className="ms-2" />
              <p>Speed</p>
            </div>
            <div className="d-flex gap-5">
              <Rating className="ms-2" />
              <p>Coorporation</p>
            </div>
            <div className="d-flex gap-5">
              <Rating className="ms-2" />
              <p>Adherence to schedule</p>
            </div>
            <div className="d-flex gap-5">
              <span className="ms-2">Overall Rating</span>
              <Rating />
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <FormGroup columns="1">
              <GlobalInput
                labelText="Comments"
                inputValue={comment}
                inputName="comment"
                handleChange={(e) => setComment(e.target.value)}
                height="115px"
                width="1320px"
              />
            </FormGroup>
            <GlobalBtn style={{ margin: "auto", marginTop: "20px" }}>
              Submit
            </GlobalBtn>
          </form>
        </div>
      ) : null}
    </section>
  );
};

export default TechnicianRating;
