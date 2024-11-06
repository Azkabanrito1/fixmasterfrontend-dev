import { AssignmentContainer } from "../../../../franchiseecomponents/dashboardcomponents/DashboardHomeSection";
import { Star } from "../../../../globalcomponents/RatingStars";
import GlobalInput from "../../../../globalcomponents/GlobalInput";
import {
  SectionHeading,
  FormGroup,
} from "../../../../globalcomponents/Utilities";
import { useState } from "react";
import GlobalBtn from "../../../../globalcomponents/GlobalBtn";

const FeedBack = () => {
  const [comment, setComment] = useState("");
  const [showRating, setShowRating] = useState(false);
  // console.log(comment);
  const handleSubmit = (e) => {
    e.preventDefault();
    // const payload = {
    //   comments: value.commentF
    // };
  };
  const handleSupply = function () {
    setShowRating((prev) => !prev);
  };
  return (
    <section>
      <SectionHeading className="mb-4">FeedBack & Rating</SectionHeading>
      <AssignmentContainer onClick={handleSupply}>
        <span
          className="d-flex justify-content-between"
          style={{ cursor: "pointer", fontWeight: "bolder" }}
        >
          Supplier
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
              Supplier Name:{" "}
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
              Item Supplied:{" "}
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
              Supplier Ratings
            </span>
            <div className="d-flex gap-5">
              <Star className="ms-2" />

              <p>Communication</p>
            </div>
            <div className="d-flex gap-5">
              <Star className="ms-2" />
              <p>Speed</p>
            </div>
            <div className="d-flex gap-5">
              <Star className="ms-2" />
              <p>Coorporation</p>
            </div>
            <div className="d-flex gap-5">
              <Star className="ms-2" />
              <p>Adherence to schedule</p>
            </div>
            <div className="d-flex gap-5">
              <span className="ms-2">Overall Rating</span>
              <Star />
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

export default FeedBack;
