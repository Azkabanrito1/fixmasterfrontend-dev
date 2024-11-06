import React, { useEffect, useReducer, useState } from "react";
import {
  Grid,
  SectionHeading,
} from "../../../../../../globalcomponents/Utilities";
import InitialContactDropdowns from "../../../../../../franchiseecomponents/jobsmanagement/InitialContactDropdowns";
import GlobalTableActions from "../../../../../../globalcomponents/GlobalTableActions";
import GlobalTable from "../../../../../../globalcomponents/GlobalTable";
import {
  useAddEquipment,
  useCreateServiceListen,
  useDeleteEquipment,
  useGetCustomerEquipment,
  useGetCustomerServicesListing,
  useGetFixCategories,
  useGetFixClass,
  useGetFixEquipments,
} from "../../../../../../../hooks/useQueries/useJobs";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useGetServicesByEquipment } from "../../../../../../../hooks/useQueries/useAdmin";
import InitialEquipment from "./InitialEquipment";
import ViewServices from "./ViewServices";
import ConfirmDeleteModal from "../../../../../../globalcomponents/modals/ConfirmDeleteModal";

const initState = {
  selectedCategory: "",
  selectedEquipment: "",
  selectedServiceListing: [],
};

const fixDetailsReducer = (state, action) => {
  const { id, prop, type } = action;
  switch (type) {
    case "ADD":
      return {
        ...state,
        [prop]: id,
      };
    case "REMOVE":
      return { ...state, [prop]: "" };
    default:
      return state;
  }
};

