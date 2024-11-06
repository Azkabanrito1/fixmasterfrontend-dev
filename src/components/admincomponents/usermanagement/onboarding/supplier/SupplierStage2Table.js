import { Chip } from "@mui/material";
import { useState } from "react";
import { useSnackbar } from "notistack";
import {
  useGetQaAndFranchiseeMcq,
  useGetQaAndFranchiseeMcqByUserId,
  useGetSupplierDiscussionStage,
  useSupplierDiscussionDate,
} from "../../../../../hooks/useQueries/useOnboarding";
import GlobalTable from "../../../../globalcomponents/GlobalTable";
import SetInterviewDate from "../../../../globalcomponents/modals/SetInterviewDate";
import GlobalTableActions from "../../../../globalcomponents/GlobalTableActions";
import GlobalBallBeat from "../../../../globalcomponents/GlobalBallBeat";
import ViewResult from "../../../../globalcomponents/modals/ViewTrainingMCQResult";
import { format } from "date-fns";
import useDateFilter from "../../../../../hooks/useDateFilter";
import useDateQueries from "../../../../../hooks/useDateQueries";
import DateFilterToolbar from "../../../../globalcomponents/DateFilterToolbar";

const SupplierStage2Table = () => {
  const [openReadinessModal, setOpenReadinessModal] = useState(false);
  const [supplierApplicant, setSupplierApplicant] = useState({});
  const [openResultModal, setOpenResultModal] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // ----------------data fetching------------------------

  const { data: mcqData, isLoading } = useGetQaAndFranchiseeMcq(3);
  const { data: mcqDataByUserId, isLoading: loadingResults } =
    useGetQaAndFranchiseeMcqByUserId({
      userId: supplierApplicant?.userId,
      roleId: 3,
      options: {
        enabled: !!supplierApplicant?.userId,
      },
    });

  const [selectedDate, setSelectedDate] = useState("startDate");

  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(
    dateQueries,
    selectedDate,
    mcqData?.data
  );

  // --------------mutation callbacks--------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    closeReadiness();
  };
  const onFailed = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };

  //------------------------mutation------------------------
  const setFinalDiscussion = (initPayload) => {
    const payload = {
      userId: supplierApplicant.userId,
      discussionDate: initPayload.interviewDate,
      interviewLink: initPayload.interviewLink,
    };
    finalDiscussion(payload);
  };
  const { mutate: finalDiscussion, isLoading: isSubmitting } =
    useSupplierDiscussionDate(onSuccess, onFailed);

  const getActiveApplicant = (applicantId) =>
    mcqData?.data?.filter((applicant) => applicant.userId === applicantId);

  const openReadinessHandler = (userId) => {
    const applicant = getActiveApplicant(userId);
    setSupplierApplicant(applicant.at(0));
    setOpenReadinessModal(true);
  };
  const openResultModalHandler = (userId) => {
    const applicant = getActiveApplicant(userId);
    setSupplierApplicant(applicant.at(0));
    setOpenResultModal(true);
  };

  const closeReadiness = () => {
    setOpenReadinessModal(false);
  };
  const closeResultModalHandler = () => {
    setOpenResultModal(false);
  };

  const columns = [
    {
      name: "s/n",
      label: "S/N",
      options: {
        customBodyRender: (_, index) => index.rowIndex + 1,
      },
    },

    {
      name: "name",
      label: "Name",
    },

    {
      name: "startDate",
      label: "Start Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "endDate",
      label: "End Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "numberOfFoldersToPass",
      label: "No of Exams Required",
    },
    {
      name: "totalTestPassed",
      label: "No of Exams Passed",
    },
    {
      name: "userId",
      label: "Action",
      options: {
        customBodyRender: (value) => {
          const actions = [
            {
              id: 0,
              name: "Confirm Readiness",
              action: () => openReadinessHandler(value),
              disabled: false,
            },
            {
              id: 1,
              name: "View Result",
              action: () => openResultModalHandler(value),
              disabled: false,
            },
          ];
          return <GlobalTableActions actions={actions} id="userId" />;
        },
      },
    },
  ];

  return (
    <div>
      <GlobalBallBeat loading={isLoading} />

      {!isLoading && (
        <GlobalTable
          columns={columns}
          data={filteredResults}
          options={{
            customToolbar: () => (
              <DateFilterToolbar
                dateQueries={dateQueries}
                setDateQueries={setDateQueries}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                firstDate="startDate"
                secondDate="endDate"
              />
            ),
          }}
        />
      )}
      {openReadinessModal && (
        <SetInterviewDate
          isOpen={openReadinessModal}
          closeModal={closeReadiness}
          applicant={supplierApplicant}
          setInterview={setFinalDiscussion}
          isSubmitting={isSubmitting}
          interviewType={"readiness"}
          address={"Meeting Link"}
        />
      )}

      {openResultModal && (
        <ViewResult
          data={mcqDataByUserId?.data}
          isLoading={loadingResults}
          isOpen={openResultModal}
          closeModal={closeResultModalHandler}
        />
      )}
    </div>
  );
};

export default SupplierStage2Table;
