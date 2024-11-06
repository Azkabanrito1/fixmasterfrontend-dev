import { Fields, FormGroup } from "../../globalcomponents/Utilities";
import GlobalInput from "../../globalcomponents/GlobalInput";
import GlobalTextArea from "../../globalcomponents/GlobalTextArea";
import AddBtn from "../../franchiseecomponents/jobsmanagement/AddBtn";

const SingleProduct = ({ product, handleChange, index, deleteProduct }) => {
  return (
    <div
      className="mb-4"
      style={{ borderBottom: "1px dashed var(--clr-primary)" }}
    >
      <Fields>
        <FormGroup columns="2">
          <GlobalInput
            labelText={"Manufacturer’s Name (optional)"}
            labelColor={"var(--clr-primary)"}
            inputName={`manufacturerName`}
            inputValue={product.manufacturerName}
            inputPlaceholder={"Manufacturer's Name"}
            handleChange={(e) => handleChange(e, index)}
          />
          <GlobalInput
            labelText={"Model Number (optional)"}
            labelColor={"var(--clr-primary)"}
            inputName={"modelNumber"}
            inputValue={product.modelNumber}
            inputPlaceholder={"Model Number"}
            handleChange={(e) => handleChange(e, index)}
          />
          <GlobalInput
            labelText={"Model Year (optional)"}
            labelColor={"var(--clr-primary)"}
            inputName={"modelYear"}
            inputValue={product.modelYear}
            inputType="number"
            inputPlaceholder={"Model Year"}
            handleChange={(e) => handleChange(e, index)}
            min="1900"
          />
          <GlobalInput
            labelText={"Serial Number (optional)"}
            labelColor={"var(--clr-primary)"}
            inputName={"serialNumber"}
            inputValue={product.serialNumber}
            inputPlaceholder={"Serial Number"}
            handleChange={(e) => handleChange(e, index)}
          />
          <GlobalInput
            labelText={"Color (optional)"}
            labelColor={"var(--clr-primary)"}
            inputName={"color"}
            inputValue={product.color}
            inputPlaceholder={"Color"}
            handleChange={(e) => handleChange(e, index)}
          />
          <GlobalInput
            labelText={"No of Units to Fix"}
            labelColor={"var(--clr-primary)"}
            inputName={"units"}
            inputType={"number"}
            inputValue={product.units}
            inputPlaceholder={"No of Units to Fix"}
            handleChange={(e) => handleChange(e, index)}
            min="0"
          />
        </FormGroup>
        <FormGroup columns="1" className="mt-4">
          <GlobalTextArea
            labelText={"Product Description"}
            descriptionText="Give further information about the product"
            labelColor={"var(--clr-primary)"}
            inputName={"description"}
            inputValue={product.description}
            inputPlaceholder={"Description"}
            handleChange={(e) => handleChange(e, index)}
          />
          <GlobalTextArea
            labelText={"Comments"}
            descriptionText="Describe the issues with the product"
            labelColor={"var(--clr-primary)"}
            inputName={"comment"}
            inputValue={product.comment}
            inputPlaceholder={"Comments"}
            handleChange={(e) => handleChange(e, index)}
          />
        </FormGroup>
      </Fields>
      {index > 0 && (
        <AddBtn mt="0" mb="1rem" isRemove={true} action={deleteProduct} />
      )}
    </div>
  );
};

export default SingleProduct;
