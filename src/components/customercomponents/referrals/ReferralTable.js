import GlobalTable from "../../globalcomponents/GlobalTable";
import { Avatar, Stack, Typography } from "@mui/material";
import { useGetUserProfile } from "../../../hooks/useQueries/useOnboarding";
import format from "date-fns/format";

const CustomerReferralsTable = ({ data = [] }) => {
  const { data: user } = useGetUserProfile();

  const columns = [
    {
      field: "userName",
      headerName: "User Name",
      renderCell: () => (
        <Stack direction="row" spacing={1} justifyContent={"center"}>
          <Avatar src={user.profilePictureUrl} alt="" />
          <span>{`${user?.firstName} ${user?.lastName}`}</span>
        </Stack>
      ),
      valueGetter: () => `${user?.firstName} ${user?.lastName}`,
      flex: 1,
    },
    { field: "type", headerName: "Referral Type", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      renderCell: (params) => (
        <Typography
          variant="span"
          color={
            params.value.toLowerCase() === "completed" ? "success" : "warning"
          }
        />
      ),
      flex: 1,
    },
    { field: "amount", headerName: "Amount Earned", type: "number", flex: 1 },
    {
      field: "dateRegistered",
      headerName: "Date Registered",
      valueGetter: (params) => new Date(params.value),
      valueFormatter: (params) => format(params.value, "dd-MM-yyyy"),
      type: "date",
      flex: 1,
    },
  ];

  return (
    <GlobalTable
      rows={data}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 25,
          },
        },
      }}
      disableRowSelectionOnClick
      pageSizeOptions={[25, 50, 75, 100]}
    />
  );
};

export default CustomerReferralsTable;
