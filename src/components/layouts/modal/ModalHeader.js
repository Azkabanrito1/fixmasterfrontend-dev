import Logo from "../../globalcomponents/Logo";
import { PageHeading } from "../../globalcomponents/Utilities";
import { CloseButton, Header } from "./ModalComponents";

const ModalHeader = ({
  closeModal,
  closeButtonText,
  title,
  subHeading,
  mb,
  pb,
}) => {
  return (
    <Header mb={mb} pb={pb} className="flex-column border-0">
      {!!closeModal && (
        <CloseButton onClick={closeModal}>
          {closeButtonText || "Close"}
        </CloseButton>
      )}
      <Logo mb="1rem" />
      <PageHeading>{title}</PageHeading>
      {subHeading && <p>{subHeading}</p>}
    </Header>
  );
};

export default ModalHeader;
