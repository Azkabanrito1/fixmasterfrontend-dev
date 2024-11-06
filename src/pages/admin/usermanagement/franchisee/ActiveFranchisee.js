import { Stack } from "@mui/material";
import {
  BackBtn,
  PageHeading,
} from "../../../../components/globalcomponents/Utilities";
import CollaboratorManagedTable from "../../../../components/admincomponents/usermanagement/CollaboratorsManagedTable";
import SuspendUserModal from "../../../../components/admincomponents/usermanagement/modals/SuspendUserModal";
import UnsuspendUserModal from "../../../../components/admincomponents/usermanagement/modals/UnsuspendUser";
import useUserActionModals from "../../../../hooks/useUserActionModals";

const ActiveFranchisees = () => {
  const {
    activeId,
    showSuspendUser,
    showUnsuspendUser,
    openSuspendUserModal,
    openUnsuspendUserModal,
    closeSuspendUserModal,
    closeUnsuspendUserModal,
  } = useUserActionModals();

  return (
    <Stack spacing={2}>
      <div>
        <BackBtn />
        <PageHeading>Active Franchisees</PageHeading>
      </div>

      <CollaboratorManagedTable
        collaborator={"franchisee"}
        suspendUser={openSuspendUserModal}
        unSuspendUser={openUnsuspendUserModal}
      />

      {showSuspendUser && (
        <SuspendUserModal
          activeId={activeId}
          isOpen={showSuspendUser}
          closeModal={closeSuspendUserModal}
          role={"franchisee"}
        />
      )}

      {showUnsuspendUser && (
        <UnsuspendUserModal
          activeId={activeId}
          isOpen={showUnsuspendUser}
          closeModal={closeUnsuspendUserModal}
          role={"franchisee"}
        />
      )}
    </Stack>
  );
};

export default ActiveFranchisees;
