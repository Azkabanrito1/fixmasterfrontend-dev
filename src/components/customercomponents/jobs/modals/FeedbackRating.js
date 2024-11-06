import { useEffect, useState } from "react";
import { Rating, Stack } from "@mui/material";
import Collapsible from "react-collapsible";
import { useDispatch, useSelector } from "react-redux";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import { StyledForm } from "../../modals/BookaFix";
import GlobalTextArea from "../../../globalcomponents/GlobalTextArea";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import { useSnackbar } from "notistack";

// from bookafix
import { StyledCollapsible } from "../../BookaFix/BookingInfo";

const FeedbackRatings = ({ isOpen, closeModal, fixId, cse }) => {
  const [cseRatingData, setCseRatingData] = useState({});
  const [serviceRatingData, setServiceRatingData] = useState({});
  const [average, setAverage] = useState({ cse: null, service: null });

  const { enqueueSnackbar } = useSnackbar();

  // create and set the state for cse rating data
  // useEffect(() => {
  //   if (cseRatings) {
  //     const ratingState = cseRatings?.map((rating) =>
  //       rating.name.split(" ")[0].toLowerCase()
  //     );
  //     const state = {};
  //     ratingState?.forEach((rating) => {
  //       state[rating] = null;
  //     });
  //     state.comments = "";

  //     setCseRatingData(state);
  //   }
  // }, [cseRatings]);

  // calculate and update cse ratings average
  // useEffect(() => {
  //   if (cseRatingData) {
  //     const criteria = Object.keys(cseRatingData);
  //     criteria.pop("comments");
  //     let total = -1;
  //     criteria.forEach((item) => {
  //       total += Number(cseRatingData[item]);
  //     });
  //     const avg = total / criteria.length;

  //     setAverage((prev) => ({ ...prev, cse: avg }));
  //   }
  // }, [cseRatingData]);

  // handle cse rating changes
  const handleCSERatingChange = (e) => {
    setCseRatingData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // handle service rating changes
  const handleServiceRatingChange = (e) => {
    setServiceRatingData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader
        heading={"Feedback and Ratings"}
        closeModal={closeModal}
      />

      <StyledForm>
        <Collapsible
          trigger={
            <StyledCollapsible className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h3 className="heading">Feedback On CSE</h3>
                <p className="sub-heading">
                  Rate and give us feedback on the project manager assigned to
                  your project
                </p>
              </div>
              <i className="fas fa-chevron-right collapsible-icon"></i>
            </StyledCollapsible>
          }
        >
          <h4 className="fs-6 fw-bold">Rate CSE</h4>
          {cse}

          {/* <Stack spacing={1}>
            {Object.keys(cseRatingData)?.length > 0 &&
              cseRatings?.map((rating) => (
                <div
                  key={rating.name}
                  className="d-flex align-items center"
                  style={{ gap: "1.2rem" }}
                >
                  <Rating
                    name={rating.name.split(" ")[0].toLowerCase()}
                    value={
                      cseRatingData[rating.name.split(" ")[0].toLowerCase()]
                    }
                    defaultValue={0}
                    precision={0.5}
                    onChange={handleCSERatingChange}
                  />
                  <span>{rating.name}</span>
                </div>
              ))}

            <div
              className="d-flex align-items center my-4"
              style={{ gap: "1.2rem" }}
            >
              <span className="fw-bold">Overall Rating</span>
              <Rating value={average.cse} precision={0.1} readOnly />
            </div>
          </Stack> */}

          <h4 className="fw-bold fs-6">Comments on CSE</h4>
          <p className="text-muted mb-2">
            *Please share your comment on the quality of service with the
            FixMaster community.
          </p>
          <GlobalTextArea
            className="mb-3"
            border={"1px solid var(--clr-primary)"}
            inputName="comments"
            inputValue={cseRatingData?.comments}
            handleChange={handleCSERatingChange}
            required
          />
          {/* <GlobalBtn
            width="auto"
            px="2rem"
            mx="auto"
            onClick={submitCSERating}
            disabled={Object.values(cseRatingData)?.some(
              (value) => value === -1 || value === ""
            )}
          >
            Submit Feedback
          </GlobalBtn> */}
        </Collapsible>
      </StyledForm>

      <StyledForm>
        <Collapsible
          trigger={
            <StyledCollapsible className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h3 className="heading">Feedback On Fix</h3>
                <p className="sub-heading">
                  Rate and give us feedback on the quality of service delivered
                  by FixMaster
                </p>
              </div>
              <i className="fas fa-chevron-right collapsible-icon"></i>
            </StyledCollapsible>
          }
        >
          <p className="text-muted">
            *FixMaster may use your comment on its website for promotional
            purpose.
          </p>
          <h4 className="fs-6 fw-bold">Rate FixMaster Service</h4>

          {/* <Stack spacing={1}>
            {Object.keys(serviceRatingData)?.length > 0 &&
              serviceRatings?.map((rating) => (
                <div
                  key={rating.name}
                  className="d-flex align-items center"
                  style={{ gap: "1.2rem" }}
                >
                  <Rating
                    name={rating.name.split(" ")[0].toLowerCase()}
                    value={
                      serviceRatingData[rating.name.split(" ")[0].toLowerCase()]
                    }
                    defaultValue={0}
                    precision={0.5}
                    onChange={handleServiceRatingChange}
                  />
                  <span>{rating.name}</span>
                </div>
              ))}

            <div
              className="d-flex align-items center my-4"
              style={{ gap: "1.2rem" }}
            >
              <span className="fw-bold">Overall Rating</span>
              <Rating value={average.service} precision={0.1} readOnly />
            </div>
          </Stack> */}

          <h4 className="fw-bold fs-6">Comments on Service</h4>
          <p className="text-muted mb-2">
            *Please share your comment on the quality of service with the
            FixMaster community
          </p>
          <GlobalTextArea
            className="mb-3"
            border={"1px solid var(--clr-primary)"}
            inputName="comments"
            inputValue={serviceRatingData?.comments}
            handleChange={handleServiceRatingChange}
            required
          />

          {/* <GlobalBtn
            width="auto"
            px="2rem"
            mx="auto"
            onClick={submitServiceRating}
            disabled={Object.values(serviceRatingData)?.some(
              (value) => value === -1 || value === ""
            )}
          >
            Submit Feedback
          </GlobalBtn> */}
        </Collapsible>
      </StyledForm>
    </GlobalModal>
  );
};

export default FeedbackRatings;
