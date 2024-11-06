import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import GlobalInput from "../../../globalcomponents/GlobalInput";
import { useFormik } from "formik";
import { FormGroup } from "../../../globalcomponents/Utilities";
import { addPlanValidation } from "../../../../Validations/subscriptionsValidations";
import GlobalSelect from "../../../globalcomponents/GlobalSelect";
import { useEffect, useState } from "react";
import GlobalBallBeat from "../../../globalcomponents/GlobalBallBeat";

const PAYMENTPLANS = [
  { id: 1, name: "Monthly" },
  { id: 2, name: "Quarterly" },
  { id: 3, name: "Yearly" },
];

const CreatePaymentPlan = ({
  existingPlans,
  initValue,
  isOpen,
  closeModal,
  subId,
  addPlan,
  editPlan,
  isSubmitting,
}) => {
  const [allowedPlans, setAllowedPlans] = useState([]);

  useEffect(() => {
    const existingPlanIds = existingPlans.map((plan) => plan.duration);
    const allowedPlans = PAYMENTPLANS.filter(
      (plan) => !existingPlanIds.includes(plan.name)
    );
    setAllowedPlans(allowedPlans);
  }, []);

  useEffect(() => {
    if (initValue) {
      const editingPlan = initValue?.[0];
      const allowedPlans = PAYMENTPLANS.filter(
        (plan) => editingPlan?.duration === plan.name
      );

      setAllowedPlans(allowedPlans);
      setFieldValue("paymentPlanId", editingPlan.id);
      setFieldValue("planAmount", editingPlan.amount);
      setFieldValue("paymentGatewayCode", editingPlan.planCode);
      setFieldValue("totalAllowedNoOfJobs", editingPlan.numberOfJobs);
    }
  }, [initValue]);

  const onSubmit = () => {
    const payload = {
      subscriptionId: parseInt(subId),
      ...values,
    };

    if (initValue?.length > 0) {
      editPlan(payload);
    } else {
      addPlan(payload);
    }
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
      paymentPlanId: "",
      totalAllowedNoOfJobs: "",
      planAmount: "",
      paymentGatewayCode: "",
    },
    onSubmit,
    validationSchema: addPlanValidation,
  });

  return (
    <GlobalModal closeModal={closeModal} isOpen={isOpen}>
      <AltModalHeader
        heading={
          initValue?.length > 0 ? "Edit Payment Plan" : "Add Payment Plan"
        }
        closeModal={closeModal}
      />

      {<GlobalBallBeat loading={isSubmitting} />}

      {allowedPlans.length > 0 && (
        <form onSubmit={handleSubmit}>
          <FormGroup columns="2" className="mb-5">
            <GlobalSelect
              labelText="Payment Plan ID"
              selectName="paymentPlanId"
              defaultOption="Select Payment Plan"
              options={allowedPlans}
              selectValue={values.paymentPlanId}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.paymentPlanId && touched.paymentPlanId}
              errorMessage={errors.paymentPlanId}
              required={true}
            />
            <GlobalInput
              labelText="Payment Gateway Code"
              inputName="paymentGatewayCode"
              inputValue={values.paymentGatewayCode}
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.paymentGatewayCode && touched.paymentGatewayCode}
              errorMessage={errors.paymentGatewayCode}
              inputPlaceholder="From Payment Integration"
              required={true}
            />

            <GlobalInput
              labelText="Allowed No of Jobs"
              inputName="totalAllowedNoOfJobs"
              inputValue={values.totalAllowedNoOfJobs}
              inputType="number"
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={
                errors.totalAllowedNoOfJobs && touched.totalAllowedNoOfJobs
              }
              required={true}
              errorMessage={errors.totalAllowedNoOfJobs}
              min="0"
            />

            <GlobalInput
              labelText="Amount"
              inputName="planAmount"
              inputValue={values.planAmount}
              inputType="number"
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.planAmount && touched.planAmount}
              errorMessage={errors.planAmount}
              min="0"
              required={true}
            />
          </FormGroup>

          <GlobalBtn
            disabled={isSubmitting}
            className="mt-3"
            mx="auto"
            type="submit"
          >
            {isSubmitting
              ? "Submitting"
              : initValue?.length > 0
              ? "Edit"
              : "Add"}
          </GlobalBtn>
        </form>
      )}

      {allowedPlans.length === 0 && (
        <p className="muted text-center">
          All possible plans have already been created. Please edit an existing
          plan.
        </p>
      )}
    </GlobalModal>
  );
};

export default CreatePaymentPlan;
