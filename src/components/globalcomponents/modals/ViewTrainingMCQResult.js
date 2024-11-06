import AltModalHeader from "../../layouts/modal/AltModalHeader";
import GlobalModal from "../GlobalModal";
import GlobalTable from "../GlobalTable";
import { BallBeat } from "react-pure-loaders";

const ViewResult = ({ isOpen, closeModal, data, isLoading }) => {
  const applicantColumns = [
    {
      name: "S/N",
      options: {
        customBodyRender: (_, tableMeta) => tableMeta.rowIndex + 1,
      },
    },
    {
      name: "numberOfSitting",
      label: "Numbers of sittings",
    },
    {
      name: "passMark",
      label: "Pass Mark",
    },
    {
      name: "score",
      label: "Score",
    },
    {
      name: "mcqVidieoUrl",
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
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader heading="MCQ Test Results" closeModal={closeModal} />

      <div style={{ textAlign: "center" }}>
        <BallBeat loading={isLoading} color="var(--clr-primary)" />
      </div>

      {!isLoading && (
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
      )}
      {!isLoading && data?.length === 0 && (
        <p className="fs-5 text-center">No Mcq Test Result Available</p>
      )}
    </GlobalModal>
  );
};

export default ViewResult;
