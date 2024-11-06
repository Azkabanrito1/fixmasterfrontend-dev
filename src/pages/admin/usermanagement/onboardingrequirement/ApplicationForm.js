import {
  BackBtn,
  PageHeading,
} from "../../../../components/globalcomponents/Utilities";
import VideoHome from "./VideoHome";
import { useGetCollaboratorRoles } from "../../../../hooks/useQueries/useIdentity";
import Language from "./Language";

const ApplicationForm = ({ role, hasVideo, hasLanguage }) => {
  //------------------------------------data fetching----------------------------------------------------
  const { data: rolesData } = useGetCollaboratorRoles();
  const roles = rolesData?.data?.filter((item) => item?.name === role);

  return (
    <div style={{ margin: "0 auto 0" }}>
      {hasVideo && <VideoHome role={roles} />}
      <div style={{ margin: "0 auto 0" }}>{hasLanguage && <Language />}</div>
    </div>
  );
};

export default ApplicationForm;
