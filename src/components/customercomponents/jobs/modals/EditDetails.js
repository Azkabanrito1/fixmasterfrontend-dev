import { useEffect, useState } from "react";
import { BallBeat } from "react-pure-loaders";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import { StyledForm } from "../../modals/BookaFix";
import { useFormik } from "formik";
import { bookAFixSchema } from "../../../../Validations/bookaFixValidation";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import moment from "moment";
import { useSnackbar } from "notistack";
import { AsYouType } from "libphonenumber-js";

// from bookafix
import BookingInfo from "../../BookaFix/BookingInfo";
import ServiceDelivery from "../../BookaFix/ServiceDelivery";
import ContactPreferences from "../../BookaFix/ContactPreferences";
import {
  useGetBookingType,
  useGetFixCategories,
  useGetFixClass,
  useGetJobDetails,
  useUpdateFix,
} from "../../../../hooks/useQueries/useJobs";
import EditUpload from "../../BookaFix/EditUpload";
import EditProduct from "../../BookaFix/EditProduct";
import GlobalFullScreenLoader from "../../../globalcomponents/GlobalFullScreenLoader";

const EditDetails = ({ isOpen, closeModal, fixId }) => {
  const { data: fixDetaildata, isLoading } = useGetJobDetails(fixId);
  const fixDetails = fixDetaildata?.data;
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+234",
    abbr: "NG",
  });
  const [timeBounds, settimeBounds] = useState({});
  const [files, setFiles] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const { data: bookingTypeData } = useGetBookingType();
  const { data: bookingClassData } = useGetFixClass();
  const { data: bookingCategoryData } = useGetFixCategories();

  //------------------------------------mutations & mutates fns --------------------------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    closeModal();
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };
  const { mutate: updateFix, isLoading: isUpdating } = useUpdateFix(
    onSuccess,
    onFailure
  );

  const removeFile = (fileIndex) => {
    const newFiles = files.filter((_, index) => fileIndex !== index);

    setFiles(newFiles);
  };

  useEffect(() => {
    const contactPhoneNo = new AsYouType();
    if (fixDetails) {
      setFieldValue("bookingInfo.bookingType", fixDetails?.bookingType);
      setFieldValue("bookingInfo.bookingCategory", fixDetails?.bookingCategory);
      setFieldValue("bookingInfo.bookingClass", fixDetails?.bookingClass);
      setFieldValue(
        "bookingInfo.bookingDate",
        moment(fixDetails?.scheduleDate).format("YYYY-MM-DD")
      );
      setFieldValue("bookingInfo.bookingTime", fixDetails?.scheduleTime);
      setFieldValue("addressId", fixDetails?.addressId);

      setFieldValue("contactName", fixDetails?.contactName);
      setFieldValue("contactEmail", fixDetails?.contactEmail);

      if (fixDetails.contactPhone) {
        contactPhoneNo.input(fixDetails.contactPhone);
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

      setFieldValue(
        "contactPreference.contactPreferenceId",
        fixDetails?.contactPreferenceId
      );
      setFieldValue(
        "contactPreference.notificationPreferenceId",
        fixDetails?.notificationPrefernceId
      );
      setFieldValue(
        "contactPreference.contactFrom",
        fixDetails?.contactFromTime
      );
      setFieldValue("contactPreference.contactTo", fixDetails?.contactToTime);
    }
    setFieldValue(
      "contactPreference.contactPreferenceId",
      fixDetails?.contactPreferenceId
    );
    setFieldValue(
      "contactPreference.notificationPreferenceId",
      fixDetails?.notificationPreferenceId
    );
  }, [fixDetails]);

  const onSubmit = async (values) => {
    const products = [];
    const product = {
      manufacturerName: values.product.manufacturerName,
      modelNumber: values.product.modelNumber,
      modelYear: values.product.modelYear,
      serialNumber: values.product.serialNumber,
      color: values.product.color,
      units: values.product.units,
      description: values.product.description,
      comment: values.product.comment,
      id: 1,
    };

    products.push(product);

    const editPayload = new FormData();

    editPayload.append("FixId", Number(fixId));
    editPayload.append("BookingType", +formerBookType[0]?.id);
    editPayload.append("BookingClass", +formerBookClass[0]?.id);
    editPayload.append("BookingCategory", +formerBookCategory[0]?.id);
    editPayload.append("ScheduleDate", values.bookingInfo.bookingDate);
    editPayload.append("ScheduleTime", values.bookingInfo.bookingTime);
    editPayload.append(
      "CustomerAddressId",
      fixDetails?.addressDetails?.customerAddressId
    );
    editPayload.append("AddressType", values.addNewAddress ? "1" : "2");
    editPayload.append("AddressCityId", Number(values.cityId));
    editPayload.append("AddressLandMark", values.landmark);
    editPayload.append("AddressDetails", values.address);
    editPayload.append("Longitude", values.longitude);
    editPayload.append("Latitude", values.latitude);
    editPayload.append("ContactName", values.contactName);
    editPayload.append(
      "ContactPhone",
      `${selectedCountry.code} ${values.contactPhoneNo}`
    );
    editPayload.append("ContactEmail", values.contactEmail);
    editPayload.append("AddressName", values.addressTitle);
    editPayload.append(
      "ContactPreferenceId",
      Number(values.contactPreference.contactPreferenceId)
    );
    editPayload.append("ContactFromTime", values.contactPreference.contactFrom);
    editPayload.append("ContactToTime", values.contactPreference.contactTo);
    editPayload.append(
      "NotificationPrefernceId",
      Number(values.contactPreference.notificationPreferenceId)
    );
    products.forEach((product, index) => {
      // Append each product with a unique key
      for (const key in product) {
        editPayload.append(`Products[${index}][${key}]`, product[key]);
      }
    });

    for (const file of files) {
      editPayload.append("Files", file);
    }
    for (const payload of editPayload.payload) {
      console.log(payload);
    }
    // updateFix(editPayload);
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      bookingInfo: {
        bookingType: "",
        bookingClass: "",
        bookingCategory: "",
        bookingDate: "",
        bookingTime: "",
      },
      addNewAddress: false,
      saveAddress: false,
      addressId: "",
      addressTitle: "",
      cityId: "",
      longitude: 0,
      latitude: 0,
      landmark: "",
      address: "",
      contactName: "",
      contactPhoneNo: "",
      contactEmail: "",
      contactPreference: {
        contactPreferenceId: "",
        contactFrom: "",
        contactTo: "",
        notificationPreferenceId: "",
      },
      product: {
        manufacturerName: "",
        modelNumber: "",
        modelYear: "",
        serialNumber: "",
        color: "",
        units: "",
        description: "",
        comment: "",
      },
    },
    validationSchema: () => bookAFixSchema(timeBounds),
    onSubmit,
  });

  useEffect(() => {
    const newTimeBounds = bookingTypeData?.data?.filter((data) => {
      return data.name
        .toLowerCase()
        .includes(fixDetails?.bookingType?.toLowerCase());
    })?.[0];

    settimeBounds(newTimeBounds);
  }, [bookingTypeData, fixDetails]);

  // console.log(values);
  // console.log(errors);

  const services = bookingTypeData?.data?.map((item) => {
    return {
      name: item.name.split("(")?.[0]?.trim(),
      id: item.id,
    };
  });
  const formerBookType = services?.filter(
    (type) => type.name === fixDetails?.bookingType
  );

  const formerBookClass = bookingClassData?.data?.filter(
    (type) => type.name === fixDetails?.bookingClass
  );
  // console.log(fixDetails);
  const formerBookCategory = bookingCategoryData?.data?.filter(
    (type) => type.name === fixDetails?.bookingCategory
  );
  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader heading={"Edit Booking"} closeModal={closeModal} />

      <div className="text-center">
        <BallBeat loading={isLoading} color="var(--clr-primary)" />
      </div>

      <StyledForm onSubmit={handleSubmit}>
        {/* Booking Info */}
        <BookingInfo
          mode="editing"
          formikHandlers={{
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
          }}
        />

        {/* Product info */}
        <EditProduct
          formikHandlers={{
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
          }}
          fixDetails={fixDetaildata?.data}
        />

        {/* Service Delivery */}
        <ServiceDelivery
          formikHandlers={{
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
          }}
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
          initAddressId={values.addressId}
          mode={"editing"}
        />
        {/* Files Uploaded */}
        <EditUpload
          fixDetails={fixDetails}
          files={files}
          setFiles={setFiles}
          removeFile={removeFile}
        />

        {/* Contact Preferences */}
        <ContactPreferences
          formikHandlers={{
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
            fixDetails,
          }}
          fixDetails={fixDetails}
        />

        <GlobalBtn type="submit" mx="auto" disabled={isLoading}>
          {isUpdating ? "Updating" : "Update"}
        </GlobalBtn>
      </StyledForm>
      <GlobalFullScreenLoader open={isUpdating} />
    </GlobalModal>
  );
};

export default EditDetails;
