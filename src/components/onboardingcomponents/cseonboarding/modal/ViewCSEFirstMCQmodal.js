import { BallBeat } from "react-pure-loaders";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import GlobalTable from "../../../globalcomponents/GlobalTable";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import { Chip } from "@mui/material";

const ViewCSEFirstMCQModal = ({ open, close, headerText, data, isLoading }) => {
  const applicantColumns = [
    {
      name: "S/N",
      options: {
        customBodyRender: (_, tableMeta) => tableMeta.rowIndex + 1,
      },
    },
    {
      name: "name",
      label: "Name",
    },
    {
      name: "examScore",
      label: "Score",
    },
    {
      name: "grade",
      label: "Status",
      options: {
        customBodyRender: (value) => (
          <Chip
            label={value}
            color={value?.toLowerCase() === "passed" ? "success" : "error"}
          />
        ),
      },
    },
    {
      name: "mcqUrl",
      label: "Video",
      options: {
        customBodyRender: (value) =>
          !!value ? (
            <a href={value} target="_blank" className="video fw-bold">
              View Video
            </a>
          ) : (
            <div className="fw-bold">N/A</div>
          ),
      },
    },
  ];
  return (
    <>
      <GlobalModal isOpen={open} closeModal={close}>
        <AltModalHeader closeModal={close} heading={headerText} />
        <div style={{ textAlign: "center" }}>
          <BallBeat loading={isLoading} color="var(--clr-primary)" />
        </div>
        <GlobalTable
          columns={applicantColumns}
          data={data || []}
          options={{
            elevation: 0,
            selectableRows: "none",
            rowsPerPage: 20,
            filter: false,
            search: false,
            viewColumns: false,
            print: false,
            download: false,
            rowsPerPageOptions: [20, 50, 100],
          }}
        />
      </GlobalModal>
    </>
  );
};
export default ViewCSEFirstMCQModal;
