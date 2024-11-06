import { useSnackbar } from "notistack";
import { useUnsuspendUser } from "../../../../hooks/useQueries/useIdentity";
import ConfirmDeleteModal from "../../../globalcomponents/modals/ConfirmDeleteModal";

const UnsuspendUserModal = ({ isOpen, closeModal, activeId, role }) => {
  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    closeModal();
  };
  const onFail = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };
  const { mutate: unsuspendUser, isLoading } = useUnsuspendUser(
    onSuccess,
    onFail,
    role
  );

  return (
    <ConfirmDeleteModal
      isLoading={isLoading}
      labelText={"Unsuspend User"}
      pText={"Are you sure you want to unsuspend this user"}
      close={closeModal}
      open={isOpen}
      onDelete={() => unsuspendUser(activeId)}
      actionText={"Unsuspend"}
    />
  );
};

export default UnsuspendUserModal;
