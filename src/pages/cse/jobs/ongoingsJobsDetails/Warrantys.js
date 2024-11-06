import WarrantyClaims from "../../../../components/csecomponent/cse/dashboardComponent/jobs/warranty/WarrantyClaims";
import Claim from "../../../../components/csecomponent/cse/dashboardComponent/jobs/warranty/Claim";
import {
  useGetWarrantyFix,
  useLogWarrantyClaim,
} from "../../../../hooks/useQueries/useJobs";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const Warrantys = () => {
  const { fixId } = useParams();
  const { data: warranties } = useGetWarrantyFix(fixId);
  const { enqueueSnackbar } = useSnackbar();

  //----------------------------mutatefn--------------------------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
  };

  const onFailure = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };

  const { mutate: logWarranty } = useLogWarrantyClaim(onSuccess, onFailure);

  return (
    <>
      <WarrantyClaims warranties={warranties?.data} />
      <Claim fixId={fixId} logWarranty={logWarranty} />
    </>
  );
};

export default Warrantys;
