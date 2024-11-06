import GlobalTable from "../../globalcomponents/GlobalTable";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import {
  useGetAllTerritories,
  useGetCustomerType,
} from "../../../hooks/useQueries/useAdmin";
import { format } from "date-fns";
import useDateQueries from "../../../hooks/useDateQueries";
import { useEffect, useState } from "react";
import { useDebounce } from "react-use";
import { stringComparator } from "../../../utils/utilityFxns";
import {
  useGetCitiesByLga,
  useGetLgaByStateId,
  useGetStates,
} from "../../../hooks/useQueries/useIdentity";
import { FullTableToolbar } from "../territories/TerritoryHomeTable";
import GlobalInput from "../../globalcomponents/GlobalInput";

const CustomersTable = ({
  enumType,
  territoryId,
  suspendUser,
  unSuspendUser,
}) => {
  const [queryParams, setQueryParams] = useState({
    stateParam: "",
    cityParam: "",
    lgaParam: "",
    searchParam: "",
    dateFromParam: "",
    dateToParam: "",
    pageSizeParam: "",
    territoryIdParam: territoryId ?? "",
    PageNumberParam: 1,
  });
  const [searchStr, setSearchStr] = useState("");

  // fetching data
  const { data: states } = useGetStates();
  const { data: lgas } = useGetLgaByStateId(queryParams.stateParam, {
    enabled: !!queryParams.stateParam,
  });
  const { data: cityOpts } = useGetCitiesByLga(queryParams.lgaParam, {
    enabled: !!queryParams.lgaParam,
  });
  const { data: usersData, isLoading } = useGetCustomerType(
    enumType,
    queryParams
  );

  let customers = usersData?.data?.customersResponses || [];
  customers = customers.map((customer) => ({
    ...customer,
    name: `${customer.firstName} ${customer.lastName}`,
  }));
  const meta = usersData?.data?.meta;

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
      name: "name",
      label: "Name",
    },
    {
      name: "emailAddress",
      label: "Email",
      options: {
        customBodyRender: (value) => (
          <a href={`mailto:${value}`} target="_blank">
            {value}
          </a>
        ),
      },
    },

    {
      name: "state",
      label: "State",
      options: {
        customBodyRender: (value) => (value ? value : "N/A"),
      },
    },
    {
      name: "lga",
      label: "LGA",
      options: {
        customBodyRender: (value) => (value ? value : "N/A"),
      },
    },
    {
      name: "cusTypeName",
      label: "Customer type",
      options: {
        customBodyRender: (value) => (value ? value : "N/A"),
      },
    },
    {
      name: "territory",
      label: "Territory",
      options: {
        customBodyRender: (value) => (value ? value : "N/A"),
      },
    },
    {
      name: "createdDate",
      label: "Date joined",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd/MM/yyyy"),
      },
    },
    {
      name: "id",
      label: "Actions",
      options: {
        filter: false,
        sort: false,
        searchable: false,
        customBodyRender: (value) => {
          const actions = [
            // {
            //   id: 0,
            //   name: "View Analysis Report",
            //   disabled: true,
            //   action: () => console.log(value),
            // },
            {
              id: 1,
              name: "Suspend",
              action: () => suspendUser(value),
              disabled: true,
            },
            {
              id: 2,
              name: "Unsuspend",
              disabled: true,
              action: () => unSuspendUser(value),
            },
            // {
            //   id: 3,
            //   name: "Deactivate",
            //   disabled: true,
            //   action: () => console.log(value),
            // },
          ];
          return <GlobalTableActions actions={actions} id="discount" />;
        },
      },
    },
  ];

  return (
    <>
      <GlobalBallBeat loading={isLoading} />

      <GlobalTable
        columns={columns}
        data={customers}
        options={{
          rowsPerPage: meta?.recordsPerPage || 10,
          count: meta?.totalRecords || 0,
          rowsPerPageOptions: [10, 20, 50],
          page: meta?.currentPage - 1 || 0,
          textLabels: {
            body: {
              noMatch: <div className="orange">No customer data</div>,
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
    </>
  );
};

export default CustomersTable;
