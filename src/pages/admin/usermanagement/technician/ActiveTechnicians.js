import { Stack } from "@mui/material";
import {
  BackBtn,
  PageHeading,
} from "../../../../components/globalcomponents/Utilities";
import CollaboratorManagedTable from "../../../../components/admincomponents/usermanagement/CollaboratorsManagedTable";
import UnsuspendUserModal from "../../../../components/admincomponents/usermanagement/modals/UnsuspendUser";
import SuspendUserModal from "../../../../components/admincomponents/usermanagement/modals/SuspendUserModal";
import useUserActionModals from "../../../../hooks/useUserActionModals";

const ActiveTechnicians = () => {
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
        <PageHeading>Active Technicians</PageHeading>
      </div>

      <CollaboratorManagedTable
        collaborator={"technician"}
        suspendUser={openSuspendUserModal}
        unSuspendUser={openUnsuspendUserModal}
      />

      {showSuspendUser && (
        <SuspendUserModal
          activeId={activeId}
          isOpen={showSuspendUser}
          closeModal={closeSuspendUserModal}
          role={"technician"}
        />
      )}

      {showUnsuspendUser && (
        <UnsuspendUserModal
          activeId={activeId}
          isOpen={showUnsuspendUser}
          closeModal={closeUnsuspendUserModal}
          role={"technician"}
        />
      )}
    </Stack>
  );
};

export default ActiveTechnicians;
