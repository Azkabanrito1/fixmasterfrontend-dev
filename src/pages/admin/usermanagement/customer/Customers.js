import { Stack } from "@mui/material";
import {
  BackBtn,
  PageHeading,
} from "../../../../components/globalcomponents/Utilities";
import CustomersTable from "../../../../components/admincomponents/usermanagement/CustomersTable";
import SuspendUserModal from "../../../../components/admincomponents/usermanagement/modals/SuspendUserModal";
import UnsuspendUserModal from "../../../../components/admincomponents/usermanagement/modals/UnsuspendUser";
import useUserActionModals from "../../../../hooks/useUserActionModals";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import {
  useGetCustomerTypesOptions,
  useGetTerritoryDetails,
} from "../../../../hooks/useQueries/useAdmin";
import { useEffect, useState } from "react";

const Customers = () => {
  const {
    activeId,
    showSuspendUser,
    showUnsuspendUser,
    openSuspendUserModal,
    openUnsuspendUserModal,
    closeSuspendUserModal,
    closeUnsuspendUserModal,
  } = useUserActionModals();
  const { type } = useParams();
  const [searchParams] = useSearchParams();
  const { data: customerData, isLoading } = useGetCustomerTypesOptions();
  const territoryId = searchParams.get("territoryId");
  const { data: territoryData } = useGetTerritoryDetails(territoryId, {
    enabled: !!territoryId,
  });

  function capitalizeFirstLetter(word) {
    if (!word) return "";
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  const customerTypeId = customerData?.data?.filter((el) => {
    return type.toLowerCase() === el?.name?.toLowerCase();
  })?.[0]?.id;

  const customerType = capitalizeFirstLetter(type);

  return (
    <Stack spacing={2}>
      <div>
        <BackBtn />
        <PageHeading>
          {customerType}{" "}
          {territoryData ? `: ${territoryData?.territoryName}` : ""}
        </PageHeading>
      </div>

      <CustomersTable
        customerType={customerType}
        suspendUser={openSuspendUserModal}
        unSuspendUser={openUnsuspendUserModal}
        enumType={customerTypeId}
        territoryId={territoryId}
      />

      {showSuspendUser && (
        <SuspendUserModal
          activeId={activeId}
          isOpen={showSuspendUser}
          closeModal={closeSuspendUserModal}
          role={customerType}
        />
      )}

      {showUnsuspendUser && (
        <UnsuspendUserModal
          activeId={activeId}
          isOpen={showUnsuspendUser}
          closeModal={closeUnsuspendUserModal}
          role={customerType}
        />
      )}
    </Stack>
  );
};

export default Customers;
