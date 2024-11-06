import { Stack } from "@mui/material";
import {
  BackBtn,
  PageHeading,
} from "../../../../components/globalcomponents/Utilities";
import CollaboratorManagedTable from "../../../../components/admincomponents/usermanagement/CollaboratorsManagedTable";
import useUserActionModals from "../../../../hooks/useUserActionModals";
import SuspendUserModal from "../../../../components/admincomponents/usermanagement/modals/SuspendUserModal";
import UnsuspendUserModal from "../../../../components/admincomponents/usermanagement/modals/UnsuspendUser";

const ActiveQAs = () => {
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
        <PageHeading>Active QA Masters</PageHeading>
      </div>
      <CollaboratorManagedTable
        collaborator={"qa"}
        suspendUser={openSuspendUserModal}
        unSuspendUser={openUnsuspendUserModal}
      />

      {showSuspendUser && (
        <SuspendUserModal
          activeId={activeId}
          isOpen={showSuspendUser}
          closeModal={closeSuspendUserModal}
          role={"qa"}
        />
      )}

      {showUnsuspendUser && (
        <UnsuspendUserModal
          activeId={activeId}
          isOpen={showUnsuspendUser}
          closeModal={closeUnsuspendUserModal}
          role={"qa"}
        />
      )}
    </Stack>
  );
};

export default ActiveQAs;
