import { FormGroup, Rating } from "@mui/material";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import GlobalModal from "../GlobalModal";
import GlobalBtn from "../GlobalBtn";
import GlobalTextArea from "../GlobalTextArea";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import { useGetCollaboratorRatingParam } from "../../../hooks/useQueries/useAdmin";
import GlobalFullScreenLoader from "../GlobalFullScreenLoader";

const RatingInput = ({ isOpen, closeModal, data, action, isCreating }) => {
  const [averageRating, setAverageRating] = useState(0);
  const { data: ratingData } = useGetCollaboratorRatingParam();

  const onSubmit = (values) => {
    const payload = {
      comment: values.comment,
      ratedValue: ratingsValues,
    };
    action(payload);
  };

  const { values, handleChange, handleBlur, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        comment: "",
        ratings: [],
      },
      onSubmit,
    });

  const handleRatingChange = (id, newValue) => {
    const updatedRatings = values.ratings.map((rating) =>
      rating.id === id ? { ...rating, value: newValue } : rating
    );
    setFieldValue("ratings", updatedRatings);
  };

  useEffect(() => {
    if (ratingData?.data) {
      setFieldValue(
        "ratings",
        ratingData.data.map((rating) => ({
          id: rating.id,
          value: 0,
        }))
      );
    }
  }, [ratingData, setFieldValue]);

  useEffect(() => {
    const averageRating =
      values.ratings.reduce((acc, curr) => acc + curr.value, 0) /
      values.ratings.length;
    setAverageRating(averageRating || 0);
  }, [values.ratings]);

  const ratingsValues = values.ratings.map((rating) => {
    return rating.value;
  });

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader
        heading={data?.rateCollaborator}
        closeModal={closeModal}
      />
      <form onSubmit={handleSubmit}>
        <div className="d-grid gap-4 mt-2">
          <div className="d-flex justify">
            <span
              style={{
                cursor: "pointer",
                fontWeight: "bold",
                marginLeft: "10px",
              }}
            >
              {`${data?.roleName} Name:`}
            </span>
            <p style={{ marginLeft: "10px" }}>{data?.rateeName}</p>
          </div>

          <div>
            <span
              style={{
                cursor: "pointer",
                fontWeight: "bold",
                marginLeft: "10px",
              }}
            >
              {`${data?.rateeName} Ratings`}
            </span>
            {values.ratings.map((rating) => (
              <div className="d-flex gap-5" key={rating.id}>
                <Rating
                  className="ms-2"
                  name={`rating-${rating.id}`}
                  value={rating.value}
                  onChange={(event, newValue) =>
                    handleRatingChange(rating.id, newValue)
                  }
                  max={5}
                />
                <p>{ratingData?.data?.find((r) => r.id === rating.id)?.name}</p>
              </div>
            ))}
            <div className="d-flex gap-5">
              <span className="ms-2">Overall Rating</span>
              <Rating readOnly max={5} value={averageRating} />
            </div>
          </div>
          <FormGroup columns="1">
            <GlobalTextArea
              labelText="Comments"
              inputValue={values.comment}
              inputName="comment"
              handleChange={handleChange}
              handleBlur={handleBlur}
              required
            />
          </FormGroup>
          <GlobalBtn
            className="m-auto mt-3"
            type="submit"
            disabled={!values.ratings || !values.comment}
          >
            Submit
          </GlobalBtn>
        </div>
        <GlobalFullScreenLoader open={isCreating} />
      </form>
    </GlobalModal>
  );
};

export default RatingInput;
