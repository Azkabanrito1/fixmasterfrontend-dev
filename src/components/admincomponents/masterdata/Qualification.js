import { useEffect } from "react";
import GlobalInput from "../../globalcomponents/GlobalInput";
import GlobalModal from "../../globalcomponents/GlobalModal";
import {
  Fields,
  FormGroup,
  GroupHeading,
} from "../../globalcomponents/Utilities";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import { useFormik } from "formik";
import { format, formatISO } from "date-fns";

const Qualification = ({
  isOpen,
  closeModal,
  heading,
  isCreating,
  submit,
  data,
  lText,
  lPlaceHolder,
  service = false,
  actionText,
  booking,
  width,
  description,
}) => {
  const onSubmit = (values) => {
    const payload = {
      longName: values.longName,
      description: values.description,
      sla: values.sla,
      startTime: values.startTime,
      endTime: values.endTime,
      bookingFee: +values.bookingFee,
      labour: +values.labour,
      bookingFeeStartDate: values.bookingFeeStartDate,
      bookingFeeEndDate: values.bookingFeeEndDate,
      labourStartDate: values.labourStartDate,
      labourEndDate: values.labourEndDate,
      escalationTime: values?.escalationTime,
    };
    submit(payload);
  };

  const { values, handleChange, handleSubmit, setFieldValue, errors, touched } =
    useFormik({
      initialValues: {
        longName: "",
        shortName: "",
        sla: "",
        startTime: "",
        endTime: "",
        description: "",
        escalationTime: "",
        bookingFee: "",
        bookingFeeStartDate: "",
        bookingFeeEndDate: "",
        labour: "",
        labourStartDate: "",
        labourEndDate: "",
      },
      onSubmit,
    });

  // const formatSla = (sla) => {
  //   const slaWithoutColons = sla?.replace(/:/g, "")?.slice(0, 2);
  //   const slaNumber = Number(slaWithoutColons).toFixed(1);
  //   return String(slaNumber);
  // };

  useEffect(() => {
    if (!!data || !!booking) {
      setFieldValue("longName", data?.longName || booking?.name);
      setFieldValue("description", data?.description || booking?.description);
      setFieldValue("sla", data?.sla);
      if (data) {
        setFieldValue("startTime", data?.startTime);
        setFieldValue("endTime", data?.endTime);
        setFieldValue("escalationTime", data?.escalationTime);
        setFieldValue("labour", data?.labourPremium);
        setFieldValue("bookingFee", data?.bookingFeePremium);
        setFieldValue(
          "bookingFeeStartDate",
          new Date(data?.bookPremStartDate)?.toISOString()?.split("T")[0]
        );
        setFieldValue(
          "bookingFeeEndDate",
          new Date(data?.bookPremEndDate)?.toISOString()?.split("T")[0]
        );
        setFieldValue(
          "labourStartDate",
          new Date(data?.labPremStartDate)?.toISOString()?.split("T")[0]
        );
        setFieldValue(
          "labourEndDate",
          new Date(data?.labPremEndDate)?.toISOString()?.split("T")[0]
        );
      }
    }
  }, [data, booking, setFieldValue]);

  const formatTime = (time) => {
    let formattedTime = time.toString();
    if (formattedTime.includes(".")) {
      const [hours, minutes] = formattedTime.split(".");
      formattedTime = `${hours}:${minutes.padEnd(2, "0")}`;
    } else {
      formattedTime = `${formattedTime}:00`;
    }

    return formattedTime;
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal} width={width}>
      <AltModalHeader heading={heading} closeModal={closeModal} />
      <form onSubmit={handleSubmit}>
        <FormGroup columns="2">
          <GlobalInput
            name="longName"
            inputValue={values.longName}
            handleChange={handleChange}
            labelText={lText}
            inputPlaceholder={lPlaceHolder}
            required
            error={touched.longName && errors.longName}
            errorMessage={errors.longName}
          />
          {description && (
            <GlobalInput
              name="description"
              inputValue={values.description}
              handleChange={handleChange}
              labelText={description}
              inputPlaceholder="Give brief description"
              required
            />
          )}
          {service && (
            <>
              <GlobalInput
                name="sla"
                inputValue={values.sla}
                handleChange={handleChange}
                labelText="Service Level Agreement (min)"
                inputType="number"
                step={0.5}
                min={0}
                inputPlaceholder="Enter service level agreement"
                max={60}
                required
              />
              <GlobalInput
                name="startTime"
                inputValue={values.startTime}
                handleChange={handleChange}
                labelText="Start Time"
                inputType="time"
                required
              />
              <GlobalInput
                name="endTime"
                inputValue={values.endTime}
                handleChange={handleChange}
                labelText="End Time"
                inputType="time"
                required
              />
              <GlobalInput
                name="escalationTime"
                inputValue={values.escalationTime}
                handleChange={handleChange}
                labelText="Franchisee Escalation Time (min)"
                inputType="number"
                step={0.5}
                min={0}
                max={60}
                required
                inputPlaceholder="Enter Franchisee Escalation Time"
              />
            </>
          )}
        </FormGroup>
        {service && (
          <Fields className="mt-3">
            <GroupHeading>Premium</GroupHeading>
            <div className="description"> Booking</div>
            <FormGroup columns="2">
              <GlobalInput
                name="bookingFee"
                inputValue={values.bookingFee}
                handleChange={handleChange}
                labelText="Booking Fee %"
                inputType="number"
                inputPlaceholder="Enter Premium booking fee"
                required
              />
              <GlobalInput
                name="bookingFeeStartDate"
                inputValue={values.bookingFeeStartDate}
                handleChange={handleChange}
                labelText="Booking fee start date"
                inputType="date"
                min={today}
                required
              />
              <GlobalInput
                name="bookingFeeEndDate"
                inputValue={values.bookingFeeEndDate}
                handleChange={handleChange}
                labelText="Booking fee end date"
                inputType="date"
                min={today}
              />
            </FormGroup>
            <div className="description mt-3"> Labour</div>
            <FormGroup columns="2">
              <GlobalInput
                name="labour"
                inputValue={values.labour}
                handleChange={handleChange}
                labelText="Labour %"
                inputType="number"
                inputPlaceholder="Enter Premium labour fee"
                required
              />
              <GlobalInput
                name="labourStartDate"
                inputValue={values.labourStartDate}
                handleChange={handleChange}
                labelText="Labour start date"
                inputType="date"
                min={today}
                required
              />
              <GlobalInput
                name="labourEndDate"
                inputValue={values.labourEndDate}
                handleChange={handleChange}
                labelText="Labour end date"
                inputType="date"
                min={today}
              />
            </FormGroup>
          </Fields>
        )}
        <GlobalBtn type="submit" className="m-auto mt-3" disabled={isCreating}>
          {isCreating ? "Loading ...." : actionText}
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default Qualification;
