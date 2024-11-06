import GlobalModal from "../GlobalModal";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import SwitchProfileAccount from "../SwitchProfileAccount";
import { useGetUserRole } from "../../../hooks/useQueries/useIdentity";

const SwitchProfile = ({ isOpen, closeModal }) => {
  const { data: userRole } = useGetUserRole();

  const defaultRole = userRole?.filter((role) => role.isDefault === true);
  const otherRoles = userRole?.filter((role) => role.isDefault === false);

  return (
    <GlobalModal width="500px" isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader heading={"Switch Profile"} closeModal={closeModal} />

      {/* arrange so that the default role is always on top */}
      {defaultRole?.map((role) => (
        <SwitchProfileAccount
          key={role.id}
          role={role.name}
          isDefault={role.isDefault}
        />
      ))}

      {otherRoles?.map((role) => (
        <SwitchProfileAccount
          key={role.id}
          role={role.name}
          isDefault={role.isDefault}
        />
      ))}
    </GlobalModal>
  );
};

export default SwitchProfile;
