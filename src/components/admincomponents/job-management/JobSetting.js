import { BackBtn, PageHeading } from "../../globalcomponents/Utilities";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import { useGetJobSettings } from "../../../hooks/useQueries/useAdmin";
import GlobalTable from "../../globalcomponents/GlobalTable";
import { useState } from "react";
import UpdateJobSettingsModal from "./modals/UpdateJobSettingsModal";
import ViewJobSettingsModal from "./modals/ViewJobSettingsModal";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";

const JobSetting = () => {
  const { data: allJobSettings, isLoading } = useGetJobSettings();
  const [viewJobs, setViewJobs] = useState(false);
  const [updateJobs, setUpdateJobs] = useState(false);

  const [activeApplicant, setActiveApplicant] = useState({});
  const getActiveApplicant = (value) => {
    let applicantIndex = allJobSettings?.data.findIndex((x) => x.id === value);
    setActiveApplicant(allJobSettings?.data[applicantIndex]);
  };

  // modal controls
  const viewJobSettings = (id) => {
    setViewJobs(true);
    getActiveApplicant(id);
  };
  const updateJobSettings = (id) => {
    setUpdateJobs(true);
    getActiveApplicant(id);
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
    { name: "techMaxDist", label: "Technician Max Distance" },
    { name: "jobAdvWaitTime", label: "Job Advert Wait Time" },
    { name: "jobPrtyMinRating", label: "Job Priority Mininimum Rating" },
    { name: "supplierMaxDistance", label: "Supplier Max Distance" },
    {
      name: "id",
      label: "Actions",
      options: {
        customBodyRender: (value, meta) => {
          const actions = [
            {
              id: 1,
              name: "View Job Settings",
              action: () => viewJobSettings(value),
            },
            {
              id: 2,
              name: "Update Job Settings",
              action: () => updateJobSettings(value),
            },
          ];
          return (
            <div>
              <GlobalTableActions actions={actions} />
            </div>
          );
        },
      },
    },
  ];

  return (
    <>
      <GlobalBallBeat loading={isLoading} />
      <BackBtn />
      <PageHeading>JOB SETTINGS</PageHeading>
      <GlobalTable
        data={allJobSettings?.data}
        columns={columns}
        options={{
          rowsPerPageOptions: [5, 10, 20, 50],
        }}
      />
      {updateJobs && (
        <UpdateJobSettingsModal
          activeId={activeApplicant?.id}
          open={updateJobs}
          close={() => setUpdateJobs(false)}
          data={activeApplicant}
          heading="Update Jobs Settings"
        />
      )}
      {viewJobs && (
        <ViewJobSettingsModal
          data={activeApplicant}
          open={viewJobs}
          close={() => setViewJobs(false)}
          heading="View Jobs Settings Details"
        />
      )}
    </>
  );
};
export default JobSetting;
