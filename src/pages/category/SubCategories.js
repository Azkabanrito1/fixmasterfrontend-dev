import { Link } from "react-router-dom";
import {
  BackBtn,
  PageHeading,
} from "../../components/globalcomponents/Utilities";
import GlobalBallBeat from "../../components/globalcomponents/GlobalBallBeat";
import { Stack } from "@mui/material";
import SingleTopic from "../../components/admincomponents/onboardingrequirements/SingleTopic";
import MasterOptions from "../../components/admincomponents/masterdata/AddMasterOptions";
import { useState } from "react";
import Qualification from "../../components/admincomponents/masterdata/Qualification";
import AddSubcat from "../../components/category/AddSubcat";
import {
  useCreateFixSubCategory,
  useDeleteFixSubCategory,
  useGetFixCategory,
  useGetSubCategory,
  useUpdateFixSubCategory,
} from "../../hooks/useQueries/useAdmin";
import { useSnackbar } from "notistack";
import GlobalTableActions from "../../components/globalcomponents/GlobalTableActions";
import GlobalTable from "../../components/globalcomponents/GlobalTable";
import { format } from "date-fns";
import ConfirmDeleteModal from "../../components/globalcomponents/modals/ConfirmDeleteModal";

const SubCategories = () => {
  const [showAddSubCat, setShowAddSubCat] = useState(false);
  const [showUpdateSubCat, setShowUpdateSubCat] = useState(false);
  const [activeSubCategory, setActiveSubCategory] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  //----------------------------------------------------------------Toast----------------------------------------------------------------
  const { enqueueSnackbar } = useSnackbar();

  //----------------------------------------------------------------Modal Controllers----------------------------------------------------------------
  const showAddCategoryHandler = () => {
    setShowAddSubCat(true);
  };

  const showUpdateCategoryHandler = (id) => {
    const activeSubCat = subCategoriesData?.data.find((data) => data.id === id);
    setActiveSubCategory(activeSubCat);
    setShowUpdateSubCat(true);
  };

  const showDeleteSubCategoryHandler = (id) => {
    const activeSubCat = subCategoriesData?.data.find((data) => data.id === id);
    setActiveSubCategory(activeSubCat);
    setShowDeleteModal(true);
  };

  // ----------------------------------------------------------------mutation & mutation fn ----------------------------------------------------------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    setShowAddSubCat(false);
    setShowUpdateSubCat(false);
    setShowDeleteModal(false);
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };

  const { mutate: addSubCategory, isLoading: isAdding } =
    useCreateFixSubCategory(onSuccess, onFailure);

  const { mutate: updateSubCategory, isLoading: isUpdating } =
    useUpdateFixSubCategory(onSuccess, onFailure);

  const { mutate: deleteSubCategory, isLoading: isDeleting } =
    useDeleteFixSubCategory(onSuccess, onFailure);

  //----------------------------------------------------------------data fetching----------------------------------------------------------------
  const { data: categoryData } = useGetFixCategory();
  const { data: subCategoriesData, isLoading } = useGetSubCategory();
  const category = categoryData?.data?.map((category) => {
    return {
      id: category.id,
      name: category.longName,
    };
  });

  const columns = [
    {
      name: "s/n",
      label: "S/N",
      options: {
        customBodyRender: (_, index) => index.rowIndex + 1,
      },
    },

    {
      name: "categoryName",
      label: "Category",
    },
    {
      name: "name",
      label: "Sub Category",
    },
    {
      name: "createdAt",
      label: "Date Created",
      options: {
        customBodyRender: (value) => format(new Date(value), "dd-MM-yyyy"),
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
              name: "Update Sub Category",
              action: () => showUpdateCategoryHandler(value),
            },
            {
              id: 2,
              name: "Delete Sub Category",
              action: () => showDeleteSubCategoryHandler(value),
            },
          ];
          return <GlobalTableActions id="id" actions={actions} />;
        },
      },
    },
  ];

  //----------------------------------------------------------------API Call ------------------------------------------------------------------
  const addSubCat = (initPayload) => {
    const payload = {
      categoryId: initPayload.categoryId,
      name: initPayload.name,
    };
    addSubCategory(payload);
  };

  const updateSubCat = (initPayload) => {
    const payload = {
      name: initPayload.name,
      categoryId: initPayload.categoryId,
      id: activeSubCategory?.id,
    };
    updateSubCategory(payload);
  };

  const deleteSubCat = () => {
    const payload = {
      id: activeSubCategory?.id,
    };

    deleteSubCategory(payload);
  };
  return (
    <>
      <div className="position-relative mb-5">
        <BackBtn />
        <PageHeading>Sub Category</PageHeading>
        <GlobalBallBeat loading={isLoading} />

        <Link
          onClick={showAddCategoryHandler}
          className="position-absolute top-0 end-0 btn"
          style={{ backgroundColor: "var(--clr-primary)", color: "#fff " }}
          width="max-content"
          px="2em"
        >
          Add Subcategory
        </Link>
      </div>
      <GlobalTable data={subCategoriesData?.data} columns={columns} />

      {showAddSubCat && (
        <AddSubcat
          isOpen={showAddSubCat}
          closeModal={() => setShowAddSubCat(false)}
          heading="Add Sub Category"
          category={category}
          actionText="Add"
          submit={addSubCat}
          isLoading={isAdding}
        />
      )}
      {showUpdateSubCat && (
        <AddSubcat
          isOpen={showUpdateSubCat}
          closeModal={() => setShowUpdateSubCat(false)}
          heading="Update Sub Category"
          category={category}
          actionText="Update"
          data={activeSubCategory}
          submit={updateSubCat}
          isLoading={isUpdating}
        />
      )}

      {showDeleteModal && (
        <ConfirmDeleteModal
          open={showDeleteModal}
          close={() => setShowDeleteModal(false)}
          labelText="Delete Sub Category"
          pText="Are you sure you want to delete this sub category?"
          actionText="Delete"
          onDelete={() => deleteSubCat(activeSubCategory?.id)}
          isLoading={isDeleting}
        />
      )}
    </>
  );
};

export default SubCategories;
