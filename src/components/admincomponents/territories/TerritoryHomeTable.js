import AddBtn from "../../franchiseecomponents/jobsmanagement/AddBtn";
import { PATH_ADMIN } from "../../../routes/paths";
import { useNavigate } from "react-router";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import GlobalTable from "../../globalcomponents/GlobalTable";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import { format } from "date-fns";
import { Chip, Stack } from "@mui/material";
import GlobalSelect from "../../globalcomponents/GlobalSelect";
import GlobalInput from "../../globalcomponents/GlobalInput";
import {
  useGetLgaByStateId,
  useGetStates,
} from "../../../hooks/useQueries/useIdentity";
import { stringComparator } from "../../../utils/utilityFxns";
import useDateQueries from "../../../hooks/useDateQueries";
import DateFilterToolbar from "../../globalcomponents/DateFilterToolbar";
import { PageHeading } from "../../globalcomponents/Utilities";
import { useDebounce } from "react-use";
import { useState } from "react";
import { useActivateDeactivateTerritory } from "../../../hooks/useQueries/useAdmin";

const TerritoryHomeTable = ({
  territories,
  isLoading,
  openAddTerritory,
  queryParams,
  setQueryParams,
  clearFilters,
  meta,
}) => {
  const [searchStr, setSearchStr] = useState("");
  const { dateQueries, setDateQueries } = useDateQueries();
  const { mutate: activateDeactivate } = useActivateDeactivateTerritory();

  const navigate = useNavigate();

  // debounce the fetching of territories by search
  useDebounce(
    () => {
      if (!!searchStr)
        setQueryParams((prev) => ({ ...prev, searchParam: searchStr }));
    },
    2000,
    [searchStr]
  );

  // fetching of territories by date
  useDebounce(
    () => {
      if (!!dateQueries.from.date)
        setQueryParams((prev) => ({
          ...prev,
          datefromParam: dateQueries.from.date,
        }));
      if (!!dateQueries.to.date)
        setQueryParams((prev) => ({
          ...prev,
          dateTimeTo: dateQueries.to.date,
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

  const columns = [
    { name: "sn", label: "S/N" },
    { name: "name", label: "Name" },
    {
      name: "manager",
      label: "Franchisee",
      options: {
        customBodyRender: (value) => {
          return value || "N/A";
        },
      },
    },
    { name: "stateName", label: "State" },
    { name: "lgaName", label: "LGA" },
    {
      name: "territoryCategory",
      label: "Territory Category",
      options: { customBodyRender: (value) => value.categoryName },
    },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (value) => (
          <Chip
            color={value === "true" ? "success" : "error"}
            title={value === "true" ? "Active" : "Inactive"}
            label={value === "true" ? "Active" : "Inactive"}
          />
        ),
      },
    },
    {
      name: "createdAt",
      label: "Created At",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "id",
      label: "Actions",
      options: {
        sort: false,
        filter: false,
        customBodyRender: (value, row) => {
          const actions = [
            {
              id: 0,
              name: "View Territory Info",
              action: () => navigate(PATH_ADMIN.territoryInfo(value)),
            },
            {
              id: 1,
              name: "Edit Territory Details",
              action: () => navigate(PATH_ADMIN.editTerritory(value)),
            },
            {
              id: 2,
              name: "Edit Bonus and Targets",
              action: () => navigate(PATH_ADMIN.territoryBonusTargets(value)),
            },
            {
              id: 3,
              name: "Edit Rate Uplifts",
              action: () => navigate(PATH_ADMIN.uplifts(value)),
            },
            {
              id: 4,
              name: row.rowData[5] === "true" ? "Deactivate" : "Activate",
              action: () =>
                activateDeactivate({
                  territoryId: value,
                  action: row.rowData[5] === "true" ? "deactivate" : "activate",
                }),
            },
          ];
          return (
            <div className="text-center">
              <GlobalTableActions actions={actions} id="territory" />
            </div>
          );
        },
      },
    },
  ];

  return (
    <>
      <PageHeading>Territory Management</PageHeading>

      <GlobalBallBeat loading={isLoading} />

      <GlobalTable
        columns={columns}
        data={territories}
        options={{
          serverSide: true,
          rowsPerPage: meta?.recordsPerPage || 10,
          count: meta?.totalRecords || 0,
          rowsPerPageOptions: [10, 20, 50],
          page: meta?.currentPage - 1 || 0,
          textLabels: {
            body: {
              noMatch: <div className="orange">No territory data</div>,
            },
          },
          onTableChange: (action, tableState) => {
            if (action === "changePage") {
              setQueryParams((prev) => ({
                ...prev,
                PageNumberParam: tableState.page + 1,
              }));
            }
          },
          customSearchRender: () => (
            <GlobalInput
              inputType="search"
              width="180px"
              inputPlaceholder="Search by name"
              inputValue={searchStr}
              handleChange={(e) => setSearchStr(e.target.value)}
            />
          ),
          customToolbar: () => (
            <FullTableToolbar
              action={{
                name: "New Territory",
                action: () => openAddTerritory(),
              }}
              clearFilters={clearFilters}
              filterData={queryParams}
              setFilterData={setQueryParams}
              states={!!states?.data ? stringComparator(states?.data) : []}
              lgas={!!lgas?.data ? stringComparator(lgas?.data) : []}
              dateQueries={dateQueries}
              setDateQueries={setDateQueries}
            />
          ),
        }}
      />

      {!isLoading && territories?.length === 0 && (
        <Stack flex={1} justifyContent={"center"} alignItems={"center"}>
          {openAddTerritory && (
            <AddBtn action={openAddTerritory} text={"Add new territory"} />
          )}
        </Stack>
      )}
    </>
  );
};

export default TerritoryHomeTable;

export const FullTableToolbar = ({
  setFilterData,
  filterData,
  states,
  lgas,
  cityOpts,
  dateQueries,
  setDateQueries,
  clearFilters,
  action,
}) => {
  return (
    <div className="d-inline-flex gap-2 flex-wrap justify-content-end">
      <GlobalSelect
        width="130px"
        defaultOption="All States"
        selectValue={filterData.stateParam}
        options={states}
        handleChange={(e) =>
          setFilterData((prev) => ({ ...prev, stateParam: e.target.value }))
        }
      />
      <GlobalSelect
        width="130px"
        defaultOption="All LGAs"
        selectValue={filterData.lgaParam}
        options={lgas}
        handleChange={(e) =>
          setFilterData((prev) => ({ ...prev, lgaParam: e.target.value }))
        }
      />
      {!!cityOpts?.length && (
        <GlobalSelect
          width="130px"
          defaultOption="All Cities"
          selectValue={filterData.cityParam}
          options={cityOpts}
          handleChange={(e) =>
            setFilterData((prev) => ({ ...prev, cityParam: e.target.value }))
          }
        />
      )}

      <DateFilterToolbar
        dateQueries={dateQueries}
        setDateQueries={setDateQueries}
      />
      {/* {!!Object.values(filterData).some((item) => !!item) && (
        <Button
          variant="outlined"
          className="orange"
          sx={{ borderColor: "var(--clr-primary)" }}
          onClick={() => clearFilters()}
        >
          Reset
        </Button>
      )} */}
      {!!action?.name && (
        <GlobalBtn
          className="d-inline fs-6"
          width="max-content"
          px="1em"
          py="0.8em"
          fw="400"
          onClick={action?.action}
        >
          {action?.name}
        </GlobalBtn>
      )}
    </div>
  );
};
