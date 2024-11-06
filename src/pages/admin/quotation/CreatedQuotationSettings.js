import { Link } from "react-router-dom";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import { PATH_ADMIN } from "../../../routes/paths";
import { useGetQuotationParamsSettings } from "../../../hooks/useQueries/useAdmin";
import QuotationTable from "../../../components/admincomponents/quotation/QuotationTable";

const CreatedQuotationSettings = () => {
  const { data: paramsData, isLoading } = useGetQuotationParamsSettings(3);

  const params = paramsData?.parameters;
  return (
    <>
      <BackBtn />
      <div className="mt-5 d-flex d-column d-md-row justify-content-between align-items-center">
        <PageHeading className="mb-0">Quotation Settings</PageHeading>
        {(params?.length === 0 ||
          paramsData?.parameters[0]?.maxRoyaltyFee === 0) && (
          <Link
            to={`${PATH_ADMIN.createQuotation}`}
            className="btn"
            style={{ backgroundColor: "var(--clr-primary)", color: "#fff " }}
            width="max-content"
            px="1em"
          >
            New Quotation Setting
          </Link>
        )}
      </div>

      <QuotationTable quotationParams={params} isLoading={isLoading} />
    </>
  );
};

export default CreatedQuotationSettings;
