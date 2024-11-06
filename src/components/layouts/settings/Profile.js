import UserProfile from "./UserProfile";
import styled from "styled-components";
import { useState } from "react";
import BankCard from "../../csecomponent/cse/dashboardComponent/setting/preference/BankCard";
import {
  useGetStageId,
  useUpdateCreateCollaboratorBankAccount,
} from "../../../hooks/useQueries/useOnboarding";
import AddBtn from "../../franchiseecomponents/jobsmanagement/AddBtn";
import BankForm from "../../csecomponent/cse/dashboardComponent/setting/preference/BankForm";
import { useSnackbar } from "notistack";
import { useGetBankDetails } from "../../../hooks/useQueries/useJobs";

const Profile = ({ canSelectContractType }) => {
  const [addBank, setAddBank] = useState(false);

  const { data: bankInfo } = useGetBankDetails();
  const { data: stageDetails } = useGetStageId();

  const openBankForm = function () {
    setAddBank(true);
  };
  const { enqueueSnackbar } = useSnackbar();

  //--------------------------------mutate fn--------------------------------
  const onSuccess = () => {
    enqueueSnackbar("Success", { variant: "success" });
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
  };
  const { mutate: setDefaultAccount } = useUpdateCreateCollaboratorBankAccount(
    onSuccess,
    onFailure
  );

  return (
    <PersonalInformation isCompleted={stageDetails?.data?.isCompleted}>
      <UserProfile canSelectContractType={canSelectContractType} />
      {stageDetails?.data?.isCompleted && (
        <BankDetails>
          <h3 className="fw-bold mb-3 fs-5 fs-md-4"> Bank Details</h3>
          <AccountContainer>
            <BankCard
              bankInfo={bankInfo?.data}
              setDefaultAccount={setDefaultAccount}
            />
          </AccountContainer>
          <AddBtn text="Add Bank" action={openBankForm} />
          {addBank && (
            <BankForm isopen={addBank} closeModal={() => setAddBank(false)} />
          )}
        </BankDetails>
      )}
    </PersonalInformation>
  );
};

export default Profile;

const PersonalInformation = styled.div`
  display: grid;
  grid-template-columns: ${({ isCompleted }) =>
    isCompleted ? "2fr 1fr" : "1fr"};
  gap: 2rem;
  overflow: hidden;

  @media screen and (max-width: 992px) {
    display: block;
  }
`;

const AccountContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  overflow-y: auto;
`;

const BankDetails = styled.div`
  margin-top: 1.5rem;
  height: calc(100vh - 110px);
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 1px; /* width of the entire scrollbar */
  }
`;