const ServiceListing = ({ jobDetails }) => {
  const [fixDetails, setFixDetails] = useReducer(fixDetailsReducer, initState);
  const [openAssignEqpModal, setOpenAssignEqpModal] = useState(false);
  const [openViewServicesModal, setopenViewServicesModal] = useState(false);
  const [allServiceListing, setAllServiceListing] = useState([]);
  const [customerEquipment, setCustomerEquipment] = useState([]);
  const [activeId, setActiveId] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { fixId } = useParams();
  //----------------------------------data fetching-------------------------------------------------
  const { data: equipmentData } = useGetCustomerEquipment(fixId);
  const { data: serviceData } = useGetCustomerServicesListing(fixId);
  const { data: fixClassesData } = useGetFixClass();
  const { data: fixCategoriesData } = useGetFixCategories();
  const { enqueueSnackbar } = useSnackbar();

  //-------------------------------------mutate fn--------------------------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    closeDeleteModalHandler();
  };

  const onFailure = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };
  const onSuccessServiceFecting = (response) => {
    if (response?.statusCode === 200) {
      setAllServiceListing(response?.data);
    }
  };

  const { mutate: addEquipments } = useAddEquipment(onSuccess, onFailure);
  const { mutate: getServices } = useGetServicesByEquipment(
    onSuccessServiceFecting
  );
  const { mutate: createServices } = useCreateServiceListen(
    onSuccess,
    onFailure
  );
  const { mutate: deleteItemToFix, isLoading: isDeleteItem } =
    useDeleteEquipment(onSuccess, onFailure);

  // fn for open modal

  const openAssignEqpModalHandler = (id) => {
    setActiveId(id);
    setOpenAssignEqpModal(true);
    const payload = {
      equipmentId: id,
      classId: classes?.[0]?.id,
    };
    getServices(payload);
  };

  const closeAssignEqpModalHandler = () => {
    setOpenAssignEqpModal(false);
  };
  const closeViewServicesModalHandler = () => {
    setopenViewServicesModal(false);
  };

  const showDeleteModalHandler = (id) => {
    setOpenDeleteModal(true);
    setActiveId(id);
  };
  const closeDeleteModalHandler = () => setOpenDeleteModal(false);

  //----------------------------------dependents queries --------------------------------
  const {
    data: fixEquipmentData,
    isLoading,
    refetch: fetchFixItems,
  } = useGetFixEquipments(fixDetails.selectedCategory, {
    enabled: !!fixDetails.selectedCategory,
  });

  const classes = fixClassesData?.data?.filter((cat) => {
    return cat.name === jobDetails?.bookingClass;
  });

  // ---------------------------useEffects------------------------
  useEffect(() => {
    if (equipmentData?.data) {
      const equipmentServices = equipmentData?.data?.map((equipment) => {
        const services = serviceData?.data?.filter(
          (service) => service.equipmentId === equipment.equipmentId
        );
        const serviceNames = services?.map((service) => service.serviceName);

        return {
          ...equipment,
          serviceName: serviceNames?.length ? serviceNames.join(", ") : "N/A",
        };
      });

      setCustomerEquipment(equipmentServices);
    }
  }, [equipmentData?.data, serviceData?.data]);

  useEffect(() => {
    const activeCategory = fixCategoriesData?.data?.filter(
      (cat) =>
        cat.name.toLowerCase() === jobDetails?.bookingCategory?.toLowerCase()
    );

    setFixDetails({
      type: "ADD",
      prop: "selectedCategory",
      id: activeCategory?.[0]?.id,
    });
  }, [jobDetails?.bookingCategory]);

  useEffect(() => {
    if (!!fixDetails.selectedCategory) {
      fetchFixItems();
    }
  }, [fixDetails.selectedCategory]);

  // functions for each dropdown item
  const addService = (selectedData) => {
    const fixService = selectedData?.map((item) => {
      return item.id;
    });
    const payload = {
      fixId,
      equipmentId: activeId,
      fixServices: fixService,
    };

    createServices(payload);
  };

  const addEquipment = async (id) => {
    setFixDetails({ type: "ADD", id, prop: "selectedEquipment" });
    const payload = {
      fixId: Number(fixId),
      equipmentId: id,
    };
    addEquipments(payload);
  };

  const service = allServiceListing?.map((item) => {
    return {
      id: item.id,
      name: item.name,
    };
  });

  const columns = [
    {
      name: "S/N",
      options: {
        customBodyRender: (_, meta) => meta.rowIndex + 1,
      },
    },
    {
      name: "equipmentName",
      label: "Equipment Name",
    },
    {
      name: "serviceName",
      label: "Service Name",
    },
    {
      name: "dateCreated",
      label: "Requested Date",
      options: {
        customBodyRender: (value) => value.split(" ")[0],
      },
    },
    {
      name: "equipmentId",
      label: "Action",
      options: {
        filter: false,
        sort: false,
        searchable: false,
        customBodyRender: (value) => {
          const actions = [
            {
              id: 1,
              name: "Add Services",
              action: () => {
                openAssignEqpModalHandler(value);
              },
              disabled: false,
            },
            {
              id: 2,
              name: "View Services",
              action: () => setopenViewServicesModal(true),
            },
            {
              id: 2,
              name: "Delete Item",
              action: () => showDeleteModalHandler(value),
              // setopenViewServicesModal(true),
            },
          ];
          return <GlobalTableActions actions={actions} id="id" />;
        },
      },
    },
  ];

  const deleteItem = () => {
    const payload = {
      fixId: +fixId,
      equipmentId: activeId,
    };
    deleteItemToFix(payload);
  };

  return (
    <section className="mb-5">
      <SectionHeading>Service Listing</SectionHeading>

      <Grid>
        <div className="d-flex align-items-start">
          <h3 className="me-1 text-center">Item(s) to Fix</h3>
          <InitialContactDropdowns
            action={(id) => addEquipment(id)}
            options={fixEquipmentData?.data}
          />
        </div>
      </Grid>
      <>
        {customerEquipment?.length > 0 && (
          <div>
            <p className="description">
              You can add services for each item to fix
            </p>
            <GlobalTable columns={columns} data={customerEquipment} />
          </div>
        )}
        {openAssignEqpModal && (
          <InitialEquipment
            isOpen={openAssignEqpModal}
            closeModal={closeAssignEqpModalHandler}
            isLoading={isLoading}
            selectedData={serviceData?.data}
            eqpServices={service}
            addEquip={addService}
          />
        )}
        {openViewServicesModal && (
          <ViewServices
            isOpen={openViewServicesModal}
            closeModal={closeViewServicesModalHandler}
            serviceData={serviceData}
          />
        )}
        {openDeleteModal && (
          <ConfirmDeleteModal
            open={openDeleteModal}
            close={closeDeleteModalHandler}
            labelText="Are you sure you want to delete this item to fix"
            actionText="Delete"
            onDelete={deleteItem}
            isLoading={isDeleteItem}
          />
        )}
      </>
    </section>
  );
};

export default ServiceListing;
