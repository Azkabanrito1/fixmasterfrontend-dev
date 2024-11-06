import { Chip } from "@mui/material";
import GlobalTable from "../../globalcomponents/GlobalTable";
import {
  useGetCitiesByLga,
  useGetLgaByStateId,
  useGetStates,
  useGetUsersByCategory,
} from "../../../hooks/useQueries/useIdentity";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import { useState } from "react";
import useDateQueries from "../../../hooks/useDateQueries";
import { FullTableToolbar } from "../territories/TerritoryHomeTable";
import { useDebounce } from "react-use";
import { stringComparator } from "../../../utils/utilityFxns";
import GlobalInput from "../../globalcomponents/GlobalInput";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

const CollaboratorManagedTable = ({
  collaborator,
  suspendUser,
  unSuspendUser,
  deactivateUser,
}) => {
  const [searchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState({
    stateParam: "",
    cityParam: "",
    lgaParam: "",
    searchParam: "",
    dateFromParam: "",
    dateToParam: "",
    pageSizeParam: "",
    territoryIdParam: "",
    PageNumberParam: "",
  });
  const [searchStr, setSearchStr] = useState("");

  useEffect(() => {
    if (searchParams.get("territoryId"))
      setQueryParams((prev) => ({
        ...prev,
        territoryIdParam: searchParams.get("territoryId"),
      }));
  }, []);

  const { data: usersData, isLoading } = useGetUsersByCategory(
    collaborator.toLowerCase(),
    undefined,
    queryParams
  );
  const collaboratorData = usersData?.usersModelResponses || [];

  const { dateQueries, setDateQueries } = useDateQueries();

  // debounce the fetching of territories by search
  useDebounce(
    () => {
      if (!!searchStr)
        setQueryParams((prev) => ({ ...prev, searchParam: searchStr }));
    },
    2000,
    [searchStr]
  );

  // debounce the fetching of territories by date
  useDebounce(
    () => {
      setQueryParams((prev) => ({
        ...prev,
        dateFromParam: dateQueries.from.date,
        dateToParam: dateQueries.to.date,
      }));
    },
    1000,
    [dateQueries.from.date, dateQueries.to.date]
  );

  // fetching data
  const { data: states } = useGetStates();
  const { data: lgas } = useGetLgaByStateId(queryParams.stateParam, {
    enabled: !!queryParams.stateParam,
  });
  const { data: cityOpts } = useGetCitiesByLga(queryParams.lgaParam, {
    enabled: !!queryParams.lgaParam,
  });

  const columns = [
    {
      name: "S/N",
      options: {
        filter: false,
        customBodyRender: (_value, tableMeta) => {
          return tableMeta.rowIndex + 1;
        },
      },
    },
    {
      name: "Name",
      options: {
        customBodyRender: (_value, tableMeta) => {
          return `${collaboratorData[tableMeta.rowIndex].firstName} ${
            collaboratorData[tableMeta.rowIndex].lastName
          }`;
        },
      },
    },
    { name: "state", label: "State" },
    { name: "lga", label: "LGA" },
    { name: "city", label: "City" },
    { name: "territory", label: "Territory" },
    collaborator === "qa" && { name: "languages", label: "Language(s)" },
    collaborator === "qa" && {
      name: "areasOfSpecialization",
      label: "Specialization(s)",
    },
    collaborator === "cco" && {
      name: "languages",
      label: "Language(s)",
      options: {
        customBodyRender: (value, tableMeta) => (
          <span>
            {collaboratorData[tableMeta.rowIndex]?.language
              ?.map((language) => language.languages)
              .join(", ")}
          </span>
        ),
      },
    },
    {
      name: "onboardedByAdmin",
      label: "Creation Mode",
      options: {
        customBodyRender: (value) => (
          <p>
            {value.toLowerCase() === "yes"
              ? "Admin Creation"
              : "User Onboarding"}
          </p>
        ),
      },
    },
    {
      name: "accountStatus",
      label: "Status",
      options: {
        customBodyRender: (value) => (
          <Chip
            label={value}
            color={value.toLowerCase() === "active" ? "success" : "error"}
          />
        ),
      },
    },
    {
      name: "id",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        searchable: false,
        customBodyRender: (value, tableMeta) => {
          const status =
            collaboratorData[tableMeta.rowIndex].accountStatus.toLowerCase();

          const actions = [
            {
              id: 0,
              name: "View Analysis Report",
              action: () => {},
              disabled: true,
            },
            {
              id: 1,
              name: status === "active" ? "Suspend" : "Unsuspend",
              action:
                status === "active"
                  ? () => suspendUser(value)
                  : () => unSuspendUser(value),
            },
            {
              id: 2,
              name: "Deactivate",
              action: () => deactivateUser(),
              disabled: true,
            },
          ];
          return <GlobalTableActions actions={actions} id="discount" />;
        },
      },
    },
  ].filter(Boolean);

  return (
    <div>
      <GlobalBallBeat loading={isLoading} />

      <GlobalTable
        columns={columns}
        data={collaboratorData}
        options={{
          serverSide: true,
          elevation: 0,
          selectableRows: "none",
          rowsPerPage: 20,
          rowsPerPageOptions: [20, 50, 100],
          textLabels: {
            body: {
              noMatch: <div className="orange">No {collaborator} data</div>,
            },
          },
          customSearchRender: () => (
            <GlobalInput
              inputType="search"
              width="180px"
              inputPlaceholder="Search"
              inputValue={searchStr}
              handleChange={(e) => setSearchStr(e.target.value)}
            />
          ),
          customToolbar: () => (
            <FullTableToolbar
              filterData={queryParams}
              setFilterData={setQueryParams}
              states={!!states?.data ? stringComparator(states?.data) : []}
              lgas={!!lgas?.data ? stringComparator(lgas?.data) : []}
              cityOpts={cityOpts?.data}
              dateQueries={dateQueries}
              setDateQueries={setDateQueries}
            />
          ),
        }}
      />
    </div>
  );
};

export default CollaboratorManagedTable;
