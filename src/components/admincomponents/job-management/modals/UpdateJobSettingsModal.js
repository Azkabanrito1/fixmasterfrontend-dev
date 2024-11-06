import styled from "styled-components";
import GlobalInput from "../../../globalcomponents/GlobalInput";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import { useFormik } from "formik";
import { jobSettingSchema } from "../../../../Validations/JobSettingValidation";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import { useSnackbar } from "notistack";
import { useUpdateJobSettings } from "../../../../hooks/useQueries/useAdmin";
import { Fields, FormGroup } from "../../../globalcomponents/Utilities";

const UpdateJobSettingsModal = ({ activeId, open, close, data, heading }) => {
  const onSubmit = async () => {
    const payload = {
      id: activeId,
      techMaxDist: values.techMaxDist,
      jobAdvWaitTime: values.jobAdvWaitTime,
      jobAdvEscTime: values.jobAdvEscTime,
      rfqAdvWaitTimeLV1: values.rfqAdvWaitTimeLV1,
      rfqAdvWaitTimeLV2: values.rfqAdvWaitTimeLV2,
      rfqAdvWaitTimeLV3: values.rfqAdvWaitTimeLV3,
      jobPrtyMinRating: values.jobPrtyMinRating,
      rfqPrtyMinRating: values.rfqPrtyMinRating,
      supplierMaxDistance: values.supplierMaxDistance,
    };
    submitPayload(payload);
  };

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        id: activeId,
        techMaxDist: data.techMaxDist,
        jobAdvWaitTime: data.jobAdvWaitTime,
        jobAdvEscTime: data.jobAdvEscTime,
        rfqAdvWaitTimeLV1: data.rfqAdvWaitTimeLV1,
        rfqAdvWaitTimeLV2: data.rfqAdvWaitTimeLV2,
        rfqAdvWaitTimeLV3: data.rfqAdvWaitTimeLV3,
        jobPrtyMinRating: data.jobPrtyMinRating,
        rfqPrtyMinRating: data.rfqPrtyMinRating,
        supplierMaxDistance: data.supplierMaxDistance,
      },
      validationSchema: jobSettingSchema,
      onSubmit,
    });

  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    close();
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };

  const { mutate: submitPayload, isLoading } = useUpdateJobSettings(
    onSuccess,
    onFailure
  );

  return (
    <GlobalModal isOpen={open} closeModal={close}>
      <AltModalHeader closeModal={close} heading={heading} />
      <form onSubmit={handleSubmit}>
        <Fields>
          <FormGroup columns="2">
            <GlobalInput
              labelText="Technician Maximum Distance (M)"
              inputType="number"
              width="100%"
              min={0}
              inputName="techMaxDist"
              inputValue={values.techMaxDist}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={touched.techMaxDist && errors.techMaxDist}
              errorMessage={errors.techMaxDist}
            />
            <GlobalInput
              labelText="Job Advert Wait Time (Hrs)"
              inputType="number"
              width="100%"
              inputName="jobAdvWaitTime"
              min={0}
              step="0.1"
              inputValue={values.jobAdvWaitTime}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={touched.jobAdvWaitTime && errors.jobAdvWaitTime}
              errorMessage={errors.jobAdvWaitTime}
            />

            <GlobalInput
              width="100%"
              labelText="Job Advert Escalation Time (Hrs)"
              inputType="number"
              inputName="jobAdvEscTime"
              min={0}
              step="0.1"
              inputValue={values.jobAdvEscTime}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={touched.jobAdvEscTime && errors.jobAdvEscTime}
              errorMessage={errors.jobAdvEscTime}
            />

            <GlobalInput
              labelText="RFQ Advert Wait Time Level 1 (Hrs)"
              inputType="number"
              width="100%"
              inputName="rfqAdvWaitTimeLV1"
              min={0}
              step="0.1"
              inputValue={values.rfqAdvWaitTimeLV1}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={touched.rfqAdvWaitTimeLV1 && errors.rfqAdvWaitTimeLV1}
              errorMessage={errors.rfqAdvWaitTimeLV1}
            />

            <GlobalInput
              labelText="RFQ Advert Wait Time Level 2 (Hrs)"
              inputType="number"
              width="100%"
              inputName="rfqAdvWaitTimeLV2"
              min={0}
              step="0.1"
              inputValue={values.rfqAdvWaitTimeLV2}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={touched.rfqAdvWaitTimeLV2 && errors.rfqAdvWaitTimeLV2}
              errorMessage={errors.rfqAdvWaitTimeLV2}
            />

            <GlobalInput
              width="100%"
              labelText="RFQ Advert Wait Time Level 3 (Hrs)"
              inputType="number"
              inputName="rfqAdvWaitTimeLV3"
              min={0}
              step="0.1"
              inputValue={values.rfqAdvWaitTimeLV3}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={touched.rfqAdvWaitTimeLV3 && errors.rfqAdvWaitTimeLV3}
              errorMessage={errors.rfqAdvWaitTimeLV3}
            />

            <GlobalInput
              labelText="Job Priority Mininimum Rating"
              inputType="number"
              inputName="jobPrtyMinRating"
              min={0}
              width="100%"
              inputValue={values.jobPrtyMinRating}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={touched.jobPrtyMinRating && errors.jobPrtyMinRating}
              errorMessage={errors.jobPrtyMinRating}
            />

            <GlobalInput
              labelText="RFQ Priority Minimum Rating"
              inputType="number"
              width="100%"
              inputName="rfqPrtyMinRating"
              min={0}
              inputValue={values.rfqPrtyMinRating}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={touched.rfqPrtyMinRating && errors.rfqPrtyMinRating}
              errorMessage={errors.rfqPrtyMinRating}
            />

            <GlobalInput
              width="100%"
              labelText="Supplier Maximum Distance (M)"
              inputType="number"
              inputName="supplierMaxDistance"
              min={0}
              inputValue={values.supplierMaxDistance}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={touched.supplierMaxDistance && errors.supplierMaxDistance}
              errorMessage={errors.supplierMaxDistance}
            />
          </FormGroup>
        </Fields>
        <GlobalBtn className="mx-auto m-3" type="submit" disabled={isLoading}>
          UPDATE
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};
export default UpdateJobSettingsModal;
