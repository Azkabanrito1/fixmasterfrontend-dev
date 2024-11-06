import React, { useState } from "react";
import Collapsible from "react-collapsible";
import { Container } from "./VideoHome";
import GlobalTable from "../../../../components/globalcomponents/GlobalTable";
import GlobalTableActions from "../../../../components/globalcomponents/GlobalTableActions";
import MasterOptions from "../../../../components/admincomponents/masterdata/AddMasterOptions";
import ConfirmDeleteModal from "../../../../components/globalcomponents/modals/ConfirmDeleteModal";
import {
  useCreateLanguage,
  useDeleteLanguage,
  useGetUserLanguage,
  useUpdateLanguage,
} from "../../../../hooks/useQueries/useAdmin";
import { useSnackbar } from "notistack";
import AddBtn from "../../../../components/franchiseecomponents/jobsmanagement/AddBtn";
import { SectionHeading } from "../../../../components/globalcomponents/Utilities";

const Language = () => {
  const [openAddLanguage, setOpenAddLanguage] = useState(false);
  const [activelang, setActivelang] = useState({});
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  //---------------------------------------fetching datA---------------------------------------------------
  const { data: languageData, isLoading } = useGetUserLanguage();
  //--------------------------------------------mutate &mutate fn ----------------------------------

  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    setOpenAddLanguage(false);
    setOpenUpdateModal(false);
    setOpenDeleteModal(false);
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };

  const { mutate: createLanguage, isLoading: isCreating } = useCreateLanguage(
    onSuccess,
    onFailure
  );
  const { mutate: updateLanguage, isLoading: isUpdating } = useUpdateLanguage(
    onSuccess,
    onFailure
  );
  const { mutate: deleteLanguage, isLoading: isDeleting } = useDeleteLanguage(
    onSuccess,
    onFailure
  );

  const getActiveLanguage = (id) =>
    languageData?.data?.filter((lang) => lang.id === id);

  //-------------------------------------------modal controller----------------------------------------------------
  const showAddLanguage = () => setOpenAddLanguage(true);
  const showUpadateLanguage = (id) => {
    const lang = getActiveLanguage(id);
    setActivelang(lang[0]);
    setOpenUpdateModal(true);
  };
  const showDeleteLanguage = (id) => {
    const lang = getActiveLanguage(id);
    setActivelang(lang[0]);
    setOpenDeleteModal(true);
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
      name: "id",
      label: "Action",
      options: {
        customBodyRender: (value) => {
          const actions = [
            {
              id: 0,
              name: "Update language",
              action: () => showUpadateLanguage(value),
            },
            {
              id: 1,
              name: "Delete language",
              action: () => showDeleteLanguage(value),
            },
          ];
          return <GlobalTableActions id="id" actions={actions} />;
        },
      },
    },
  ];

  const submit = (initialPayload) => {
    const payload = {
      longName: initialPayload.name,
    };
    createLanguage(payload);
  };
  const updateLang = (initialPayload) => {
    const payload = {
      longName: initialPayload.name,
      id: activelang?.id,
    };
    updateLanguage(payload);
  };

  const filteredLang = languageData?.data?.filter(
    (lang) => lang.id === activelang.id
  );

  return (
    <div style={{ marginBottom: "-1rem", marginTop: "-2.5rem" }}>
      <Collapsible
        trigger={
          <SectionHeading className="w-100 d-flex justify-content-between">
            Language
            <i className="fas fa-chevron-right"></i>
          </SectionHeading>
        }
      >
        <GlobalTable columns={columns} data={languageData?.data} />
        <AddBtn
          text="Add Video Topic"
          id="add-video-topic"
          action={showAddLanguage}
        />
      </Collapsible>
      {openAddLanguage && (
        <MasterOptions
          isOpen={openAddLanguage}
          closeModal={() => setOpenAddLanguage(false)}
          heading="Add language"
          name="language"
          submit={submit}
          placeHolder="Language e.g English"
          isAdding={isCreating}
          actionText="Add language"
        />
      )}
      {openUpdateModal && (
        <MasterOptions
          isOpen={openUpdateModal}
          closeModal={() => setOpenUpdateModal(false)}
          heading="Update language"
          name="language"
          submit={updateLang}
          placeHolder="Language e.g English"
          isAdding={isUpdating}
          customer={filteredLang}
          actionText="Update language"
        />
      )}
      {openDeleteModal && (
        <ConfirmDeleteModal
          open={openDeleteModal}
          close={() => setOpenDeleteModal(false)}
          labelText="Delete Academic Language"
          pText="Are you sure you want to delete this language?"
          actionText="Delete"
          onDelete={() => deleteLanguage(activelang?.id)}
          isLoading={isDeleting}
        />
      )}
    </div>
  );
};

export default Language;
