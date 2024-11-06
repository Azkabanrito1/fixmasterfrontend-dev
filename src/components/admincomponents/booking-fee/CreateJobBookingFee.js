import { useSnackbar } from "notistack";
import {
  BackBtn,
  Fields,
  FormGroup,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import { useNavigate } from "react-router-dom";
import { PATH_ADMIN } from "../../../routes/paths";
import { useFormik } from "formik";
import GlobalSelect from "../../globalcomponents/GlobalSelect";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import GlobalInput from "../../globalcomponents/GlobalInput";
import { useCreateJobBookingFee } from "../../../hooks/useQueries/useAdmin";
import {
  useGetBookingType,
  useGetFixCategories,
  useGetFixClass,
} from "../../../hooks/useQueries/useJobs";
import { jobBookingFeeValidation } from "../../../Validations/JobBookingFeeValidation";

const CreateJobBookingFee = () => {
  const { data: bookingType } = useGetBookingType();
  const { data: fixCategory } = useGetFixCategories();
  const { data: fixClass } = useGetFixClass();

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const onSubmit = () => {
    const payload = {
      fixClass: values.fixClass,
      fixType: values.fixType,
      fixCategory: values.fixCategory,
      applicableFee: values.applicableFee,
    };

    createBookingFee(payload);
  };

  const { handleSubmit, handleBlur, handleChange, errors, values, touched } =
    useFormik({
      initialValues: {
        fixClass: 0,
        fixCategory: 0,
        fixType: 0,
        applicableFee: 0,
      },
      onSubmit,
        validationSchema: jobBookingFeeValidation,
    });

  const onCreateSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    navigate(PATH_ADMIN.bookingFee);
  };
  const onCreateFailure = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };

  const { mutate: createBookingFee } = useCreateJobBookingFee(
    onCreateFailure,
    onCreateSuccess
  );

  return (
    <>
      <div className="mb-5">
        <BackBtn />
        <PageHeading>Create Job Booking Fee</PageHeading>
      </div>
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
          Create Booking Fee
        </GlobalBtn>
      </form>
    </>
  );
};

export default CreateJobBookingFee;
