import styled from "styled-components";
import { useState, useEffect, useRef, useReducer } from "react";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import GlobalModal from "../../globalcomponents/GlobalModal";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import { bookAFixSchema } from "../../../Validations/bookaFixValidation";
import { FieldError } from "../../globalcomponents/GlobalInput";
import { useBookaFix } from "../../../hooks/useQueries/useJobs";
import { BallBeat } from "react-pure-loaders";
import GlobalFullScreenLoader from "../../globalcomponents/GlobalFullScreenLoader";

// book a fix components
import BookingInfo from "../BookaFix/BookingInfo";
import ProductDetails from "../BookaFix/ProductDetails";
import UploadMedia from "../BookaFix/UploadMedia";
import ServiceDelivery from "../BookaFix/ServiceDelivery";
import ContactPreferences from "../BookaFix/ContactPreferences";

const initProductState = [
  {
    id: 0,
    manufacturerName: "",
    modelNumber: "",
    modelYear: "",
    serialNumber: "",
    color: "",
    units: "",
    description: "",
    comment: "",
  },
];

const productStateReducer = (state, action) => {
  const { id, name, value } = action.payload;
  switch (action.type) {
    case "ADD_PRODUCT":
      return [...state, { ...initProductState[0], id: id }];
    case "DELETE_PRODUCT":
      return state.filter((product) => product.id !== id);
    case "EDIT_PRODUCT":
      const newState = state;
      newState[id] = {
        ...newState[id],
        [name]: value,
      };
      return [...newState];
    default:
      return state;
  }
};

const initMediaState = {
  internalErrors: "",
  uploadResponse: [],
  files: [{ id: 0, name: "image0", file: null, fileType: "image" }],
};

const mediaStateReducer = (state, action) => {
  const { name, value, id, response, fileType } = action.payload;
  switch (action.type) {
    case "ADD_MEDIA":
      return {
        ...state,
        files: [
          ...state.files,
          { id, name: `${fileType}${id}`, file: null, fileType: fileType },
        ],
      };
    case "REMOVE_MEDIA":
      const newFiles = state.files.filter((file) => file.id !== id);
      return { ...state, files: newFiles };
    case "SET_RESPONSE":
      return {
        ...state,
        uploadResponse: [...state.uploadResponse, ...response],
      };
    case "SET_ERROR":
      return {
        ...state,
        internalErrors: value,
      };
    case "UPDATE_FILE":
      const fileIndex = state.files.findIndex((file) => file.name === name);
      const changedFiles = state.files;
      changedFiles[fileIndex].file = value;
      return {
        ...state,
        files: changedFiles,
      };
    case "REMOVE_FILE":
      const index = state.files.findIndex((file) => file.name === name);
      const modFiles = state.files;
      modFiles[index].file = "";
      return {
        ...state,
        files: modFiles,
      };
    default:
      break;
  }
};

