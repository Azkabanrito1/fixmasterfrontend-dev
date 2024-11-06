import React, { useState } from "react";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import { Link } from "react-router-dom";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import {
  useAcademicsQualification,
  useDeleteAcademicsQualification,
  useGetAcademicsQualifications,
  useUpdateAcademicsQualification,
} from "../../../hooks/useQueries/useAdmin";
import Qualification from "../../../components/admincomponents/masterdata/Qualification";
import { useSnackbar } from "notistack";
import ConfirmDeleteModal from "../../../components/globalcomponents/modals/ConfirmDeleteModal";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import { Chip } from "@mui/material";

const AccademicsQualificationHome = () => {
  const [openQualification, setOpenQualification] = useState(false);
  const [openUpdateQualification, setOpenUpdateQualification] = useState(false);
  const [activeQualification, setActiveQualification] = useState({});
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  //=============================================data fetching================================
  const { data: qualificationData, isLoading } =
    useGetAcademicsQualifications();

  const getActiveQualification = (id) =>
    qualificationData?.data?.filter((qualification) => qualification.id === id);

  const showQualification = () => setOpenQualification(true);
  const showUpdateQualification = (id) => {
    const qualification = getActiveQualification(id);
    setActiveQualification(qualification[0]);
    setOpenUpdateQualification(true);
  };

  const showDeleteQualification = (id) => {
    const qualification = getActiveQualification(id);
    setActiveQualification(qualification[0]);
    setOpenDeleteModal(true);
  };

  //--------------------------------------------------------muations & mutate functions--------------------------------------------------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    setOpenQualification(false);
    setOpenUpdateQualification(false);
    setOpenDeleteModal(false);
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };

  const { mutate: createQualifications, isLoading: isCreating } =
    useAcademicsQualification(onSuccess, onFailure);
  const { mutate: updateQualifications, isLoading: isUpdating } =
    useUpdateAcademicsQualification(onSuccess, onFailure);
  const { mutate: deleteQualification, isLoading: isDeleting } =
    useDeleteAcademicsQualification(onSuccess, onFailure);

  const columns = [
    {
      name: "s/n",
      label: "S/N",
      options: {
        customBodyRender: (_, index) => index.rowIndex + 1,
      },
    },
    {
      name: "longName",
      label: "Name",
    },
    {
      name: "recordStatus",
      label: "status",
      options: {
        customBodyRender: (value) => (
          <Chip
            label={value ? "Active" : "Disabled"}
            color={value ? "success" : "error"}
          />
        ),
      },
    },

    {
      name: "id",
      label: "Action",
      options: {
        customBodyRender: (value) => {
          const actions = [
            {
              id: 0,
              name: "Update Qualification",
              action: () => showUpdateQualification(value),
            },
            {
              id: 1,
              name: "Delete Qualification",
              action: () => showDeleteQualification(value),
            },
          ];
          return <GlobalTableActions id="id" actions={actions} />;
        },
      },
    },
  ];

  const addQualification = (initPayload) => {
    const payload = {
      shortName: initPayload.shortName,
      longName: initPayload.longName,
    };
    createQualifications(payload);
  };

  const updateQualification = (initPayload) => {
    const payload = {
      shortName: initPayload.shortName,
      longName: initPayload.longName,
      id: activeQualification?.id,
    };
    updateQualifications(payload);
  };

  const deleteAcademic = () => {
    const payload = activeQualification?.id;
    deleteQualification(payload);
  };

  return (
    <>
      <div className="position-relative mb-5">
        <BackBtn />
        <PageHeading>Academic Qualification</PageHeading>
        <GlobalBallBeat loading={isLoading} />
        <div>
          <Link
            onClick={showQualification}
            className="position-absolute top-0 end-0 btn"
            style={{ backgroundColor: "var(--clr-primary)", color: "#fff " }}
            width="max-content"
            px="2em"
          >
            Add Qualification
          </Link>
        </div>
      </div>

      <GlobalTable data={qualificationData?.data} columns={columns} />

      {openQualification && (
        <Qualification
          isOpen={openQualification}
          closeModal={() => setOpenQualification(false)}
          heading="Add Qualification"
          isCreating={isCreating}
          submit={addQualification}
          sText="Short Name"
          lText="Long Name"
          sPlaceHolder="Enter a short name e.g Bsc"
          lPlaceHolder={"Bachelor of Science"}
          actionText="Add Qualification"
        />
      )}
      {openUpdateQualification && (
        <Qualification
          isOpen={openUpdateQualification}
          closeModal={() => setOpenUpdateQualification(false)}
          heading="Update Qualification"
          isCreating={isUpdating}
          data={activeQualification}
          submit={updateQualification}
          sText="Short Name"
          lText="Long Name"
          sPlaceHolder="Enter a short name e.g Bsc"
          lPlaceHolder={"Bachelor of Science"}
          actionText="Update Qualification"
        />
      )}

      {openDeleteModal && (
        <ConfirmDeleteModal
          open={openDeleteModal}
          close={() => setOpenDeleteModal(false)}
          labelText="Delete Academic Qualification"
          pText="Are you sure you want to delete this qualification?"
          actionText="Delete"
          onDelete={deleteAcademic}
          isLoading={isDeleting}
        />
      )}
    </>
  );
};

export default AccademicsQualificationHome;
