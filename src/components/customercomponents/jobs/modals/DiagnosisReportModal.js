import GlobalModal from "../../../globalcomponents/GlobalModal";
import GlobalAltBtn from "../../../globalcomponents/GlobalAltBtn";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import { useNavigate } from "react-router-dom";
import { PATH_CUSTOMER } from "../../../../routes/paths";

const DownloadFile = ({ url, size, title }) => (
  <div className=" bg-light p-4 mb-4">
    <a
      href={url}
      download={"Diagnostics Report"}
      className="d-flex justify-content-between align-items-center"
      style={{ textDecoration: "none" }}
    >
      <div>
        <h3 className="fs-5 text-dark">{title}</h3>
        <span className="fs-6">{size}</span>
      </div>
      <img src="/images/pdf-red-icon.png" alt="pdf icon" />
    </a>
  </div>
);

const DiagnosisReport = ({ isOpen, closeModal, url, size, fixId }) => {
  const navigate = useNavigate();

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader heading="Diagnosis" closeModal={closeModal} />
      <div className="mx-auto mx-auto w-50">
        <p className="text-muted text-center">
          To view diagnosis, click to view and download reports
        </p>

        {/* <DownloadFile url={url} size={size} title={"Diagnostic Reports"} /> */}
      </div>
      <GlobalAltBtn
        width="max-content"
        px="1.5rem"
        mx="auto"
        onClick={() => navigate(`${PATH_CUSTOMER.diagnosisReport}/${fixId}`)}
      >
        View Diagnosis Report
      </GlobalAltBtn>
    </GlobalModal>
  );
};

export default DiagnosisReport;
