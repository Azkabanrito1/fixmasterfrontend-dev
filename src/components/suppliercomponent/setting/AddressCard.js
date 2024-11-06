import styled from "styled-components";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import ConfirmDeleteModal from "../../globalcomponents/modals/ConfirmDeleteModal";
import { useState } from "react";
import { useDeleteSupplierBranchAddress } from "../../../hooks/useQueries/useOnboarding";
import { useSnackbar } from "notistack";

const AddressCard = ({
  data = {},
  showEditModalHandler,
  branchData,
  editBranch,
}) => {
  const [showDeleteBranch, setShowDeleteBranch] = useState(false);
  const [activeBranchId, setActiveBranchId] = useState("");

  const { enqueueSnackbar } = useSnackbar();

  const openDeleteBranchModalHandler = (id) => {
    setActiveBranchId(id);
    setShowDeleteBranch(true);
  };
  const closeDeleteBranchModalhandler = () => {
    setActiveBranchId(null);
    setShowDeleteBranch(false);
  };

  //--------------------------------mutate fn--------------------------------
  const onSuccessDeletion = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    closeDeleteBranchModalhandler();
  };
  const onFailureDeletion = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
  };
  const { mutate: deleteBranchAddress, isLoading } =
    useDeleteSupplierBranchAddress(onSuccessDeletion, onFailureDeletion);

  const cardTemplates = branchData?.map((item) => {
    const actions = [
      {
        id: 0,
        name: "Edit Branch Details",
        action: () => {
          showEditModalHandler(item.id);
        },
      },
      {
        id: 1,
        name: "Delete Address",
        action: () => openDeleteBranchModalHandler(item.id),
        // disabled: branchData.length > 0 ? true : false,
      },
    ];

    return (
      <>
        <AddressCards key={item.id}>
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
            isLoading={isLoading}
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
  const editBranchDetails = [];
  editBranchDetails.push(editBranch);
  const cardEditTemplate = editBranchDetails?.map((item) => {
    const actions = [
      {
        id: 0,
        name: "Edit Branch Details",
        action: () => showEditModalHandler(item.id),
      },
      {
        id: 1,
        name: "Delete Address",
        action: () => openDeleteBranchModalHandler(item.id),
        disabled: editBranchDetails.length > 0 ? true : false,
      },
    ];

    return (
      <>
        <AddressCards key={item?.id}>
          <header className="d-flex justify-content-between ">
            <h3>{item?.primaryBranch ? "Head Office" : "Other Branch"}</h3>
            <GlobalTableActions actions={actions} id="id" />
          </header>

          <div className="body">
            <div>
              <h3 className="fs-6 fw-bold text-dark">
                Contact Location/Address
              </h3>
              <p>{item?.breanchAddress}</p>
            </div>
            <div className="mb-2">
              <h3 className="fs-6 fw-bold text-dark">Contact Details</h3>
              <span className="d-block mb-1">{item?.branchPhoneNumber}</span>
              <span className="d-block">{item?.branchEmailAddress}</span>
            </div>
          </div>
        </AddressCards>
        {showDeleteBranch && (
          <ConfirmDeleteModal
            isLoading={isLoading}
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

  const cardTemplate = Object?.values(data)?.map((item) => {
    const actions = [
      {
        id: 0,
        name: "Edit Branch Details",
        action: () => showEditModalHandler(item.id),
      },
      {
        id: 1,
        name: "Delete Address",
        action: () => openDeleteBranchModalHandler(item.id),
        disabled: false,
      },
    ];

    return (
      <>
        <AddressCards key={item.id}>
          <header className="d-flex justify-content-between ">
            <h3>{item.primaryBranch ? "Head Office" : "Other Branch"}</h3>
            <GlobalTableActions actions={actions} id="id" />
          </header>

          <div className="body">
            <div>
              <h3 className="fs-6 fw-bold text-dark">
                Contact Location/Address
              </h3>
              <p>{item.branchAddress}</p>
            </div>
            <div className="mb-2">
              <h3 className="fs-6 fw-bold text-dark">Contact Details</h3>
              <span className="d-block mb-1">{item.branchPhoneNumber}</span>
              <span className="d-block">{item.branchEmail}</span>
            </div>
          </div>
        </AddressCards>
        {showDeleteBranch && (
          <ConfirmDeleteModal
            isLoading={isLoading}
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
  const sessionTemplate = sessionStorage.getItem("editBranch")
    ? cardEditTemplate
    : cardTemplates;
  return (
    <>
      <CardContainer>
        {data.length > 0 ? cardTemplate : sessionTemplate}
      </CardContainer>
    </>
  );
};

export default AddressCard;

export const CardContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

export const AddressCards = styled.div`
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
`;
