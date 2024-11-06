import GlobalTable from "../../../../../../globalcomponents/GlobalTable";
import { format } from "date-fns";

const Notification = () => {
  const notifyColumns = [
    {
      name: "notificationDate",
      label: "Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "jobRef",
      label: "Job Ref",
    },
    {
      name: "description",
      label: "Description",
    },
    {
      name: "notificationTime",
      label: "Time",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "h:mm a"),
      },
    },
    {
      name: "fixId",
      label: "------",
      options: {
        customBodyRender: (value) => {
          return (
            <a
              href={"#"}
              className="text-danger fw-bold"
              id="fixId"
              style={{ cursor: "pointer" }}
              onClick={() => {
                // setOpenJobModal(true);
                // setFixId(value);
              }}
            >
              View details
            </a>
          );
        },
      },
    },
  ];

  return (
    <>
      {/* <div className="text-center">
        <BallBeat loading={isLoading} color="var(--clr-primary)" />
      </div> */}
      {/* {!isLoading && completedJobs?.data.length > 0 && ( */}
      <GlobalTable
        columns={notifyColumns}
        data={[]}
        options={{
          elevation: 0,
          selectableRows: "none",
          rowsPerPage: 20,
          rowsPerPageOptions: [20, 50, 100],
        }}
      />
      {/* )} */}
      {/* {!isLoading && completedJobs?.data.length === 0 && (
        <Stack flex={1} justifyContent={"center"} alignItems={"center"}>
          <p className="fs-5 text-center">No Completed Jobs</p>
        </Stack>
      )} */}
    </>
  );
};

export default Notification;
