import { useEffect, useState } from "react";
import { useFormik } from "formik";
import GlobalModal from "../../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../../layouts/modal/AltModalHeader";
import GlobalBtn from "../../../../globalcomponents/GlobalBtn";
import { AsYouType } from "libphonenumber-js";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { addressSchema } from "../../../../../Validations/serviceAddressValidation";

// from bookafix
import AddAddress from "../../../BookaFix/AddNewAddressForm";
import { useGetAddressDetailsById } from "../../../../../hooks/useQueries/useIdentity";

const EditAddress = ({ activeAddressId, isOpen, closeModal, editAddress }) => {
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+234",
    abbr: "NG",
  });

  const { data: addressData } = useGetAddressDetailsById(activeAddressId);
  const address = addressData?.data;

  useEffect(() => {
    const contactPhoneNo = new AsYouType();
    if (address) {
      const {
        name,
        state,
        localGoverment,
        city,
        cityId,
        location_name,
        street_name,
        house_number,
        addressLandmark,
        contact_email,
        contact_name,
        contact_phone,
      } = address[0];

      setFieldValue("addressTitle", name);
      setFieldValue("address", location_name);
      setFieldValue("landmark", addressLandmark);
      setFieldValue("state", state);
      setFieldValue("lga", localGoverment);
      setFieldValue("city", city);
      setFieldValue("cityId", cityId);
      setFieldValue("streetName", street_name);
      setFieldValue("houseNumber", house_number);
      setFieldValue("contactName", contact_name);
      setFieldValue("contactEmail", contact_email);

      if (contact_phone) {
        contactPhoneNo.input(contact_phone);
        const countryAbbr = contactPhoneNo?.getCountry();
        const countryCode = contactPhoneNo?.getCallingCode();
        const phoneNo = contactPhoneNo
          ?.getNumber()
          ?.number.replace("+" + countryCode, "");
        setSelectedCountry({
          code: countryCode,
          abbr: countryAbbr,
        });
        setFieldValue("contactPhoneNo", phoneNo);
      }
    }
  }, [address]);

  const onSubmit = async () => {
    const payload = {
      address: values.address,
      addressId: address[0].id,
      addressCityId: values.cityId,
      addressLandMark: values.landmark || "",
      location: values.address,
      addressTitle: values.addressTitle,
      houseNumber: values.houseNumber,
      streetName: values.streetName,
      contactName: values.contactName,
      contactEmail: values.contactEmail,
      contactPhone: `${selectedCountry.code}${values.contactPhoneNo}`,
      isDefault: values.isDefault,
    };

    editAddress(payload);
  };

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleBlur,
    handleChange,
    setFieldValue,
  } = useFormik({
    initialValues: {
      addressTitle: "",
      address: "",
      state: "",
      lga: "",
      city: "",
      cityId: "",
      estate: "",
      streetName: "",
      houseNumber: "",
      location: "",
      landmark: "",
      contactName: "",
      contactEmail: "",
      contactPhoneNo: "",
      isDefault: false,
    },
    onSubmit,
    validationSchema: addressSchema,
  });

  const formikHandlers = {
    errors,
    touched,
    values,
    handleBlur,
    handleChange,
    setFieldValue,
  };

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader heading={"Edit Address"} closeModal={closeModal} />
      <form onSubmit={handleSubmit}>
        <AddAddress
          formikHandlers={formikHandlers}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          location={"service location"}
        />

        <FormGroup sx={{ marginBlockEnd: 3 }}>
          <FormControlLabel
            control={<Switch name="isDefault" onChange={handleChange} />}
            label="Set as default"
          />
        </FormGroup>

        <GlobalBtn mx="auto" width="max-content" px="2.5rem" type="submit">
          Update Address
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default EditAddress;
