import React, { useState } from "react";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import { Link } from "react-router-dom";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import AddEquipmentModal from "../../../components/admincomponents/masterdata/AddEquipmentModal";
import {
  useCreateFixEquipment,
  useDeleteFixEquipment,
  useGetFixCategory,
  useGetFixEquipment,
  useUpdateFixEquipment,
} from "../../../hooks/useQueries/useAdmin";
import { useSnackbar } from "notistack";
import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import ConfirmDeleteModal from "../../../components/globalcomponents/modals/ConfirmDeleteModal";
import { Chip } from "@mui/material";

const EquipmentToFix = () => {
  const [showEquip, setShowEquip] = useState(false);
  const [showUpdateEquip, setShowUpdateEquip] = useState(false);
  const [activeEquipment, setActiveEquipment] = useState({});
  const [showDeleteEquip, setShowDeleteEquip] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  //----------------------------------------------------------------data fetching----------------------------------------------------------------
  const { data: categoryData } = useGetFixCategory();
  const { data: equipmentData, isLoading } = useGetFixEquipment();

  const category = categoryData?.data?.map((category) => {
    return {
      id: category.id,
      name: category.longName,
    };
  });

  const equipmentHandler = function () {
    setShowEquip(true);
  };
  const getActiveEquip = function (id) {
    return equipmentData?.data?.filter((item) => item.id === id);
  };
  const updateHandler = function (id) {
    const equipment = getActiveEquip(id);
    setActiveEquipment(equipment[0]);
    setShowUpdateEquip(true);
  };
  const deleteHandler = function (id) {
    const equipment = getActiveEquip(id);
    setActiveEquipment(equipment[0]);
    setShowDeleteEquip(true);
  };

  //----------------------------------------------------------mutation $ mutate fn ----------------------------------------------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    setShowEquip(false);
    setShowUpdateEquip(false);
    setShowDeleteEquip(false);
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };

  const { mutate: createEquipment, isLoading: isCreating } =
    useCreateFixEquipment(onSuccess, onFailure);

  const { mutate: updateEquipment, isLoading: isUpdating } =
    useUpdateFixEquipment(onSuccess, onFailure);

  const { mutate: deleteEquipment, isLoading: isDeleting } =
    useDeleteFixEquipment(onSuccess, onFailure);

  const columns = [
    {
      name: "s/n",
      label: "S/N",
      options: {
        customBodyRender: (_, index) => index.rowIndex + 1,
      },
    },
    {
      name: "subCategoryName",
      label: "Sub Category",
    },
    {
      name: "name",
      label: "Equipment",
    },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (value) => {
          return (
            <Chip
              label={value ? "Active" : "Inactive"}
              color={value ? "success" : "warning"}
            />
          );
        },
      },
    },

    {
      name: "id",
      label: "Action",
      options: {
        customBodyRender: (value) => {
          const actions = [
            {
              id: 1,
              name: "Update",
              action: () => updateHandler(value),
            },
            {
              id: 2,
              name: "Delete",
              action: () => deleteHandler(value),
            },
          ];
          return <GlobalTableActions actions={actions} id="id" />;
        },
      },
    },
  ];
  return (
    <>
      <div className="position-relative mb-5">
        <BackBtn />
        <PageHeading>Equipment To Fix</PageHeading>
        <GlobalBallBeat loading={isLoading} />
        <div>
          <Link
            onClick={equipmentHandler}
            className="position-absolute top-0 end-0 btn"
            style={{ backgroundColor: "var(--clr-primary)", color: "#fff " }}
            width="max-content"
            px="2em"
          >
            Add Equipment
          </Link>
        </div>
      </div>
      <GlobalTable data={equipmentData?.data} columns={columns} />
      {showEquip && (
        <AddEquipmentModal
          isOpen={showEquip}
          closeModal={() => setShowEquip(false)}
          heading="Add Equipment"
          category={category}
          submit={createEquipment}
          isAdding={isCreating}
          actionText="Submit"
        />
      )}
      {showUpdateEquip && (
        <AddEquipmentModal
          isOpen={showUpdateEquip}
          closeModal={() => setShowUpdateEquip(false)}
          heading="Update Equipment"
          category={category}
          update={updateEquipment}
          isAdding={isUpdating}
          actionText="Save"
          data={activeEquipment}
        />
      )}

      {showDeleteEquip && (
        <ConfirmDeleteModal
          open={showDeleteEquip}
          close={() => setShowDeleteEquip(false)}
          labelText="Delete Equipment"
          pText="Are you sure you want to delete this equipment?"
          actionText="Delete"
          onDelete={() => deleteEquipment(activeEquipment.id)}
          isLoading={isDeleting}
        />
      )}
    </>
  );
};

export default EquipmentToFix;
