import { AssignmentHeader } from "../../franchiseecomponents/dashboardcomponents/DashboardHomeSection";
import LargeFileUpload from "../../globalcomponents/LargeFileUpload";
import GlobalBtn from "../../globalcomponents/GlobalBtn";

const LargFile = () => {
  return (
    <section className="mb-5">
      <AssignmentHeader>Add Pictures/Videos</AssignmentHeader>

      <div className="d-flex justify-content-center mb-3">
        <LargeFileUpload />
      </div>

      <GlobalBtn mx="auto">Send File</GlobalBtn>
    </section>
  );
};

export default LargFile;
