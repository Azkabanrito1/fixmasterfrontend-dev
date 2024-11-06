import { Stack } from "@mui/material";
import {
  BackBtn,
  PageHeading,
} from "../../../../components/globalcomponents/Utilities";
import CollaboratorManagedTable from "../../../../components/admincomponents/usermanagement/CollaboratorsManagedTable";
import SuspendUserModal from "../../../../components/admincomponents/usermanagement/modals/SuspendUserModal";
import UnsuspendUserModal from "../../../../components/admincomponents/usermanagement/modals/UnsuspendUser";
import useUserActionModals from "../../../../hooks/useUserActionModals";

const ActiveCSEs = () => {
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
    <Stack spacing={1}>
      <div>
        <BackBtn />
        <PageHeading>Active CSEs</PageHeading>
      </div>

      <CollaboratorManagedTable
        collaborator={"cse"}
        suspendUser={openSuspendUserModal}
        unSuspendUser={openUnsuspendUserModal}
      />

      {showSuspendUser && (
        <SuspendUserModal
          activeId={activeId}
          isOpen={showSuspendUser}
          closeModal={closeSuspendUserModal}
          role={"cse"}
        />
      )}

      {showUnsuspendUser && (
        <UnsuspendUserModal
          activeId={activeId}
          isOpen={showUnsuspendUser}
          closeModal={closeUnsuspendUserModal}
          role={"cse"}
        />
      )}
    </Stack>
  );
};

export default ActiveCSEs;
