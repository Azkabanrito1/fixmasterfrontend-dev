import { useSnackbar } from "notistack";
import NewLoyaltyForm from "../../../components/admincomponents/loyalty/NewLoyaltyForm";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import { useCreateLoyalty } from "../../../hooks/useQueries/useAdmin";
import { useNavigate } from "react-router-dom";
import { PATH_ADMIN } from "../../../routes/paths";

const CreateLoyalty = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const onCreateSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    navigate(PATH_ADMIN.loyalties);
  };
  const onCreateFailure = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };

  const { mutate: createLoyalty, isLoading } = useCreateLoyalty(
    onCreateSuccess,
    onCreateFailure
  );

  return (
    <>
      <div className="mb-5">
        <BackBtn />
        <PageHeading>Create Loyalty</PageHeading>
      </div>

      <NewLoyaltyForm createLoyalty={createLoyalty} isLoading={isLoading} />
    </>
  );
};

export default CreateLoyalty;
