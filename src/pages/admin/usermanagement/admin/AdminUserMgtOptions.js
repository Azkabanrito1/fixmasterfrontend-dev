import { useParams } from "react-router-dom";
import {
  BackBtn,
  PageHeading,
} from "../../../../components/globalcomponents/Utilities";
import GlobalBtn from "../../../../components/globalcomponents/GlobalBtn";
import useUserActionModals from "../../../../hooks/useUserActionModals";
import { Stack } from "@mui/material";
import SuspendUserModal from "../../../../components/admincomponents/usermanagement/modals/SuspendUserModal";
import UnsuspendUserModal from "../../../../components/admincomponents/usermanagement/modals/UnsuspendUser";
import { useState } from "react";
import CreateAdmins from "../../../../components/admincomponents/usermanagement/createuserforms/CreateAdmins";
import AdminManagedTable from "../../../../components/admincomponents/usermanagement/AdminManagedTable";
import { useGetAdminRoles } from "../../../../hooks/useQueries/useIdentity";
import { capitalizeWords } from "../../../../utils/utilityFxns";

const AdminUserMgtOptions = () => {
  let { adminUser } = useParams();
  const {
    activeId,
    showSuspendUser,
    showUnsuspendUser,
    openSuspendUserModal,
    closeSuspendUserModal,
    openUnsuspendUserModal,
    closeUnsuspendUserModal,
  } = useUserActionModals();
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const openModal = () => setShowRegistrationForm(true);
  const closeModal = () => setShowRegistrationForm(false);
  const { data: adminRoles } = useGetAdminRoles();

  adminUser = adminUser.toLowerCase().replaceAll("-", " ");
  const validRole = adminRoles?.filter(
    (role) => role.name.toLowerCase() === adminUser
  )[0]?.name;

  return (
    <Stack spacing={1}>
      {!!validRole && (
        <div className="position-relative">
          <BackBtn inset="0" />
          <PageHeading>{adminUser}s Managed</PageHeading>
          <GlobalBtn
            onClick={openModal}
            className="position-absolute end-0 top-0 text-capitalize"
            width="max-content"
            px="1rem"
            py=".6rem"
            fw="400"
            fs="1rem"
          >
            Create {validRole}
          </GlobalBtn>
        </div>
      )}

      {!!validRole && (
        <AdminManagedTable
          collaborator={validRole}
          suspendUser={openSuspendUserModal}
          unSuspendUser={openUnsuspendUserModal}
        />
      )}

      {!validRole && (
        <Stack flex={1} alignItems={"center"}>
          <p className="text-center">This user role does not exist</p>
        </Stack>
      )}

      {showRegistrationForm && (
        <CreateAdmins
          isOpen={showRegistrationForm}
          closeModal={closeModal}
          role={validRole}
        />
      )}

      {showSuspendUser && (
        <SuspendUserModal
          activeId={activeId}
          isOpen={showSuspendUser}
          closeModal={closeSuspendUserModal}
          role={adminUser}
        />
      )}

      {showUnsuspendUser && (
        <UnsuspendUserModal
          activeId={activeId}
          isOpen={showUnsuspendUser}
          closeModal={closeUnsuspendUserModal}
          role={adminUser}
        />
      )}
    </Stack>
  );
};

export default AdminUserMgtOptions;
