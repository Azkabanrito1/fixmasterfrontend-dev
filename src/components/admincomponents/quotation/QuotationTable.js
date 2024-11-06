import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import GlobalTable from "../../globalcomponents/GlobalTable";
import { formatNumberWithCommas } from "../../../utils/utilityFxns";
import { useState } from "react";
import UpdateQuotationSettingsModal from "./modal/UpdateQuotationSettingsModal";

const QuotationTable = ({ quotationParams, isLoading }) => {
  const [updateSettings, setUpdateSettings] = useState(false);
  const [activeApplicant, setActiveApplicant] = useState({});
  const getActiveApplicant = (value) => {
    let applicantIndex = quotationParams?.findIndex((x) => x.id === value);
    setActiveApplicant(quotationParams[applicantIndex]);
  };

  // modal controls
  const updateQuoteSettings = (id) => {
    setUpdateSettings(true);
    getActiveApplicant(id);
  };

  const columns = [
    {
      name: "S/N",
      options: {
        filter: false,
        customBodyRender: (value, MUIDataTableMeta) => {
          return MUIDataTableMeta.rowIndex + 1;
        },
      },
    },
    {
      name: "minRoyaltyFee",
      label: "Min Royalty Fee",
      options: {
        customBodyRender: (value) => formatNumberWithCommas(value),
      },
    },
    {
      name: "maxRoyaltyFee",
      label: "Max Royalty Fee",
      options: {
        customBodyRender: (value) => formatNumberWithCommas(value),
      },
    },
    {
      name: "royaltyCapFee",
      label: "Fee Cap",
      options: {
        customBodyRender: (value) => formatNumberWithCommas(value),
      },
    },
    { name: "diagnosisFeePercent", label: "Diagnosis fee (%)" },
    {
      name: "id",
      label: "Actions",
      options: {
        sort: false,
        filter: false,
        customBodyRender: (value, meta) => {
          const actions = [
            {
              id: 1,
              name: "Update Settings",
              action: () => updateQuoteSettings(value),
            }
          ];
          return <GlobalTableActions actions={actions} id="quotation-params" />;
        },
      },
    },
  ];

  return (
    <>
      <GlobalBallBeat loading={isLoading} />

      {!isLoading && (
        <GlobalTable
          columns={columns}
          data={quotationParams}
          options={{
            elevation: 0,
            rowsPerPage: 20,
            selectableRows: "none",
            rowsPerPageOptions: [20, 50, 100],
          }}
        />
      )}
      {updateSettings && (
        <UpdateQuotationSettingsModal
          open={updateSettings}
          close={() => setUpdateSettings(false)}
          data={activeApplicant}
        />
      )}
    </>
  );
};

export default QuotationTable;
