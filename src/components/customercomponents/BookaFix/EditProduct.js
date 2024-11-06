import { Fields, FormGroup } from "../../globalcomponents/Utilities";
import GlobalInput from "../../globalcomponents/GlobalInput";
import GlobalTextArea from "../../globalcomponents/GlobalTextArea";
import Collapsible from "react-collapsible";
import { StyledCollapsible } from "./BookingInfo";
import { useEffect } from "react";

const EditProduct = ({ formikHandlers, fixDetails }) => {
  const { values, handleChange, handleBlur, setFieldValue } = formikHandlers;

  useEffect(() => {
    if (fixDetails?.productsInformation?.length > 0) {
      setFieldValue(
        "product.manufacturerName",
        fixDetails.productsInformation?.[0]?.manufacturerName
      );
      setFieldValue(
        "product.modelNumber",
        fixDetails.productsInformation?.[0]?.modelNumber
      );

      setFieldValue(
        "product.modelYear",
        fixDetails.productsInformation?.[0]?.modelYear
      );

      setFieldValue(
        "product.serialNumber",
        fixDetails.productsInformation?.[0]?.serialNumber
      );
      setFieldValue(
        "product.color",
        fixDetails.productsInformation?.[0]?.color
      );
      setFieldValue(
        "product.units",
        fixDetails.productsInformation?.[0]?.units
      );
      setFieldValue(
        "product.description",
        fixDetails.productsInformation?.[0]?.description
      );
      setFieldValue(
        "product.comment",
        fixDetails.productsInformation?.[0]?.comment
      );
    }
  }, [fixDetails]);

  return (
    <Collapsible
      trigger={
        <StyledCollapsible className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="heading">Product Details</h3>
            <p className="sub-heading">
              If applicable tell us more about the product that requires
              attention
            </p>
          </div>
          <i className="fas fa-chevron-right collapsible-icon"></i>
        </StyledCollapsible>
      }
    >
      <Fields>
        <FormGroup columns="2">
          <GlobalInput
            labelText={"Manufacturer’s Name (optional)"}
            labelColor={"var(--clr-primary)"}
            inputName={`product.manufacturerName`}
            inputValue={values.product.manufacturerName}
            inputPlaceholder={"Manufacturer's Name"}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
          <GlobalInput
            labelText={"Model Number (optional)"}
            labelColor={"var(--clr-primary)"}
            inputName={"product.modelNumber"}
            inputValue={values.product.modelNumber}
            inputPlaceholder={"Model Number"}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
          <GlobalInput
            labelText={"Model Year (optional)"}
            labelColor={"var(--clr-primary)"}
            inputName={"product.modelYear"}
            inputValue={values.product.modelYear}
            inputType="number"
            inputPlaceholder={"Model Year"}
            handleChange={handleChange}
            handleBlur={handleBlur}
            min="1900"
          />
          <GlobalInput
            labelText={"Serial Number (optional)"}
            labelColor={"var(--clr-primary)"}
            inputName={"product.serialNumber"}
            inputValue={values.product.serialNumber}
            inputPlaceholder={"Serial Number"}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
          <GlobalInput
            labelText={"Color (optional)"}
            labelColor={"var(--clr-primary)"}
            inputName={"product.color"}
            inputValue={values.product.color}
            inputPlaceholder={"Color"}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
          <GlobalInput
            labelText={"No of Units to Fix"}
            labelColor={"var(--clr-primary)"}
            inputName={"product.units"}
            inputType={"number"}
            inputValue={values.product.units}
            inputPlaceholder={"No of Units to Fix"}
            handleChange={handleChange}
            handleBlur={handleBlur}
            min="0"
          />
        </FormGroup>
        <FormGroup columns="1" className="mt-4">
          <GlobalTextArea
            labelText={"Product Description"}
            descriptionText="Give further information about the product"
            labelColor={"var(--clr-primary)"}
            inputName={"product.description"}
            inputValue={values.product.description}
            inputPlaceholder={"Description"}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
          {fixDetails ? null : (
            <GlobalTextArea
              labelText={"Comments"}
              descriptionText="Describe the issues with the product"
              labelColor={"var(--clr-primary)"}
              inputName={"product.comment"}
              inputValue={values.product.comment}
              inputPlaceholder={"Comments"}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
          )}
        </FormGroup>
      </Fields>
    </Collapsible>
  );
};

export default EditProduct;
