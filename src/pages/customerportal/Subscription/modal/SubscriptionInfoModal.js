import GlobalBtn from "../../../../components/globalcomponents/GlobalBtn";
import GlobalModal from "../../../../components/globalcomponents/GlobalModal";
import AltModalHeader from "../../../../components/layouts/modal/AltModalHeader";
import styled from "styled-components";

const SubscriptionInfoModal = ({ open, close, headerText, buySub }) => {
  return (
    <GlobalModal
      isOpen={open}
      closeModal={close}
      shouldCloseOnOverlayClick={true}
    >
      <AltModalHeader
        closeModal={close}
        heading={headerText}
        alignText={`left`}
      />
      <InfoCard>
        Please note that your subscription plan is valid for the duration of <span style={{fontWeight: "bold"}}>ONE YEAR</span>
      </InfoCard>

      <GlobalBtn
        onClick={buySub}
        className="mt-4"
        mx="auto"
        width="auto"
        px="2.5em"
      >
        PROCEED
      </GlobalBtn>
    </GlobalModal>
  );
};

export default SubscriptionInfoModal;

const InfoCard = styled.div`
text-align: center;
font-size: 1.5rem;
padding: 50px 0px
`;
