import { useState } from "react";
import styled from "styled-components";
import ConfirmDeleteModal from "../../../../../globalcomponents/modals/ConfirmDeleteModal";
import GlobalTableActions from "../../../../../globalcomponents/GlobalTableActions";
import { useSnackbar } from "notistack";
import { useDeleteCollaboratorBankAccount } from "../../../../../../hooks/useQueries/useOnboarding";

// const SetDefaultBankBtn = ({ isDefault, setDefault, id }) => {
//   return (
//     <DefaultBtn isDefault={isDefault} onClick={() => setDefault(id)}>
//       {isDefault ? "Default Account" : "Set as Default"}
//     </DefaultBtn>
//   );
// };

const BankCard = ({ bankInfo = [], setDefaultAccount }) => {
  const [showDeletionModal, setShowDeletionModal] = useState(false);
  const [activeId, setActiveId] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const defaultAccount = bankInfo?.filter((account) => account.isDefault);
  const nonDefaultAccount = bankInfo?.filter((account) => !account.isDefault);

  const setDefault = (id) => setDefaultAccount(id);

  const showDeletionModalHandler = (id) => {
    setShowDeletionModal(true);
    setActiveId(id);
  };
  const closeDeletionModal = () => setShowDeletionModal(false);

  //--------------------------------mutate fn--------------------------------
  const onSuccessDeletion = () => {
    enqueueSnackbar("Success", { variant: "success" });
    closeDeletionModal();
  };
  const onFailureDeletion = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
  };
  const { mutate: deletBankAccount, isLoading } =
    useDeleteCollaboratorBankAccount(onSuccessDeletion, onFailureDeletion);

  return (
    <>
      {defaultAccount?.map((item, index) => {
        const actions = [
          {
            id: 1,
            name: "Delete Account",
            action: () => showDeletionModalHandler(item.id),
          },
        ];
        return (
          <BankDetails key={index}>
            <div className="d-flex justify-content-between align-items-center mb-3 p-2">
              <div
                className="rounded px-3 fw-bold"
                style={{
                  fontSize: 14,
                }}
              ></div>
              <GlobalTableActions actions={actions} id="delete" />
            </div>
            <div className="px-3">
              <div className="d-flex justify-content-between mt-3">
                <p className="text-muted fw-bold">Bank Name</p>
                <span className="text-capitalize">{item.bankName}</span>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <p className="text-muted fw-bold">Account Number</p>
                <span>{item.acctNumber}</span>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <p className="text-muted fw-bold">Account Name</p>
                <span>{item.accountName}</span>
              </div>
            </div>
            {/* <SetDefaultBankBtn
              id={item.id}
              setDefault={setDefault}
              isDefault={item.isDefault}
            /> */}
          </BankDetails>
        );
      })}

      {nonDefaultAccount?.map((accounts, index) => {
        const actions = [
          {
            id: 1,
            name: "Delete Account",
            action: () => showDeletionModalHandler(accounts.id),
          },
        ];
        return (
          <BankDetails key={index}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="rounded p-2 px-3 fw-bold"></div>
              <GlobalTableActions actions={actions} id="delete" />
            </div>
            <div className="px-3">
              <div className="d-flex gap-3 justify-content-between mt-3">
                <p className="text-muted fw-bold">Bank Name</p>
                <span className="fs-6 text-capitalize">
                  {accounts.bankName}
                </span>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <p className="text-muted fw-bold">Account Number</p>
                <span className="fs-6">{accounts.acctNumber}</span>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <p className="text-muted fw-bold">Account Name</p>
                <span className="fs-6">{accounts.accountName}</span>
              </div>
            </div>
            {/* <SetDefaultBankBtn
              id={accounts.id}
              setDefault={setDefault}
              isDefault={accounts.isDefault}
            /> */}
          </BankDetails>
        );
      })}
      {showDeletionModal && (
        <ConfirmDeleteModal
          isLoading={isLoading}
          open={showDeletionModal}
          close={closeDeletionModal}
          onDelete={() => deletBankAccount(activeId)}
          pText={"Are you sure you want to delete this bank details"}
          labelText={"Delete Bank Details"}
          actionText={"Delete"}
        />
      )}
    </>
  );
};

export default BankCard;

const BankDetails = styled.div`
  padding-bottom: 1rem;
  background-color: #ffffff;
  border: 2px solid #ffffff;
  border-radius: 1rem;
  gap: 1rem;
`;

const DefaultBtn = styled.button`
  appearance: none;
  width: 100%;
  background-color: ${({ isDefault }) =>
    isDefault ? "green" : "var(--clr-primary)"};
  margin-top: 1.5rem;
  padding: 1rem;
  border: none;
  border-radius: 0 0 1rem 1rem;
  text-align: center;
  color: white;
  font-weight: 700;
  cursor: pointer;
`;
