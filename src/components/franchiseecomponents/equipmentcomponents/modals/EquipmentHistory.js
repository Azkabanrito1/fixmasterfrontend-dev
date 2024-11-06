import GlobalModal from "../../../../components/globalcomponents/GlobalModal";
import AltModalHeader from "../../../../components/layouts/modal/AltModalHeader";
import { BallBeat } from "react-pure-loaders";
import GlobalTable from "../../../globalcomponents/GlobalTable";
import { format } from "date-fns";

const EquipmentHistory = ({ isOpen, closeModal, historyData, isLoading }) => {
  console.log(historyData);
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
      name: "fixId",
      label: "Job ID",
    },
    {
      name: "quantity",
      label: "Quantity",
    },
    {
      name: "amountGenerated",
      label: "Value of Job",
    },
    {
      name: "fixCategory",
      label: "Category",
    },
    {
      name: "dateBurrowed",
      label: "Borrowed Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "MM/dd/yyyy"),
      },
    },
    {
      name: "returnDate",
      label: "Return Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "hh:mm a"),
      },
    },
  ];

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader heading="Hire History" closeModal={closeModal} />
      <div className="text-center">
        <BallBeat color="var(--clr-primary)" loading={isLoading} />
      </div>
      <GlobalTable
        columns={columns}
        data={
          historyData?.equipmentHistoryDetails === null
            ? []
            : historyData?.equipmentHistoryDetails
        }
      />
      <div className="d-flex justify-content-between mx-3">
        <span style={{ color: "#f26222" }} className="fs-4">
          Total
        </span>
        <span style={{ color: "#a1a1a1", fontWeight: "bold" }} className="fs-3">
          NGN{historyData?.totalAmountGenerated}
        </span>
      </div>
    </GlobalModal>
  );
};

export default EquipmentHistory;
