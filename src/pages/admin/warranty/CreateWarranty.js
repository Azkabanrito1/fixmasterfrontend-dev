import { useSnackbar } from "notistack";
import NewLoyaltyForm from "../../../components/admincomponents/loyalty/NewLoyaltyForm";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import { useAddWarranty } from "../../../hooks/useQueries/useAdmin";
import { useNavigate } from "react-router-dom";
import { PATH_ADMIN } from "../../../routes/paths";
import NewWarrantyForm from "../../../components/admincomponents/warranty/NewWarrantyForm";

const CreateWarranty = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const onCreateSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    navigate(PATH_ADMIN.warranty);
  };
  const onCreateFailure = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };

  const { mutate: createWarranty, isLoading } = useAddWarranty(
    onCreateSuccess,
    onCreateFailure
  );

  return (
    <>
      <div className="mb-5">
        <BackBtn />
        <PageHeading>Create Warranty</PageHeading>
      </div>

      <NewWarrantyForm createWarranty={createWarranty} isLoading={isLoading} />
    </>
  );
};

export default CreateWarranty;
