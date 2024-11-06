import React, { useState } from "react";
import GlobalModal from "../../globalcomponents/GlobalModal";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import GlobalTable from "../../globalcomponents/GlobalTable";
import {
  useDeleteCustomerSubType,
  useGetCustomTypeSub,
  useUpdateCustomerSubType,
} from "../../../hooks/useQueries/useAdmin";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import MasterOptions from "./AddMasterOptions";
import { useSnackbar } from "notistack";
import ConfirmDeleteModal from "../../globalcomponents/modals/ConfirmDeleteModal";

const SubTypeTable = ({ isOpen, closeModal, id }) => {
  const [openSubType, setOpenSubType] = useState(false);
  const [activeSubType, setActiveSubType] = useState({});
  const [openDeleteSubType, setOpenDeleteSubType] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  //--------------------------------------------------customer subTypes------------------------------------------------
  const { data: customerTypeSubData } = useGetCustomTypeSub(id, {
    enabled: !!id,
  });

  //-----------------------------------------------mutate & mutate fn------------------------------------------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    setOpenSubType(false);
    setOpenDeleteSubType(false);
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };

  const { mutate: updateSubTypes, isLoading: isUpdating } =
    useUpdateCustomerSubType(onSuccess, onFailure);

  const { mutate: deleteSubTypes, isLoading: isDeleting } =
    useDeleteCustomerSubType(onSuccess, onFailure);

  //-------------------------------------------------modal controller------------------------------------------------
  const getActiveCustomer = (id) =>
    customerTypeSubData?.data.filter((type) => type.id === id);
  const updateCustomerSubType = (id) => {
    const type = getActiveCustomer(id);
    setActiveSubType(type[0]);
    setOpenSubType(true);
  };
  const deleteCustomerSubType = (id) => {
    const type = getActiveCustomer(id);
    setActiveSubType(type[0]);
    setOpenDeleteSubType(true);
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
              name: "Update Customer Sub Type",
              action: () => updateCustomerSubType(value),
            },
            {
              id: 1,
              name: "Delete Customer Sub Type",
              action: () => deleteCustomerSubType(value),
            },
          ];
          return <GlobalTableActions id="id" actions={actions} />;
        },
      },
    },
  ];
  const updateSubType = (initPayload) => {
    const payload = {
      id: activeSubType.id,
      name: initPayload.name,
      cusTypeId: id,
    };
    updateSubTypes(payload);
  };
  const subData = customerTypeSubData?.data?.filter(
    (subType) => subType.id === activeSubType.id
  );

  return (
    <>
      <GlobalModal isOpen={isOpen} closeModal={closeModal}>
        <AltModalHeader heading="Cutomer Sub Type" closeModal={closeModal} />
        <GlobalTable columns={columns} data={customerTypeSubData?.data} />
      </GlobalModal>

      {openSubType && (
        <MasterOptions
          isOpen={openSubType}
          closeModal={() => setOpenSubType(false)}
          heading="Update Customer Sub Type"
          tName="Customer Sub Type"
          submit={updateSubType}
          placeHolder="Customer Type e.g Estate Customer"
          isAdding={isUpdating}
          customer={subData}
          actionText="Update Customer Sub Type"
        />
      )}
      <ConfirmDeleteModal
        open={openDeleteSubType}
        close={() => setOpenDeleteSubType(false)}
        labelText="Delete Customer Sub Type"
        pText="Are you sure you want to delete this customer sub type?"
        actionText="Delete"
        onDelete={() => deleteSubTypes(activeSubType?.id)}
        isLoading={isDeleting}
      />
    </>
  );
};

export default SubTypeTable;
