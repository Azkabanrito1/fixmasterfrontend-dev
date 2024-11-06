import { useState } from "react";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import { BallBeat } from "react-pure-loaders";
import GlobalInput from "../../../globalcomponents/GlobalInput";
import { useFormik } from "formik";
import AddressInfoFormGroup from "../../../globalcomponents/globalformgroups/AddressInformation";
import useGooglePlaces from "../../../../hooks/useGooglePlaces";

const AddTerritory = ({
  isOpen,
  closeModal,
  createTerritory,
  isSubmitting,
  isScriptLoadSucceed,
}) => {
  const {} = useFormik({
    initialValues: {
      name: "",
    },
  });
  const addressComponents = useGooglePlaces(isScriptLoadSucceed, inputRef);

  const inputNames = {
    addressName: "headquaterAddress",
    stateName: "stateName",
    lgaName: "lgaName",
    cityName: "cityName",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTerritory({ name });
  };

  return (
    <GlobalModal closeModal={closeModal} isOpen={isOpen} width="500px">
      <AltModalHeader heading="Add Territory" closeModal={closeModal} />

      {isSubmitting && (
        <div className="text-center mb-3">
          <BallBeat loading={isSubmitting} color="var(--clr-primary)" />
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <GlobalInput
          inputValue={name}
          handleChange={handleChange}
          inputPlaceholder="Enter the territory name"
        />
        <AddressInfoFormGroup />
        <GlobalBtn className="mt-3" mx="auto">
          Add
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default AddTerritory;
