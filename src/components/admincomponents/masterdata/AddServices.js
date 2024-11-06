import { useEffect, useReducer } from "react";
import GlobalInput from "../../globalcomponents/GlobalInput";
import GlobalModal from "../../globalcomponents/GlobalModal";
import GlobalSelect from "../../globalcomponents/GlobalSelect";
import {
  Fields,
  FormGroup,
  GroupHeading,
  SectionHeading,
} from "../../globalcomponents/Utilities";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import { useFormik } from "formik";
import {
  useGetCategoryDetailsById,
  useGetFixClasses,
} from "../../../hooks/useQueries/useAdmin";
import GlobalMultipleSelect from "../../globalcomponents/GlobalMultipleSelect";

const AddServices = ({
  isOpen,
  closeModal,
  createServices,
  heading,
  textAction,
  isLoading,
  data,
  update,
  activeSubcat,
}) => {
  //----------------------------------------------------------------data fetching queries----------------------------------------------------------------

  const { data: bookingClassData } = useGetFixClasses();
  const { data: categoryDetailsData } = useGetCategoryDetailsById(
    data?.categoryId || activeSubcat?.id,
    {
      enabled: !!data?.categoryId || !!activeSubcat?.id,
    }
  );

  const bookingType = bookingClassData?.data
    ?.map((item) => {
      return {
        id: item.id,
        name: item.name,
        status: item.status,
      };
    })
    .filter((item) => item?.status?.toLowerCase() !== "inactive");

  const categoryDetails = categoryDetailsData?.data;

  const onSubmit = () => {
    const bookingTypes = bookingType
      ?.filter((item) => {
        return values.bookingClass.includes(item.name);
      })
      .map((item) => {
        return item.id;
      });
    const initPayload = {
      categoryId: activeSubcat?.id || categoryDetails?.id || data?.id,
      fixClassIds: bookingTypes,
      name: values.name,
      standardRate: +values.standardRate,
      labourMarkup: +values.markUpLabour,
      labourVat: +values.labourVat,
    };
    const updatePayload = {
      id: data?.id,
      categoryId: data?.categoryId || data?.id,
      fixClassId: bookingTypes?.[0],
      name: values.name,
      standardRate: +values.standardRate,
      labourMarkup: +values.markUpLabour,
      labourVat: +values.labourVat,
    };

    if (!data) {
      createServices(initPayload);
    } else {
      update(updatePayload);
    }
  };

  const {
    values,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      bookingClass: [],
      name: "",
      standardRate: "",
      markUpLabour: "",
      labourVat: "",
    },
    onSubmit,
  });

  useEffect(() => {
    if (!data || !!activeSubcat || categoryDetails) {
      setFieldValue(
        "bookingClass",
        data?.fixClass?.split(",") || categoryDetails?.fixClass?.split(",")
      );

      setFieldValue(
        "markUpLabour",
        activeSubcat?.labourMarkup ||
          categoryDetails?.labourMarkup ||
          data?.labourMarkup
      );
      setFieldValue(
        "labourVat",
        activeSubcat?.labourVat || categoryDetails?.labourVat || data?.labourVat
      );
      setFieldValue("name", data ? data?.name : "");

      setFieldValue(
        "standardRate",
        data?.amount || categoryDetails?.standardRate || data?.standardRate
      );
    }
  }, [data, bookingClassData, activeSubcat, categoryDetails, setFieldValue]);

  const formikHandlers = {
    values,
    handleChange,
    handleBlur,
    setFieldValue,
    errors,
    touched,
  };

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader heading={heading} closeModal={closeModal} />
      <form onSubmit={handleSubmit}>
        <Fields>
          <FormGroup columns="2" mb="20px">
            <GlobalSelect
              labelText="Booking Type"
              options={bookingType}
              selectName="bookingClass"
              defaultOption="Select Booking Type"
              selectValue={values.bookingClass}
              handleBlur={handleBlur}
              handleChange={handleChange}
              valueType="string"
              required
            />
            {/* 
            <GlobalMultipleSelect
              labelText="Booking type"
              initData={bookingType}
              inputName="bookingClass"
              formikHandlers={formikHandlers}
              required={true}
            /> */}

            <GlobalInput
              name="name"
              inputValue={values.name}
              handleChange={handleChange}
              labelText="Service Name"
              inputPlaceholder="Enter service name"
              required
            />

            <GlobalInput
              name="standardRate"
              inputValue={values.standardRate}
              handleChange={handleChange}
              labelText="Standard Rate"
              inputPlaceholder="Enter standard rate"
              inputType="number"
              required
            />
          </FormGroup>

          <GroupHeading>Mark Up</GroupHeading>
          <FormGroup columns="2">
            <GlobalInput
              labelText="Labour Mark Up %"
              inputPlaceholder="Enter Labour Markup"
              name="markUpLabour"
              inputValue={values.markUpLabour}
              handleChange={handleChange}
              handleBlur={handleBlur}
              inputType="number"
              required
            />
            <GlobalInput
              labelText="Labour VAT "
              inputPlaceholder="Enter Material Markup"
              name="labourVat"
              inputValue={values.labourVat}
              handleChange={handleChange}
              handleBlur={handleBlur}
              inputType="number"
              required
            />
          </FormGroup>
        </Fields>
        <GlobalBtn type="submit" className="mt-3 m-auto">
          {isLoading ? "Loading ...." : textAction}
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default AddServices;
