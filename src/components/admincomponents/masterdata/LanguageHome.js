import React, { useState } from "react";
import { BackBtn, PageHeading } from "../../globalcomponents/Utilities";
import { Link } from "react-router-dom";
import GlobalTable from "../../globalcomponents/GlobalTable";
import MasterOptions from "./AddMasterOptions";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import { useSnackbar } from "notistack";
import {
  useCreateLanguage,
  useDeleteLanguage,
  useGetUserLanguage,
  useUpdateLanguage,
} from "../../../hooks/useQueries/useAdmin";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import ConfirmDeleteModal from "../../globalcomponents/modals/ConfirmDeleteModal";

const LanguageHome = () => {
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
    <>
      <div className="position-relative mb-5">
        <BackBtn />
        <PageHeading>Language Proficiency</PageHeading>
        <GlobalBallBeat loading={isLoading} />
        <div>
          <Link
            onClick={showAddLanguage}
            className="position-absolute top-0 end-0 btn"
            style={{ backgroundColor: "var(--clr-primary)", color: "#fff " }}
            width="max-content"
            px="2em"
          >
            Add language
          </Link>
        </div>
      </div>
      <GlobalTable columns={columns} data={languageData?.data} />
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
    </>
  );
};

export default LanguageHome;