const BookaFix = ({
  isOpen,
  closeModal,
  promotionId,
  openPaymentOptions,
  setFixId,
}) => {
  const [timeBounds, setTimeBounds] = useState({
    min: "",
    max: "",
  });
  const [productState, setProductState] = useReducer(
    productStateReducer,
    initProductState
  );
  const [mediaState, setMediaState] = useReducer(
    mediaStateReducer,
    initMediaState
  );
  // product and media index will give a number to be used as the name of the new product and media instance
  const [productIndex, setProductIndex] = useState(1);
  const [mediaIndex, setMediaIndex] = useState(1);
  const [submissionError, setSubmissionError] = useState("");
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+234",
    abbr: "NG",
  });

  const formTop = useRef(null);

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setProductIndex(productState.length);
  }, [productState]);

  useEffect(() => {
    setMediaIndex(mediaState.files.length);
  }, [mediaState.files]);

  const addMedia = (type) => {
    setMediaState({
      type: "ADD_MEDIA",
      payload: { id: mediaIndex, fileType: type },
    });
  };

  const onSuccess = (response) => {
    enqueueSnackbar(
      `Fix saved. You can proceed to payment to confirm your booking`,
      { variant: "success" }
    );
    setFixId(response.data);
    resetForm();
    closeModal();
    openPaymentOptions();
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };

  const { mutate: bookFix, isLoading: isSubmitting } = useBookaFix(
    onSuccess,
    onFailure
  );

  const removeFile = (name) => {
    setMediaState({ type: "REMOVE_FILE", payload: { name } });
  };

  const removeMedia = (id) => {
    setMediaState({ type: "REMOVE_MEDIA", payload: { id } });
  };

  const setResponse = (response) => {
    setMediaState({ type: "SET_RESPONSE", payload: { response: response } });
  };

  const uploadState = (name, value) => {
    setMediaState({ type: "UPDATE_FILE", payload: { name, value } });
  };

  // check for errors and show the error message on top of the form
  const checkErrors = () => {
    setSubmissionError("");

    formTop.current.scrollIntoView({ behavior: "smooth", block: "start" });
    if (Object.keys(errors).length > 0) {
      const firstErrorType = Object.values(errors)[0];

      if (typeof firstErrorType === "object") {
        setSubmissionError(Object.values(firstErrorType)[0]);
        return;
      }

      setSubmissionError(firstErrorType);
      return true;
    }
    return false;
  };
  // const medial = mediaState.uploadResponse?.map((response, index) =>
  //   console.log(response)
  // );
  const onSubmit = async (values) => {
    const isError = checkErrors();

    if (isError) return;

    let multimedia = [];

    if (mediaState.uploadResponse.length > 0) {
      multimedia = mediaState.uploadResponse?.map((response, index) => {
        return { id: index, ...response };
      });
    }

    const payload = {
      customerPromotionId: +promotionId,
      bookingType: +values.bookingInfo.bookingType,
      bookingClass: +values.bookingInfo.bookingClass,
      bookingCategory: +values.bookingInfo.bookingCategory,
      scheduleDate: values.bookingInfo.bookingDate,
      scheduleTime: values.bookingInfo.bookingTime,
      products: productState.map((product) => {
        if (Object.values(product).some((el) => Boolean(el) === true)) {
          return {
            ...product,
            units: +product.units,
          };
        }
      }),
      fixMultiMedias: multimedia,
      addressType: values.addNewAddress ? "1" : "2",
      addressId: +values.addressId,
      addressCityId: +values.cityId,
      addressLandMark: values.landmark,
      addressDetails: values.address,
      contactName: values.contactName,
      longitude: values.longitude,
      latitude: values.latitude,
      contactPhone: `${selectedCountry.code} ${values.contactPhoneNo}`,
      contactEmail: values.contactEmail,
      saveNewAddress: +values.saveAddress,
      addressName: values.addressTitle,
      contactPreferenceId: +values.contactPreference.contactPreferenceId,
      contactFromTime: values.contactPreference.contactFrom,
      contactToTime: values.contactPreference.contactTo,
      notificationPreferenceId:
        +values.contactPreference.notificationPreferenceId,
    };
    bookFix(payload);
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    resetForm,
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
      saveAddress: true,
      addressId: "",
      addressTitle: "",
      state: "",
      lga: "",
      city: "",
      cityId: "",
      address: "",
      landmark: "",
      longitude: 0,
      latitude: 0,
      contactName: "",
      contactPhoneNo: "",
      contactEmail: "",
      contactPreference: {
        contactPreferenceId: "",
        contactFrom: "",
        contactTo: "",
        notificationPreferenceId: "",
      },
    },
    validationSchema: bookAFixSchema(timeBounds),
    onSubmit,
  });

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader heading="Book a Fix" closeModal={closeModal} />

      <div ref={formTop}>
        <BallBeat loading={isSubmitting} />
      </div>

      {submissionError && (
        <FieldError fs="1rem" align="center" mb="1rem">
          {submissionError}
        </FieldError>
      )}

      <StyledForm onSubmit={handleSubmit}>
        <BookingInfo
          mode="booking"
          formikHandlers={{
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
          }}
          setTimeBounds={setTimeBounds}
          timeBounds={timeBounds}
        />

        <ProductDetails
          products={productState}
          length={productIndex}
          handleChange={(e, id) =>
            setProductState({
              type: "EDIT_PRODUCT",
              payload: { id: id, name: e.target.name, value: e.target.value },
            })
          }
          addProduct={(id) =>
            setProductState({ type: "ADD_PRODUCT", payload: { id: id } })
          }
          deleteProduct={(id) =>
            setProductState({ type: "DELETE_PRODUCT", payload: { id: id } })
          }
        />

        <UploadMedia
          fileState={mediaState.files}
          addMedia={(type) => addMedia(type)}
          removeFile={(name) => removeFile(name)}
          removeMedia={(id) => removeMedia(id)}
          setUploadResponse={(resp) => setResponse(resp)}
          uploadResponse={mediaState.uploadResponse}
          uploadState={(name, value) => uploadState(name, value)}
        />

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
        />

        <ContactPreferences
          formikHandlers={{
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
          }}
        />

        <GlobalBtn type="submit" mx="auto" disabled={isSubmitting}>
          {isSubmitting ? "Submitting" : "Proceed"}
        </GlobalBtn>
      </StyledForm>

      <GlobalFullScreenLoader open={isSubmitting} />
    </GlobalModal>
  );
};

export default BookaFix;

export const StyledForm = styled.form`
  .Collapsible {
    margin-bottom: 1rem;
  }

  .collapsible-icon {
    position: relative;
    transition: 0.3s ease-in-out;
    color: var(--clr-primary);
  }

  .Collapsible__trigger[aria-expanded="true"] .collapsible-icon {
    transform: rotate(90deg);
  }
`;
