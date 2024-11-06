import { useState } from "react";
import { useParams } from "react-router-dom";
import GlobalTable from "../../../globalcomponents/GlobalTable";
import { BackBtn, PageHeading } from "../../../globalcomponents/Utilities";
import { useGetMcqsByFolder } from "../../../../hooks/useQueries/useAdmin";
import { useGetCategories } from "../../../../hooks/useQueries/useOnboarding";
import CustomToolbarBtn from "../../../globalcomponents/CustomToolbarBtn";
import GlobalTableActions from "../../../globalcomponents/GlobalTableActions";
import MCQForm from "./modals/MCQForm";
import MCQExcelForm from "./modals/MCQExcelForm";
import GlobalBallBeat from "../../../globalcomponents/GlobalBallBeat";

const convertBoolStrToBoolean = (str) => {
  if (str === "true") {
    return true;
  } else if (str === "false") {
    return false;
  }
};

const TrainingFolderMcqs = () => {
  const { folderId } = useParams();
  const [activeMcq, setActiveMcq] = useState(null);
  const [openUploadMcq, setOpenUploadMcq] = useState(false);
  const [openManageQuestionOpts, setOpenManageQuestionOpts] = useState(false);
  const searchParams = new URLSearchParams(window.location.search);
  const useCategoryTxt = searchParams.get("useCategory");
  const useDurationTxt = searchParams.get("useDuration");

  // =======================fetching data =======================
  const { data: mcqsData, isLoading } = useGetMcqsByFolder(folderId);
  const { data: categoryData } = useGetCategories();

  // =========================columns =========================
  const columns = [
    {
      name: "sn",
      label: "S/N",
      options: { customBodyRender: (_, meta) => meta.rowIndex + 1 },
    },
    { name: "question", label: "Question" },
    { name: "weight", label: "Question Weight" },
    {
      name: "category",
      label: "Category",
      options: {
        customBodyRender: (value) =>
          !!value
            ? categoryData?.data?.filter((data) => data.id === value)?.[0]
                ?.longName
            : "N/A",
      },
    },
    {
      name: "questionId",
      label: "Actions",
      options: {
        customBodyRender: (value) => {
          const actions = [
            {
              id: 0,
              name: "Manage Question & Options",
              action: () => openManageOptions(value),
              disabled: true,
            },
            {
              id: 0,
              name: "Delete Question",
              action: () => openManageOptions(value),
              disabled: true,
            },
          ];

          return (
            <div className="text-center">
              <GlobalTableActions
                actions={actions}
                id={`training-mcq-${value}`}
              />
            </div>
          );
        },
      },
    },
  ];

  // =========================actions=====================
  const openManageOptions = (id) => {
    setActiveMcq(id);
    setOpenManageQuestionOpts(true);
  };

  const useCategory = convertBoolStrToBoolean(useCategoryTxt);
  const useDuration = convertBoolStrToBoolean(useDurationTxt);

  return (
    <>
      <BackBtn />
      <div className="mb-5 position-relative">
        <PageHeading>Questions</PageHeading>
      </div>

      <GlobalBallBeat loading={isLoading} />

      <GlobalTable
        columns={columns}
        data={mcqsData?.data || []}
        options={{
          customToolbar: () => (
            <>
              <CustomToolbarBtn
                action={() => openManageOptions(null)}
                text="Add Question"
                className="me-2"
              />
              {/* <CustomToolbarBtn
                action={() => setOpenUploadMcq(true)}
                text="Upload MCQ Excel"
              /> */}
            </>
          ),
        }}
      />

      {openManageQuestionOpts && (
        <MCQForm
          isOpen={openManageQuestionOpts}
          closeModal={() => setOpenManageQuestionOpts(false)}
          questionId={activeMcq}
          folderId={folderId}
          useCategory={useCategory}
          useDuration={useDuration}
        />
      )}

      {openUploadMcq && (
        <MCQExcelForm
          isOpen={openUploadMcq}
          closeModal={() => setOpenUploadMcq(false)}
          folderId={folderId}
          useCategory={useCategory}
        />
      )}
    </>
  );
};

export default TrainingFolderMcqs;
