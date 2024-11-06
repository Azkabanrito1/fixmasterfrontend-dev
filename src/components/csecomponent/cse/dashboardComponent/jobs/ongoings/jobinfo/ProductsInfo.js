import {
  AssignmentContainer,
  AssignmentHeader,
} from "../../../../../../franchiseecomponents/dashboardcomponents/DashboardHomeSection";
import styled from "styled-components";
import { FormGroup } from "../../../../../../globalcomponents/Utilities";

const SingleProduct = ({ info }) => {
  return (
    <>
      <Grid columns="4" className="mb-4">
        <div>
          <h3>Manufacturer’s Name</h3>
          <span className="d-block">{info.manufacturerName}</span>
        </div>
        <div>
          <h3>Model No</h3>
          <span className="d-block">{info.modelNumber}</span>
        </div>
        <div>
          <h3>Model Year</h3>
          <span className="d-block">{info.modelYear}</span>
        </div>
        <div>
          <h3>Serial No</h3>
          <span className="d-block">{info.serialNumber}</span>
        </div>
        <div>
          <h3>Color</h3>
          <span className="d-block">{info.color}</span>
        </div>
        <div>
          <h3>Number of Units</h3>
          <span className="d-block">{info.units}</span>
        </div>
      </Grid>
      <Grid columns="1">
        <div>
          <h3>Product Description</h3>
          <p>{info.decription}</p>
        </div>
      </Grid>
      <Grid columns="1">
        <div>
          <h3>Comments</h3>
          <p className="mb-3">{info.comment}</p>
        </div>
      </Grid>
    </>
  );
};

const ProductsInfo = ({ productInfo }) => {
  return (
    <AssignmentContainer className="mb-5">
      <AssignmentHeader>
        <h2>Product Information</h2>
      </AssignmentHeader>

      {productInfo?.map((info) => (
        <SingleProduct key={info.id} info={info} />
      ))}
    </AssignmentContainer>
  );
};

export default ProductsInfo;

const Grid = styled(FormGroup)`
  h3 {
    font-size: 1rem;
    color: var(--clr-primary);
  }
`;
