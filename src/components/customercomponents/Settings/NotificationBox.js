import { FormGroup } from "react-bootstrap";
import { Fields, SectionHeading } from "../../globalcomponents/Utilities";
import GlobalRadio from "../../globalcomponents/GlobalRadio";
import GlobalInput, { FieldError } from "../../globalcomponents/GlobalInput";
import { useFormik } from "formik";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import { useEffect } from "react";
import { billNotifications, notification } from "../../../utils/selectOptions";

const NotificationBox = ({ saveNotification, isSaving, preferences }) => {
  const onSubmit = (values) => {
    const payload = {
      receiveNotice: +values.notificationPreference,
      timeFrom: values.contactFrom,
      timeTo: values.contactTo,
      trainingReminder: 0,
      supportRequest: 0,
      incomeNotice: 0,
      quoteBillNotice: +values.billNotice,
    };
    saveNotification(payload);
  };

  const formik = useFormik({
    initialValues: {
      notificationPreference: "",
      contactFrom: "",
      contactTo: "",
      billNotice: "",
    },
    onSubmit,
  });

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = formik;

  useEffect(() => {
    if (preferences) {
      setFieldValue("contactFrom", preferences.timeFrom);
      setFieldValue("contactTo", preferences.timeTo);
      setFieldValue("notificationPreference", preferences.receiveNotice);
      setFieldValue("billNotice", preferences.quoteBillNotice);
    }
  }, [preferences, setFieldValue]);

  console.log(preferences);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <section>
          <SectionHeading>Notifications</SectionHeading>

          <Fields>
            <p className="fs-6 text-dark fw-bold">
              How do you want to receive quotation notifications?
            </p>
            <FormGroup>
              {billNotifications.map((bill) => (
                <GlobalRadio
                  fs="1rem"
                  bRad="50%"
                  mb="1rem"
                  gap=".5rem"
                  key={bill.id}
                  inputName="billNotice"
                  inputValue={bill.id}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  labelText={bill.name}
                  checked={
                    values.billNotice !== "" &&
                    Number(values.billNotice) === bill.id
                  }
                />
              ))}
              {errors.billNotice && touched.billNotice && (
                <FieldError>{errors.billNotice}</FieldError>
              )}
            </FormGroup>
          </Fields>

          <Fields>
            <p className="fs-6 text-dark fw-bold">
              How do you want to receive notifications?
            </p>
            <FormGroup>
              {notification.map((notify) => (
                <GlobalRadio
                  fs="1rem"
                  bRad="50%"
                  mb="1rem"
                  gap=".5rem"
                  key={notify.id}
                  inputName="notificationPreference"
                  inputValue={notify.id}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  labelText={notify.name}
                  checked={
                    values.notificationPreference !== "" &&
                    Number(values.notificationPreference) === notify.id
                  }
                />
              ))}
              {errors.notificationPreference &&
                touched.notificationPreference && (
                  <FieldError>{errors.notificationPreference}</FieldError>
                )}
            </FormGroup>
          </Fields>

          <Fields>
            <p className="fs-6 text-dark fw-bold">
              Please specify your preferred call timing
            </p>
            <FormGroup columns="2">
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 2fr",
                  alignItems: "end",
                }}
              >
                <GlobalInput
                  inputType="time"
                  inputName="contactFrom"
                  inputValue={values.contactFrom}
                  labelText="From"
                  labelColor="var(--clr-primary)"
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  error={errors.contactFrom && touched.contactFrom}
                  errorMessage={errors.contactFrom}
                  required
                />
                <div className="text-center">
                  <img src="/images/arrows-exchange-alt.png" alt="" />
                </div>
                <GlobalInput
                  inputType="time"
                  inputName="contactTo"
                  inputValue={values.contactTo}
                  labelText="To"
                  labelColor="var(--clr-primary)"
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  error={errors.contactTo && touched.contactTo}
                  errorMessage={errors.contactTo}
                  min={values.contactFrom}
                  required
                />
              </div>
            </FormGroup>
          </Fields>
        </section>

        <GlobalBtn
          mx="auto"
          width="max-width"
          type="submit"
          px="2.5rem"
          disabled={
            !values.notificationPreference ||
            !values.contactFrom ||
            !values.contactTo ||
            !values.billNotice
          }
        >
          {isSaving ? "Loading..." : "Save"}
        </GlobalBtn>
      </form>
    </div>
  );
};

export default NotificationBox;
