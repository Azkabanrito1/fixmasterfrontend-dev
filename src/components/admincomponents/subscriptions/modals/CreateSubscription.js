import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import { BallBeat } from "react-pure-loaders";
import GlobalInput from "../../../globalcomponents/GlobalInput";
import { useFormik } from "formik";
import { FormGroup } from "../../../globalcomponents/Utilities";
import { addSubscriptionValidation } from "../../../../Validations/subscriptionsValidations";
import { useGetCustomerTypes } from "../../../../hooks/useQueries/useIdentity";
import CustomerType from "../../../globalcomponents/CustomerType";

const AddSubscription = ({
  isOpen,
  closeModal,
  createSubscription,
  isSubmitting,
}) => {
  const { data: customerTypeData } = useGetCustomerTypes();

  const onSubmit = () => {
    let customerSubTypeId = 0;

    if (customerType?.[0]?.name.toLowerCase() === "commercial") {
      customerSubTypeId = +values.commercialType;
    }

    const payload = {
      shortName: values.shortName,
      longName: values.longName,
      customerType: customerType?.[0].name,
      customerTypeId: customerType?.[0].id,
      customerSubTypeId,
    };

    createSubscription(payload);
  };

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      shortName: "",
      longName: "",
      customerType: "",
      customerTypeId: 0,
      commercialType: 0,
    },
    onSubmit,
    validationSchema: addSubscriptionValidation,
  });

  const formikHandlers = {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    setFieldValue,
  };

  const customerType = customerTypeData?.data?.filter((customer) =>
    values?.customerType?.includes(customer.name)
  );

  return (
    <GlobalModal closeModal={closeModal} isOpen={isOpen}>
      <AltModalHeader heading="Create Subscription" closeModal={closeModal} />

      {isSubmitting && (
        <div className="text-center mb-3">
          <BallBeat loading={isSubmitting} color="var(--clr-primary)" />
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <FormGroup columns="2" className="mb-5">
          <GlobalInput
            labelText="Short Name"
            inputName="shortName"
            inputValue={values.shortName}
            inputPlaceholder="e.g. SLV"
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={errors.shortName && touched.shortName}
            errorMessage={errors.shortName}
          />

          <GlobalInput
            labelText="Long Name"
            inputName="longName"
            inputValue={values.longName}
            inputPlaceholder="e.g. Silver"
            handleBlur={handleBlur}
            handleChange={handleChange}
            error={errors.longName && touched.longName}
            errorMessage={errors.longName}
          />

          {/* <GlobalSelect
            fullWidth={true}
            labelText={"Customer Type"}
            selectName={"customerType"}
            selectValue={values.customerType}
            options={customerTypeData?.data}
            handleBlur={handleBlur}
            handleChange={handleChange}
            valueType="string"
            defaultOption={"Select a customer type"}
            error={errors.customerType && touched.customerType}
            errorMessage={errors.customerType}
          /> */}
        </FormGroup>

        <CustomerType
          formikHandlers={formikHandlers}
          customerTypeData={customerTypeData?.data}
          customerType={customerType}
        />

        <GlobalBtn
          disabled={isSubmitting}
          className="mt-3"
          mx="auto"
          type="submit"
        >
          {isSubmitting ? "Submitting" : "Add"}
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default AddSubscription;
