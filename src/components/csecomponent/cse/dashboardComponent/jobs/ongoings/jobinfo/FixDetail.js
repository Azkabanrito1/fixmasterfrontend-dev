import styled from "styled-components";
import { useEffect, useReducer } from "react";
import { useSnackbar } from "notistack";
import {
  useGetFixCategories,
  useUpdateCategory,
} from "../../../../../../../hooks/useQueries/useJobs";
import InitialContactDropdowns from "../../../../../../franchiseecomponents/jobsmanagement/InitialContactDropdowns";
import {
  Grid,
  SectionHeading,
} from "../../../../../../globalcomponents/Utilities";

const initState = {
  selectedCategory: "",
  selectedEquipment: "",
  selectedServiceListing: [],
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

const FixDetail = ({ jobDetails, toggleFastTrack, fixId }) => {
  const [fixDetails, setFixDetails] = useReducer(fixDetailsReducer, initState);
  const { enqueueSnackbar } = useSnackbar();

  // fn for open modal

  //-------------------data fetching--------------------
  const { data: fixCategoriesData } = useGetFixCategories();

  //-------------------------------------mutate fn--------------------------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
  };

  const onFailure = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };

  const { mutate: updateCategory } = useUpdateCategory(onSuccess, onFailure);

  // ---------------------------useEffects------------------------

  useEffect(() => {
    const activeCategory = fixCategoriesData?.data?.filter(
      (cat) =>
        cat.name.toLowerCase() === jobDetails?.bookingCategory?.toLowerCase()
    );

    setFixDetails({
      type: "ADD",
      prop: "selectedCategory",
      id: activeCategory?.[0]?.id,
    });
  }, [jobDetails?.bookingCategory]);

  // functions for each dropdown item
  const addCategory = async (id) => {
    setFixDetails({ type: "ADD", id, prop: "selectedCategory" });
    const payload = { fixId: Number(fixId), categoryId: id };
    updateCategory(payload);
  };

  const fixCategories = fixCategoriesData?.data?.filter(
    (cat) => cat.id === fixDetails.selectedCategory
  )[0]?.name;

  return (
    <section className="mb-3">
      <SectionHeading>Fix Details</SectionHeading>

      <Grid columns="3" className="mb-5">
        <div>
          <h3>Booking Number</h3>
          <span>{jobDetails?.fixId}</span>
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
              options={fixCategoriesData?.data}
            />
          </div>
          {fixDetails.selectedCategory ? (
            <Option>{fixCategories}</Option>
          ) : (
            jobDetails?.bookingCategory
          )}
        </div>
        {/* <div>
          <h3>Fast-track Fix</h3>
          <GlobalCheckbox
            inputName={"fastTrack"}
            labelText={"Treat as FastTrack"}
            checked={contactState.fastTrack}
            handleChange={toggleFastTrack}
            fs="0.9rem"
          />
        </div> */}
      </Grid>
    </section>
  );
};

export default FixDetail;

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
