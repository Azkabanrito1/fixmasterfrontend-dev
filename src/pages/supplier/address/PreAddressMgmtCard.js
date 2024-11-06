import styled from "styled-components";
import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import { useState } from "react";
import { useSnackbar } from "notistack";
import ConfirmDeleteModal from "../../../components/globalcomponents/modals/ConfirmDeleteModal";

const PreAddressMgmtCard = ({
  data = {},
  showEditModalHandler,
  branchData,
}) => {
  const [showDeleteBranch, setShowDeleteBranch] = useState(false);
  const [activeBranchId, setActiveBranchId] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const openDeleteBranchModalHandler = (id) => {
    setShowDeleteBranch(true);
    setActiveBranchId(id);
  };
  const closeDeleteBranchModalhandler = () => {
    setShowDeleteBranch(false);
  };
  const onDeleteSuccess = () => {
    enqueueSnackbar("Branch address successfully deleted", {
      variant: "success",
    });
    closeDeleteBranchModalhandler();
  };
  const deleteBranchAddress = (index) => {
    console.log(index);
    if (index >= 0 && index < branchData.length) {
      branchData.splice(index, 1); // Remove the item at the specific index
      sessionStorage.setItem("payload", JSON.stringify(branchData)); // Update sessionStorage with the modified payload
      onDeleteSuccess();
    }
  };
  const cardTemplates = branchData?.map((item, index) => {
    const actions = [
      {
        id: 0,
        name: "Edit Branch Details",
        action: () => {
          showEditModalHandler(index);
        },
      },
      {
        id: 1,
        name: "Delete Address",
        action: () => {
          openDeleteBranchModalHandler(index);
        },
      },
    ];

    return (
      <>
        <AddressCards key={index}>
          <header className="d-flex justify-content-between ">
            <h3>{item.primaryBranch ? "Head Office" : "Other Branch"}</h3>
            <GlobalTableActions actions={actions} id="id" />
          </header>

          <div className="body">
            <div>
              <h3 className="fs-6 fw-bold text-dark">
                Contact Location/Address
              </h3>
              <p>{item.breanchAddress}</p>
            </div>
            <div className="mb-2">
              <h3 className="fs-6 fw-bold text-dark">Contact Details</h3>
              <span className="d-block mb-1">{item.branchPhoneNumber}</span>
              <span className="d-block">{item.branchEmailAddress}</span>
            </div>
          </div>
        </AddressCards>
        {showDeleteBranch && (
          <ConfirmDeleteModal
            open={showDeleteBranch}
            close={closeDeleteBranchModalhandler}
            onDelete={() => deleteBranchAddress(activeBranchId)}
            pText={"Are you sure you want to delete this branch details"}
            labelText={"Delete Branch Details"}
            actionText={"Delete"}
          />
        )}
      </>
    );
  });
  return (
    <>
      <CardContainer>{cardTemplates}</CardContainer>
    </>
  );
};

export default PreAddressMgmtCard;

export const CardContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const AddressCards = styled.div`
  background-color: #fafafa;
  border-radius: 0.8rem;
  box-shadow: 0 4px 10px #ccccccfa;
  padding: 1rem;

  header {
    margin-bottom: 1rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: #fff0e9;
    color: var(--clr-primary);

    h3 {
      font-size: 1.2rem;
      margin-bottom: 0;
    }
  }
  p{
    word-wrap: break-word; /* forces text to wrap if it's too long for the container */
    overflow-wrap: break-word; /* newer alternative for better browser support */
  }
`;
