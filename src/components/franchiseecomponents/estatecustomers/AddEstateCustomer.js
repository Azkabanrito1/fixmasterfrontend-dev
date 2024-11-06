import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { BallBeat } from "react-pure-loaders";
import GlobalInput from "../../globalcomponents/GlobalInput";
import { createEstateCustomer } from "../../../redux/franchisee/actions";
import GlobalModal from "../../globalcomponents/GlobalModal";
import GlobalPhoneInput from "../../globalcomponents/GlobalPhoneInput";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import Logo from "../../globalcomponents/Logo";
import GlobalCheckbox from "../../globalcomponents/GlobalCheckbox";
import {
  PageHeading,
  FormGroup,
  Fields,
  GroupHeading,
} from "../../globalcomponents/Utilities";
import { useSnackbar } from "notistack";
import { CloseButton } from "../../layouts/modal/ModalComponents";

const AddEstateCustomer = ({ isOpen, closeModal }) => {
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+234",
    abbr: "NG",
  });

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { isLoading = false } = useSelector((state) => state.auth);

  const onSubmit = async () => {
    window.scrollTo(0, 0);

    const payload = {
      estateName: values.estateName,
      contactPerson: values.contactPerson,
      estateEmail: values.contactEmail,
      estatePhoneNumber: values.phoneNumber
        ? selectedCountry.code + values.phoneNumber
        : "",
      countryId: Number(values.country),
      stateId: Number(values.state),
      lgaId: Number(values.lga),
      cityId: Number(values.city),
      address: values.address,
      marginUplift: Number(values.marginUplift),
    };

    const response = await dispatch(createEstateCustomer(payload));
    if (response.status.toLowerCase() === "success") {
      enqueueSnackbar("Estate customer created", { variant: "success" });
      resetForm();
    } else
      enqueueSnackbar(`An error occurred: ${response.message}`, {
        variant: "error",
      });
  };

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleBlur,
    handleChange,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      estateName: "",
      contactPerson: "",
      contactEmail: "",
      phoneNumber: "",
      country: "",
      state: "",
      lga: "",
      city: "",
      address: "",
      marginUplift: "",
      notification: "",
    },
    onSubmit,
  });

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <div className="mb-5 text-center">
        <CloseButton onClick={closeModal}>Close</CloseButton>
        <Logo mx="auto" />
        <PageHeading>Estates Registration</PageHeading>
        <p>Kindly fill the form to register estates</p>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <BallBeat color="#ff6600" loading={isLoading} />
      </div>

      <form onSubmit={handleSubmit}>
        <Fields>
          <GroupHeading>Estate Information</GroupHeading>
          <FormGroup columns="2">
            <GlobalInput
              labelText="Estate Name*"
              inputType="text"
              inputName="estateName"
              inputValue={values.estateName}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.estateName && touched.estateName}
              errorMessage={errors.estateName}
            />
          </FormGroup>
        </Fields>

        <Fields>
          <GroupHeading>Estate Contact Information</GroupHeading>
          <FormGroup columns="2">
            <GlobalInput
              labelText="Contact Person*"
              inputType="text"
              inputName="contactPerson"
              inputValue={values.contactPerson}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.contactPerson && touched.contactPerson}
              errorMessage={errors.contactPerson}
            />

            <GlobalInput
              labelText="Estate Email*"
              inputType="email"
              inputName="contactEmail"
              inputPlaceholder="hello@FixMaster.com.ng"
              inputValue={values.contactEmail}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.contactEmail && touched.contactEmail}
              errorMessage={errors.contactEmail}
            />

            <GlobalPhoneInput
              labelText="Estate Phone Number*"
              inputType="tel"
              inputName="phoneNumber"
              inputPlaceholder="000 000 0000"
              inputValue={values.phoneNumber}
              handleBlur={handleBlur}
              handleChange={setFieldValue}
              error={errors.phoneNumber && touched.phoneNumber}
              errorMessage={errors.phoneNumber}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
            />
          </FormGroup>
        </Fields>

        <Fields>
          <GroupHeading>Estate Address Information</GroupHeading>
          <FormGroup columns="2">
            <GlobalInput
              fullWidth={true}
              labelText="Address*"
              inputType="text"
              inputName="address"
              inputValue={values.address}
              inputPlaceholder="Enter Address"
              errorMessage={errors.address}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.address && touched.address}
            />

            <GlobalInput
              labelText="State*"
              inputName="state"
              inputValue={values.state}
              handleBlur={handleBlur}
              handleChange={handleChange}
              errorMessage={errors.state}
              error={errors.state && touched.state}
            />

            <GlobalInput
              labelText="LGA*"
              inputName="lga"
              inputValue={values.lga}
              handleBlur={handleBlur}
              handleChange={handleChange}
              errorMessage={errors.lga}
              error={errors.lga && touched.lga}
            />

            <GlobalInput
              labelText="City*"
              inputName="city"
              inputValue={values.city}
              handleBlur={handleBlur}
              handleChange={handleChange}
              errorMessage={errors.city}
              error={errors.city && touched.city}
            />
          </FormGroup>
        </Fields>

        <Fields>
          <GroupHeading>Margin Uplift</GroupHeading>
          <FormGroup columns="2">
            <GlobalInput
              labelText="Margin Uplift %*"
              inputType="number"
              inputName="marginUplift"
              inputValue={values.marginUplift}
              inputPlaceholder="%"
              errorMessage={errors.marginUplift}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.marginUplift && touched.marginUplift}
            />
          </FormGroup>
        </Fields>

        <Fields>
          <GlobalCheckbox
            inputName="notification"
            inputValue={values.notification}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={touched.notification && errors.notification}
            errorMessage={errors.notification}
            labelText="Send notification to the customer with account details"
          />
        </Fields>

        <GlobalBtn
          width="100%"
          type="submit"
          disabled={Object.keys(errors).length > 0}
        >
          {isLoading ? "Loading..." : "Submit"}
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default AddEstateCustomer;
