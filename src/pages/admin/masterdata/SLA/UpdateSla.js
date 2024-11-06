import { useSnackbar } from "notistack";
import GlobalBtn from "../../../../components/globalcomponents/GlobalBtn";
import GlobalInput from "../../../../components/globalcomponents/GlobalInput";
import GlobalModal from "../../../../components/globalcomponents/GlobalModal";
import AltModalHeader from "../../../../components/layouts/modal/AltModalHeader";
import { useUpdateSla } from "../../../../hooks/useQueries/useAdmin";
import { useFormik } from "formik";
import styled from "styled-components";

const UpdateSla = ({ open, close, activeId }) => {
  const onSubmit = () => {
    const payload = {
      id: activeId,
      jobResponseTime: values.jobResponseTime,
      quoteResponseTime: values.quoteResponseTime,
      spareSupplyResponse: values.spareSupplyResponse,
      jobClosureRespose: values.jobClosureRespose,
      sla: values.sla,
    };
    updateSla(payload);
  };

  const { handleSubmit, handleBlur, handleChange, errors, values, touched } =
    useFormik({
      initialValues: {
        id: activeId,
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
    close();
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };

  const { mutate: updateSla } = useUpdateSla(onSuccess, onFailure);

  return (
    <>
      <GlobalModal isOpen={open} closeModal={close} width="">
        <AltModalHeader closeModal={close} />
        <form onSubmit={handleSubmit}>
          <Container>
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
          </Container>
          <GlobalBtn
            className="mx-auto"
            type="submit"
            width="max-content"
            height="70px"
            px="2rem"
          >
            UPDATE
          </GlobalBtn>
        </form>
      </GlobalModal>
    </>
  );
};
export default UpdateSla;

const Container = styled.div`
  width: 100%;
  margin-bottom: 50px;
  column-gap: 30px;
  row-gap: 50px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;
