import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import { Link } from "react-router-dom";
import styled from "styled-components";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import { useState } from "react";
import AddEarningModal from "../../../components/admincomponents/masterdata/AddEarningModal";
import {
  useCreateCollaboratorEarnings,
  useDeleteCollaboratorEarnings,
  useGetCollaboratorEarnings,
  useUpdateCollaboratorEarnings,
} from "../../../hooks/useQueries/useAdmin";
import { useSnackbar } from "notistack";
import { useGetCollaboratorRoles } from "../../../hooks/useQueries/useIdentity";
import ConfirmDeleteModal from "../../../components/globalcomponents/modals/ConfirmDeleteModal";

const EarningHome = () => {
  const [showEarningModal, setShowEarningModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [activeEarnings, setActiveEarnings] = useState({});
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  //----------------------------------------------------------------modal controller------------------------------------------------------------------------------------
  const showUpdateModalHandler = (id) => {
    const activeEarning = usersEarningsData?.data?.find(
      (item) => item.id === id
    );
    setActiveEarnings(activeEarning);
    setShowUpdateModal(true);
  };
  const showDeleteModalHandler = (id) => {
    const activeEarning = usersEarningsData?.data?.find(
      (item) => item.id === id
    );
    setActiveEarnings(activeEarning);
    setOpenDeleteModal(true);
  };
  const showaddHandler = () => setShowEarningModal(true);

  const columns = [
    {
      name: "s/n",
      label: "S/N",
      options: {
        customBodyRender: (_, index) => index.rowIndex + 1,
      },
    },

    {
      name: "employmentType",
      label: "Employment Type",
    },
    {
      name: "description",
      label: "Description",
    },
    {
      name: "earningValue",
      label: "Earning",
    },
    {
      name: "id",
      label: "Action",
      options: {
        customBodyRender: (value) => {
          const actions = [
            {
              id: 0,
              name: "Update",
              action: () => showUpdateModalHandler(value),
            },
            {
              id: 1,
              name: "Delete",
              action: () => showDeleteModalHandler(value),
            },
          ];
          return <GlobalTableActions id="id" actions={actions} />;
        },
      },
    },
  ];

  //----------------------------------------------------------------data fetching---------------------------------------------
  const { data: usersEarningsData, isLoading } = useGetCollaboratorEarnings();
  const { data: rolesData } = useGetCollaboratorRoles();

  //----------------------------------------------------------------mutate $ mutate function------------------------------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    setShowEarningModal(false);
    setShowUpdateModal(false);
    setOpenDeleteModal(false);
  };

  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };

  const { mutate: createEarning, isLoading: isCreating } =
    useCreateCollaboratorEarnings(onSuccess, onFailure);

  const { mutate: updateCollabEarning, isLoading: isUpdating } =
    useUpdateCollaboratorEarnings(onSuccess, onFailure);

  const { mutate: deleteCollabEarning, isLoading: isDeleting } =
    useDeleteCollaboratorEarnings(onSuccess, onFailure);

  // ----------------------------------------------------------------Making Api Call ----------------------------------------------------------------
  const createCollaboratorEarnings = (initPayload) => {
    const payload = {
      role: initPayload.role,
      employmentTypeId: initPayload.employmentTypeId,
      earningValue: initPayload.earningValue,
      valueType: initPayload.valueType,
      description: initPayload.description,
    };
    createEarning(payload);
  };

  const updateEarning = (initPayload) => {
    const payload = {
      role: initPayload.role,
      employmentTypeId: initPayload.employmentTypeId,
      earningValue: initPayload.earningValue,
      valueType: initPayload.valueType,
      description: initPayload.description,
      id: activeEarnings?.id,
    };

    updateCollabEarning(payload);
  };

  return (
    <>
      <Header>
        <BackBtnWrapper>
          <BackBtn />
        </BackBtnWrapper>
        <PageHeading>Earnings</PageHeading>
        <GlobalBallBeat loading={isLoading} />
        <LinkWrapper>
          <Link
            onClick={() => showaddHandler()}
            className="btn"
            style={{ backgroundColor: "var(--clr-primary)", color: "#fff" }}
          >
            Add Collaboarator Earning
          </Link>
        </LinkWrapper>
      </Header>

      <GlobalTable columns={columns} data={usersEarningsData?.data} />

      {showEarningModal && (
        <AddEarningModal
          isOpen={showEarningModal}
          closeModal={() => setShowEarningModal(false)}
          actions={createCollaboratorEarnings}
          isLoading={isCreating}
          heading="Add Collaborator Earings"
          actionText="Add Collaborator Earings"
          rolesData={rolesData}
        />
      )}
      {showUpdateModal && (
        <AddEarningModal
          isOpen={showUpdateModal}
          closeModal={() => setShowUpdateModal(false)}
          actions={updateEarning}
          isLoading={isUpdating}
          heading="Update Collaborator Earings"
          actionText="Update Collaborator Earings"
          rolesData={rolesData}
          data={activeEarnings}
        />
      )}

      {openDeleteModal && (
        <ConfirmDeleteModal
          open={openDeleteModal}
          close={() => setOpenDeleteModal(false)}
          labelText="Delete  Earnings"
          pText="Are you sure you want to delete this collaborator earings?"
          actionText="Delete"
          onDelete={() => deleteCollabEarning(activeEarnings?.id)}
          isLoading={isDeleting}
        />
      )}
    </>
  );
};

export default EarningHome;

const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const BackBtnWrapper = styled.div`
  margin-right: 10px;

  @media screen and (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

const LinkWrapper = styled.div`
  @media screen and (max-width: 768px) {
    margin-top: 10px;
  }
`;
