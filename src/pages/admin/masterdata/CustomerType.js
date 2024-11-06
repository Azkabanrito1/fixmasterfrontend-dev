import { Link } from "react-router-dom";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import { useState } from "react";
import MasterOptions from "../../../components/admincomponents/masterdata/AddMasterOptions";
import { useSnackbar } from "notistack";
import {
  useCreateCustomerSubType,
  useCreateCustomerType,
  useDeleteCustomerType,
  useGetCustomerTypesOptions,
  useUpdateCustomerType,
} from "../../../hooks/useQueries/useAdmin";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import SubTypeTable from "../../../components/admincomponents/masterdata/SubTypeTable";
import ConfirmDeleteModal from "../../../components/globalcomponents/modals/ConfirmDeleteModal";

const CustomerTypes = () => {
  const [openMasterOption, setOpenMasterOption] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState();
  const [activeCustomer, setActiveCustomer] = useState({});
  const [openAddSubType, setOpenAddSubType] = useState(false);
  const [openSubTypeDetails, setOpenSubTypeDetails] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  //--------------------------------------data fetching----------------------------------------------------
  // const { data: customerData, isLoading } = useGetCustomerTypeAndSubType();
  const { data: customerTypeData, isLoading } = useGetCustomerTypesOptions();
  //----------------------------------------mutate & mutate fn--------------------------------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    setOpenMasterOption(false);
    setOpenUpdateModal(false);
    setOpenAddSubType(false);
    setDeleteModal(false);
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };

  const { mutate: createCustomer, isLoading: isCreating } =
    useCreateCustomerType(onSuccess, onFailure);
  const { mutate: updateCustomer, isLoading: isUpdating } =
    useUpdateCustomerType(onSuccess, onFailure);
  const { mutate: createCustomerSubType, isLoading: isCreatingSub } =
    useCreateCustomerSubType(onSuccess, onFailure);
  const { mutate: deleteCustomerType, isLoading: isDeleting } =
    useDeleteCustomerType(onSuccess, onFailure);
  //-------------------------------modal control-------------------------------
  const getActiveCustomer = (id) =>
    customerTypeData?.data.filter((type) => type.id === id);
  const showMasterOption = () => setOpenMasterOption(true);
  const updateCustomerType = (id) => {
    const type = getActiveCustomer(id);
    setActiveCustomer(type[0]);
    setOpenUpdateModal(true);
  };
  const updateCustomerSubType = (id) => {
    const type = getActiveCustomer(id);
    setActiveCustomer(type[0]);
    setOpenAddSubType(true);
  };
  const showCustomerSubType = (id) => {
    const type = getActiveCustomer(id);
    setActiveCustomer(type[0]);
    setOpenSubTypeDetails(true);
  };
  const openDeleteModal = (id) => {
    setDeleteModal(true);
    const type = getActiveCustomer(id);
    setActiveCustomer(type[0]);
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
              name: "Update Customer Type",
              action: () => updateCustomerType(value),
            },
            {
              id: 1,
              name: "Add Customer SubType",
              action: () => updateCustomerSubType(value),
            },
            {
              id: 2,
              name: "View Customer SubType",
              action: () => showCustomerSubType(value),
            },
            {
              id: 3,
              name: "Delete Customer Type",
              action: () => openDeleteModal(value),
            },
          ];
          return <GlobalTableActions id="id" actions={actions} />;
        },
      },
    },
  ];

  const addCustomerType = (initPayload) => {
    const payload = {
      name: initPayload.name,
      description: initPayload.description,
    };
    createCustomer(payload);
  };
  const updateCustomerTypes = (initPayload) => {
    const payload = {
      name: initPayload.name,
      description: initPayload.description,
      id: activeCustomer.id,
    };
    updateCustomer(payload);
  };

  const addCustomerSubType = (initPayload) => {
    const payload = {
      cusTypeId: activeCustomer?.id,
      name: initPayload.name,
    };
    createCustomerSubType(payload);
  };

  const updateDate = customerTypeData?.data?.filter(
    (customer) => customer.id === activeCustomer.id
  );
  return (
    <>
      <div className="position-relative mb-5">
        <BackBtn />
        <PageHeading>Customer Type</PageHeading>
        <GlobalBallBeat loading={isLoading} />
        <div>
          <Link
            onClick={showMasterOption}
            className="position-absolute top-0 end-0 btn"
            style={{ backgroundColor: "var(--clr-primary)", color: "#fff " }}
            width="max-content"
            px="2em"
          >
            Add Customer Type
          </Link>
        </div>
      </div>

      <GlobalTable data={customerTypeData?.data} columns={columns} />

      {openMasterOption && (
        <MasterOptions
          isOpen={openMasterOption}
          closeModal={() => setOpenMasterOption(false)}
          heading="Add Customer Type"
          name="Customer Type"
          submit={addCustomerType}
          placeHolder="Customer Type e.g Individual Customer"
          isAdding={isCreating}
          actionText="Add Customer Type"
        />
      )}
      {openUpdateModal && (
        <MasterOptions
          isOpen={openUpdateModal}
          closeModal={() => setOpenUpdateModal(false)}
          heading="Update Customer Type"
          tName="Customer Type"
          submit={updateCustomerTypes}
          placeHolder="Customer Type e.g Individual Customer"
          isAdding={isUpdating}
          customer={updateDate}
          actionText="Update Customer Type"
        />
      )}
      {openAddSubType && (
        <MasterOptions
          isOpen={openAddSubType}
          closeModal={() => setOpenAddSubType(false)}
          heading="Add Customer Sub Type"
          tName="Customer Sub Type"
          submit={addCustomerSubType}
          placeHolder="Customer Type e.g Estate Customer"
          isAdding={isCreatingSub}
          actionText="Add Customer Sub Type"
        />
      )}
      {openSubTypeDetails && (
        <SubTypeTable
          isOpen={openSubTypeDetails}
          closeModal={() => setOpenSubTypeDetails(false)}
          id={activeCustomer?.id}
        />
      )}
      {deleteModal && (
        <ConfirmDeleteModal
          open={deleteModal}
          isLoading={isDeleting}
          close={() => setDeleteModal(false)}
          labelText={"Delete Customer Type"}
          pText={"Are you sure you want to delete this customer type"}
          actionText={"Delete"}
          onDelete={() => deleteCustomerType(activeCustomer?.id)}
        />
      )}
    </>
  );
};

export default CustomerTypes;
