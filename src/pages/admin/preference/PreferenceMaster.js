import { Link } from "react-router-dom";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import MasterQuestion from "../../../components/admincomponents/preferences/MasterQuestion";
import { useState } from "react";
import {
  useCreatePrefMaster,
  useGetPreferenceMaster,
} from "../../../hooks/useQueries/useAdmin";
import { useSnackbar } from "notistack";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import { format } from "date-fns";

const PreferenceMasters = () => {
  const [openMasterModal, setOpenMasterModal] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  //==============================mutate fnc && mutations =================================================
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    setOpenMasterModal(false);
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };

  const { mutate: createMaster, isLoading: isCreating } = useCreatePrefMaster(
    onSuccess,
    onFailure
  );

  //-------------------------------------------------data fetching------------------------------------------
  const { data: masterData } = useGetPreferenceMaster();

  const columns = [
    {
      name: "s/n",
      label: "S/N",
      options: {
        customBodyRender: (_, index) => index.rowIndex + 1,
      },
    },
    {
      name: "id",
      label: "ID",
    },
    {
      name: "createdAt",
      label: "Created Date",
      options: {
        customBodyRender: (value) => format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "name",
      label: "Name",
    },
  ];
  return (
    <>
      <div className="position-relative mb-5">
        <BackBtn />
        <PageHeading>Preference Master</PageHeading>
        <div>
          <Link
            onClick={() => setOpenMasterModal(true)}
            className="position-absolute top-0 end-0 btn"
            style={{ backgroundColor: "var(--clr-primary)", color: "#fff " }}
            width="max-content"
            px="2em"
          >
            Add Contact Preference
          </Link>
        </div>
      </div>
      {openMasterModal && (
        <MasterQuestion
          isOpen={openMasterModal}
          closeModal={() => setOpenMasterModal(false)}
          createMaster={createMaster}
          isCreating={isCreating}
        />
      )}
      <GlobalTable data={masterData?.data} columns={columns} />
    </>
  );
};

export default PreferenceMasters;
