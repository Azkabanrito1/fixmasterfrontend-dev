import AddBtn from "../../../../franchiseecomponents/jobsmanagement/AddBtn";
import RequestForm from "./RequestForm";
import { useState } from "react";
import FeedBack from "./FeedBack";
import { useOutletContext, useParams } from "react-router-dom";
import {
  useGetCustomerEquipment,
  useGetDiagnosisReport,
  useGetMeasurementUnits,
  useGetSupplyByFixId,
} from "../../../../../hooks/useQueries/useJobs";
import { useEffect } from "react";
import GlobalTable from "../../../../globalcomponents/GlobalTable";
import { Chip } from "@mui/material";
import { format } from "date-fns";
import { SectionHeading } from "../../../../globalcomponents/Utilities";
import FindingAndRecommendation from "../jobs/ongoings/diagnosticVisit/FindingAndRecommendation";

const SupplyReq = () => {
  const [units, setUnits] = useState([]);
  const { fixId } = useParams();
  const { jobDetails = {} } = useOutletContext();

  //----------------------------------data fetching--------------------------------
  const { data: measurementUnitData } = useGetMeasurementUnits();
  const { data: suppliesData } = useGetSupplyByFixId(fixId);
  const { data: equipmentData } = useGetCustomerEquipment(fixId);

  const { data: issuesAndRecommendationsData } = useGetDiagnosisReport(fixId);

  const fixEquipment = equipmentData?.data?.map((eqp) => ({
    id: eqp.equipmentId,
    name: eqp.equipmentName,
  }));

  useEffect(() => {
    if (measurementUnitData) {
      const unit = measurementUnitData?.data.map((unit) => {
        return {
          name: unit.abbr,
          id: unit.id,
        };
      });
      setUnits(unit);
    }
  }, [measurementUnitData]);
  const [open, setOpen] = useState(false);

  const openSupplyRequestForm = function () {
    setOpen(true);
  };
  const closeSupplyRequestForm = function () {
    setOpen(false);
  };
  const columns = [
    {
      name: "S/N",
      options: {
        customBodyRender: (_, meta) => meta.rowIndex + 1,
      },
    },
    {
      name: "name",
      label: "Supply Name",
    },
    {
      name: "quantity",
      label: "Quantity",
    },
    {
      name: "unitOfMeasurement",
      label: "Unit Of Measurement",
    },
    {
      name: "dateRequested",
      label: "Requested Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        filter: false,
        sort: false,
        searchable: false,
        customBodyRender: (value) => (
          <Chip
            label={value}
            color={value.toLowerCase() === "delivered" ? "success" : "error"}
          />
        ),
      },
    },
  ];
  return (
    <section>
      {issuesAndRecommendationsData?.data?.issuesAndRecommendations?.length >
        0 && <FindingAndRecommendation fixId={fixId} />}
      <SectionHeading className="mb-4">Supply Requests</SectionHeading>

      <GlobalTable
        columns={columns}
        data={suppliesData?.data}
        options={{ selection: "none" }}
      />

      <AddBtn action={openSupplyRequestForm} text="Request Supplies" />
      {open && (
        <RequestForm
          isOpen={open}
          closeModal={closeSupplyRequestForm}
          equipment={fixEquipment}
          units={units}
          fixId={fixId}
          jobDetails={jobDetails}
        />
      )}
      {/* <FeedBack /> */}
    </section>
  );
};

export default SupplyReq;
