import React, { useEffect } from "react";
import GlobalModal from "../../../../components/globalcomponents/GlobalModal";
import AltModalHeader from "../../../../components/layouts/modal/AltModalHeader";
import { useFormik } from "formik";
import { useGetCollaboratorRoles } from "../../../../hooks/useQueries/useIdentity";
import {
  Fields,
  FormGroup,
} from "../../../../components/globalcomponents/Utilities";
import { valueTypeData, BonusTypeData } from "../../../../utils/selectOptions";

import GlobalInput from "../../../../components/globalcomponents/GlobalInput";
import GlobalBtn from "../../../../components/globalcomponents/GlobalBtn";
import GlobalSelect from "../../../../components/globalcomponents/GlobalSelect";
import {
  ratingStatus,
} from "../../../../utils/utilityFxns";

const RatingDefaultModal = ({
  isOpen,
  closeModal,
  heading,
  action,
  isLoading,
  actionText,
  activeData,
}) => {
  const onSubmit = () => {
   
    const selectedStatus = ratingStatus?.find((status) =>
      values.status.includes(status.name)
    );

    const payload = {
      roleId: collabRole[0]?.id,
      defaultRating: +values.defaultRating,
      status: selectedStatus?.id,
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
      defaultRating: "",
      status: "",
    },
    onSubmit,

  });

  const { data: roleData } = useGetCollaboratorRoles();



  useEffect(() => {
    if (activeData) {
      const roles = roleData?.data?.find(
        (data) => data.name === activeData?.roleName
      );
      setFieldValue("role", roles?.name);

      setFieldValue("defaultRating", activeData?.defaultRating);

      setFieldValue("status", activeData?.status);
    }
  
  }, [activeData, setFieldValue,roleData]);

  const collabRole = roleData?.data?.filter((role) =>
    values.role?.includes(role?.name)
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
              options={roleData?.data}
              defaultOption="Select Collaborators"
              handleBlur={handleBlur}
              handleChange={handleChange}
              required
              valueType="string"
              selectValue={values.role}
              disabled={activeData}
            />
  

            <GlobalInput
              labelText="Default Rating "
              inputType="defaultRating"
              inputName="defaultRating"
              inputValue={values.defaultRating}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.defaultRating && touched.defaultRating}
              errorMessage={errors.defaultRating}
              min={0}
              required={true}
            />
             {activeData && ( 
              <GlobalSelect
                labelText="Status"
                selectName="status"
                selectValue={values.status}
                handleChange={handleChange}
                options={ratingStatus}
                defaultOption="Select Status"
                valueType="string"
              />
             )}
          </FormGroup>
        </Fields>

        <GlobalBtn type="submit" mx="auto" px="2rem">
          {isLoading ? "add..." : actionText}
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default RatingDefaultModal;
