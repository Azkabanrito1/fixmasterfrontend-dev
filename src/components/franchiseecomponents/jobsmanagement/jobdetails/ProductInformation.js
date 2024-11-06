import styled from "styled-components";
import { FormGroup } from "../../../globalcomponents/Utilities";
import {
  AssignmentContainer,
  AssignmentHeader,
} from "../../dashboardcomponents/DashboardHomeSection";

const SingleProduct = ({ info }) => {
  return (
    <>
      <Grid columns="4" className="mb-4">
        <div>
          <h3>Manufacturer’s Name</h3>
          <span className="d-block">{info.name}</span>
        </div>
        <div>
          <h3>Model No</h3>
          <span className="d-block">{info.modelNo}</span>
        </div>
        <div>
          <h3>Model Year</h3>
          <span className="d-block">{info.modelYear}</span>
        </div>
        <div>
          <h3>Serial No</h3>
          <span className="d-block">{info.serialNo}</span>
        </div>
        <div>
          <h3>Color</h3>
          <span className="d-block">{info.blue}</span>
        </div>
        <div>
          <h3>Number of Units</h3>
          <span className="d-block">{info.noOfUnits}</span>
        </div>
      </Grid>
      <Grid columns="1">
        <div>
          <h3>Product Description</h3>
          <p>{info.description}</p>
        </div>
      </Grid>
      <Grid columns="1">
        <div>
          <h3>Comments</h3>
          {info.comments?.map((comment) => (
            <p key={comment.comment} className="mb-3">
              {comment.comment}
            </p>
          ))}
        </div>
      </Grid>
    </>
  );
};

const ProductInformation = ({ productInfo }) => {
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

export default ProductInformation;

const Grid = styled(FormGroup)`
  h3 {
    font-size: 1rem;
    color: var(--clr-primary);
  }
`;
