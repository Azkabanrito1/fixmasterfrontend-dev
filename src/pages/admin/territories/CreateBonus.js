import { useNavigate, useParams } from "react-router-dom";
import BonusesForm from "../../../components/admincomponents/territories/BonusesForm";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import { useCreateCollabBonus } from "../../../hooks/useQueries/useAdmin";
import { useSnackbar } from "notistack";
import { PATH_ADMIN } from "../../../routes/paths";
import {
  bonusTypes,
  targetIntervals,
  contractTypes,
} from "../../../utils/selectOptions";

const CreateBonus = () => {
  const { id, collaborator } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // callbacks
  const onCreateSuccess = () => {
    enqueueSnackbar("Bonus created successfully", { variant: "success" });
    navigate(PATH_ADMIN.bonuses(id, collaborator));
  };
  const onCreateError = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };
  const { mutate: createUpdateBonus, isLoading: isSubmitting } =
    useCreateCollabBonus(onCreateSuccess, onCreateError);

  return (
    <>
      <div className="mb-5">
        <PageHeading>Create Bonus</PageHeading>
        <BackBtn />
      </div>

      <BonusesForm
        contractTypes={contractTypes}
        collaborator={collaborator}
        createUpdateBonus={createUpdateBonus}
        intervals={targetIntervals}
        isSubmitting={isSubmitting}
        territoryId={id}
        valueTypes={bonusTypes}
      />
    </>
  );
};

export default CreateBonus;
