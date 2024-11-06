import {
  BackBtn,
  OnboardingStageNav,
  PageHeading,
} from "../../../../components/globalcomponents/Utilities";
import GlobalTable from "../../../../components/globalcomponents/GlobalTable";
import GlobalBallBeat from "../../../../components/globalcomponents/GlobalBallBeat";
import { format } from "date-fns";
import {
  useGetSuspendedUsers,
  useUnsuspendedUsers,
} from "../../../../hooks/useQueries/useAdmin";
import { useSnackbar } from "notistack";
import GlobalTableActions from "../../../../components/globalcomponents/GlobalTableActions";
import { Chip } from "@mui/material";

const SuspendedCSEs = () => {
  const { enqueueSnackbar } = useSnackbar();

  function onSuccess(response) {
    enqueueSnackbar(response.message, { variant: "success" });
  }

  function onFailed(response) {
    enqueueSnackbar(response.message || response.title, { variant: "error" });
  }

  const { data: suspendedUsers, isLoading } = useGetSuspendedUsers("CSE");

  const { mutate: unsuspendUsers } = useUnsuspendedUsers(onSuccess, onFailed);

  const handleClick = (id) => {
    const user = suspendedUsers?.find((user) => user?.id === id);

    if (user) {
      const payload = {
        userIdToToggle: user.id,
        category: "CSE",
        action: "unsuspend",
      };

      unsuspendUsers(payload);
    } else {
      console.log("User not found");
    }
  };

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
      name: "applicantName",
      label: "Name",
    },
    {
      name: "applicantCurrentStage",
      label: "Current Stage",
    },
    {
      name: "applicantStatus",
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
          const actions = [
            {
              id: 0,
              name: "Re-Activate User",
              action: () => handleClick(value),
            },
          ];

          return (
            <div className="text-center">
              <GlobalTableActions actions={actions} id="unsuspend-cse" />
            </div>
          );
        },
      },
    },
  ];

  return (
    <div>
      <BackBtn />
      <PageHeading style={{ marginBottom: "32px" }}>Suspended CSEs</PageHeading>

      <GlobalBallBeat loading={isLoading} />

      {!isLoading && suspendedUsers?.length > 0 && (
        <GlobalTable columns={columns} data={suspendedUsers} />
      )}
      {!isLoading && suspendedUsers?.length === 0 && (
        <p className="text-center">No Suspended CSEs</p>
      )}
    </div>
  );
};

export default SuspendedCSEs;
