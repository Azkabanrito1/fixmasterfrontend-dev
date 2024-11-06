import CustomersTable from "../../../../components/admincomponents/usermanagement/CustomersTable";
import SuspendUserModal from "../../../../components/admincomponents/usermanagement/modals/SuspendUserModal";
import UnsuspendUserModal from "../../../../components/admincomponents/usermanagement/modals/UnsuspendUser";
import {
  BackBtn,
  PageHeading,
} from "../../../../components/globalcomponents/Utilities";
import useUserActionModals from "../../../../hooks/useUserActionModals";

const CommercialCustomer = () => {
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
    <>
      <div>
        <BackBtn />
        <PageHeading>Commercial Customer</PageHeading>
      </div>
      <CustomersTable
        suspendUser={openSuspendUserModal}
        unSuspendUser={openUnsuspendUserModal}
        enumType={2}
      />
      {showSuspendUser && (
        <SuspendUserModal
          activeId={activeId}
          isOpen={showSuspendUser}
          closeModal={closeSuspendUserModal}
        />
      )}
      {showUnsuspendUser && (
        <UnsuspendUserModal
          activeId={activeId}
          isOpen={showUnsuspendUser}
          closeModal={closeUnsuspendUserModal}
        />
      )}
    </>
  );
};

export default CommercialCustomer;
