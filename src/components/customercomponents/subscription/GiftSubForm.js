import { prefixes } from "../../../utils/selectOptions";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import GlobalInput from "../../globalcomponents/GlobalInput";
import GlobalPhoneInput from "../../globalcomponents/GlobalPhoneInput";
import GlobalSelect from "../../globalcomponents/GlobalSelect";
import GlobalTextArea from "../../globalcomponents/GlobalTextArea";
import { Fields, FormGroup } from "../../globalcomponents/Utilities";

const GiftSubForm = ({
  formikHandlers,
  phoneHandlers,
  subOptions,
  isLoading,
}) => {
  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = formikHandlers;
  const { selectedCountry, setSelectedCountry } = phoneHandlers;
  const defaultSub = subOptions?.filter(
    (sub) => sub.id === parseInt(values.subId)
  );

  return (
    <form onSubmit={handleSubmit}>
      <Fields>
        <legend className="fw-bold fs-5">Recipient's Name</legend>
        <p className="text-muted">
          Tell us who you would like to gift a subscription
        </p>
        <FormGroup columns="3">
          <GlobalSelect
            labelText={"Recipient’s Title"}
            selectName={"title"}
            selectValue={values.title}
            options={prefixes}
            valueType="string"
            defaultOption={"Select Title"}
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={errors.title && touched.title}
            errorMessage={errors.title}
            required={true}
          />

          <GlobalInput
            labelText={"Recipient’s First Name"}
            inputName={"firstName"}
            inputValue={values.firstName}
            inputPlaceholder={"First Name"}
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={errors.firstName && touched.firstName}
            errorMessage={errors.firstName}
            required={true}
          />

          <GlobalInput
            labelText={"Recipient’s Last Name"}
            inputName={"lastName"}
            inputValue={values.lastName}
            inputPlaceholder={"Last Name"}
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={errors.lastName && touched.lastName}
            errorMessage={errors.lastName}
            required={true}
          />
        </FormGroup>
      </Fields>

      <Fields>
        <legend className="fw-bold fs-5">Contact Details</legend>
        <p className="text-muted">Tell us how to contact them</p>
        <FormGroup columns="3">
          <GlobalInput
            labelText={"Recipient’s Email"}
            inputType="email"
            inputName={"email"}
            inputValue={values.email}
            inputPlaceholder={"jon@FixMaster.com"}
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={errors.email && touched.email}
            errorMessage={errors.email}
            required={true}
          />

          <GlobalPhoneInput
            labelText={"Recipient’s Phone Number"}
            inputName={"phoneNo"}
            inputValue={values.phoneNo}
            inputPlaceholder="803 000 0000"
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            handleBlur={handleBlur}
            handleChange={setFieldValue}
            error={errors.phoneNo && touched.phoneNo}
            errorMessage={errors.phoneNo}
            required={true}
          />
        </FormGroup>
      </Fields>

      <Fields>
        <legend className="fw-bold fs-5">Subscription Information</legend>
        <p className="text-muted">
          Select type of subscription and purpose of gift
        </p>
        <FormGroup columns="3">
          <GlobalSelect
            labelText={"Subscription Type"}
            defaultOption={defaultSub?.[0]?.name || "Select a subscription"}
            selectName={"subId"}
            selectValue={values.subId}
            options={subOptions}
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={errors.subId && touched.subId}
            errorMessage={errors.subId}
            required={true}
          />
          <GlobalInput
            labelText={"Purpose"}
            inputName={"purpose"}
            inputValue={values.purpose}
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={errors.purpose && touched.purpose}
            errorMessage={errors.purpose}
          />
        </FormGroup>
      </Fields>

      <Fields>
        <legend className="fw-bold fs-5">Add Gift Message</legend>
        <FormGroup columns="2">
          <GlobalTextArea
            labelText={"Message"}
            inputName={"message"}
            inputValue={values.message}
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={errors.message && touched.message}
            errorMessage={errors.message}
          />
        </FormGroup>
      </Fields>

      <GlobalBtn
        disabled={isLoading}
        type="submit"
        mx="auto"
        px="2.5rem"
        width="max-content"
      >
        Proceed
      </GlobalBtn>
    </form>
  );
};

export default GiftSubForm;
