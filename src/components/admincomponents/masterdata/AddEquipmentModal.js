import { useEffect, useReducer } from "react";
import GlobalInput from "../../globalcomponents/GlobalInput";
import GlobalModal from "../../globalcomponents/GlobalModal";
import { FormGroup } from "../../globalcomponents/Utilities";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import GlobalBtn from "../../globalcomponents/GlobalBtn";
import { useFormik } from "formik";
import GlobalSelect from "../../globalcomponents/GlobalSelect";
import { Button, IconButton, Stack } from "@mui/material";
import { BsTrash } from "react-icons/bs";
import { useGetSubCategoryById } from "../../../hooks/useQueries/useAdmin";

const initState = {
  equipment: [],
};

const equipmentReducer = (state, action) => {
  switch (action.type) {
    case "addEqu":
      return {
        ...state,
        equipment: [
          ...state.equipment,
          {
            id: state.equipment.length + 1,
            equipmentName: "",
          },
        ],
      };
    case "updateEquipment":
      return {
        ...state,
        equipment: state.equipment.map((item) =>
          item.id === action.payload.id
            ? { ...item, equipmentName: action.payload.name }
            : item
        ),
      };
    case "setEquipment":
      return {
        ...state,
        equipment: action.payload,
      };
    case "deleteEquipment":
      return {
        ...state,
        equipment: state.equipment.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    default:
      return state;
  }
};

const AddEquipmentModal = ({
  isOpen,
  closeModal,
  heading,
  submit,
  isAdding,
  actionText = false,
  category,
  data,
  update,
}) => {
  const [state, dispatch] = useReducer(equipmentReducer, initState);
  // console.log(category);
  // console.log(data);

  const onSubmit = () => {
    const equipment = state.equipment.map((equipment) => ({
      name: equipment.equipmentName,
      categoryId: selectedSubCategory[0].id,
    }));
    if (!!data) {
      const payload = {
        id: data.id,
        categoryId: selectedSubCategory[0].id || data.categoryID,
        name: state.equipment[0]?.equipmentName || data.name,
      };
      update(payload);
    } else {
      submit(equipment);
    }
  };

  const { values, handleChange, handleSubmit, setFieldValue, handleBlur } =
    useFormik({
      initialValues: {
        category: "",
        subCategory: "",
      },
      onSubmit,
    });

  const addEquipment = () => {
    dispatch({ type: "addEqu" });
  };

  const updateEquipmentName = (id, name) => {
    dispatch({ type: "updateEquipment", payload: { id, name } });
  };

  const deleteEquipment = (id) => {
    dispatch({ type: "deleteEquipment", payload: { id } });
  };

  const selectedCategory = category.filter((item) =>
    values.category?.includes(item.name)
  );

  //----------------------------------------------------------------fetching dependent queries-------------------------------------------------------------------
  const { data: subCategoriesData } = useGetSubCategoryById(
    selectedCategory[0]?.id,
    {
      enabled: !!selectedCategory[0]?.id && !data?.categoryID,
    }
  );

  const selectedSubCategory = subCategoriesData?.data.filter((item) =>
    values.subCategory?.includes(item.name)
  );

  useEffect(() => {
    if (data?.name) {
      dispatch({
        type: "setEquipment",
        payload: [
          {
            id: 1,
            equipmentName: data.name,
          },
        ],
      });

      const selectedCategory = category?.filter(
        (item) => item.id === data.categoryId
      );
      setFieldValue("category", selectedCategory?.[0]?.name);
    }

    const selectedSubCategory = subCategoriesData?.data?.find(
      (item) => item.categoryId === data?.categoryId
    );
    setFieldValue("subCategory", selectedSubCategory?.name);
  }, [data, category, setFieldValue]);

  useEffect(() => {
    if (subCategoriesData?.data) {
      const selectedSubCategory = subCategoriesData.data.find(
        (item) => item.categoryId === data?.categoryId
      );
      if (selectedSubCategory) {
        setFieldValue("subCategory", selectedSubCategory.name);
      }
    }
  }, [subCategoriesData, data, setFieldValue]);

  const addnewEquipment = state.equipment.map((item, index) => (
    <FormGroup columns="1" key={item.id} mb="30px">
      <Stack spacing={2}>
        <GlobalInput
          name={`equipmentName${item.id}`}
          inputValue={item.equipmentName}
          handleChange={(e) => updateEquipmentName(item.id, e.target.value)}
          labelText={`Equipment ${index + 1}`}
          inputPlaceholder="Enter Equipment to fix name"
          required
        />
        {data ? null : (
          <IconButton onClick={() => deleteEquipment(item.id)}>
            <BsTrash color="var(--clr-primary)" fontSize={"16px"} />
          </IconButton>
        )}
      </Stack>
    </FormGroup>
  ));

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader heading={heading} closeModal={closeModal} />
      <form onSubmit={handleSubmit}>
        <FormGroup columns="2" mb="20px">
          <GlobalSelect
            selectName="category"
            options={category}
            defaultOption="Select Category"
            selectValue={values.category}
            handleChange={handleChange}
            handleBlur={handleBlur}
            labelText="Category"
            required
            valueType="string"
          />
          <GlobalSelect
            selectName="subCategory"
            options={subCategoriesData?.data}
            defaultOption="Select Sub Category"
            selectValue={values.subCategory}
            handleChange={handleChange}
            handleBlur={handleBlur}
            labelText="Sub Category"
            required
            valueType="string"
          />
        </FormGroup>
        <div>{addnewEquipment}</div>
        {data ? null : (
          <Button
            type="button"
            sx={{
              marginTop: 3,
              backgroundColor: "#000",
              color: "#fff",
              textTransform: "capitalize",
              marginInline: "auto",
              "&:hover": {
                backgroundColor: "#4e4e4e",
              },
            }}
            onClick={addEquipment}
          >
            Add New Equipment
          </Button>
        )}
        <GlobalBtn type="submit" className="mt-3 m-auto" disabled={isAdding}>
          {isAdding ? "Loading ....." : actionText}
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default AddEquipmentModal;
