import React, { Fragment, useEffect } from "react";
import GlobalModal from "../../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../../layouts/modal/AltModalHeader";
import GlobalInput from "../../../../globalcomponents/GlobalInput";
import {
  Fields,
  FormGroup,
  GroupHeading,
} from "../../../../globalcomponents/Utilities";
import GlobalBtn from "../../../../globalcomponents/GlobalBtn";
import { useFormik } from "formik";
import { useGetEmploymentType } from "../../../../../hooks/useQueries/useAdmin";

const JobEarningsModal = ({
  isOpen,
  closeModal,
  header,
  collaborator,
  action,
  loading,
  data,
  actionText,
}) => {
  const { data: employmentTypeData } = useGetEmploymentType();

  const onSubmit = async () => {
    const payload = {
      earnings: values.earnings,
      employmentType: employmentTypeData?.data?.[0]?.id,
      markup: values.markup,
    };
    action(payload);
  };
  const { values, handleChange, handleBlur, setFieldValue, handleSubmit } =
    useFormik({
      initialValues: {
        earnings: "",
        employmentType: "",
        markup: "",
      },
      onSubmit,
    });

  useEffect(() => {
    if (
      (employmentTypeData?.data?.length > 0 && collaborator === "Franchisee") ||
      collaborator === "Qa Master"
    ) {
      setFieldValue("employmentType", employmentTypeData?.data[0]?.name);
      if (data) {
        setFieldValue("earnings", data?.amount);
        setFieldValue("markup", data?.markup);
      }
    }
  }, [employmentTypeData, setFieldValue, data]);

  const validateNumber = () => {
    if (values.earnings > 100) {
      values.earnings = 100;
    } else if (values.earnings < 1) {
      values.earnings = 1;
    }
  };

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader heading={header} closeModal={closeModal} />
      <form onSubmit={handleSubmit}>
        {(collaborator === "Franchisee" ||
          collaborator === "Qa Master" ||
          collaborator === "Call center") && (
          <>
            <Fields>
              <FormGroup columns="2">
                <GlobalInput
                  labelText="Earning value %"
                  name="earnings"
                  inputValue={values.earnings}
                  handleChange={handleChange}
                  inputPlaceholder="Enter earning in percentage"
                  handleBlur={handleBlur}
                  min="1"
                  max="100"
                  step="1"
                  inputType="number"
                  onInput={validateNumber}
                  required
                />

                <GlobalInput
                  labelText="Employment Type"
                  name="employmentType"
                  inputValue={values.employmentType}
                  handleChange={handleChange}
                  inputPlaceholder="Enter EmploymentType"
                  handleBlur={handleBlur}
                  disabled={true}
                  required
                />
                <GlobalInput
                  labelText="Markup %"
                  name="markup"
                  inputValue={values.markup}
                  handleChange={handleChange}
                  inputPlaceholder="Enter markup %"
                  min="1"
                  max="100"
                  step="1"
                  inputType="number"
                  onInput={validateNumber}
                  handleBlur={handleBlur}
                  required
                />
              </FormGroup>
            </Fields>
          </>
        )}

        <GlobalBtn type="submit" className="mt-3 m-auto">
          {loading ? "Loading..." : actionText}
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default JobEarningsModal;
