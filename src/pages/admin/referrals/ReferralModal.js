import React, { useEffect } from "react";
import GlobalModal from "../../../components/globalcomponents/GlobalModal";
import AltModalHeader from "../../../components/layouts/modal/AltModalHeader";
import { useFormik } from "formik";
import { useGetCollaboratorRoles } from "../../../hooks/useQueries/useIdentity";
import {
  Fields,
  FormGroup,
} from "../../../components/globalcomponents/Utilities";
import GlobalSelect from "../../../components/globalcomponents/GlobalSelect";
import GlobalInput from "../../../components/globalcomponents/GlobalInput";
import GlobalBtn from "../../../components/globalcomponents/GlobalBtn";
import { earningStatus, earningTypes } from "../../../utils/utilityFxns";

const ReferralModal = ({
  isOpen,
  closeModal,
  heading,
  action,
  isLoading,
  actionText,
  activeData,
}) => {
  const onSubmit = () => {
    const payload = {
      roleId: collabRole[0]?.collaboId,
      earningValue: values.earningValue,
      earningType: selectedEarning[0]?.id,
      status: values.status,
    };
    action(payload);
  };
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    errors,
    values,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      role: "",
      earningValue: "",
      earningType: "",
      status: "",
    },
    onSubmit,
    // validationSchema: createReferralSchema,
  });

  const { data: roleData } = useGetCollaboratorRoles();

  const collaboratorRoles = roleData?.data?.map((role, index) => {
    return {
      name: role.name,
      collaboId: role.id,
      id: index + 1,
    };
  });

  useEffect(() => {
    if (activeData) {
      setFieldValue("earningValue", activeData?.earningValue);
      const roles = collaboratorRoles?.find(
        (data) => data.name === activeData?.role
      );
      setFieldValue("role", roles?.name);
      setFieldValue("earningType", activeData?.earningType);
      setFieldValue("status", activeData?.status);
    }
    // console.log(activeData);
  }, [activeData, setFieldValue]);

  const collabRole = collaboratorRoles?.filter((role) =>
    values.role?.includes(role?.name)
  );

  const selectedEarning = earningTypes?.filter((type) =>
    values.earningType?.includes(type.name)
  );
  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader heading={heading} closeModal={closeModal} />
      <form onSubmit={handleSubmit}>
        <Fields>
          <FormGroup columns="2">
            <GlobalSelect
              labelText="Select Collaborators"
              selectName="role"
              options={collaboratorRoles}
              defaultOption="Select Collaborators"
              handleBlur={handleBlur}
              handleChange={handleChange}
              required
              valueType="string"
              selectValue={values.role}
              disabled={activeData}
            />

            <GlobalSelect
              labelText="Earning Type"
              selectName="earningType"
              selectValue={values.earningType}
              handleChange={handleChange}
              handleBlur={handleBlur}
              options={earningTypes}
              defaultOption="Select Earning Type"
              valueType="string"
              disabled={activeData}
            />
            {values.role?.toLocaleLowerCase() !== "customer" && (
              <GlobalInput
                labelText="Earning Value"
                inputName="earningValue"
                inputValue={values.earningValue}
                inputType="number"
                handleBlur={handleBlur}
                handleChange={handleChange}
                error={errors.earningValue && touched.earningValue}
                errorMessage={errors.earningValue}
                inputPlaceholder="Enter Earning value"
                min={0}
                required
              />
            )}
            {values.role?.toLocaleLowerCase() === "customer" && (
              <GlobalInput
                labelText="Earning Value %"
                inputName="earningValue"
                inputValue={values.earningValue}
                inputType="number"
                handleBlur={handleBlur}
                handleChange={handleChange}
                error={errors.earningValue && touched.earningValue}
                errorMessage={errors.earningValue}
                inputPlaceholder="Enter Earning value"
                min={0}
                max={100}
                required
              />
            )}
            {activeData && (
              <GlobalSelect
                labelText="Status"
                selectName="status"
                selectValue={values.status}
                handleChange={handleChange}
                handleBlur={handleBlur}
                options={earningStatus}
                defaultOption="Select Status"
                valueType="string"
              />
            )}
          </FormGroup>
        </Fields>

        <GlobalBtn type="submit" mx="auto" px="2rem" disabled={isLoading}>
          {isLoading ? "Loading..." : actionText}
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default ReferralModal;
