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
import AddAddressMgmt from "./AddAddressMgmt";
import PreAddressMgmtCard from "./PreAddressMgmtCard";
import EditAddressMgmt from "./EditAddressMgmt";

const PreAddressMgmt = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeBranchId, setActiveBranchId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const showEditModalHandler = (id) => {
    setActiveBranchId(id);
    setShowEditModal(true);
  };

  const closedAddressModal = () => {
    setIsModalOpen(false);
  };

  const closeEditModalHandler = (id) => {
    setShowEditModal(false);
  };

  const onCreateAddressSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    navigate(PATH_SUPPLIER.trustedCustomer);
    sessionStorage.removeItem("payload");
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

  const { enqueueSnackbar } = useSnackbar();
  const { data: loginStage } = useGetStageId();
  const onboarding = loginStage?.data;

  const navigate = useNavigate();

  const sessionStorageData = JSON.parse(sessionStorage.getItem("payload"));

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
          <PreAddressMgmtCard
            showEditModalHandler={showEditModalHandler}
            branchData={sessionStorageData}
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
          <AddAddressMgmt
            isOpen={isModalOpen}
            closeModal={closedAddressModal}
            onSuccess={onSuccess}
          />
        )}

        {showEditModal && (
          <EditAddressMgmt
            open={showEditModal}
            close={closeEditModalHandler}
            activeId={activeBranchId}
            branchData={sessionStorageData}
          />
        )}
      </div>
    </PreboardingContainer>
  );
};

export default PreAddressMgmt;
