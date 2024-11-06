import {
  BackBtn,
  OnboardingStageNav,
  PageHeading,
} from "../../../../components/globalcomponents/Utilities";
import { useLocation } from "react-router-dom";
import GlobalTable from "../../../../components/globalcomponents/GlobalTable";
import GlobalBallBeat from "../../../../components/globalcomponents/GlobalBallBeat";
import { format } from "date-fns";
import { useGetAllGuarantorInformation } from "../../../../hooks/useQueries/useAdmin";
import { Chip } from "@mui/material";
import GlobalTableActions from "../../../../components/globalcomponents/GlobalTableActions";
import { useState } from "react";
import MoreGuarantorInfo from "./MoreGuarantorInfo";

const GuarantorsInfo = ({ collaborator }) => {
  const location = useLocation();
  const [openViewModal, setOpenViewModal] = useState(false);
  const [activeGuarantor, setActiveGuarantor] = useState({});

  const { data: guarantorInformation, isLoading } =
    useGetAllGuarantorInformation(collaborator);

  const getActiveGuarantor = (id) =>
    guarantorInformation?.filter((guarantor) => guarantor.attachmentId === id);

  const openViewMoreModal = (id) => {
    const guarantor = getActiveGuarantor(id);
    setActiveGuarantor(guarantor[0]);

    setOpenViewModal(true);
  };

  const closeViewMoreModal = () => {
    setOpenViewModal(false);
    setActiveGuarantor({});
  };

  const columns = [
    {
      name: "S/N",
      options: {
        filter: false,
        searchable: false,
        customBodyRender: (_value, MUIDataTableMeta) => {
          return MUIDataTableMeta.rowIndex + 1;
        },
      },
    },

    {
      name: "guarantorName",
      label: "Guarantor Name",
    },
    {
      name: "email",
      label: "Email",
    },
    {
      name: "phone",
      label: "Phone No.",
    },
    {
      name: "applicantName",
      label: "Collaborator Name",
    },
    {
      name: "relationship",
      label: "Relationship",
    },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (value) => (
          <Chip
            label={value}
            color={value.toLowerCase() === "confirmed" ? "success" : "error"}
          />
        ),
      },
    },
    {
      name: "attachmentId",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        searchable: false,
        customBodyRender: (value) => {
          const actions = [
            {
              id: 0,
              name: "View More",
              action: () => openViewMoreModal(value),
            },
          ];

          return (
            <div className="text-center">
              <GlobalTableActions actions={actions} id="guarantors-info" />
            </div>
          );
        },
      },
    },
  ];

  return (
    <div>
      <BackBtn />
      <PageHeading style={{ marginBottom: "32px" }}>
        {`${collaborator}s' Guarantors' Information`}
      </PageHeading>

      <GlobalBallBeat loading={isLoading} />

      {!isLoading && guarantorInformation?.length > 0 && (
        <GlobalTable columns={columns} data={guarantorInformation} />
      )}
      {!isLoading && guarantorInformation?.length === 0 && (
        <p className="text-center">{`No guarantors for ${collaborator}s`}</p>
      )}

      {openViewModal && (
        <MoreGuarantorInfo
          isOpen={openViewModal}
          closeModal={() => closeViewMoreModal()}
          guarantorId={activeGuarantor?.attachmentId}
          headerText={`${activeGuarantor?.guarantorName}'s Information`}
          collaborator={collaborator}
        />
      )}
    </div>
  );
};

export default GuarantorsInfo;
