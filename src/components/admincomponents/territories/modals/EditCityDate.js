import GlobalModal from "../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import { FormGroup } from "../../../globalcomponents/Utilities";
import GlobalInput from "../../../globalcomponents/GlobalInput";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import { getToday } from "../../../../utils/dateRanges";
import { useEffect } from "react";
import { useFormik } from "formik";
import { format } from "date-fns";

const EditCityEndDate = ({ isOpen, closeModal, cityDetails, editDate }) => {
  const onSubmit = () => {
    const payload = {
      recId: cityDetails.recId,
      endDate: values.end,
    };

    editDate(payload);
  };

  // console.log(cityDetails);

  const {
    errors,
    touched,
    handleBlur,
    values,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      end: "",
    },
    onSubmit,
  });

  useEffect(() => {
    if (!cityDetails.endDate) {
      setFieldValue("end", format(new Date(cityDetails.endDate), "yyyy-MM-dd"));
    }
  }, []);

  const today = getToday();

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader
        heading="Edit City End Date"
        closeModal={closeModal}
        mb="0"
      />
      <p className="mb-4 fs-5">
        Edit the end date of this city's exitence in this territory
      </p>

      <form onSubmit={handleSubmit}>
        <FormGroup className="mb-4" columns="2">
          <GlobalInput
            fullWidth={true}
            labelText="City"
            inputType="text"
            inputValue={cityDetails.cityName}
            readOnly
          />
          <GlobalInput
            inputType="date"
            labelText={"Start Date"}
            inputValue={format(new Date(cityDetails?.startDate), "yyyy-MM-dd")}
            disabled
          />
          <GlobalInput
            inputName="end"
            inputType="date"
            inputValue={values.end}
            labelText={"End Date"}
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={errors.end && touched.end}
            errorMessage={errors.end}
            min={today}
          />
        </FormGroup>

        <GlobalBtn mx="auto" type="submit">
          Edit
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default EditCityEndDate;
