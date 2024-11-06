import React, { useMemo, useState } from "react";
import {
  BackBtn,
  PageHeading,
  PreboardingContainer,
} from "../../../components/globalcomponents/Utilities";
import AddAddressManagement from "../../../components/suppliercomponent/setting/AddAddressManagement";
import AddBtn from "../../../components/franchiseecomponents/jobsmanagement/AddBtn";
import {
  useCreateSupplierBranchAddress,
  useGetStageId,
  useGetSupplierBranchAddress,
  useUpdateSupplierBranchAddress,
} from "../../../hooks/useQueries/useOnboarding";
import AddressCard from "../../../components/suppliercomponent/setting/AddressCard";
import GlobalBtn from "../../../components/globalcomponents/GlobalBtn";
import { useNavigate } from "react-router-dom";
import { PATH_SUPPLIER } from "../../../routes/paths";
import { useSnackbar } from "notistack";
import EditBranch from "../../../components/suppliercomponent/setting/EditBranch";

const AddressManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeBranchId, setActiveBranchId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const closedAddressModal = () => {
    setIsModalOpen(false);
  };

  const showEditModalHandler = (id) => {
    setActiveBranchId(id);
    setShowEditModal(true);
  };

  const closeEditModalHandler = (id) => {
    setActiveBranchId(null);
    setShowEditModal(false);
  };

  const onCreateAddressSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    if (sessionStorageData?.length > 0 && !onboarding?.isCompleted) {
      navigate(PATH_SUPPLIER.trustedCustomer);
    } else {
      closedAddressModal();
    }
  };
  const onEditAddressSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    closedAddressModal();
    closeEditModalHandler();
  };
  const onCreateAddressFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };
  const onSuccess = () => {
    enqueueSnackbar("Branch Address added successfully", {
      variant: "success",
    });
    closedAddressModal();
  };
  const { mutate: supplierCreateAddress, isLoading: isCreating } =
    useCreateSupplierBranchAddress(
      onCreateAddressSuccess,
      onCreateAddressFailure
    );

  const { mutate: updateSupplierAddress, isLoading: isEditing } =
    useUpdateSupplierBranchAddress(
      onEditAddressSuccess,
      onCreateAddressFailure
    );

  const { enqueueSnackbar } = useSnackbar();
  const { data: branchAddressData } = useGetSupplierBranchAddress();
  const { data: loginStage } = useGetStageId();
  const onboarding = loginStage?.data;

  const navigate = useNavigate();
  const editAddress = branchAddressData?.data?.filter(
    (address) => address.id === activeBranchId
  );

  const memoizedEditAddress = useMemo(() => editAddress, [editAddress]);
  const sessionStorageData = JSON.parse(sessionStorage.getItem("payload"));
  const sessionStoragEditeData = JSON.parse(
    sessionStorage.getItem("editBranch")
  );

  const handleSubmit = () => {
    supplierCreateAddress(sessionStorageData);
  };
  return (
    <PreboardingContainer>
      <div>
        <div className="mb-5">
          <PageHeading>Address Management</PageHeading>
          <BackBtn />
        </div>

        <div>
          <AddressCard
            data={branchAddressData?.data}
            showEditModalHandler={showEditModalHandler}
            branchData={sessionStorageData}
            editBranch={sessionStoragEditeData}
          />
        </div>
        {sessionStorageData?.length > 0 && !onboarding?.isCompleted && (
          <GlobalBtn
            className="mx-auto mt-3"
            type="submit"
            onClick={handleSubmit}
          >
            Next
          </GlobalBtn>
        )}
        <AddBtn
          text="Add Branches"
          orientation="inline"
          action={() => setIsModalOpen(true)}
          id={"add branch"}
        />
        {isModalOpen && (
          <AddAddressManagement
            isOpen={isModalOpen}
            closeModal={closedAddressModal}
            supplierCreateAddress={supplierCreateAddress}
            isCreating={isCreating}
            onSuccess={onSuccess}
            onboarding={onboarding}
          />
        )}
        {showEditModal && (
          <EditBranch
            open={showEditModal}
            close={closeEditModalHandler}
            editAddress={memoizedEditAddress}
            activeBranchId={activeBranchId}
            updateSupplierAddress={updateSupplierAddress}
            isEditing={isEditing}
            branchData={sessionStorageData}
            onboarding={onboarding}
          />
        )}
      </div>
    </PreboardingContainer>
  );
};

export default AddressManagement;
