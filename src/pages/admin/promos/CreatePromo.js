import { useNavigate } from "react-router-dom";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import {
  useCreatePromo,
  useGetDiscounts,
} from "../../../hooks/useQueries/useAdmin";
import { useSnackbar } from "notistack";
import { PATH_ADMIN } from "../../../routes/paths";
import CreatePromoForm from "../../../components/admincomponents/promos/CreatePromoForm";
// import {
//   discountTypes,
//   invoiceComponents,
//   bonusTypes,
// } from "../../../utils/SelectOptions";

const CreatePromo = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const onCreateSuccess = () => {
    enqueueSnackbar("Discount created successfully", { variant: "success" });
    navigate(PATH_ADMIN.promos);
  };

  const onCreateError = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };

  const { mutate: createPromo, isLoading: isSubmitting } = useCreatePromo(
    onCreateSuccess,
    onCreateError
  );
  const { data: discountsData } = useGetDiscounts();

  const discounts = discountsData?.discounts?.map((discount) => ({
    id: discount.discountId,
    name: discount.discountName,
  }));

  return (
    <>
      <div className="mb-5">
        <PageHeading>Create Promo</PageHeading>
        <BackBtn />
      </div>

      <CreatePromoForm
        createUpdatePromo={createPromo}
        discounts={discounts}
        isSubmitting={isSubmitting}
      />
    </>
  );
};

export default CreatePromo;
