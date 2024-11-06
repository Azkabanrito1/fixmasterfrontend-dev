import { Header, Heading, CloseXBtn } from "./ModalComponents";
import Logo from "../../globalcomponents/Logo";
import { AiOutlineCloseCircle } from "react-icons/ai";

const AltModalHeader = ({ heading, closeModal, mb, pb, alignText, children }) => {
  return (
    <div style={{ marginBottom: mb || "32px", textAlign: alignText }}>
      <Header pb={pb}>
        <Logo maxWidth={"110px"} />
        {closeModal && (
          <CloseXBtn onClick={closeModal}>
            <AiOutlineCloseCircle />
          </CloseXBtn>
        )}
      </Header>
      {heading && <Heading className="text-capitalize">{heading}</Heading>}
      {children}
    </div>
  );
};

export default AltModalHeader;
