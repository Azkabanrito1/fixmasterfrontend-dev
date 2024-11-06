import GlobalModal from "../../globalcomponents/GlobalModal";
import { Grid } from "../../globalcomponents/Utilities";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import Media from "../../qamastercomponent/supportrequest/Media";

const ViewActivQuotationDetails = ({ isOpen, closeModal, quotes, title }) => {
  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader heading={title} closeModal={closeModal} />
      <Grid columns="3" className="mb-4">
        <div>
          <h3>Category</h3>
          <span className="d-block"></span>
        </div>

        <div>
          <h3>Product Name</h3>
          <span className="d-block"></span>
        </div>

        <div>
          <h3>Quantity</h3>
          <span className="d-block"></span>
        </div>

        <div>
          <h3>Color</h3>
          <span className="d-block"></span>
        </div>
        <div>
          <h3>Part Number</h3>
          <span className="d-block"></span>
        </div>
        <div>
          <h3>Size</h3>
          <span className="d-block"></span>
        </div>
        <div>
          <h3>Response Date</h3>
          <span className="d-block"></span>
        </div>
        <div>
          {title === "Active Quotes Details" ? (
            <div>
              <h3>Response Time</h3>
              <span className="d-block"></span>{" "}
            </div>
          ) : (
            <div>
              {" "}
              <h3>Close Date</h3>
              <span className="d-block"></span>
            </div>
          )}
        </div>
        <div>
          <h3>Requested Date</h3>
          <span className="d-block"></span>
        </div>
        <div>
          <h3>Requested Identification</h3>
          <span className="d-block"></span>
        </div>
        <div>
          {title === "Close Details" ? (
            <div>
              <h3>Close Time</h3>
              <span className="d-block"></span>
            </div>
          ) : (
            <div>
              <h3>Requested Time</h3>
              <span className="d-block"></span>
            </div>
          )}
        </div>
        <div>
          <h3>Requested Time</h3>
          <span className="d-block"></span>
        </div>
      </Grid>
      <Grid columns="1">
        <div>
          <h3>Product description</h3>
          <span className="d-block"></span>
        </div>
      </Grid>
      <Media />
    </GlobalModal>
  );
};

export default ViewActivQuotationDetails;
