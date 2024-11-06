import { useFormik } from "formik";
import { useGetEmploymentType } from "../../../hooks/useQueries/useAdmin";
import { earningTypes } from "../../../utils/utilityFxns";
import GlobalInput from "../../globalcomponents/GlobalInput";
import GlobalModal from "../../globalcomponents/GlobalModal";
import GlobalSelect from "../../globalcomponents/GlobalSelect";
import { FormGroup } from "../../globalcomponents/Utilities";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import { useGetCollaboratorRoles } from "../../../hooks/useQueries/useIdentity";
import GlobalFullScreenLoader from "../../globalcomponents/GlobalFullScreenLoader";
import { useEffect } from "react";

const AddEarningModal = ({
  isOpen,
  closeModal,
  heading,
  actions,
  isLoading,
  actionText,
  rolesData,
  data,
}) => {
  //===========================================================data fetcher========================================================
  const { data: employmentTypeData } = useGetEmploymentType();

  const collaboratorRoles = rolesData?.data?.slice(0, 6);

  const onSubmit = (values) => {
    const payload = {
      employmentTypeId: +values.employmentType,
      earningValue: values.earningValue,
      valueType: values.valueType,
      description: values.description,
      role: values.collaborator,
    };
    actions(payload);
  };

  const { values, handleChange, handleSubmit, setFieldValue, handleBlur } =
    useFormik({
      initialValues: {
        employmentType: "",
        description: "",
        valueType: "",
        earningValue: "",
        collaborator: "",
      },
      onSubmit,
    });

  useEffect(() => {
    if (data) {
      const employment = employmentTypeData?.data?.find(
        (item) => item.id === data.employmentTypeId
      );
      setFieldValue("employmentType", employment?.id);
      setFieldValue("description", data?.description);
      setFieldValue("valueType", data?.valueType);
      setFieldValue("earningValue", data?.earningValue);

      const collab = collaboratorRoles.find((item) => item.id === data.role);
      setFieldValue("collaborator", collab?.id);
    }
  }, [data, setFieldValue]);

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader heading={heading} closeModal={closeModal} />
      <form onSubmit={handleSubmit}>
        <FormGroup columns="2" mb="20px">
          <GlobalSelect
            selectName="collaborator"
            options={collaboratorRoles}
            defaultOption="Select Collaborator"
            selectValue={values.collaborator}
            handleChange={handleChange}
            handleBlur={handleBlur}
            labelText="Specify collaborator"
            required
          />
          <GlobalSelect
            selectName="employmentType"
            options={employmentTypeData?.data}
            defaultOption="Select Employment Type"
            selectValue={values.employmentType}
            handleChange={handleChange}
            handleBlur={handleBlur}
            labelText="Employment Type"
            required
          />
          <GlobalInput
            name="description"
            inputValue={values.description}
            handleChange={handleChange}
            labelText="Descriptions"
            inputPlaceholder="E.g referral earning"
            inputType="text"
            required
          />
          <GlobalSelect
            selectName="valueType"
            options={earningTypes}
            defaultOption="Select Value Type"
            selectValue={values.valueType}
            handleChange={handleChange}
            handleBlur={handleBlur}
            labelText="Value Type"
            required
            valueType="string"
          />
          {values.valueType && (
            <GlobalInput
              name="earningValue"
              inputValue={values.earningValue}
              handleChange={handleChange}
              labelText="Earning Value"
              inputPlaceholder="E.g 1000"
              inputType="number"
              required
            />
          )}
        </FormGroup>
        <GlobalBtn className="m-auto mt-3">
          {isLoading ? "Loading" : actionText}
        </GlobalBtn>
      </form>
      <GlobalFullScreenLoader open={isLoading} />
    </GlobalModal>
  );
};

export default AddEarningModal;
