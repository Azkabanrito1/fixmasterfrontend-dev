import { useSnackbar } from "notistack";
import { PATH_ADMIN } from "../../../routes/paths";
import { useNavigate, useParams } from "react-router-dom";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import { useCreateTerritoryUplift } from "../../../hooks/useQueries/useAdmin";
import UpliftForm from "../../../components/admincomponents/territories/UpliftForm";
import { useGetCategories } from "../../../hooks/useQueries/useOnboarding";

const CreateUplift = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // callbacks
  const onCreateSuccess = () => {
    enqueueSnackbar("Uplift created successfully", { variant: "success" });
    navigate(`${PATH_ADMIN.uplifts}/${id}`);
  };
  const onCreateError = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };
  const { mutate: createUpdateUplift, isLoading: isSubmitting } =
    useCreateTerritoryUplift(onCreateSuccess, onCreateError);
  const { data: categoriesData } = useGetCategories();

  return (
    <>
      <div className="mb-5">
        <PageHeading>Create Uplift</PageHeading>
        <BackBtn />
      </div>

      <UpliftForm
        categories={categoriesData?.data || []}
        createUpdateUplift={createUpdateUplift}
        isSubmitting={isSubmitting}
        territoryId={id}
        isLoading={isSubmitting}
      />
    </>
  );
};

export default CreateUplift;
