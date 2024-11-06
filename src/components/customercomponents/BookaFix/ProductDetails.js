import Collapsible from "react-collapsible";
import { StyledCollapsible } from "./BookingInfo";
import SingleProduct from "./SingleProductDetail";
import AddBtn from "../../franchiseecomponents/jobsmanagement/AddBtn";

const ProductDetails = ({
  products,
  handleChange,
  addProduct,
  deleteProduct,
  length,
  fixDetails,
}) => {
  const formTemplate = products?.map((product, index) => (
    <SingleProduct
      key={index}
      index={index}
      product={product}
      handleChange={(e, index) => handleChange(e, index)}
      deleteProduct={() => deleteProduct(index)}
      fixDetails={fixDetails}
    />
  ));

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
      <div className="px-2">{formTemplate}</div>

      <AddBtn
        mt={"1rem"}
        text="Add Product"
        action={() => addProduct(length)}
        orientation="inline"
      />
    </Collapsible>
  );
};

export default ProductDetails;
