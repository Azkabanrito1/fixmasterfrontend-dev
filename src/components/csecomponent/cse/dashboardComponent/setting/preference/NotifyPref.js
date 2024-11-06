import { useFormik } from "formik";
import {
  Fields,
  FormGroup,
  SectionHeading,
} from "../../../../../globalcomponents/Utilities";
import { useEffect } from "react";
import GlobalBtn from "../../../../../globalcomponents/GlobalBtn";
import GlobalRadio from "../../../../../globalcomponents/GlobalRadio";
import { FieldError } from "../../../../../globalcomponents/GlobalInput";
import {
  answers,
  incomeData,
  notification,
} from "../../../../../../utils/selectOptions";

const NotifyPref = ({
  saveNotification,
  isSaving,
  notificationData,
  earning,
}) => {
  const onSubmit = async (values) => {
    const payload = {
      receiveNotice: +values.notificationPreference,
      trainingReminder: +values.traningNotify,
      supportRequest: 0,
      incomeNotice: earning ? +values.income : 0,
      timeFrom: "",
      timeTo: "",
      quoteBillNotice: 0,
    };
    saveNotification(payload);
  };

  const {
    values,
    handleBlur,
    handleChange,
    setFieldValue,
    handleSubmit,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      notificationPreference: "",
      traningNotify: "",
      income: "",
    },
    onSubmit,
  });

  useEffect(() => {
    if (notificationData) {
      setFieldValue("notificationPreference", notificationData?.receiveNotice);
      setFieldValue("traningNotify", notificationData?.trainingReminder);
      setFieldValue("income", notificationData?.incomeNotice);
    }
  }, [notificationData]);

  return (
    <section className="mt-5">
      <form onSubmit={handleSubmit}>
        <SectionHeading>Notification Preferences</SectionHeading>
        <Fields>
          <p className="fs-6 text-dark fw-bold">
            How do you want to receive notifications?
          </p>
          <FormGroup>
            <div>
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
                  checked={Number(values.notificationPreference) === notify.id}
                />
              ))}

              {errors.notificationPreference &&
                touched.notificationPreference && (
                  <FieldError>{errors.notificationPreference}</FieldError>
                )}
            </div>
          </FormGroup>
        </Fields>
        <Fields>
          <p className="fs-6 text-dark fw-bold">
            Do you wish to receive reminder notifications on scheduled training?
          </p>
          <FormGroup>
            <div>
              {answers.map((ans) => (
                <GlobalRadio
                  fs="1rem"
                  bRad="50%"
                  mb="1rem"
                  gap=".5rem"
                  key={ans.id}
                  inputName="traningNotify"
                  inputValue={ans.id}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  labelText={ans.name}
                  checked={Number(values.traningNotify) === ans.id}
                />
              ))}

              {errors.traningNotify && touched.traningNotify && (
                <FieldError>{errors.traningNotify}</FieldError>
              )}
            </div>
          </FormGroup>
        </Fields>
        {earning && (
          <Fields>
            <p className="fs-6 text-dark fw-bold">
              How do you want to receive income messages notifications?
            </p>
            <FormGroup>
              <div>
                {incomeData.map((income) => (
                  <GlobalRadio
                    fs="1rem"
                    bRad="50%"
                    mb="1rem"
                    gap=".5rem"
                    key={income.id}
                    inputName="income"
                    inputValue={income.id}
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    labelText={income.name}
                    checked={Number(values.income) === income.id}
                  />
                ))}

                {errors.income && touched.income && (
                  <FieldError>{errors.income}</FieldError>
                )}
              </div>
            </FormGroup>
          </Fields>
        )}
        <GlobalBtn
          className="m-auto mt-4"
          type="submit"
          disabled={!values.notificationPreference || !values.traningNotify}
        >
          {isSaving ? "Loading ...." : "Save"}
        </GlobalBtn>
      </form>
    </section>
  );
};

export default NotifyPref;
