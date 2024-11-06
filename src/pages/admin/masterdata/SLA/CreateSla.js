import GlobalBtn from "../../../../components/globalcomponents/GlobalBtn";
import GlobalInput from "../../../../components/globalcomponents/GlobalInput";
import {
  BackBtn,
  Fields,
  FormGroup,
  PageHeading,
} from "../../../../components/globalcomponents/Utilities";
import { useFormik } from "formik";
import { useCreateSla } from "../../../../hooks/useQueries/useAdmin";
import { useSnackbar } from "notistack";

const CreateSla = () => {
  const isLoading = false;
  const onSubmit = () => {
    const payload = {
      jobResponseTime: values.jobResponseTime,
      quoteResponseTime: values.quoteResponseTime,
      spareSupplyResponse: values.spareSupplyResponse,
      jobClosureRespose: values.jobClosureRespose,
      sla: values.sla,
    };

    createSla(payload);
  };

  const { handleSubmit, handleBlur, handleChange, errors, values, touched } =
    useFormik({
      initialValues: {
        jobResponseTime: 0,
        quoteResponseTime: 0,
        spareSupplyResponse: 0,
        jobClosureRespose: 0,
        sla: "",
      },
      onSubmit,
      //   validationSchema: createQuotationSetting,
    });

  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };

  const { mutate: createSla } = useCreateSla(onSuccess, onFailure);

  return (
    <>
      <div
        style={{
          marginBottom: "2rem",
        }}
      >
        <BackBtn />
        <PageHeading className="text-capitalize me-auto mx-auto">
          Create SLA Parameters
        </PageHeading>
      </div>

      <form onSubmit={handleSubmit}>
        <Fields>
          <FormGroup columns="2">
            <GlobalInput
              labelText="Job Response Time"
              inputName="jobResponseTime"
              inputValue={values.jobResponseTime}
              inputType="number"
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.jobResponseTime && touched.jobResponseTime}
              errorMessage={errors.jobResponseTime}
              min={1}
              required
            />
            <GlobalInput
              labelText="Job Closure Response"
              inputName="jobClosureRespose"
              inputValue={values.jobClosureRespose}
              inputType="number"
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.jobClosureRespose && touched.jobClosureRespose}
              errorMessage={errors.jobClosureRespose}
              min={1}
              required
            />
            <GlobalInput
              labelText="Quote Response Time"
              inputName="quoteResponseTime"
              inputValue={values.quoteResponseTime}
              inputType="number"
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.quoteResponseTime && touched.quoteResponseTime}
              errorMessage={errors.quoteResponseTime}
              min={1}
              required
            />
            <GlobalInput
              labelText="Spare Supply Response"
              inputName="spareSupplyResponse"
              inputValue={values.spareSupplyResponse}
              inputType="number"
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.spareSupplyResponse && touched.spareSupplyResponse}
              errorMessage={errors.spareSupplyResponse}
              min={1}
              required
            />
            <GlobalInput
              labelText="SLA"
              inputName="sla"
              inputValue={values.sla}
              inputType="text"
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.sla && touched.sla}
              errorMessage={errors.sla}
              required
            />
          </FormGroup>
        </Fields>

        <GlobalBtn
          type="submit"
          mx="auto"
          px="2rem"
          width="max-content"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Create SLA Parameters"}
        </GlobalBtn>
      </form>
    </>
  );
};
export default CreateSla;
