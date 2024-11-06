import Collapsible from "react-collapsible";
import { StyledCollapsible } from "./BookingInfo";
import GlobalInput, { FieldError } from "../../globalcomponents/GlobalInput";
import { Fields, FormGroup } from "../../globalcomponents/Utilities";
import GlobalRadio from "../../globalcomponents/GlobalRadio";
import { useGetPreferenceMaster } from "../../../hooks/useQueries/useAdmin";

const ContactPreferences = ({ formikHandlers, fixDetails }) => {
  const { values, errors, touched, handleChange, handleBlur } = formikHandlers;

  //-------------------------------------------------data fetching---------------------------------------
  const { data: contactPrefData } = useGetPreferenceMaster();

  return (
    <>
      <Collapsible
        trigger={
          <StyledCollapsible className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h3 className="heading">Contact Preferences</h3>
              <p className="sub-heading">
                Tell us who we communicate with for the fix and how
              </p>
            </div>
            <i className="fas fa-chevron-right collapsible-icon"></i>
          </StyledCollapsible>
        }
      >
        <div className="px-4">
          <h4
            style={{
              marginBottom: "8px",
              fontSize: "1.2rem",
              fontWeight: 600,
            }}
          >
            Fix Contact Person and Account Holder
          </h4>
          <p
            style={{
              marginBottom: "8px",
              fontSize: "0.9rem",
            }}
          >
            Select applicable statement
          </p>
          <Fields>
            <div className="mb-4">
              {contactPrefData?.data?.map((preference) => (
                <GlobalRadio
                  fs="1rem"
                  bRad="50%"
                  mb="1rem"
                  gap=".5rem"
                  key={preference.id}
                  inputName="contactPreference.contactPreferenceId"
                  inputValue={preference.id}
                  checked={
                    Number(values.contactPreference?.contactPreferenceId) ===
                    preference.id
                  }
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  labelText={preference.name}
                />
              ))}

              {errors.contactPreference?.contactPreferenceId &&
                touched.contactPreference?.contactPreferenceId && (
                  <FieldError>
                    {errors.contactPreference?.contactPreferenceId}
                  </FieldError>
                )}
            </div>

            <p>Please specify your preferred time for voice calls</p>
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
                  inputName="contactPreference.contactFrom"
                  inputValue={values.contactPreference.contactFrom}
                  labelText="From"
                  labelColor="var(--clr-primary)"
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  error={
                    errors.contactPreference?.contactFrom &&
                    touched.contactPreference?.contactFrom
                  }
                  errorMessage={errors.contactPreference?.contactFrom}
                  required={true}
                />
                <div className="text-center">
                  <img src="/images/arrows-exchange-alt.png" alt="" />
                </div>
                <GlobalInput
                  inputType="time"
                  inputName="contactPreference.contactTo"
                  inputValue={values.contactPreference.contactTo}
                  labelText="To"
                  labelColor="var(--clr-primary)"
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  error={
                    errors.contactPreference?.contactTo &&
                    touched.contactPreference?.contactTo
                  }
                  errorMessage={errors.contactPreference?.contactTo}
                  required={true}
                />
              </div>
            </FormGroup>
          </Fields>
          <h4
            style={{
              marginBottom: "8px",
              fontSize: "1.2rem",
              fontWeight: 600,
            }}
          >
            Notifications
          </h4>
          <p
            style={{
              marginBottom: "8px",
              fontSize: "0.9rem",
            }}
          >
            How do you want to receive quotation notifications
          </p>
          <Fields>
            <FormGroup>
              <GlobalRadio
                fs="1rem"
                bRad="50%"
                mb="1rem"
                gap=".5rem"
                inputName="contactPreference.notificationPreferenceId"
                inputValue={0}
                handleBlur={handleBlur}
                handleChange={handleChange}
                labelText="Send all quotation to both the account holder and fix contact person"
                checked={
                  values.contactPreference?.notificationPreferenceId !== "" &&
                  Number(values.contactPreference?.notificationPreferenceId) ===
                    0
                }
              />

              {errors.contactPreference?.notificationPreferenceId &&
                touched.contactPreference?.notificationPreferenceId && (
                  <FieldError>
                    {errors.contactPreference?.notificationPreferenceId}
                  </FieldError>
                )}

              <GlobalRadio
                fs="1rem"
                bRad="50%"
                mb="1rem"
                gap=".5rem"
                width="fit-content"
                inputName="contactPreference.notificationPreferenceId"
                inputValue={1}
                handleBlur={handleBlur}
                handleChange={handleChange}
                checked={
                  values.contactPreference?.notificationPreferenceId !== "" &&
                  Number(values.contactPreference?.notificationPreferenceId) ===
                    1
                }
                labelText="Send quotation and billing notifications to the account holder only; All other notifications will be sent to the fix contact person"
              />

              {errors.contactPreference?.notificationPreferenceId &&
                touched.contactPreference?.notificationPreferenceId && (
                  <FieldError>
                    {errors.contactPreference?.notificationPreferenceId}
                  </FieldError>
                )}
            </FormGroup>
          </Fields>
        </div>
      </Collapsible>
    </>
  );
};

export default ContactPreferences;
