import { useParams } from "react-router-dom";
import TargetsForm from "../../../components/admincomponents/territories/TargetsForm";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import { useGetTargetDetails } from "../../../hooks/useQueries/useAdmin";
import {
  collaborators,
  targetIntervals,
  targetTypes,
} from "../../../utils/selectOptions";

const EditTarget = () => {
  const { id, targetId } = useParams();
  const { data: details, isLoading } = useGetTargetDetails(targetId);

  const initialValues = details?.data;

  const createUpdateTarget = (payload) => {
    console.log(payload);
  };

  return (
    <>
      <div className="mb-5">
        <PageHeading>Edit Target</PageHeading>
        <BackBtn />
      </div>

      <TargetsForm
        collaborators={collaborators}
        createUpdateTarget={createUpdateTarget}
        initialValues={initialValues}
        intervals={targetIntervals}
        isLoading={isLoading}
        territoryId={id}
        valueTypes={targetTypes}
      />
    </>
  );
};

export default EditTarget;
