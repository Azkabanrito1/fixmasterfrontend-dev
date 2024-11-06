import { useEffect, useReducer, useState } from "react";
import GlobalCheckbox from "../../../globalcomponents/GlobalCheckbox";
import InitialContactDropdowns from "../InitialContactDropdowns";
import useFetch from "../../../../hooks/useFetch";
import {
  getFixCategories,
  getFixSubCategories,
  getFixServiceListing,
  updateFixCategory,
  updateFixSubCategory,
  updateFixServiceListing,
} from "../../../../redux/fix/actions";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Grid, SectionHeading } from "../../../globalcomponents/Utilities";
import { useGetFixCategories } from "../../../../hooks/useQueries/useJobs";

const initState = {
  selectedCategory: "",
  selectedSubCategory: "",
  selectedServiceListing: "",
};

const fixDetailsReducer = (state, action) => {
  const { id, prop, type } = action;
  switch (type) {
    case "ADD":
      return {
        ...state,
        [prop]: id,
      };
    case "REMOVE":
      return { ...state, [prop]: "" };
    default:
      return state;
  }
};

const FixDetails = ({ jobDetails, contactState, toggleFastTrack }) => {
  // const allFixCategories = useFetch({ action: getFixCategories });
  const { data: categoriesData } = useGetFixCategories();
  const allFixCategories = categoriesData?.data;
  const [fixDetails, setFixDetails] = useReducer(fixDetailsReducer, initState);
  const [allSubCategories, setAllSubCategories] = useState([]);
  const [allServiceListing, setAllServiceListing] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { fixId } = useParams();

  console.log(allFixCategories);

  useEffect(() => {
    setFixDetails({
      type: "ADD",
      prop: "selectedCategory",
      id: jobDetails?.bookingCategoryId,
    });
  }, []);

  // get sub-categories and service listings
  const getSubCategories = async (id) => {
    const response = await dispatch(getFixSubCategories(id));
    if (response.data) setAllSubCategories(response.data);
  };

  const getServiceListing = async (id) => {
    const response = await dispatch(getFixServiceListing(id));
    if (response.data) setAllServiceListing(response.data);
  };

  // functions for each dropdown item
  const addCategory = async (id) => {
    setFixDetails({ type: "ADD", id, prop: "selectedCategory" });
    getSubCategories(id);
    const payload = { fixId: Number(fixId), categoryId: id };
    const response = await dispatch(updateFixCategory(payload));
    if (response.status.toLowerCase() !== "success") {
      enqueueSnackbar(`An error occurred: ${response.message}`, {
        variant: "error",
      });
    }
  };

  const addSubCategory = async (id) => {
    setFixDetails({ type: "ADD", id, prop: "selectedSubCategory" });
    getServiceListing(id);
    const payload = {
      fixId: Number(fixId),
      categoryId: Number(fixDetails.selectedCategory),
      subCategoryId: id,
    };
    const response = await dispatch(updateFixSubCategory(payload));
    if (response.status.toLowerCase() !== "success") {
      enqueueSnackbar(`An error occurred: ${response.message}`, {
        variant: "error",
      });
    }
  };

  const addServiceListing = async (id) => {
    setFixDetails({ type: "ADD", id, prop: "selectedServiceListing" });
    const payload = {
      fixId: Number(fixId),
      categoryId: Number(fixDetails.selectedCategory),
      subCategoryId: Number(fixDetails.selectedSubCategory),
      serviceListingId: id,
    };
    const response = await dispatch(updateFixServiceListing(payload));
    if (response.status.toLowerCase() !== "success") {
      enqueueSnackbar(`An error occurred: ${response.message}`, {
        variant: "error",
      });
    }
  };

  return (
    <section className="mb-4">
      <SectionHeading>Fix Details</SectionHeading>

      <Grid columns="3">
        <div>
          <h3>Booking Number</h3>
          <span>{jobDetails?.bookingNumber}</span>
        </div>
        <div>
          <h3>Booking Type</h3>
          <span>{jobDetails?.bookingType}</span>
        </div>
        <div>
          <h3>Booking Class</h3>
          <span>{jobDetails?.bookingClass}</span>
        </div>
        <div>
          <div className="d-flex align-items-start">
            <h3 className="me-1">Booking Category</h3>
            <InitialContactDropdowns
              action={(id) => addCategory(id)}
              options={allFixCategories}
            />
          </div>
          {fixDetails.selectedCategory ? (
            <Option>
              {
                allFixCategories?.filter(
                  (cat) => cat.id === fixDetails.selectedCategory
                )[0].name
              }
            </Option>
          ) : null}
        </div>
        <div>
          <div className="d-flex align-items-start">
            <h3 className="me-1">Sub-Category</h3>
            <InitialContactDropdowns
              action={(id) => addSubCategory(id)}
              options={allSubCategories}
            />
          </div>
          {fixDetails.selectedSubCategory ? (
            <Option>
              {
                allSubCategories?.filter(
                  (cat) => cat.id === fixDetails.selectedSubCategory
                )[0].name
              }
            </Option>
          ) : null}
        </div>
        <div>
          <div className="d-flex align-items-start">
            <h3 className="me-1">Service Listing</h3>
            <InitialContactDropdowns
              action={(id) => addServiceListing(id)}
              options={allServiceListing}
            />
          </div>
          {fixDetails.selectedServiceListing ? (
            <Option>
              {
                allServiceListing?.filter(
                  (cat) => cat.id === fixDetails.selectedServiceListing
                )[0].name
              }
            </Option>
          ) : null}
        </div>
        <div>
          <h3>Fast-track Fix</h3>
          <GlobalCheckbox
            inputName={"fastTrack"}
            labelText={"Treat as FastTrack"}
            checked={contactState?.fastTrack}
            handleChange={toggleFastTrack}
            fs="0.9rem"
          />
        </div>
      </Grid>
    </section>
  );
};

export default FixDetails;

const Option = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: max-content;
  margin-bottom: 0.5rem;
  padding: 0.5em 0.8em;
  border-radius: 10px;
  font-size: 13px;
  background-color: #e0e0e0;

  i {
    color: #a1a1a1;

    &:hover {
      color: var(--clr-primary);
    }
  }
`;
