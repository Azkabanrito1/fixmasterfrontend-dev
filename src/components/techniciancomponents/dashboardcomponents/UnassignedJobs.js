import styled from "styled-components";
import GlobalTable from "../../globalcomponents/GlobalTable";
import moment from "moment";
import CustomToolbarBtn from "../../globalcomponents/CustomToolbarBtn";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useTechnicianShowInterest } from "../../../hooks/useQueries/useJobs";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";

const TechnicianUnassignedJobs = ({ data = [] }) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const onSuccess = () => {
    enqueueSnackbar("Success", {
      variant: "success",
    });
  };

  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };

  const { mutate: signifyJob } = useTechnicianShowInterest(
    onSuccess,
    onFailure
  );

  const columns = [
    {
      name: "timePosted",
      label: "Time Posted",
      options: {
        customBodyRender: (value) => {
          const datePosted = moment(value);
          if (datePosted.isSame(new Date(), "day")) {
            return datePosted.startOf("hour").fromNow();
          }

          return datePosted.startOf("day").fromNow();
        },
      },
    },
    {
      name: "distanceToFixLocation",
      label: "Distance To Me",
      options: {
        customBodyRender: (value) =>
          `${new Intl.NumberFormat("en-GB").format(Math.trunc(value))}m`,
      },
    },
    { name: "jobCategory", label: "Job Categories" },
    { name: "jobClass", label: "Service Type" },
    {
      name: "jobId",
      label: "Actions",
      options: {
        customBodyRender: (value) => {
          const actions = [
            {
              id: 2,
              name: "Signify for Job",
              action: () => {
                signifyJob(value);
              },
              disabled: false,
            },
          ];
          return (
            <div className="text-center">
              <GlobalTableActions actions={actions} id="fixId" />
            </div>
          );
        },
      },
    },
  ];

  return (
    <StyledSection>
      <GlobalTable
        columns={columns}
        data={data}
        title="Unassigned Jobs"
        options={{
          rowsPerPage: 5,
          rowsPerPageOptions: [5],
          customToolbar: () => (
            <CustomToolbarBtn
              action={() => navigate("job-management/unaccepted")}
            />
          ),
        }}
      />
    </StyledSection>
  );
};

const StyledSection = styled.section`
  padding: 1rem;
  background-color: #f8e9e2;
  border-radius: 1rem;
`;

export default TechnicianUnassignedJobs;
