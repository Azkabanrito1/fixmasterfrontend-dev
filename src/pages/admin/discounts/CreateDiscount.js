import { useNavigate } from "react-router-dom";
import CreateDiscountForm from "../../../components/admincomponents/discounts/CreateDiscountForm";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import { useCreateDiscount } from "../../../hooks/useQueries/useAdmin";
import { useSnackbar } from "notistack";
import { PATH_ADMIN } from "../../../routes/paths";
import {
  discountTypes,
  invoiceComponents,
  bonusTypes,
} from "../../../utils/selectOptions";

const CreateDiscount = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const onCreateSuccess = () => {
    enqueueSnackbar("Discount created successfully", { variant: "success" });
    navigate(PATH_ADMIN.discounts);
  };

  const onCreateError = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };

  const { mutate: createDiscount, isLoading: isSubmitting } = useCreateDiscount(
    onCreateSuccess,
    onCreateError
  );

  return (
    <>
      <div className="mb-5">
        <PageHeading>Create Discount</PageHeading>
        <BackBtn />
      </div>

      <CreateDiscountForm
        createUpdateDiscount={createDiscount}
        discountTypes={discountTypes}
        invoiceComponents={invoiceComponents}
        isSubmitting={isSubmitting}
        valueTypes={bonusTypes}
      />
    </>
  );
};

export default CreateDiscount;
