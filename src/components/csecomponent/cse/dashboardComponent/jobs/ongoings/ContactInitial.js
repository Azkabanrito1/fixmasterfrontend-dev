import FixDetail from "./jobinfo/FixDetail";
import Diagnostic from "../DiagnosticVisitDate";
import EquipmentReq from "../modal/EquipmentReq";
import AssignTech from "../modal/AssignTech";
import { useOutletContext, useParams } from "react-router-dom";
import { useReducer } from "react";
import {
  useGetDiagnosisVisitTime,
  useGetHireEquipments,
  useGetTechnicianAssigned,
} from "../../../../../../hooks/useQueries/useJobs";
import AssignTechnician from "../../../../../franchiseecomponents/jobsmanagement/modals/AssignTechnician";
import RequestEquipment from "../../../../../franchiseecomponents/jobsmanagement/modals/RequestEquipments";

const initState = {
  fastTrack: false,
  isAssignTechnOpen: false,
  isAssignEqpOpen: false,
};

const contactReducer = (state = initState, action) => {
  switch (action.type) {
    case "toggleFastTrack":
      return {
        ...state,
        fastTrack: !state.fastTrack,
      };
    case "openAssignTechModal":
      return {
        ...state,
        isAssignTechnOpen: true,
      };
    case "closeAssignTechModal":
      return {
        ...state,
        isAssignTechnOpen: false,
      };

    case "openAssignEqpModal":
      return {
        ...state,
        isAssignEqpOpen: true,
      };
    case "closeAssignEqpModal":
      return {
        ...state,
        isAssignEqpOpen: false,
      };

    default:
      return state;
  }
};

const ContactInitial = () => {
  const [contactState, setContactState] = useReducer(contactReducer, initState);
  const { fixId } = useParams();
  const { jobDetails = {} } = useOutletContext();

  // =========================data fetching=============================
  const { data: technicianData } = useGetTechnicianAssigned(fixId);
  const { data: hireEquipmentsData } = useGetHireEquipments(fixId);
  const { data: diagnosisData } = useGetDiagnosisVisitTime(fixId);

  return (
    <div className="px-2">
      <FixDetail
        contactState={contactState}
        jobDetails={jobDetails}
        toggleFastTrack={() => setContactState({ type: "toggleFastTrack" })}
        fixId={+fixId}
      />
      <AssignTech
        assignedTechnicians={technicianData?.data}
        openAssignTechModal={() =>
          setContactState({ type: "openAssignTechModal" })
        }
      />
      <EquipmentReq
        openAssignEqpModal={() =>
          setContactState({ type: "openAssignEqpModal" })
        }
        equipments={hireEquipmentsData?.data}
      />

      <Diagnostic diagnosisTime={diagnosisData?.data} />

      {contactState.isAssignTechnOpen && (
        <AssignTechnician
          isOpen={contactState.isAssignTechnOpen}
          closeModal={() => setContactState({ type: "closeAssignTechModal" })}
          assignedTechnicians={technicianData?.data}
          fixId={+fixId}
        />
      )}

      {contactState.isAssignEqpOpen && (
        <RequestEquipment
          isOpen={contactState.isAssignEqpOpen}
          closeModal={() => setContactState({ type: "closeAssignEqpModal" })}
        />
      )}
    </div>
  );
};

export default ContactInitial;
