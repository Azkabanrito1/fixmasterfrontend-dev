import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATH_ADMIN } from "../../../routes/paths";
import { useGetAllTerritories } from "../../../hooks/useQueries/useAdmin";
import TerritoryHomeTable from "../../../components/admincomponents/territories/TerritoryHomeTable";

const INITFILTERDATA = {
  stateParam: "",
  cityParam: "",
  lgaParam: "",
  searchParam: "",
  datefromParam: "",
  dateTimeTo: "",
  pageSizeParam: "",
  PageNumberParam: 1,
};

const TerritoriesHome = () => {
  // const [showAddTerritoryModal, setShowAddTerritoryModal] = useState(false);
  const [queryParams, setQueryParams] = useState(INITFILTERDATA);
  const navigate = useNavigate();
  const { data: territoriesData, isLoading } = useGetAllTerritories({
    params: queryParams,
  });
  const clearFilters = () => setQueryParams(INITFILTERDATA);

  let territories = territoriesData?.data?.territoryResponses;
  let meta = territoriesData?.data?.meta;

  territories = territories?.map((territory, index) => ({
    ...territory,
    sn: index + 1,
  }));

  return (
    <>
      <TerritoryHomeTable
        openAddTerritory={() => navigate(PATH_ADMIN.setupTerritory)}
        territories={territories}
        isLoading={isLoading}
        clearFilters={clearFilters}
        queryParams={queryParams}
        setQueryParams={setQueryParams}
        meta={meta}
      />
    </>
  );
};

export default TerritoriesHome;
