import { useState } from "react";

const useUserActionModals = () => {
  const [activeId, setActiveId] = useState(null);
  const [showSuspendUser, setShowSuspendUser] = useState(false);
  const [showUnsuspendUser, setShowUnsuspendUser] = useState(false);

  const openSuspendUserModal = (id) => {
    setActiveId(id);
    setShowSuspendUser(true);
  };
  const openUnsuspendUserModal = (id) => {
    setActiveId(id);
    setShowUnsuspendUser(true);
  };
  const closeSuspendUserModal = () => setShowSuspendUser(false);
  const closeUnsuspendUserModal = () => setShowUnsuspendUser(false);

  return {
    activeId,
    showSuspendUser,
    showUnsuspendUser,
    openSuspendUserModal,
    openUnsuspendUserModal,
    closeSuspendUserModal,
    closeUnsuspendUserModal,
  };
};

export default useUserActionModals;
