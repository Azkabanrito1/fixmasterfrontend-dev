import { AssignmentContainer } from "../../../../../../franchiseecomponents/dashboardcomponents/DashboardHomeSection";
import { useState } from "react";
import { FormGroup } from "../../../../../../globalcomponents/Utilities";
import GlobalBtn from "../../../../../../globalcomponents/GlobalBtn";
import { Rating } from "@mui/material";
import GlobalTextArea from "../../../../../../globalcomponents/GlobalTextArea";

const CustomerRating = () => {
  const [showRating, setShowRating] = useState(false);
  const [ratingPara, setRatingPara] = useState({
    communication: 0,
    speed: 0,
    cooperate: 0,
    schedule: 0,
    comment: "",
    overallRating: 0,
  });

  const handleCustomer = function () {
    setShowRating((prev) => !prev);
  };

  const handleChange = (e) => {
    setRatingPara((ratingPara) => ({
      ...ratingPara,
      [e.target.name]: e.target.value,
    }));
  };

  const overallRatingPara =
    +ratingPara.communication +
    +ratingPara.cooperate +
    +ratingPara.schedule +
    +ratingPara.speed;

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      communicationRating: +ratingPara.communication,
      speedRating: +ratingPara.speed,
      cooperateRating: +ratingPara.cooperate,
      scheduleRating: +ratingPara.schedule,
      additionalComments: ratingPara.comment,
      overallRatingPara,
    };
    console.log(payload);
  };

  return (
    <section>
      <AssignmentContainer onClick={handleCustomer}>
        <span
          className="d-flex justify-content-between"
          style={{ cursor: "pointer", fontWeight: "bolder" }}
        >
          Customer
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
              Customer Name:{" "}
            </span>
            <p style={{ marginLeft: "10px" }}></p>
          </div>
          <div className="d-grid gap-4">
            <span
              style={{
                cursor: "pointer",
                fontWeight: "bold",
                marginLeft: "10px",
              }}
            >
              Customer Ratings
            </span>
            <div className="d-flex gap-5">
              <Rating
                className="ms-2"
                name="communication"
                value={ratingPara.communication}
                onChange={handleChange}
                precision={0.5}
              />

              <p>Communication</p>
            </div>
            <div className="d-flex gap-5">
              <Rating
                className="ms-2"
                name="speed"
                value={ratingPara.speed}
                onChange={handleChange}
                precision={0.5}
              />
              <p>Speed</p>
            </div>
            <div className="d-flex gap-5">
              <Rating
                className="ms-2"
                name="cooperate"
                onChange={handleChange}
                value={ratingPara.cooperate}
                precision={0.5}
              />
              <p>Corporation</p>
            </div>
            <div className="d-flex gap-5">
              <Rating
                className="ms-2"
                name="schedule"
                onChange={handleChange}
                precision={0.5}
              />
              <p>Adherence to schedule</p>
            </div>
            <div className="d-flex gap-5">
              <span className="ms-2" style={{ fontWeight: "bold" }}>
                Overall Rating
              </span>
              <Rating readOnly value={overallRatingPara} />
            </div>
          </div>

          <FormGroup columns="1">
            <GlobalTextArea
              labelText="Comments"
              inputValue={ratingPara.comment}
              inputName="comment"
              handleChange={handleChange}
            />
          </FormGroup>
          <GlobalBtn
            className="m-auto mt-3"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </GlobalBtn>
        </div>
      ) : null}
    </section>
  );
};

export default CustomerRating;
