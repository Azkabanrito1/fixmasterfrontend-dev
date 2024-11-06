import { useState } from "react";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import { Link } from "react-router-dom";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import GlobalBtn from "../../../components/globalcomponents/GlobalBtn";
import CategoryCard from "../../../components/admincomponents/masterdata/CategoryCard";
import CategorySetupOptions from "../../../components/admincomponents/masterdata/CategorySetupOptions";
import { useSnackbar } from "notistack";
import { 
  useActivateOrDeactivateFixCategory,
  useCreateFixCategory,
  useCreateServiceListing,
  useGetAllCategoryByPage, // Adjusted here
  useGetCategoryDetailsById,
  useUpdateFixCategory,
} from "../../../hooks/useQueries/useAdmin";
import DeactivateModal from "../../../components/admincomponents/masterdata/DeactivateModal";
import ConfirmAcceptModal from "../../../components/globalcomponents/modals/ConfirmAcceptModal";
import AddServices from "../../../components/admincomponents/masterdata/AddServices";
import { current } from "@reduxjs/toolkit/dist";

const SpecializationHome = () => {
  const [openAddCat, setOpenAddCat] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [activeCat, setActiveCat] = useState({});
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [openReactivateModal, setOpenReactivateModal] = useState(false);
  const [openAddServiceListing, setOpenAddServiceListing] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  // Fetch paginated categories
  const itemsPerPage = 10;

  const { data: categoryDataByPage, isLoading } = useGetAllCategoryByPage(
    currentPage,
    itemsPerPage,
    {
      currentPage,
      itemsPerPage,
      refetchOnWindowFocus: true,
    }
  );

  const { data: categoryDetailsData } = useGetCategoryDetailsById(
    activeCat.id,
    {
      enabled: !!activeCat.id,
    }
  );

  const totalPages = categoryDataByPage?.data?.paginationDetails?.totalPages;

  const displayedCategories = categoryDataByPage?.data?.allCategories || [];

  const showAddCat = () => setOpenAddCat(true);

  const getActiveCategory = (id) =>
    displayedCategories.filter((cat) => cat.id === id);

  const showUpdateCategory = (id) => {
    const cat = getActiveCategory(id);
    setActiveCat(cat[0]);
    setOpenUpdateModal(true);
  };

  const showDeleteCategory = (id) => {
    const category = getActiveCategory(id);
    setActiveCat(category[0]);
    setOpenDeleteModal(true);
  };
  const showActivateHandler = (id) => {
    const category = getActiveCategory(id);
    setActiveCat(category[0]);
    setOpenReactivateModal(true);
  };
  const addServiceListingHandler = (id) => {
    const category = getActiveCategory(id);
    setActiveCat(category[0]);
    setOpenAddServiceListing(true);
  };

  // Pagination handlers
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    setOpenAddCat(false);
    setOpenUpdateModal(false);
    setOpenDeleteModal(false);
    setOpenReactivateModal(false);
    setOpenAddServiceListing(false);
  };

  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };

  const { mutate: createFixCategory, isLoading: isCreating } =
    useCreateFixCategory(onSuccess, onFailure);
  const { mutate: updateFixCategory, isLoading: isUpdating } =
    useUpdateFixCategory(onSuccess, onFailure);
  const { mutate: deleteFixCategory, isLoading: isDeleting } =
    useActivateOrDeactivateFixCategory(onSuccess, onFailure);
  const { mutate: createService, isLoading: isAdding } =
    useCreateServiceListing(onSuccess, onFailure);

  const addCategory = (initPayload) => {
    createFixCategory(initPayload);
  };

  const updatecategory = (initPayload) => {
    updateFixCategory(initPayload);
  };

  const deleteCategory = (initPayload) => {
    const payload = {
      id: activeCat?.id,
      endDate: initPayload.date,
      actionType: 2,
    };
    deleteFixCategory(payload);
  };

  const activate = function () {
    const payload = {
      id: activeCat?.id,
      actionType: 1,
    };
    deleteFixCategory(payload);
  };

  const addServiceListing = (initPayload) => {
    const payload = {
      categoryId: categoryDetailsData?.data?.id,
      fixClassIds: initPayload.fixClassIds,
      name: initPayload.name,
      standardRate: initPayload.standardRate,
      labourMarkup: initPayload.labourMarkup,
      labourVat: initPayload.labourVat,
    };
    createService(payload);
  };

  return (
    <>
      <div className="position-relative mb-5 gap-4">
        <BackBtn />
        <PageHeading>Job Categories</PageHeading>
        <GlobalBallBeat loading={isLoading} />
        <div>
          <Link
            onClick={showAddCat}
            className="position-absolute top-0 end-0 btn"
            style={{
              backgroundColor: "var(--clr-primary)",
              color: "#fff ",
            }}
            width="max-content"
            px="2em"
          >
            Add Category
          </Link>
        </div>
      </div>
      <CategoryCard
        data={displayedCategories}
        showEditModalHandler={showUpdateCategory}
        showDeactiveHandler={showDeleteCategory}
        showActiveHandler={showActivateHandler}
        showAddServiceListing={addServiceListingHandler}
      />
      <div className="d-flex justify-content-center gap-5 position-relative mt-5">
        <GlobalBtn
          width="171px"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </GlobalBtn>
        <GlobalBtn
          width="171px"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </GlobalBtn>
      </div>
      {openAddCat && (
        <CategorySetupOptions
          heading="Add"
          isOpen={openAddCat}
          closeModal={() => setOpenAddCat(false)}
          itemDescription="Description"
          itemNamePlaceholder="Plumbing"
          itemDescriptionPlaceholder="Brief description of the"
          submit={addCategory}
          loading={isCreating}
          actionText="Save"
          cat={true}
        />
      )}
      {openUpdateModal && (
        <CategorySetupOptions
          heading="Edit"
          isOpen={openUpdateModal}
          closeModal={() => setOpenUpdateModal(false)}
          itemDescription="Description"
          itemNamePlaceholder="Plumbing"
          itemDescriptionPlaceholder="Give a brief description of the category"
          submit={updatecategory}
          loading={isUpdating}
          actionText="Update Category"
          activeCat={activeCat}
          // cat={true}
        />
      )}
      {openDeleteModal && (
        <DeactivateModal
          isOpen={openDeleteModal}
          closeModal={() => setOpenDeleteModal(false)}
          labelText="End date"
          heading="Deactivate"
          onSubmit={deleteCategory}
          isLoading={isDeleting}
          pText="Are you sure you want to deactivate this category"
          actionText="Yes"
        />
      )}
      {openReactivateModal && (
        <ConfirmAcceptModal
          open={openReactivateModal}
          close={() => setOpenReactivateModal(false)}
          labelText="Activate"
          onDelete={activate}
          isLoading={isDeleting}
          pText="Are you sure you want to activate this category"
          actionText="Yes"
        />
      )}

      {openAddServiceListing && (
        <AddServices
          isOpen={openAddServiceListing}
          closeModal={() => setOpenAddServiceListing(false)}
          isLoading={isAdding}
          heading="Add Service Listing"
          textAction="Save"
          createServices={addServiceListing}
          activeSubcat={activeCat}
        />
      )}
    </>
  );
};

export default SpecializationHome;
