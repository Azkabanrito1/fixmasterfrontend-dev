import React, { useEffect } from "react";
import GlobalModal from "../../../components/globalcomponents/GlobalModal";
import AltModalHeader from "../../../components/layouts/modal/AltModalHeader";
import GlobalInput from "../../../components/globalcomponents/GlobalInput";
import {
  Fields,
  FormGroup,
} from "../../../components/globalcomponents/Utilities";
import { useFormik } from "formik";
import { validateNumber } from "../../../utils/utilityFxns";
import GlobalBtn from "../../../components/globalcomponents/GlobalBtn";
import {
  useGetCollaboratorInterval,
  useGetEmploymentType,
} from "../../../hooks/useQueries/useAdmin";
import GlobalSelect from "../../../components/globalcomponents/GlobalSelect";

const CseAndTechnicianEarningsModal = ({
  closeModal,
  isOpen,
  heading,
  isLoading,
  action,
  activeEarning,
  employment,
  activeContractEarning,
  activeFreelanceEarning,
  actionText,
}) => {
  //----------------------------------------------------------------data fetching--------------------------------
  const { data: employmentTypeData } = useGetEmploymentType();
  const { data: intervalData } = useGetCollaboratorInterval();

  const onSubmit = () => {
    const intervalValue = intervalData?.data.find((int) =>
      values?.interval?.includes(int.name)
    );
    const payload = {
      earnings: values.earnings,
      employmentType: employmentType?.[0]?.id,
      markup: values.markup,
      interval: +intervalValue?.id,
      warrantyRate: values.warrantyRate,
      diagnosticsRate: values.diagnosticsRate,
      fastTrackRate: values.fastTrackRate,
      completionRate: values.completionRate,
    };
    action(payload);
  };

  const { values, handleBlur, handleChange, setFieldValue, handleSubmit } =
    useFormik({
      initialValues: {
        earnings: "",
        employmentTypes: "",
        markup: "",
        interval: "",
        diagnosticsRate: "",
        warrantyRate: "",
        fastTrackRate: "",
        completionRate: "",
      },
      onSubmit,
    });

  const intervals = intervalData?.data.slice(0, 3);

  useEffect(() => {
    if (activeEarning) {
      setFieldValue(
        "employmentTypes",
        activeEarning.employmentType || employmentTypeData?.data[0]?.name
      );
      setFieldValue("earnings", activeEarning?.amount || "");
      setFieldValue("markup", activeEarning?.markup || "");
    } else if (employment === "contract" || activeContractEarning) {
      setFieldValue(
        "employmentTypes",
        activeContractEarning?.employmentType ||
          employmentTypeData?.data[1]?.name
      );
      setFieldValue("earnings", activeContractEarning?.amount || "");
      setFieldValue("markup", activeContractEarning?.markup || "");
      setFieldValue("interval", activeContractEarning?.interval || "");
    } else if (employment === "freelance" || activeFreelanceEarning) {
      setFieldValue(
        "employmentTypes",
        activeFreelanceEarning?.employmentType ||
          employmentTypeData?.data[2]?.name
      );
      setFieldValue("earnings", activeFreelanceEarning?.amount || "");
      setFieldValue("markup", activeFreelanceEarning?.markup || "");
      setFieldValue(
        "diagnosticsRate",
        activeFreelanceEarning?.diagnosticRate || ""
      );
      setFieldValue(
        "fastTrackRate",
        activeFreelanceEarning?.fastTrackRate || ""
      );
      setFieldValue("warrantyRate", activeFreelanceEarning?.warrantyRate || "");
      setFieldValue(
        "completionRate",
        activeFreelanceEarning?.completionRate || ""
      );
    } else {
      setFieldValue("employmentTypes", employmentTypeData?.data[0]?.name || "");
    }
  }, [
    employmentTypeData,
    setFieldValue,
    activeEarning,
    activeContractEarning,
    activeFreelanceEarning,
    employment,
  ]);

  const validateNumber = () => {
    if (values.earnings > 100) {
      values.earnings = 100;
    } else if (values.earnings < 1) {
      values.earnings = 1;
    }
  };
  const employmentType = employmentTypeData?.data?.filter((type) =>
    values.employmentTypes?.includes(type.name)
  );

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader heading={heading} closeModal={closeModal} />
      <form onSubmit={handleSubmit}>
        <Fields>
          <FormGroup columns="2">
            {employment === "freelance" ? (
              ""
            ) : (
              <GlobalInput
                labelText="Monthly Salary"
                name="earnings"
                inputValue={values.earnings}
                handleChange={handleChange}
                inputPlaceholder="Enter salary in flat rate"
                handleBlur={handleBlur}
                inputType="number"
                required
              />
            )}

            <GlobalInput
              labelText="Employment Type"
              name="employmentTypes"
              inputValue={values.employmentTypes}
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
            {activeContractEarning || employment === "contract" ? (
              <GlobalSelect
                labelText="Interval"
                selectName="interval"
                selectValue={values.interval}
                handleChange={handleChange}
                handleBlur={handleBlur}
                options={intervals}
                defaultOption="Select interval"
                valueType="string"
              />
            ) : null}

            {activeFreelanceEarning || employment === "freelance" ? (
              <>
                <GlobalInput
                  labelText="Diagnostic rate"
                  name="diagnosticsRate"
                  inputValue={values.diagnosticsRate}
                  handleChange={handleChange}
                  inputPlaceholder="Enter Diagnostics rate"
                  handleBlur={handleBlur}
                  inputType="number"
                  required
                />

                <GlobalInput
                  labelText="Warranty rate"
                  name="warrantyRate"
                  inputValue={values.warrantyRate}
                  handleChange={handleChange}
                  inputPlaceholder="Enter Warranty rate"
                  handleBlur={handleBlur}
                  inputType="number"
                  required
                />
                <GlobalInput
                  labelText="Completion rate"
                  name="completionRate"
                  inputValue={values.completionRate}
                  handleChange={handleChange}
                  inputPlaceholder="Enter completion rate"
                  handleBlur={handleBlur}
                  inputType="number"
                  required
                />
                <GlobalInput
                  labelText="Fast track rate"
                  name="fastTrackRate"
                  inputValue={values.fastTrackRate}
                  handleChange={handleChange}
                  inputPlaceholder="Enter fast track rate"
                  inputType="number"
                  onInput={validateNumber}
                  handleBlur={handleBlur}
                  required
                />
              </>
            ) : null}
          </FormGroup>
        </Fields>
        <GlobalBtn type="submit" className="mt-3 m-auto">
          {isLoading ? "Loading..." : actionText}
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default CseAndTechnicianEarningsModal;
