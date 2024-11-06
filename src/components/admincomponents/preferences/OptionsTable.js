import { useSnackbar } from "notistack";
import {
  useActivateOrDeactivatePreferenceQuestionOption,
  useGetCollaboratorPreferenceOptionByQuestionId,
} from "../../../hooks/useQueries/useAdmin";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import GlobalModal from "../../globalcomponents/GlobalModal";
import GlobalTable from "../../globalcomponents/GlobalTable";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";

const Options = ({ isOpen, closeModal, activeQuestionId }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { data: optionData, isLoading } =
    useGetCollaboratorPreferenceOptionByQuestionId(activeQuestionId);
  console.log(optionData);
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
  };
  const onFailed = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };
  const { mutate: activateOrDeactivate } =
    useActivateOrDeactivatePreferenceQuestionOption(onSuccess, onFailed);

  const columns = [
    {
      name: "s/n",
      label: "S/N",
      options: {
        customBodyRender: (_, i) => i.rowIndex + 1,
      },
    },
    {
      name: "questionId",
      label: "Question Number ",
    },
    {
      name: "optionValue",
      label: "Option ",
    },
    {
      name: "status",
      label: "Status ",
    },
    {
      name: "optionId",
      label: "Action",
      options: {
        customBodyRender: (value) => {
          const activatePayload = {
            id: value,
            entityTypes: 2,
            actionTypes: 1,
          };
          const deActivatePayload = {
            id: value,
            entityTypes: 2,
            actionTypes: 2,
          };
          const actions = [
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
  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader heading={"Questions Options"} closeModal={closeModal} />
      <div className="text-center">
        <GlobalBallBeat loading={isLoading} />
      </div>
      <GlobalTable data={optionData?.data} columns={columns} />
    </GlobalModal>
  );
};

export default Options;
