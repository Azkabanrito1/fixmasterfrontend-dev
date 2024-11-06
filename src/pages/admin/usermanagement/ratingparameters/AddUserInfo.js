import { useState } from "react";
import GlobalBtn from "../../../../components/globalcomponents/GlobalBtn";
import GlobalFullScreenLoader from "../../../../components/globalcomponents/GlobalFullScreenLoader";
import GlobalModal from "../../../../components/globalcomponents/GlobalModal";
import AltModalHeader from "../../../../components/layouts/modal/AltModalHeader";
import GlobalInput from "../../../../components/globalcomponents/GlobalInput";
import { FormGroup } from "../../../../components/globalcomponents/Utilities";
import GlobalSelect from "../../../../components/globalcomponents/GlobalSelect";
import { useGetCollaboratorRoles } from "../../../../hooks/useQueries/useIdentity";
import { earningStatus } from "../../../../utils/utilityFxns";

const AddUserInfo = ({
  isOpen,
  closeModal,
  initRating,
  editRating,
  addRatings,
  isEditing,
  isCreating,
}) => {
  const [rating, setRating] = useState({
    rateName: initRating?.description || "",
    rateValue: initRating?.indicator || 0,
    role: initRating?.roleName || "",
    status: initRating?.status || "",
  });

  const [error, setError] = useState({
    rateName: "",
    rateValue: "",
    role: "",
  });

  //----------------------------------------------------------------data fetching----------------------------------------------------------------
  const { data: roleData } = useGetCollaboratorRoles();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "rateValue" && value > 5) {
      setError((prevError) => ({
        ...prevError,
        rateValue: "Indicator value cannot be greater than 5",
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        [name]: "",
      }));
      setRating((prevRating) => ({
        ...prevRating,
        [name]: value,
      }));
    }
  };

  const addRating = () => {
    let hasError = false;

    if (!rating.rateName) {
      setError((prevError) => ({
        ...prevError,
        rateName: "Please input a description",
      }));
      hasError = true;
    }

    if (!rating.rateValue) {
      setError((prevError) => ({
        ...prevError,
        rateValue: "Please input an indicator value",
      }));
      hasError = true;
    }

    if (rating.rateValue > 5) {
      setError((prevError) => ({
        ...prevError,
        rateValue: "Indicator value cannot be greater than 5",
      }));
      hasError = true;
    }

    if (hasError) return;

    const roles = roleData?.data?.find((role) =>
      rating.role?.includes(role.name)
    );

    const ratingStatus = earningStatus?.find((status) =>
      rating.status?.includes(status.name)
    );

    const payload = {
      id: initRating?.id || null,
      name: rating.rateName,
      indicator: rating.rateValue,
      role: roles.id,
      status: ratingStatus?.id,
    };

    if (initRating?.id) {
      editRating(payload);
    } else {
      addRatings(payload);
    }
  };

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader
        closeModal={closeModal}
        heading={initRating?.id ? "Edit Ratings Type" : "Add Rating Type"}
      />
      <FormGroup columns="2">
        <GlobalSelect
          labelText="Collaborators"
          selectName="role"
          selectValue={rating.role}
          handleChange={handleChange}
          defaultOption="Select collaborator"
          options={roleData?.data}
          valueType="string"
          required
          disabled={initRating}
        />

        <GlobalInput
          labelText="Description"
          inputName="rateName"
          inputValue={rating.rateName}
          handleChange={handleChange}
          errorMessage={error.rateName}
          error={!!error.rateName}
          inputPlaceholder="e.g Excellent"
          required
        />
        <GlobalInput
          labelText={"Indicator"}
          inputName="rateValue"
          inputType="number"
          inputValue={rating.rateValue}
          handleChange={handleChange}
          errorMessage={error.rateValue}
          error={!!error.rateValue}
          inputPlaceholder="e.g 5"
          min={0}
          max={5}
          required
        />
        {initRating && (
          <GlobalSelect
            labelText="Status"
            selectName="status"
            selectValue={rating.status}
            handleChange={handleChange}
            options={earningStatus}
            defaultOption="Select Status"
            valueType="string"
          />
        )}
      </FormGroup>

      <GlobalBtn
        className="mt-3"
        onClick={addRating}
        mx="auto"
        disabled={!rating.rateName || !rating.rateValue || rating.rateValue > 5}
      >
        {initRating ? "Edit" : "Add"}
      </GlobalBtn>
      <GlobalFullScreenLoader open={isCreating || isEditing} />
    </GlobalModal>
  );
};

export default AddUserInfo;
