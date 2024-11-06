import { useSnackbar } from "notistack";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import { useCreateQuotationParamSetting } from "../../../hooks/useQueries/useAdmin";
import { useNavigate } from "react-router-dom";
import { PATH_ADMIN } from "../../../routes/paths";
import NewQuotationSettingForm from "../../../components/admincomponents/quotation/NewQuotationSettingForm";

const CreateQuotationParam = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const onCreateSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    navigate(PATH_ADMIN.quotationSettings);
  };
  const onCreateFailure = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };

  const { mutate: createQuotationParam, isLoading } =
    useCreateQuotationParamSetting({
      typeId: 3,
      onSuccess: onCreateSuccess,
      onFailure: onCreateFailure,
    });

  return (
    <>
      <div className="mb-5">
        <BackBtn />
        <PageHeading>Create Quotation Parameter</PageHeading>
      </div>

      <NewQuotationSettingForm
        createSetting={createQuotationParam}
        isLoading={isLoading}
      />
    </>
  );
};

export default CreateQuotationParam;
