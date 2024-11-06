import { useNavigate, useParams } from "react-router-dom";
import TargetsForm from "../../../components/admincomponents/territories/TargetsForm";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import { useSnackbar } from "notistack";
import { PATH_ADMIN } from "../../../routes/paths";
import { useCreateCollabTarget } from "../../../hooks/useQueries/useAdmin";
import {
  collaborators,
  targetTypes,
  targetIntervals,
} from "../../../utils/selectOptions";

const CreateTarget = () => {
  const { id, collaborator } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // callbacks
  const onCreateSuccess = () => {
    enqueueSnackbar("Target created successfully", { variant: "success" });
    navigate(PATH_ADMIN.targets(id, collaborator));
  };
  const onCreateError = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };
  const { mutate: createUpdateTarget, isLoading: isSubmitting } =
    useCreateCollabTarget(onCreateSuccess, onCreateError);

  return (
    <>
      <div className="mb-5">
        <PageHeading>Create Target</PageHeading>
        <BackBtn />
      </div>

      <TargetsForm
        collaborators={collaborators}
        createUpdateTarget={createUpdateTarget}
        intervals={targetIntervals}
        isSubmitting={isSubmitting}
        territoryId={id}
        valueTypes={targetTypes}
      />
    </>
  );
};

export default CreateTarget;
