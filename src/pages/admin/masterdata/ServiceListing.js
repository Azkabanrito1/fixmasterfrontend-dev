import { Link } from "react-router-dom";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import { useState } from "react";
import AddServices from "../../../components/admincomponents/masterdata/AddServices";
import { useSnackbar } from "notistack";
import {
  useCreateServiceListing,
  useGetFixEquipment,
  useGetServiceListing,
  useUpdateServiceListing,
  useDeleteServiceListing,
  useGetFixCategoryByName,
} from "../../../hooks/useQueries/useAdmin";
import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import { useGetFixClass } from "../../../hooks/useQueries/useJobs";
import ConfirmDeleteModal from "../../../components/globalcomponents/modals/ConfirmDeleteModal";

const ServiceListing = () => {
  const [showServices, setShowServices] = useState(false);
  const [showUpdateService, setShowUpdateService] = useState(false);
  const [activeService, setActiveService] = useState({});
  const [deleteService, setDeleteService] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  //-----------------------------------------------------data fetching----------------------------------------------------

  const { data: servicesData, isLoading } = useGetServiceListing();

  //-----------------------------------------------------modal control ----------------------------------------------------
  const addServicesHandler = () => {
    setShowServices(true);
  };

  const getActiveService = function (id) {
    return servicesData?.data?.filter((item) => item.id === id);
  };

  const updateServicesHandler = (id) => {
    const service = getActiveService(id);
    setActiveService(service[0]);
    setShowUpdateService(true);
  };
  const deleteServicesHandler = (id) => {
    const service = getActiveService(id);
    setActiveService(service[0]);
    setDeleteService(true);
  };
  //---------------------------------------------------mutations & mutate fn ----------------------------------------------------------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    setShowServices(false);
    setShowUpdateService(false);
    setDeleteService(false);
  };

  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };

  const { mutate: updateService, isLoading: isUpdating } =
    useUpdateServiceListing(onSuccess, onFailure);
  const { mutate: deleteServices, isLoading: isDeleting } =
    useDeleteServiceListing(onSuccess, onFailure);

  const columns = [
    {
      name: "s/n",
      label: "S/N",
      options: {
        customBodyRender: (_, tableMeta) => tableMeta.rowIndex + 1,
      },
    },
    {
      name: "categoryName",
      label: "Category",
    },
    {
      name: "fixClass",
      label: "Booking Type",
    },
    {
      name: "name",
      label: "Services",
    },
    {
      name: "levels",
      label: "Level",
      options: {
        customBodyRender: (value) => {
          return <div>{`L${value}`}</div>;
        },
      },
    },
    {
      name: "standardRate",
      label: "Standard Rate",
      options: {
        customBodyRender: (value) =>
          value ? `₦${value?.toLocaleString()}` : "",
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
              name: "Update service",
              action: () => updateServicesHandler(value),
            },
            // {
            //   id: 2,
            //   name: "Delete service",
            //   action: () => deleteServicesHandler(value),
            // },
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
        <PageHeading>Service Listing</PageHeading>
        <GlobalBallBeat loading={isLoading} />
        {/* <div>
          <Link
            onClick={addServicesHandler}
            className="position-absolute top-0 end-0 btn"
            style={{ backgroundColor: "var(--clr-primary)", color: "#fff " }}
            width="max-content"
            px="2em"
          >
            Add Service Listing
          </Link>
        </div> */}
      </div>
      <GlobalTable data={servicesData?.data} columns={columns} />

      {/* {showServices && (
        <AddServices
          isOpen={showServices}
          closeModal={() => setShowServices(false)}
          createServices={createServices}
          isLoading={isCreating}
          heading="Add Services"
          textAction="Submit"
          equipmentData={equipmentData}
          bookingClassData={bookingClassData}
          categoryDataByName={categoryDataByName}
        />
      )} */}
      {showUpdateService && (
        <AddServices
          isOpen={showUpdateService}
          closeModal={() => setShowUpdateService(false)}
          update={updateService}
          isLoading={isUpdating}
          heading="Update Services"
          textAction="Save"
          data={activeService}
        />
      )}

      {deleteService && (
        <ConfirmDeleteModal
          open={deleteService}
          close={() => setDeleteService(false)}
          labelText="Delete Service"
          pText="Are you sure you want to delete this service?"
          actionText="Delete"
          onDelete={() => deleteServices(activeService.id)}
          isLoading={isDeleting}
        />
      )}
    </>
  );
};

export default ServiceListing;
