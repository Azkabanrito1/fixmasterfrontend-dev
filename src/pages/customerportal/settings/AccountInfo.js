import { useState } from "react";
import styled from "styled-components";
import UserCards from "../../../components/customercomponents/Settings/accountInfo/UserCards";
import PersonalInfo from "../../../components/customercomponents/Settings/accountInfo/PersonalInfo";
import BillingAddress from "../../../components/customercomponents/Settings/accountInfo/BillingAddress";
import AddCardForm from "../../../components/customercomponents/Settings/modals/AddCardForm";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import GlobalBtn from "../../../components/globalcomponents/GlobalBtn";
import {
  useDeleteCard,
  useGetCards,
} from "../../../hooks/useQueries/useIdentity";
import { useSnackbar } from "notistack";

function AccountInfo() {
  const [showModal, setShowModal] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
  };
  const onError = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };

  const { mutate: deleteCard } = useDeleteCard(onSuccess, onError);
  const { data: cardData } = useGetCards();

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="mb-5">
        <BackBtn />
        <PageHeading>Account Information</PageHeading>
      </div>

      <PersonalInformation>
        <PersonalInfo />
        <div>
          <h3 className="fw-bold mb-3 fs-6 fs-md-5">My Cards</h3>
          <UserCards userCards={cardData?.userCards} deleteCard={deleteCard} />
          <GlobalBtn
            mx="auto"
            bdRad="50%"
            width="max-width"
            px="0"
            py="0"
            onClick={openModal}
          >
            <img src="/images/roundCrossButton.svg" alt="round cross button" />
          </GlobalBtn>
        </div>
      </PersonalInformation>
      <BillingAddress userCards={cardData?.userCards} />
      {showModal && <AddCardForm open={showModal} close={closeModal} />}
    </div>
  );
}

export default AccountInfo;

const PersonalInformation = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 5rem;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;
