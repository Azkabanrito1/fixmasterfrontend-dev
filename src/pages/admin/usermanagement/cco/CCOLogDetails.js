import {
  BackBtn,
  OnboardingStageNav,
  PageHeading,
} from "../../../../components/globalcomponents/Utilities";
import { useLocation } from "react-router-dom";
import GlobalTable from "../../../../components/globalcomponents/GlobalTable";
import GlobalBallBeat from "../../../../components/globalcomponents/GlobalBallBeat";
import { useGetUserLogSession } from "../../../../hooks/useQueries/useIdentity";
import { format } from "date-fns";
import useDateQueries from "../../../../hooks/useDateQueries";
import DateFilterToolbar from "../../../../components/globalcomponents/DateFilterToolbar";
import useDateFilter from "../../../../hooks/useDateFilter";

const CCOLogDetails = () => {
  const location = useLocation();

  const stageUrl = location.pathname.split("/").slice(-1)[0];

  const { data: userLogSession, isLoading } = useGetUserLogSession("cco");

  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(
    dateQueries,
    "dateLastLogIn",
    userLogSession?.data
  );

  const columns = [
    {
      name: "S/N",
      options: {
        filter: false,
        searchable: false,
        customBodyRender: (_value, MUIDataTableMeta) => {
          return MUIDataTableMeta.rowIndex + 1;
        },
      },
    },
    {
      name: "name",
      label: "Name",
    },
    {
      name: "dateLastLogIn",
      label: "Last Login Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "dateLastLogIn",
      label: "Last Login Time",
      options: {
        customBodyRender: (value) => {
          const timePart = new Date(value).toLocaleTimeString();
          return timePart;
        },
      },
    },
    // {
    //   name: "dateLastLogOut",
    //   label: "Last Logout Date",
    //   options: {
    //     customBodyRender: (value) => {
    //       const datePart = value.split(" ")[0];
    //       return datePart;
    //     },
    //   },
    // },
    // {
    //   name: "dateLastLogOut",
    //   label: "Last Logout Time",
    //   options: {
    //     customBodyRender: (value) => {
    //       const timePart = value.split(" ")[1];
    //       return timePart;
    //     },
    //   },
    // },
  ];

  return (
    <div>
      <BackBtn />
      <PageHeading style={{ marginBottom: "32px" }}>
        CCOs' Login Details
      </PageHeading>

      <GlobalBallBeat loading={isLoading} />

      {!isLoading && userLogSession.data?.length > 0 && (
        <GlobalTable
          columns={columns}
          data={filteredResults}
          options={{
            customToolbar: () => (
              <DateFilterToolbar
                dateQueries={dateQueries}
                setDateQueries={setDateQueries}
              />
            ),
          }}
        />
      )}

      {!isLoading && userLogSession?.data?.length === 0 && (
        <p className="text-center">No login details for CCOs</p>
      )}
    </div>
  );
};

export default CCOLogDetails;
