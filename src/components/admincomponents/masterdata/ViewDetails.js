import { Link, useNavigate, useParams } from "react-router-dom";
import {
  BackBtn,
  Grid,
  GroupHeading,
  PageHeading,
} from "../../globalcomponents/Utilities";
import {
  useActivateOrDeactivateFixCategory,
  useCreateFixCategory,
  useCreateServiceListing,
  useGetCategoryDetailsById,
  useGetFixClasses,
  useUpdateFixCategory,
} from "../../../hooks/useQueries/useAdmin";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import GlobalTable from "../../globalcomponents/GlobalTable";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import { format } from "date-fns";
import { Chip } from "@mui/material";
import { useState } from "react";
import CategorySetupOptions from "./CategorySetupOptions";
import { useSnackbar } from "notistack";
import DeactivateModal from "./DeactivateModal";
import AddServices from "./AddServices";
import { borderBottom } from "@mui/system";

const ViewDetails = ({ title }) => {
  const [showwAddSubCat, setShowwAddSubCat] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openAddSubcat, setOpenAddSubcat] = useState(false);
  const [openDeactivate, setOpenDeactivate] = useState(false);
  const [activeSubcat, setActiveSubcat] = useState({});
  const [addService, setAddService] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { data: categoryDetailsData, isLoading } =
    useGetCategoryDetailsById(id);

  const categoryDetails = categoryDetailsData?.data;

  const renderAmount = (amount) =>
    amount !== undefined && amount !== null
      ? `₦${amount.toLocaleString()}`
      : "";

  const addSubHandler = (id) => {
    const activeSubcat = categoryDetailsData?.data?.categoryDetails.find(
      (cat) => cat.id === id
    );
    setActiveSubcat(activeSubcat);
    setShowwAddSubCat(true);
  };
  const showAddSubHandler = (id) => {
    const activeSubcat = categoryDetailsData?.data?.categoryDetails.find(
      (cat) => cat.id === id
    );
    setActiveSubcat(activeSubcat);
    setOpenAddSubcat(true);
  };

  const deactivateAddHandler = (id) => {
    const activeSubcat = categoryDetailsData?.data?.categoryDetails.find(
      (cat) => cat.id === id
    );
    setActiveSubcat(activeSubcat);
    setOpenDeactivate(true);
  };
  const handleShowServices = (id) => {
    const activeSubcat = categoryDetailsData?.data?.categoryDetails.find(
      (cat) => cat.id === id
    );
    setActiveSubcat(activeSubcat);
    setAddService(true);
  };

  const editHandler = (id) => {
    const activeSubcat = categoryDetailsData?.data?.categoryDetails.find(
      (cat) => cat.id === id
    );
    setActiveSubcat(activeSubcat);
    setOpenUpdateModal(true);
  };

  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    setShowwAddSubCat(false);
    setOpenUpdateModal(false);
    setOpenAddSubcat(false);
    setOpenDeactivate(false);
    setAddService(false);
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
  const { mutate: activateOrdeactivateFixCategory, isLoading: isDeleting } =
    useActivateOrDeactivateFixCategory(onSuccess, onFailure);
  const { mutate: createService, isLoading: isAdding } =
    useCreateServiceListing(onSuccess, onFailure);

  const addCategory = (initPayload) => {
    createFixCategory(initPayload);
  };

  const addNewCategory = (initPayload) => {
    createFixCategory(initPayload);
  };

  const updatecategory = (initPayload) => {
    updateFixCategory(initPayload);
  };

  const deactivateCategory = (initPayload) => {
    const payload = {
      id: activeSubcat?.id,
      endDate: initPayload.date,
      actionType: 2,
    };
    activateOrdeactivateFixCategory(payload);
  };

  const addServiceListing = (initPayload) => {
    const payload = {
      categoryId: activeSubcat?.id,
      fixClassIds: initPayload.fixClassIds,
      name: initPayload.name,
      standardRate: initPayload.standardRate,
      labourMarkup: initPayload.labourMarkup,
      labourVat: initPayload.labourVat,
    };
    createService(payload);
  };

  const columns = [
    {
      name: "s/n",
      label: "S/N",
      options: {
        customBodyRender: (_, tableMetal) => tableMetal.rowIndex + 1,
      },
    },
    {
      name: "name",
      label: "SubCategory",
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
      name: "createdAt",
      label: "Date Created",
      options: {
        customBodyRender: (value) => format(new Date(value), "dd/MM/yyyy"),
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (value) => {
          return (
            <Chip
              label={value?.toLowerCase() === "active" ? "Active" : "Inactive"}
              color={value?.toLowerCase() === "active" ? "success" : "error"}
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
              id: 0,
              name: "View Details",
              action: () => navigate(`../sub-category/details/${value}`),
            },
            {
              id: 1,
              name: "Add Subcategory",
              action: () => addSubHandler(value),
            },
            {
              id: 2,
              name: "Edit Details",
              action: () => editHandler(value),
            },
            {
              id: 3,
              name: "Deactivate Subcategory",
              action: () => deactivateAddHandler(value),
            },
            {
              id: 4,
              name: "View Services",
              action: () => navigate(`../services/details/${value}`),
            },
            {
              id: 5,
              name: "Add Services ",
              action: () => handleShowServices(value),
            },
          ];
          return <GlobalTableActions actions={actions} id="id" />;
        },
      },
    },
  ];

  return (
    <>
      <div className="position-relative mb-5 gap-4">
        <PageHeading>{title}</PageHeading>
        <BackBtn />

        <div>
          <Link
            onClick={showAddSubHandler}
            className="position-absolute top-0 end-0 btn"
            style={{
              backgroundColor: "var(--clr-primary)",
              color: "#fff ",
            }}
            width="max-content"
            px="2em"
          >
            Add Subcategory
          </Link>
        </div>
      </div>

      <GlobalBallBeat loading={isLoading} />
      <>
        <div className="pt-3 ps-2" style={{ border: "1px solid black" }}>
          <Grid columns="4" gap="0px" className="mb-4">
            <div>
              <h3>Name</h3>
              <span className="d-block">{categoryDetails?.name}</span>
            </div>
            <div>
              <h3>Levels</h3>
              <span className="d-block">{`L${categoryDetails?.levels}`}</span>
            </div>

            {categoryDetails?.bookingFee > 0 && (
              <div>
                <h3>Booking Fee</h3>
                <span className="d-block">
                  {renderAmount(categoryDetails?.bookingFee)}
                </span>
              </div>
            )}
          </Grid>
          <Grid column="1">
            <div>
              <h3>Description</h3>
              <span className="d-block">{categoryDetails?.description}</span>
            </div>
          </Grid>
        </div>

        <div style={{ border: "1px solid black", borderTop:"none" }}>
          <GroupHeading style={{borderBottom: "1px solid black"}} className="pt-3 ps-2">Mark up</GroupHeading>
          <Grid columns="4" className="mb-4 ps-2">
            <div>
              <h3>Labour</h3>
              <span className="d-block">
                {`${categoryDetails?.labourMarkup}%`}
              </span>
            </div>

            <div>
              <h3>Material</h3>
              <span className="d-block">
                {`${categoryDetails?.materialsMarkup}%`}
              </span>
            </div>
          </Grid>
        </div>

        <div style={{ border: "1px solid black", borderTop:"none" }}>
          <GroupHeading className="pt-3 ps-2" style={{borderBottom: "1px solid black"}}>Warranty</GroupHeading>
          <p className="text-muted ps-2">Duration</p>
          <Grid columns="4" className="mb-4 ps-2">
            <div>
              <h3>Standard</h3>
              <span className="d-block">
                {`${categoryDetails?.standardWarranty} days`}
              </span>
            </div>

            <div>
              <h3>Extended 1</h3>
              <span className="d-block">
                {`${categoryDetails?.extended1Warranty} days`}
              </span>
            </div>

            <div>
              <h3>Extended 2</h3>
              <span className="d-block">
                {`${categoryDetails?.extended2Warranty} days`}
              </span>
            </div>
          </Grid>

          <p className="text-muted ps-2">Rate</p>
          <Grid columns="4" className="mb-4 ps-2">
            <div>
              <h3>Standard Rate</h3>
              <span className="d-block">
                {`${categoryDetails?.standardWarrantyRate}%`}
              </span>
            </div>

            <div>
              <h3>Extended 1 Rate</h3>
              <span className="d-block">
                {`${categoryDetails?.extended1WarrantyRate}%`}
              </span>
            </div>

            <div>
              <h3>Extended 2 Rate</h3>
              <span className="d-block">
                {`${categoryDetails?.extended2WarrantyRate}%`}
              </span>
            </div>
          </Grid>
        </div>

        <div style={{ border: "1px solid black", borderTop:"none" }}>
          <GroupHeading className="pt-3 ps-2" style={{ borderBottom: "1px solid black"}}>VAT</GroupHeading>
          <Grid columns="4" className="mb-4 ps-2">
            <div>
              <h3>Labour</h3>
              <span className="d-block">
                {`${categoryDetails?.labourVat}%`}
              </span>
            </div>

            <div>
              <h3>Materials</h3>
              <span className="d-block">
                {`${categoryDetails?.materialsVat}%`}
              </span>
            </div>
          </Grid>
        </div>

        <div style={{ border: "1px solid black", borderTop:"none" }}>
          <GroupHeading className="pt-3 ps-2" style={{borderBottom:"1px solid black"}}>Labour Rates</GroupHeading>
          <div>
            <p className="text-muted ps-2">Diagnostic</p>
            <Grid columns="4" className="mb-4 ps-2">
              <div>
                <h3>1ˢᵗ Hour</h3>
                <span className="d-block">
                  {renderAmount(categoryDetails?.diagnosticFirstHr)}
                </span>
              </div>

              <div>
                <h3>2ⁿᵈ Hour</h3>
                <span className="d-block">
                  {renderAmount(categoryDetails?.diagnosticSecondHr)}
                </span>
              </div>

              <div>
                <h3>Subsequent Hours</h3>
                <span className="d-block">
                  {renderAmount(categoryDetails?.diagnosticSubSequentHr)}
                </span>
              </div>
            </Grid>
          </div>

          <div>
            <p className="text-muted ps-2">General</p>
            <Grid columns="4" className="mb-4 ps-2">
              <div>
                <h3>Daily Rate</h3>
                <span className="d-block">
                  {renderAmount(categoryDetails?.dailyRate)}
                </span>
              </div>

              <div>
                <h3>Half Day Rate</h3>
                <span className="d-block">
                  {renderAmount(categoryDetails?.halfDayRate)}
                </span>
              </div>

              <div>
                <h3>Hourly Rate</h3>
                <span className="d-block">
                  {renderAmount(categoryDetails?.hourlyRate)}
                </span>
              </div>
            </Grid>
          </div>
        </div>
      </>
      {title && (
        <>
          <div className="mt-5">
            <PageHeading>SubCategories</PageHeading>
          </div>
          <GlobalTable
            columns={columns}
            data={categoryDetailsData?.data?.categoryDetails}
          />
        </>
      )}
      {showwAddSubCat && (
        <CategorySetupOptions
          heading="Add"
          isOpen={showwAddSubCat}
          closeModal={() => setShowwAddSubCat(false)}
          itemDescription="Description"
          itemNamePlaceholder="Plumbing"
          itemDescriptionPlaceholder="Brief description of the"
          submit={addCategory}
          loading={isCreating}
          actionText="Save"
          activeCat={activeSubcat}
          subCategory={true}
          subCat={activeSubcat}
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
          actionText="Update"
          activeCat={activeSubcat}
          subSub={activeSubcat}
        />
      )}
      {openAddSubcat && (
        <CategorySetupOptions
          heading="Add"
          isOpen={openAddSubcat}
          closeModal={() => setOpenAddSubcat(false)}
          itemDescription="Description"
          itemNamePlaceholder="Plumbing"
          itemDescriptionPlaceholder="Give a brief description of the category"
          submit={addNewCategory}
          loading={isUpdating}
          actionText="Save"
          activeCat={categoryDetails}
          subCat={categoryDetails}
        />
      )}
      {openDeactivate && (
        <DeactivateModal
          isOpen={openDeactivate}
          closeModal={() => setOpenDeactivate(false)}
          labelText="End date"
          heading="Deactivate"
          onSubmit={deactivateCategory}
          isLoading={isDeleting}
          pText="Are you sure you want to deactivate this category"
          actionText="Yes"
        />
      )}

      {addService && (
        <AddServices
          isOpen={addService}
          closeModal={() => setAddService(false)}
          isLoading={isAdding}
          heading="Add Service Listing"
          textAction="Save"
          createServices={addServiceListing}
          activeSubcat={activeSubcat}
        />
      )}
    </>
  );
};

export default ViewDetails;
