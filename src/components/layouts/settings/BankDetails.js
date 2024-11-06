import styled from "styled-components";
import { SectionHeading } from "../../../pages/franchisee/jobs/MyJobDetails";
import BankForm from "../../csecomponent/cse/dashboardComponent/setting/preference/BankForm";
import AddBtn from "../../franchiseecomponents/jobsmanagement/AddBtn";
import { useState } from "react";
import BankCard from "../../csecomponent/cse/dashboardComponent/setting/preference/BankCard";
import { useGetBankDetails } from "../../../hooks/useQueries/useOnboarding";

const BankDetails = () => {
  const [addBank, setAddBank] = useState(false);
  const {data: bankInfo} = useGetBankDetails()

  const openBankForm = function () {
    setAddBank(true);
  };
  return (
    <>
      <AccountContainer>
        <BankCard bankInfo={bankInfo?.data} />
      </AccountContainer>

      <AddBtn text="Add Bank" action={openBankForm} />
      {addBank && <BankForm isopen={addBank} closeModal={() =>setAddBank(false)}/>}
      </>
  );
};

export default BankDetails;

const AccountContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.2rem;
  @media only screen and (max-width: 756px) {
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
  }
`;
