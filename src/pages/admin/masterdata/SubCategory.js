import React, { useState } from "react";
import CategoryCard from "../../../components/admincomponents/masterdata/CategoryCard";
import {
  useCreateFixCategory,
  useGetCategorySubById,
  useGetFixCategoryByName,
  useUpdateFixCategory,
} from "../../../hooks/useQueries/useAdmin";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import GlobalBtn from "../../../components/globalcomponents/GlobalBtn";
import CategorySetupOptions from "../../../components/admincomponents/masterdata/CategorySetupOptions";
import { TbRuler3 } from "react-icons/tb";
import { useSnackbar } from "notistack";

const SubCategory = () => {
  const [currentPage, setcurrentPage] = useState(1);
  const [editSubcat, setEditSubcat] = useState(false);
  const [activeSubCat, setactiveSubCat] = useState({});
  const [showAddSubcat, setShowAddSubcat] = useState(false);
  const { id } = useParams();

  const { enqueueSnackbar } = useSnackbar();

  const navigate = useNavigate();

  //---------------------------------Data fetching--------------------------------
  const { data: subCategoryData } = useGetCategorySubById(id);
  const { data: categoryDataByName } = useGetFixCategoryByName();

  const subCatData = subCategoryData?.data?.map((item) => {
    const categoryName = categoryDataByName?.data.find(
      (name) => name.id === item.parentId
    );

    return {
      ...item,
      catName: categoryName?.name,
    };
  });

  // ----------------------------------------------------------------Edit Modal controller----------------------------------------------------------------
  const editSubcatgoryHandler = function (id) {
    const subcategory = subCatData.find((cat) => cat.id === id);
    setactiveSubCat(subcategory);
    setEditSubcat(true);
  };

  const showSubCategoryHandler = function (id) {
    const subcategory = subCatData.filter((cat) => cat.parentId === id);
    setactiveSubCat(subcategory);
    setShowAddSubcat(true);
  };

  //-------------------------------------Pagination------------------------------------
  const subCategory = subCatData?.filter((cat) => cat.parentId === +id);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(subCategory?.length / itemsPerPage);

  const subCategories = subCategory?.slice(
    currentPage - 1,
    currentPage * itemsPerPage
  );
  //   console.log(subCategories);

  const handlePreviousPage = function () {
    if (currentPage > 1) {
      setcurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = function () {
    if (currentPage < totalPages) setcurrentPage(currentPage + 1);
  };

  //-------------------------------------------------------------------------- Mutation and mutation handlers--------------------------------------------------------------------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    setEditSubcat(false);
  };

  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };
  const { mutate: updateFixSubCategory, isLoading: isUpdating } =
    useUpdateFixCategory(onSuccess, onFailure);

  const { mutate: createSubcategory, isLoading: isCreating } =
    useCreateFixCategory(onSuccess, onFailure);

  const addSubcategory = (initPayload) => {
    console.log(initPayload.category);
    //  createSubcategory(initPayload);
  };

  const updateSubcategory = (initPayload) => {
    updateFixSubCategory(initPayload);
  };
  return (
    <>
      <div>
        <PageHeading>SubCategories</PageHeading>
        <BackBtn />
      </div>

      <CategoryCard
        data={subCategories}
        showSubEditModalHandler={editSubcatgoryHandler}
        showSubCategoryHandler={showSubCategoryHandler}
        subcat={true}
      />
      <div className="d-flex justify-content-center gap-5 position-relative">
        {currentPage > 1 && (
          <GlobalBtn
            width="171px"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </GlobalBtn>
        )}
        <GlobalBtn
          width="171px"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </GlobalBtn>
      </div>

      {editSubcat && (
        <CategorySetupOptions
          heading="Edit"
          isOpen={editSubcat}
          closeModal={() => setEditSubcat(false)}
          itemDescription="Description"
          itemDescriptionPlaceholder="Give a brief description of the subcategory"
          submit={updateSubcategory}
          loading={isUpdating}
          actionText="Update Subcategory"
          activeCat={activeSubCat}
        />
      )}

      {showAddSubcat && (
        <CategorySetupOptions
          heading="Add"
          isOpen={showAddSubcat}
          closeModal={() => setShowAddSubcat(false)}
          itemDescription="Description"
          itemNamePlaceholder="Plumbing"
          itemDescriptionPlaceholder="Brief description of the"
          submit={addSubcategory}
          // loading={isCreating}
          subCat={activeSubCat}
          actionText="Save"
          subCategory={true}
        />
      )}
    </>
  );
};

export default SubCategory;
