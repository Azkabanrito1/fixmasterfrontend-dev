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

const RatingBonusModal = ({
  isOpen,
  closeModal,
  heading,
  action,
  isLoading,
  actionText,
  activeData,
}) => {
  const onSubmit = () => {
    const bonusTypes = BonusTypeData?.find((bonus) =>
      values.bonusType.includes(bonus.name)
    );
    const valueTypes = valueTypeData?.find((type) =>
      values.valueType.includes(type.name)
    );
    const selectedStatus = ratingStatus?.find((status) =>
      values.status.includes(status.name)
    );



    const payload = {
      roleId: collabRole[0]?.id,
      bonusValue: +values.bonusValue,
      bonusType: bonusTypes?.id,
      valueType: valueTypes?.id,
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
      valueType: "",
      bonusType: "",
      bonusValue: "",
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

      setFieldValue("bonusValue", activeData?.bonusValue);

      setFieldValue("bonusType", activeData?.bonusType);
      const bonus = BonusTypeData?.find(
        (data) => data.name === activeData?.bonusType
      );
      console.log(bonus)
      setFieldValue("valueType", activeData?.valueType);
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
            <GlobalSelect
              labelText="Bonus Type"
              selectName="bonusType"
              selectValue={values.bonusType}
              handleBlur={handleBlur}
              valueType="string"
              handleChange={handleChange}
              options={BonusTypeData}
              defaultOption={"Select Bonus Type"}
              error={errors.bonusType && touched.bonusType}
              errorMessage={errors.bonusType}
              required={true}
              disabled={values.bonusType === BonusTypeData}
            />
            <GlobalSelect
              labelText="Value Type"
              selectName="valueType"
              valueType="string"
              selectValue={values.valueType}
              handleBlur={handleBlur}
              handleChange={handleChange}
              options={valueTypeData}
              defaultOption={"Select Value Type"}
              error={errors.valueType && touched.valueType}
              errorMessage={errors.valueType}
              required={true}
              disabled={values.valueType === valueTypeData}
            />

            <GlobalInput
              labelText="Bonus Value"
              inputType="bonusValue"
              inputName="bonusValue"
              inputValue={values.bonusValue}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.bonusValue && touched.bonusValue}
              errorMessage={errors.bonusValue}
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

export default RatingBonusModal;
