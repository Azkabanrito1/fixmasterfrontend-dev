import React, { useState } from "react";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import { Link } from "react-router-dom";
import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import {
  useGetCollaboratorPreferenceQuestion,
  useCreatePreferenceQuestion,
  useCreatePreferenceQuestionOption,
  useActivateOrDeactivatePreferenceQuestionOption,
} from "../../../hooks/useQueries/useAdmin";
import { format } from "date-fns";
import FormQuestion from "../../../components/admincomponents/preferences/FormQuestion";
import { useSnackbar } from "notistack";
import { useGetCollaboratorRoles } from "../../../hooks/useQueries/useIdentity";
import { Chip } from "@mui/material";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import FormOptions from "../../../components/admincomponents/preferences/FormOptions";
import Options from "../../../components/admincomponents/preferences/OptionsTable";

const CollaboratorPref = ({ title, roles }) => {
  const [addQuestion, setAddQuestion] = useState(false);
  const [showOption, setShowOption] = useState(false);
  const [activeQuestionId, setactiveQuestionId] = useState({});
  const [showOptionTable, setshowOptionTable] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const shownQuestionForm = () => {
    setAddQuestion(true);
  };
  const shownOptionHandler = (id) => {
    setactiveQuestionId(id);
    setShowOption(true);
  };
  const shownOptionTableHandler = (id) => {
    setshowOptionTable(true);
    setactiveQuestionId(id);
  };
  const closeQuestionForm = () => {
    setAddQuestion(false);
  };
  const closeShowOptionHandler = () => {
    setShowOption(false);
  };
  const closeShowOptionTableHandler = () => {
    setshowOptionTable(false);
  };
  const { data: rolesData } = useGetCollaboratorRoles();

  const role = rolesData?.data?.find((collab) => collab.name === roles);

  const { data: questionsData, isLoading } =
    useGetCollaboratorPreferenceQuestion(role?.id);

  //-----------------------------------mutations--------------------------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    closeQuestionForm();
    closeShowOptionHandler();
  };
  const onFailed = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };
  const { mutate: createQuestion, isLoading: isCreatingQuestion } =
    useCreatePreferenceQuestion(onSuccess, onFailed);

  const { mutate: createOptions, isLoading: isCreatingOption } =
    useCreatePreferenceQuestionOption(onSuccess, onFailed);

  const { mutate: activateOrDeactivate } =
    useActivateOrDeactivatePreferenceQuestionOption(onSuccess, onFailed);

  const columns = [
    {
      name: "s/n",
      label: "S/N",
      options: {
        customBodyRender: (_, index) => index.rowIndex + 1,
      },
    },
    {
      name: "question",
      label: "Question",
    },
    {
      name: "questionType",
      label: "Question Type",
    },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (value) => (
          <Chip
            label={
              value === "Active"
                ? "Active"
                : value === "Inactive"
                ? "Inactive"
                : null
            }
            color={
              value === "Active"
                ? "success"
                : value === "Inactive"
                ? "warning"
                : ""
            }
          />
        ),
      },
    },
    {
      name: "createdDate",
      label: "Date Created",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "id",
      label: "Action",
      options: {
        customBodyRender: (value) => {
          const activatePayload = {
            id: value,
            entityTypes: 1,
            actionTypes: 1,
          };
          const deActivatePayload = {
            id: value,
            entityTypes: 1,
            actionTypes: 2,
          };
          const actions = [
            {
              id: 0,
              name: "Add option",
              action: () => shownOptionHandler(value),
              disabled: false,
            },
            {
              id: 1,
              name: "View options",
              action: () => shownOptionTableHandler(value),
              disabled: false,
            },
            {
              id: 2,
              name: "Activate Question",
              action: () => activateOrDeactivate(activatePayload),
              disabled: false,
            },
            {
              id: 3,
              name: "Deactivate Question",
              action: () => activateOrDeactivate(deActivatePayload),
              disabled: false,
            },
          ];
          return <GlobalTableActions actions={actions} id="id" />;
        },
      },
    },
  ];

  const submit = (initialPayload) => {
    const payload = {
      question: initialPayload.question,
      questionType: initialPayload.questionType,
      roleId: role?.id,
    };
    createQuestion(payload);
  };

  const submitOptions = (optionPayload) => {
    const payload = {
      optionValue: optionPayload.option,
      notificationQuestionId: activeQuestionId,
    };
    createOptions(payload);
  };

  return (
    <>
      <div className="position-relative mb-5">
        <BackBtn />
        <PageHeading>{title}</PageHeading>

        <div>
          <Link
            onClick={shownQuestionForm}
            className="position-absolute top-0 end-0 btn"
            style={{ backgroundColor: "var(--clr-primary)", color: "#fff " }}
            width="max-content"
            px="2em"
          >
            Add Questions
          </Link>
        </div>
      </div>
      <div className="text-center">
        <GlobalBallBeat loading={isLoading} />
      </div>
      <GlobalTable columns={columns} data={questionsData?.data} />
      {addQuestion && (
        <FormQuestion
          openModal={addQuestion}
          closeModal={closeQuestionForm}
          action={submit}
          loading={isCreatingQuestion}
        />
      )}

      {showOption && (
        <FormOptions
          isOpen={showOption}
          closeModal={closeShowOptionHandler}
          submit={submitOptions}
          loading={isCreatingOption}
        />
      )}
      {showOptionTable && (
        <Options
          isOpen={showOptionTable}
          closeModal={closeShowOptionTableHandler}
          activeQuestionId={activeQuestionId}
        />
      )}
    </>
  );
};

export default CollaboratorPref;
