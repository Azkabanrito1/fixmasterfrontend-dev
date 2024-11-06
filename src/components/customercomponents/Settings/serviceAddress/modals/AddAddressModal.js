import { useState } from "react";
import { useFormik } from "formik";
import GlobalModal from "../../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../../layouts/modal/AltModalHeader";
import GlobalBtn from "../../../../globalcomponents/GlobalBtn";
import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { addressSchema } from "../../../../../Validations/serviceAddressValidation";

// from bookafix
import AddAddress from "../../../BookaFix/AddNewAddressForm";
import { useCreateAddressOnRequest } from "../../../../../hooks/useQueries/useIdentity";
import { useSnackbar } from "notistack";

const AddNewAddress = ({ isOpen, closeModal, addNewAddress }) => {
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+234",
    abbr: "NG",
  });
  const { enqueueSnackbar } = useSnackbar();

  // ==========================mutations==========================
  function onSuccess(response) {
    const payload = {
      address: values.address,
      addressCityId: response.data.cityIdResult,
      addressLandMark: values.landmark || "",
      location: values.address,
      addressTitle: values.addressTitle,
      houseNumber: values.houseNumber,
      streetName: values.streetName,
      contactName: values.contactName,
      contactEmail: values.contactEmail,
      contactPhone: `${selectedCountry.code} ${values.contactPhoneNo}`,
      isDefault: values.isDefault,
      longitude: values.longitude,
      latitude: values.latitude,
    };

    // console.log(payload);
    addNewAddress(payload);
  }
  function onReject(response) {
    enqueueSnackbar(response.message, { variant: "error" });
  }
  const { mutate: createAddress } = useCreateAddressOnRequest(
    onSuccess,
    onReject
  );

  const onSubmit = async (values) => {
    const payload = {
      country: "Nigeria",
      state: values.state,
      lga: values.lga,
      city: values.city,
    };

    createAddress(payload);
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
      longitude: 0,
      latitude: 0,
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
      <AltModalHeader heading={"Add New Address"} closeModal={closeModal} />
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
          Add Address
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default AddNewAddress;
