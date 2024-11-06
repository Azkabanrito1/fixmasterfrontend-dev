import React from "react";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import { Grid } from "../../../globalcomponents/Utilities";
import Media from "../../../qamastercomponent/supportrequest/Media";
import { format } from "date-fns";

const OrderDetails = ({
  isOpen,
  closeModal,
  order,
  title,
  activeId,
  replacedData,
  completed,
}) => {
  const openOrder = order?.filter((item) => item.rfqRequestId === activeId);
  const newOrder = order?.filter((item) => item.requestId === activeId);
  const preOrderData = order?.filter((item) => item.rfqResponseId === activeId);

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader heading={title} closeModal={closeModal} />
      {title === "Order Details" && (
        <>
          <Grid columns="2" className="mb-4">
            <div>
              <h3>Category</h3>
              <span className="d-block">{newOrder[0]?.itemCategoryName}</span>
            </div>

            <div>
              <h3>Request Date</h3>
              <span className="d-block">{newOrder[0]?.requestDate}</span>
            </div>

            <div>
              <h3>Item Name</h3>
              <span className="d-block">{newOrder[0]?.itemName}</span>
            </div>

            <div>
              <h3>Quantity</h3>
              <span className="d-block">{newOrder[0]?.quantity}</span>
            </div>
            <div>
              <h3>Status</h3>
              <span className="d-block">{newOrder[0]?.requestStatus}</span>
            </div>
            <div>
              <h3>Distance To Me</h3>
              <span className="d-block">
                {newOrder[0]?.distanceToFixLocation}
              </span>
            </div>
          </Grid>
        </>
      )}

      {title === "Pre Purchase Details" && (
        <>
          <Grid columns="2" className="mb-4">
            <div>
              <h3>Job ID</h3>
              <span className="d-block">{preOrderData[0]?.jobNumber}</span>
            </div>
            <div>
              <h3>Request ID</h3>
              <span className="d-block">{preOrderData[0]?.rfqRequestId}</span>
            </div>

            <div>
              <h3>Response ID </h3>
              <span className="d-block">{preOrderData[0]?.rfqResponseId}</span>
            </div>
            <div>
              <h3>Item Name</h3>
              <span className="d-block">{preOrderData[0]?.itemName}</span>
            </div>
            <div>
              <h3>Category</h3>
              <span className="d-block">{preOrderData[0]?.itemCategory}</span>
            </div>

            <div>
              <h3>Quantity</h3>
              <span className="d-block">{preOrderData[0]?.quantity}</span>
            </div>
            <div>
              <h3>Request Date</h3>
              <span className="d-block">{preOrderData[0]?.requestDate}</span>
            </div>
            <div>
              <h3>Response Date</h3>
              <span className="d-block">
                {preOrderData[0]?.responseDate.split(" ")[0]}
              </span>
            </div>

            <div>
              <h3>Quote Cost</h3>
              <span className="d-block">{preOrderData[0]?.totalPrice}</span>
            </div>
            <div>
              <h3>Unit Price</h3>
              <span className="d-block">{preOrderData[0]?.unitPrice}</span>
            </div>
            <div>
              <h3>Delivary Fees</h3>
              <span className="d-block">{preOrderData[0]?.deliveryFee}</span>
            </div>
            <div>
              <h3>Fix Location</h3>
              <span className="d-block">{preOrderData[0]?.fixLocation}</span>
            </div>
          </Grid>
        </>
      )}

      {title === "Open Purchase Details" && (
        <>
          <Grid columns="2" className="mb-4">
            <div>
              <h3>Job ID</h3>
              <span className="d-block">{openOrder[0]?.jobNumber}</span>
            </div>
            <div>
              <h3>Purchase ID</h3>
              <span className="d-block">{openOrder[0]?.poId}</span>
            </div>

            <div>
              <h3>Status </h3>
              <span className="d-block">{openOrder[0]?.poStatus}</span>
            </div>
            <div>
              <h3>Item Name</h3>
              <span className="d-block">{openOrder[0]?.itemName}</span>
            </div>
            <div>
              <h3>Category</h3>
              <span className="d-block">{openOrder[0]?.itemCategory}</span>
            </div>

            <div>
              <h3>Quantity</h3>
              <span className="d-block">{openOrder[0]?.quantity}</span>
            </div>
            <div>
              <h3>Request Date</h3>
              <span className="d-block">{openOrder[0]?.requestDate}</span>
            </div>
            <div>
              <h3>Response Date</h3>
              <span className="d-block">
                {openOrder[0]?.poConfirmationDate?.split(" ")[0]}
              </span>
            </div>

            <div>
              <h3>Quote Cost</h3>
              <span className="d-block">{openOrder[0]?.totalPrice}</span>
            </div>
            <div>
              <h3>Unit Price</h3>
              <span className="d-block">{openOrder[0]?.unitPrice}</span>
            </div>
            <div>
              <h3>Delivary Fees</h3>
              <span className="d-block">{openOrder[0]?.deliveryFee}</span>
            </div>
            <div>
              <h3>Fix Location</h3>
              <span className="d-block">{openOrder[0]?.fixLocation}</span>
            </div>
          </Grid>
        </>
      )}

      {title === "In progress details" && (
        <>
          <Grid columns="2" className="mb-4">
            <div>
              <h3>Job ID</h3>
              <span className="d-block">{openOrder[0]?.jobNumber}</span>
            </div>
            <div>
              <h3>Purchase ID</h3>
              <span className="d-block">{openOrder[0]?.poId}</span>
            </div>

            <div>
              <h3>Status </h3>
              <span className="d-block">{openOrder[0]?.poStatus}</span>
            </div>
            <div>
              <h3>Item Name</h3>
              <span className="d-block">{openOrder[0]?.itemName}</span>
            </div>
            <div>
              <h3>Category</h3>
              <span className="d-block">{openOrder[0]?.itemCategory}</span>
            </div>

            <div>
              <h3>Quantity</h3>
              <span className="d-block">{openOrder[0]?.quantity}</span>
            </div>
            <div>
              <h3>Request Date</h3>
              <span className="d-block">{openOrder[0]?.requestDate}</span>
            </div>
            <div>
              <h3>Response Date</h3>
              <span className="d-block">
                {openOrder[0]?.poConfirmationDate}
              </span>
            </div>

            <div>
              <h3>Quote Cost</h3>
              <span className="d-block">{openOrder[0]?.totalPrice}</span>
            </div>
            <div>
              <h3>Unit Price</h3>
              <span className="d-block">{openOrder[0]?.unitPrice}</span>
            </div>
            <div>
              <h3>Delivary Fees</h3>
              <span className="d-block">{openOrder[0]?.deliveryFee}</span>
            </div>
            <div>
              <h3>Fix Location</h3>
              <span className="d-block">{openOrder[0]?.fixLocation}</span>
            </div>
          </Grid>
        </>
      )}

      {title === "Completed details" && (
        <>
          <Grid columns="2" className="mb-4">
            <div>
              <h3>Job ID</h3>
              <span className="d-block">{completed?.jobNumber}</span>
            </div>
            <div>
              <h3>Purchase ID</h3>
              <span className="d-block">{completed?.poId}</span>
            </div>

            <div>
              <h3>Status </h3>
              <span className="d-block">{completed?.poStatus}</span>
            </div>
            <div>
              <h3>Item Name</h3>
              <span className="d-block">{completed?.itemName}</span>
            </div>
            <div>
              <h3>Category</h3>
              <span className="d-block">{completed?.itemCategory}</span>
            </div>

            <div>
              <h3>Quantity</h3>
              <span className="d-block">{completed?.quantity}</span>
            </div>
            <div>
              <h3>Request Date</h3>
              <span className="d-block">{completed?.requestDate}</span>
            </div>
            <div>
              <h3>Response Date</h3>
              <span className="d-block">{completed?.poConfirmationDate}</span>
            </div>

            <div>
              <h3>Quote Cost</h3>
              <span className="d-block">{completed?.totalPrice}</span>
            </div>
            <div>
              <h3>Unit Price</h3>
              <span className="d-block">{completed?.unitPrice}</span>
            </div>
            <div>
              <h3>Delivary Fees</h3>
              <span className="d-block">{completed?.deliveryFee}</span>
            </div>
            <div>
              <h3>Fix Location</h3>
              <span className="d-block">{completed?.fixLocation}</span>
            </div>
          </Grid>
        </>
      )}

      {title === "Replaced Items" && (
        <>
          <Grid columns="3" className="mb-4">
            <div>
              <h3>item Name</h3>
              <span className="d-block">{replacedData?.name}</span>
            </div>

            <div>
              <h3>Purchase ID</h3>
              <span className="d-block">{replacedData?.poNumber}</span>
            </div>
            <div>
              <h3>Delivery Code</h3>
              <span className="d-block">{replacedData?.deliveryCode}</span>
            </div>
            <div>
              <h3>Status</h3>
              <span className="d-block">{replacedData?.status}</span>
            </div>
            <div>
              <h3>Uint of Measurement</h3>
              <span className="d-block">{replacedData?.unit}</span>
            </div>
            <div>
              <h3>Quantity</h3>
              <span className="d-block">{replacedData?.quantity}</span>
            </div>
            <div>
              <h3>Rejected Date</h3>
              <span className="d-block">
                {format(new Date(replacedData?.rejectedTimeStamp), "dd/MM/yyy")}
              </span>
            </div>
            <div>
              <h3>Rejection Time </h3>
              <span className="d-block">
                {" "}
                {format(new Date(replacedData?.rejectedTimeStamp), "hh:mm:a")}
              </span>
            </div>
          </Grid>
        </>
      )}

      {title === "Inprogress Details" && (
        <>
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
              <h3>Cost</h3>
              <span className="d-block"></span>
            </div>

            <div>
              <h3>Model Year</h3>
              <span className="d-block"></span>
            </div>
            <div>
              <h3>Color</h3>
              <span className="d-block"></span>
            </div>
            <div>
              <h3>In Progress Number</h3>
              <span className="d-block"></span>
            </div>
            <div>
              <h3>Size</h3>
              <span className="d-block"></span>
            </div>
            <div>
              <h3>Uint of Measurement</h3>
              <span className="d-block"></span>
            </div>
            <div>
              <h3>Quantity</h3>
              <span className="d-block"></span>
            </div>
            <div>
              <h3>Rejected Date</h3>
              <span className="d-block"></span>
            </div>
            <div>
              <h3>Re - shipped quantity </h3>
              <span className="d-block"></span>
            </div>
            <div>
              <h3>Re-shippedTime </h3>
              <span className="d-block"></span>
            </div>
            <div>
              <h3>Rejection Time </h3>
              <span className="d-block"></span>
            </div>
          </Grid>
          <Grid columns="1">
            <div>
              <h3>Rejection Comment</h3>
              <span className="d-block"></span>
            </div>
          </Grid>
          <Media />
        </>
      )}

      {title === "Closed Details" && (
        <>
          <Grid columns="2" className="mb-4">
            <div>
              <h3>Job ID</h3>
              <span className="d-block">{preOrderData[0]?.jobNumber}</span>
            </div>
            <div>
              <h3>Request ID</h3>
              <span className="d-block">{preOrderData[0]?.rfqRequestId}</span>
            </div>

            <div>
              <h3>Response ID </h3>
              <span className="d-block">{preOrderData[0]?.rfqResponseId}</span>
            </div>
            <div>
              <h3>Item Name</h3>
              <span className="d-block">{preOrderData[0]?.itemName}</span>
            </div>
            <div>
              <h3>Category</h3>
              <span className="d-block">{preOrderData[0]?.itemCategory}</span>
            </div>

            <div>
              <h3>Quantity</h3>
              <span className="d-block">{preOrderData[0]?.quantity}</span>
            </div>
            <div>
              <h3>Request Date</h3>
              <span className="d-block">{preOrderData[0]?.requestDate}</span>
            </div>
            <div>
              <h3>Response Date</h3>
              <span className="d-block">
                {preOrderData[0]?.responseDate.split(" ")[0]}
              </span>
            </div>

            <div>
              <h3>Quote Cost</h3>
              <span className="d-block">{preOrderData[0]?.totalPrice}</span>
            </div>
            <div>
              <h3>Unit Price</h3>
              <span className="d-block">{preOrderData[0]?.unitPrice}</span>
            </div>
            <div>
              <h3>Delivary Fees</h3>
              <span className="d-block">{preOrderData[0]?.deliveryFee}</span>
            </div>
            <div>
              <h3>Fix Location</h3>
              <span className="d-block">{preOrderData[0]?.fixLocation}</span>
            </div>
          </Grid>
        </>
      )}
    </GlobalModal>
  );
};

export default OrderDetails;
