import { useGetCustomTypeSub } from "../../hooks/useQueries/useAdmin";
import GlobalSelect from "./GlobalSelect";
import { Fields, FormGroup } from "./Utilities";

const CustomerType = ({ formikHandlers, customerTypeData, customerType }) => {
  const { values, handleChange, handleBlur, errors, touched } = formikHandlers;
  //-------------------------------------data fetching--------------------------------

  const { data: customerTypeSubData } = useGetCustomTypeSub(
    customerType?.at(0)?.id,
    {
      enabled: !!customerType?.at(0)?.id,
    }
  );

  return (
    <Fields>
      <FormGroup columns="2">
        <GlobalSelect
          labelText="Customer Type"
          selectName="customerType"
          handleChange={handleChange}
          handleBlur={handleBlur}
          options={customerTypeData}
          defaultOption="Select Customer type"
          errorMessage={errors.customerType}
          error={errors.customerType && touched.customerType}
          valueType={"string"}
          required={true}
        />

        {values.customerType === "Commercial" && (
          <GlobalSelect
            labelText="Commercial Customer"
            selectName="commercialType"
            handleChange={handleChange}
            handleBlur={handleBlur}
            options={customerTypeSubData?.data}
            defaultOption="Select Commercial type"
            errorMessage={errors.commercialType}
            error={errors.commercialType && touched.commercialType}
            required={true}
          />
        )}
      </FormGroup>
    </Fields>
  );
};

export default CustomerType;
