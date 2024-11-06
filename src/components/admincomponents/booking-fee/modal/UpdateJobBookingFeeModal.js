import GlobalInput from "../../../globalcomponents/GlobalInput";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { useUpdateJobBookingFee } from "../../../../hooks/useQueries/useAdmin";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import {
  useGetBookingType,
  useGetFixCategories,
  useGetFixClass,
} from "../../../../hooks/useQueries/useJobs";
import GlobalSelect from "../../../globalcomponents/GlobalSelect";
import { Fields, FormGroup } from "../../../globalcomponents/Utilities";
import { jobBookingFeeValidation } from "../../../../Validations/JobBookingFeeValidation";

const UpdateJobBookingFee = ({ open, close, activeId, data }) => {
  const { data: bookingType } = useGetBookingType();
  const { data: fixCategory } = useGetFixCategories();
  const { data: fixClass } = useGetFixClass();
  const onSubmit = () => {
    const payload = {
      id: activeId,
      fixClass: values.fixClass,
      fixType: values.fixType,
      fixCategory: values.fixCategory,
      applicableFee: values.applicableFee,
    };
    updateSettings(payload);
  };

  const { handleSubmit, handleBlur, handleChange, errors, values, touched } =
    useFormik({
      initialValues: {
        fixClass: data.fixClass,
        fixType: data.fixType,
        fixCategory: data.fixCategory,
        applicableFee: data.applicableFee,
      },
      onSubmit,
      validationSchema: jobBookingFeeValidation,
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

  const { mutate: updateSettings } = useUpdateJobBookingFee(
    onSuccess,
    onFailure
  );

  return (
    <>
      <GlobalModal isOpen={open} closeModal={close} width="">
        <AltModalHeader closeModal={close} heading="Job Booking Fee" />
        <form onSubmit={handleSubmit}>
          <Fields>
            <FormGroup columns="2">
              <GlobalSelect
                labelText="Job Fix Class"
                selectValue={values.fixClass}
                selectName="fixClass"
                options={fixClass?.data}
                inputValue={values.fixClass}
                handleBlur={handleBlur}
                handleChange={handleChange}
                error={errors.fixClass && touched.fixClass}
                errorMessage={errors.fixClass}
                required={true}
              />
              <GlobalSelect
                labelText="Job Fix Type"
                selectValue={values.fixType}
                selectName="fixType"
                options={bookingType?.data}
                inputValue={values.fixType}
                handleBlur={handleBlur}
                handleChange={handleChange}
                error={errors.fixType && touched.fixType}
                errorMessage={errors.fixType}
                required={true}
              />
              <GlobalSelect
                labelText="Job Fix Category"
                selectValue={values.fixCategory}
                selectName="fixCategory"
                options={fixCategory?.data}
                inputValue={values.fixCategory}
                handleBlur={handleBlur}
                handleChange={handleChange}
                error={errors.fixCategory && touched.fixCategory}
                errorMessage={errors.fixCategory}
                required={true}
              />
              <GlobalInput
                labelText="Applicable Fee"
                inputName="applicableFee"
                inputValue={values.applicableFee}
                inputType="number"
                handleBlur={handleBlur}
                handleChange={handleChange}
                error={errors.applicableFee && touched.applicableFee}
                errorMessage={errors.applicableFee}
                required={true}
                min={0}
              />
            </FormGroup>
          </Fields>
          <GlobalBtn type="submit" mx="auto" px="2rem" width="max-content">
            UPDATE
          </GlobalBtn>
        </form>
      </GlobalModal>
    </>
  );
};
export default UpdateJobBookingFee;
