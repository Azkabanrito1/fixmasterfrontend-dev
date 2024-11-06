import GlobalBallBeat from "../../../../components/globalcomponents/GlobalBallBeat";
import { useGetCollaboratorRoles } from "../../../../hooks/useQueries/useIdentity";
import AdminAssignWorkingTypes from "./AdminAssignWorkingType";

const CollaboratorWorkingType = ({ role }) => {
  return (
    <>
     <AdminAssignWorkingTypes role={role.toLowerCase()} />
    </>
  );
};
export default CollaboratorWorkingType;

