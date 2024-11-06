import { PATH_ADMIN } from "../../../routes/paths";
import { Link, useParams } from "react-router-dom";
import {
  BackBtn,
  FormGroup,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import {
  useGetAllTerritoryCategories,
  useGetTerritoryDetails,
} from "../../../hooks/useQueries/useAdmin";
import TerritoryDetailsTable from "../../../components/admincomponents/territories/TerritoryDetailsTable";
import TerritoryDetailsCards from "../../../components/admincomponents/territories/TerritoryDetailsCards";
import TerritoryNavigation from "../../../components/admincomponents/territories/TerritoryNavigation";
import GlobalInput from "../../../components/globalcomponents/GlobalInput";
import GlobalSelect from "../../../components/globalcomponents/GlobalSelect";

const TerritoryDetails = () => {
  const { id } = useParams();

  const { data: territoryData, isLoading } = useGetTerritoryDetails(id);
  const { data: tcData } = useGetAllTerritoryCategories({});

  const territoryCategories = tcData?.data.territoryCategories.map((cat) => ({
    id: cat.id,
    name: cat.categoryName,
  }));

  let details = [];
  if (territoryData?.details?.length === 1) {
    if (territoryData?.details[0]?.recId !== 0) {
      details = territoryData?.details;
    }
  } else {
    details = territoryData?.details;
  }

  details = details?.map((data, index) => ({
    ...data,
    sn: index + 1,
  }));

  return (
    <>
      <div className="position-relative mb-5">
        <PageHeading>
          Territory Details: {territoryData?.territoryName}
        </PageHeading>
        <BackBtn inset="0" />
        <Link
          to={`${PATH_ADMIN.editTerritory}/${id}`}
          className="position-absolute top-0 end-0 btn"
          style={{ backgroundColor: "var(--clr-primary)", color: "#fff " }}
          width="max-content"
          px="1em"
        >
          Edit Details
        </Link>
      </div>

      <TerritoryNavigation />

      <FormGroup columns="3" mb="24px">
        <GlobalSelect
          labelText={"Territory Category"}
          selectValue={territoryData?.tcID}
          options={territoryCategories || []}
          disabled={true}
        />
        <GlobalInput
          labelText="Central Address"
          inputValue={territoryData?.headquaterAddress}
          readOnly={true}
        />
      </FormGroup>

      {/* <TerritoryDetailsTable details={details} isLoading={isLoading} /> */}

      <TerritoryDetailsCards territoryData={territoryData} />
    </>
  );
};

export default TerritoryDetails;
