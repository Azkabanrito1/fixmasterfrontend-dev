import { useState } from "react";
import styled from "styled-components";
import { FaMapMarkedAlt } from "react-icons/fa";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import GlobalInput from "../../../components/globalcomponents/GlobalInput";
import AddBtn from "../../../components/franchiseecomponents/jobsmanagement/AddBtn";
import ServiceAddressCard from "../../../components/customercomponents/Settings/serviceAddress/ServiceAddressCard";
import DeleteAddress from "../../../components/customercomponents/Settings/serviceAddress/modals/DeleteAddress";
import EditAddress from "../../../components/customercomponents/Settings/serviceAddress/modals/EditAddress";
import { useSnackbar } from "notistack";
import AddNewAddress from "../../../components/customercomponents/Settings/serviceAddress/modals/AddAddressModal";
import {
  useCreateCustomerAddress,
  useDeleteCustomerAddress,
  useGetCustomerAddresses,
  useSetDefaultAddress,
  useUpdateCustomerAddress,
} from "../../../hooks/useQueries/useIdentity";

function ServiceLocation() {
  const [showDeleteAddress, setShowDeleteAddress] = useState(false);
  const [showEditAddress, setShowEditAddress] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [activeAddressId, setActiveAddressId] = useState("");
  const [searchStr, setSearchStr] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  // ===========================fetching data=============================
  const { data: addressData } = useGetCustomerAddresses();
  const customerAddresses = addressData?.data;

  console.log(customerAddresses);

  // ========================data manipulation===========================
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    setShowAddAddress(false);
    setShowEditAddress(false);
    setShowDeleteAddress(false);
  };
  const onError = (response) => {
    enqueueSnackbar(`An error occurred: ${response.message}`, {
      variant: "error",
    });
  };

  const { mutate: handleDelete } = useDeleteCustomerAddress({
    addId: activeAddressId,
    onSuccess,
    onFailed: onError,
  });
  const { mutate: setAsDefault } = useSetDefaultAddress({
    addId: activeAddressId,
    onSuccess,
    onFailed: onError,
  });
  const { mutate: editAddress } = useUpdateCustomerAddress(onSuccess, onError);
  const { mutate: addNewAddress } = useCreateCustomerAddress(
    onSuccess,
    onError
  );

  const openServiceAdressForm = (id) => {
    setActiveAddressId(id);
    setShowEditAddress(true);
  };

  const openDeleteAdressModal = (id) => {
    setActiveAddressId(id);
    setShowDeleteAddress(true);
  };

  const filteredResults = customerAddresses?.filter((address) => {
    return address.location_name
      .replace(/\s/g, "")
      .toLowerCase()
      .includes(searchStr.toLowerCase());
  });

  return (
    <>
      <div className="mb-5">
        <PageHeading>Service Address</PageHeading>
        <BackBtn />
        <div style={{ position: "absolute", inset: "1.5rem 32px auto auto" }}>
          <GlobalInput
            inputType="search"
            inputPlaceholder={"Search address.."}
            // iconSrc={"/images/search.png"}
            inputValue={searchStr}
            handleChange={(e) => setSearchStr(e.target.value)}
          />
        </div>
      </div>
      <div>
        {filteredResults?.length > 0 ? (
          <CardContainer>
            {filteredResults.map((address) => (
              <ServiceAddressCard
                key={address.id}
                address={address}
                openEditModal={openServiceAdressForm}
                openDeleteModal={openDeleteAdressModal}
                setAsDefault={setAsDefault}
              />
            ))}
          </CardContainer>
        ) : (
          <div className="text-center text-muted">
            <FaMapMarkedAlt style={{ color: "#cccc", fontSize: "10rem" }} />
            <p className="mt-3">There are no saved addresses</p>
          </div>
        )}
      </div>
      <AddBtn
        action={() => setShowAddAddress(true)}
        id={"addAddress"}
        text={"Add New Address"}
      />

      {showDeleteAddress && (
        <DeleteAddress
          addressId={activeAddressId}
          handleDelete={handleDelete}
          isOpen={showDeleteAddress}
          closeModal={() => setShowDeleteAddress(false)}
        />
      )}
      {showEditAddress && (
        <EditAddress
          isOpen={showEditAddress}
          closeModal={() => setShowEditAddress(false)}
          activeAddressId={activeAddressId}
          editAddress={editAddress}
        />
      )}
      {showAddAddress && (
        <AddNewAddress
          isOpen={showAddAddress}
          closeModal={() => setShowAddAddress(false)}
          addNewAddress={addNewAddress}
        />
      )}
    </>
  );
}

export default ServiceLocation;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
`;
