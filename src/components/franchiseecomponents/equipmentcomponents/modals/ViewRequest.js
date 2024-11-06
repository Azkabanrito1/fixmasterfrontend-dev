import { Stack } from "@mui/material";
import { useGetHireRequestDetails } from "../../../../hooks/useQueries/useJobs";
import GlobalAltBtn from "../../../globalcomponents/GlobalAltBtn";
import GlobalBallBeat from "../../../globalcomponents/GlobalBallBeat";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import moment from "moment";
import { GroupHeading, Grid } from "../../../globalcomponents/Utilities";
import GlobalTable from "../../../globalcomponents/GlobalTable";

const Detail = ({ heading, data }) => {
  return (
    <div>
      <h3>{heading}</h3>
      <span>{data}</span>
    </div>
  );
};

const ViewHireRequest = ({
  isOpen,
  closeModal,
  fixId,
  openAcceptModal,
  openRejectModal,
  fixStatus,
}) => {
  const { data: fixRequestData, isLoading: loadingFixData } =
    useGetHireRequestDetails(fixId);

  const ids = fixRequestData?.data?.equipmentInfo?.map(
    (eqp) => +eqp.equipmentId
  );

  const columns = [
    {
      name: "sn",
      label: "S/N",
      options: {
        customBodyRender: (_, meta) => meta.rowIndex + 1,
      },
    },
    { name: "name", label: "Equipment Name" },
    {
      name: "quantity",
      label: "Quantity",
    },
  ];

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader
        heading="Equipment Request Details"
        closeModal={closeModal}
      />
      <GlobalBallBeat loading={loadingFixData} />
      <Grid columns={3}>
        <Detail heading="Job ID" data={fixRequestData?.data?.fixId} />
        <Detail
          heading="Job Category"
          data={fixRequestData?.data?.fixCategory}
        />
        <Detail heading="Time Needed" data={fixRequestData?.data?.timeNeeded} />
        <Detail
          heading="Date Needed"
          data={moment(fixRequestData?.data?.dateNeeded).format("DD-MM-YYYY")}
        />
      </Grid>

      <GroupHeading className="mt-3 fs-5 orange">Equipment Needed</GroupHeading>
      <GlobalTable
        columns={columns}
        data={fixRequestData?.data?.equipmentInfo}
        options={{ displayToolbar: false, pagination: false }}
      />

      {fixRequestData?.data?.equipmentInfo?.[0]?.status?.toLowerCase() ===
        "awaiting" && (
        <Stack
          marginTop={3}
          direction={"row"}
          justifyContent={"space-between"}
          spacing={3}
        >
          <GlobalBtn onClick={() => openAcceptModal(ids)}>Accept</GlobalBtn>
          <GlobalAltBtn onClick={() => openRejectModal(ids)}>
            Reject
          </GlobalAltBtn>
        </Stack>
      )}
    </GlobalModal>
  );
};

export default ViewHireRequest;
