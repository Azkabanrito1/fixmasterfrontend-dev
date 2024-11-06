import styled from "styled-components";
import { useState } from "react";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import EquipmentHistory from "../../../components/franchiseecomponents/equipmentcomponents/modals/EquipmentHistory";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import {
  useGetEqpActivities,
  useGetEqpHistory,
} from "../../../hooks/useQueries/useJobs";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import { Button } from "@mui/material";

const EquipmentActivity = () => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [activeEquipment, setActiveEquipment] = useState(null);

  const openEquipmentHistory = (id) => {
    setActiveEquipment(id);
    setIsHistoryOpen(true);
  };

  //------------------------------data fetching------------------------
  const { data: activityData, isLoading } = useGetEqpActivities();
  const { data: historyData, isLoading: loading } = useGetEqpHistory(
    activeEquipment,
    {
      enabled: !!activeEquipment,
    }
  );
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
    { name: "equipmentName", label: "Equipment Name" },
    { name: "numberHired", label: "Number of Hires" },
    { name: "totalAmountGenerated", label: "Amount Generated" },
    {
      name: "equipmentId",
      label: "Actions",
      options: {
        customBodyRender: (value) => (
          <Button
            variant="contained"
            color="warning"
            onClick={() => openEquipmentHistory(value)}
          >
            View Hire History
          </Button>
        ),
      },
    },
  ];

  return (
    <>
      <div className="mb-5">
        <PageHeading>Equipment Activity</PageHeading>
        <BackBtn />
      </div>

      <GlobalBallBeat loading={isLoading} />

      {!isLoading && (
        <GlobalTable data={activityData?.data || []} columns={columns} />
      )}
      {isHistoryOpen && (
        <EquipmentHistory
          isOpen={isHistoryOpen}
          closeModal={() => setIsHistoryOpen(false)}
          activeEquipment={activeEquipment}
          isLoading={loading}
          historyData={historyData?.data}
        />
      )}
    </>
  );
};

export default EquipmentActivity;
