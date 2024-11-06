import { useFormik } from "formik";
import { loyaltyTypes } from "../../../utils/selectOptions";
import { createLoyaltySchema } from "../../../Validations/createLoyaltyValidation";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import GlobalInput from "../../globalcomponents/GlobalInput";
import GlobalSelect from "../../globalcomponents/GlobalSelect";
import { Fields, FormGroup } from "../../globalcomponents/Utilities";

const NewLoyaltyForm = ({ createLoyalty, isLoading }) => {
  const onSubmit = () => {
    const payload = {
      minimumSpending: values.minSpend,
      maximumSpending: values.maxSpend,
      percentageDue: values.percentDue,
      loyaltyType: values.loyaltyType,
      periodStartDate: values.startDate,
      periodEndDate: values.endDate,
      loyaltyName: values.loyaltyName,
    };

    createLoyalty(payload);
  };

  const { handleSubmit, handleBlur, handleChange, errors, values, touched } =
    useFormik({
      initialValues: {
        loyaltyName: "",
        loyaltyType: "",
        minSpend: 0,
        maxSpend: 0,
        percentDue: 0,
        startDate: "",
        endDate: "",
      },
      onSubmit,
      validationSchema: createLoyaltySchema,
    });

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Fields>
          <FormGroup columns="3">
            <GlobalInput
              labelText="Loyalty Name"
              inputName="loyaltyName"
              inputValue={values.loyaltyName}
              inputPlaceholder="e.g. 200k Loyalty Bonus"
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.loyaltyName && touched.loyaltyName}
              errorMessage={errors.loyaltyName}
              required
            />
            <GlobalSelect
              labelText={"Loyalty Type"}
              options={loyaltyTypes}
              selectName={"loyaltyType"}
              selectValue={values.loyaltyType}
              valueType={"string"}
              handleBlur={handleBlur}
              handleChange={handleChange}
              defaultOption={"Select a loyalty type"}
              error={errors.loyaltyType && touched.loyaltyType}
              errorMessage={errors.loyaltyType}
              required
            />
            <GlobalInput
              labelText="Minimum Spending"
              inputName="minSpend"
              inputValue={values.minSpend}
              inputType="number"
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.minSpend && touched.minSpend}
              errorMessage={errors.minSpend}
              min={0}
              required
            />
            <GlobalInput
              labelText="Maximum Spending"
              inputName="maxSpend"
              inputValue={values.maxSpend}
              inputType="number"
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.maxSpend && touched.maxSpend}
              errorMessage={errors.maxSpend}
              min={0}
              required
            />
            <GlobalInput
              labelText="Loyalty Value"
              inputName="percentDue"
              inputValue={values.percentDue}
              inputType="number"
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.percentDue && touched.percentDue}
              errorMessage={errors.percentDue}
              min={0}
              required
            />
            <GlobalInput
              labelText="Start Date"
              inputName="startDate"
              inputValue={values.startDate}
              inputType="date"
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.startDate && touched.startDate}
              errorMessage={errors.startDate}
              required
            />
            <GlobalInput
              labelText="End Date"
              inputName="endDate"
              inputValue={values.endDate}
              inputType="date"
              handleBlur={handleBlur}
              handleChange={handleChange}
              error={errors.endDate && touched.endDate}
              errorMessage={errors.endDate}
              required
            />
          </FormGroup>
        </Fields>

        <GlobalBtn
          type="submit"
          mx="auto"
          px="2rem"
          width="max-content"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Create Loyalty"}
        </GlobalBtn>
      </form>
    </>
  );
};

export default NewLoyaltyForm;
