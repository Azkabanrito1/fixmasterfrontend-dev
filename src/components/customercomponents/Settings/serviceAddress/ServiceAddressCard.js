import { Button } from "@mui/material";
import ServiceAction from "./ServiceAddressAction";

const ServiceAddressCard = ({
  address,
  openDeleteModal,
  openEditModal,
  setAsDefault,
}) => {
  return (
    <div
      className="rounded bg-white p-3 pb-5"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div
          className="rounded p-2 px-3 fw-bold"
          style={{
            color: "var(--clr-primary)",
            backgroundColor: "#FFF0E9",
            fontSize: 14,
          }}
        >
          {address.name}
        </div>
        <ServiceAction
          addid={address.id}
          openEditAddressModal={openEditModal}
          openDeleteModal={openDeleteModal}
        />
      </div>
      <div className="mb-2">
        <h3 className="fs-6 fw-bold text-dark">Contact Location/Address</h3>
        <p>{address.location_name}</p>
      </div>
      <div className="mb-2">
        <h3 className="fs-6 fw-bold text-dark">Contact Details</h3>
        <span className="d-block mb-1">{address.contact_name}</span>
        <span className="d-block fw-bold mb-1">{address.contact_phone}</span>
        <span className="d-block">{address.contact_email}</span>
      </div>
      <div
        className="text-center p-2 text-white"
        style={{
          backgroundColor: address.isDefault ? "#006717" : "var(--clr-primary)",
          position: "absolute",
          inset: "auto 0 0 0",
        }}
      >
        {address.isDefault ? (
          <span className="px-5" style={{ fontSize: "14px" }}>
            Default Address
          </span>
        ) : (
          <Button
            onClick={() => setAsDefault(address.id)}
            className="px-5"
            sx={{
              textTransform: "none",
              color: "#fff",
              py: 0,
              fontSize: "14px",
            }}
          >
            Set as Default Address
          </Button>
        )}
      </div>
    </div>
  );
};

export default ServiceAddressCard;
