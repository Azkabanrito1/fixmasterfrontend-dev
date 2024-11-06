import GlobalInput from "../../../globalcomponents/GlobalInput";
import GlobalModal from "../../../globalcomponents/GlobalModal";
import { FormGroup, SectionHeading } from "../../../globalcomponents/Utilities";
import AltModalHeader from "../../../layouts/modal/AltModalHeader";
import AddBtn from "../AddBtn";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import { useReducer } from "react";
import { getToday } from "../../../../utils/dateRanges";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import GlobalSelect from "../../../globalcomponents/GlobalSelect";
import {
  useGetAllEquipments,
  useGetHireRequestDetails,
  useHireEquipment,
} from "../../../../hooks/useQueries/useJobs";
import { useEffect } from "react";
import { IconButton } from "@mui/material";
import { BsTrash } from "react-icons/bs";

const initState = {
  date: {
    value: "",
    error: false,
    errorMessage: "",
  },
  returnDate: {
    value: "",
    error: false,
    errorMessage: "",
  },
  time: {
    value: "",
    error: false,
    errorMessage: "",
  },
  equipment: [
    {
      id: "",
      quantity: "",
    },
  ],
};

const requestReducer = (state, action) => {
  const { type } = action;
  const { index, id, time, date, returnDate, quantity } = action?.payload || {};
  const today = getToday();

  switch (type) {
    case "ADD_EQUIPMENT":
      return {
        ...state,
        equipment: [
          ...state.equipment,
          {
            id: "",
            quantity: "",
          },
        ],
      };
    case "REMOVE_EQUIPMENT":
      return {
        ...state,
        equipment: state.equipment.filter((_, i) => i !== index),
      };
    case "UPDATE_EQUIPMENT_NAME":
      const newState = [...state.equipment];
      newState[index].id = id;
      return {
        ...state,
        equipment: newState,
      };
    case "UPDATE_EQUIPMENT_QTY":
      const changedState = [...state.equipment];
      changedState[action.payload.index].quantity = quantity;
      return {
        ...state,
        equipment: changedState,
      };
    case "UPDATE_TIME":
      const now = new Date();
      const requestedDate = new Date(`${state.date.value}T${time}`);
      if (state.date.value && requestedDate <= now) {
        return {
          ...state,
          time: {
            value: "",
            error: true,
            errorMessage: "Requested time must be later",
          },
        };
      } else {
        return {
          ...state,
          time: {
            value: time,
            error: false,
            errorMessage: "",
          },
        };
      }
    case "UPDATE_DATE":
      if (date < today) {
        return {
          ...state,
          date: {
            value: "",
            error: true,
            errorMessage: "Requested date must be later",
          },
        };
      } else if (!!state.returnDate.value && date > state.returnDate.value) {
        return {
          ...state,
          date: {
            value: "",
            error: true,
            errorMessage: "Request date must be earlier",
          },
        };
      } else {
        const requestedDate = new Date(`${date}T${state.time.value}`);
        if (state.time.value && requestedDate <= new Date(today)) {
          return {
            ...state,
            date: {
              value: date,
              error: false,
              errorMessage: "",
            },
            time: {
              value: "",
              error: true,
              errorMessage: "Requested time must be later",
            },
          };
        }
        return {
          ...state,
          date: {
            value: date,
            error: false,
            errorMessage: "",
          },
        };
      }
    case "UPDATE_RETURN_DATE":
      if (returnDate < state.date.value) {
        return {
          ...state,
          returnDate: {
            value: "",
            error: true,
            errorMessage: "Return date must be later",
          },
        };
      }
      return {
        ...state,
        returnDate: {
          value: returnDate,
          error: false,
          errorMessage: "",
        },
      };
    case "CLEAR":
      return initState;
    default:
      return state;
  }
};

const RequestEquipment = ({ isOpen, closeModal }) => {
  const [formState, updateFormState] = useReducer(requestReducer, initState);
  const { data: allEquipmentData } = useGetAllEquipments();
  const { fixId } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    closeModal();
  };
  const onFail = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };

  const { mutate: hireEquipment, isLoading: isHiring } = useHireEquipment(
    fixId,
    onSuccess,
    onFail
  );
  const { data: hireDetailsData } = useGetHireRequestDetails(fixId);

  const eqpOptions = allEquipmentData?.data?.map((eqp) => ({
    id: eqp.id,
    name: eqp.name,
  }));

  useEffect(() => {
    if (hireDetailsData?.data?.dateNeeded) {
      updateFormState({
        type: "UPDATE_DATE",
        payload: { date: hireDetailsData?.data?.dateNeeded },
      });
      updateFormState({
        type: "UPDATE_TIME",
        payload: { date: hireDetailsData?.data?.timeNeeded },
      });
      hireDetailsData?.data?.equipmentInfo?.forEach((eqp, index) => {
        updateFormState({
          type: "UPDATE_EQUIPMENT_NAME",
          payload: { index: index, id: eqp.equipmentId },
        });
        updateFormState({
          type: "UPDATE_EQUIPMENT_QTY",
          payload: { index: index, id: eqp.quantity },
        });
      });
    }
    // console.log(hireDetailsData);
  }, [hireDetailsData]);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (formState.date.error || formState.time.error) return;
    else if (formState.date.value === "" || formState.time.value === "") return;
    let equipment = formState.equipment.filter((eqp) => eqp.name !== "");

    equipment = equipment.map((eqp) => ({
      equipmentId: +eqp.id,
      quantity: +eqp.quantity,
    }));

    const payload = {
      fixId: +fixId,
      dateNeeded: formState.date.value,
      timeNeeded: formState.time.value,
      returnDate: formState.returnDate.value,
      equipmentId: [...equipment],
    };
    hireEquipment(payload);
  };

  const addNewEquipment = () => {
    updateFormState({ type: "ADD_EQUIPMENT" });
  };
  const removeEquipment = (index) => {
    updateFormState({ type: "REMOVE_EQUIPMENT", payload: { index } });
  };

  const updateEquipmentName = (event, index) => {
    const { value } = event.target;
    console.log(index);
    updateFormState({
      type: "UPDATE_EQUIPMENT_NAME",
      payload: { index, id: value },
    });
  };

  const updateEquipmentQuantity = (event, index) => {
    const { value } = event.target;
    updateFormState({
      type: "UPDATE_EQUIPMENT_QTY",
      payload: { index, quantity: value },
    });
  };

  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal}>
      <AltModalHeader heading="Request Equipments" closeModal={closeModal} />

      <form onSubmit={onSubmit}>
        <div className="mb-5">
          <SectionHeading>Dates & Time Needed</SectionHeading>
          <FormGroup columns="2">
            <GlobalInput
              inputType={"date"}
              inputValue={formState.date.value}
              required
              labelText={"Date"}
              labelColor={"var(--clr-primary)"}
              handleChange={(e) =>
                updateFormState({
                  type: "UPDATE_DATE",
                  payload: { date: e.target.value },
                })
              }
              min={getToday()}
              error={formState.date.error}
              errorMessage={formState.date.errorMessage}
            />
            <GlobalInput
              inputType={"time"}
              inputValue={formState.time.value}
              required
              labelText={"Time"}
              labelColor={"var(--clr-primary)"}
              handleChange={(e) =>
                updateFormState({
                  type: "UPDATE_TIME",
                  payload: { time: e.target.value },
                })
              }
              error={formState.time.error}
              errorMessage={formState.time.errorMessage}
            />
            <GlobalInput
              inputType={"date"}
              inputValue={formState.returnDate.value}
              required
              labelText={"Return Date"}
              labelColor={"var(--clr-primary)"}
              handleChange={(e) =>
                updateFormState({
                  type: "UPDATE_RETURN_DATE",
                  payload: { returnDate: e.target.value },
                })
              }
              min={getToday()}
              error={formState.returnDate.error}
              errorMessage={formState.returnDate.errorMessage}
            />
          </FormGroup>
        </div>
        <div>
          <SectionHeading>Equipment Needed </SectionHeading>
          {formState.equipment.map((input, index) => {
            return (
              <FormGroup key={index} columns="2" className="mb-4">
                <GlobalSelect
                  options={eqpOptions}
                  defaultOption={"Select Equipment"}
                  selectValue={input.name}
                  labelText={"Equipment Name"}
                  labelColor={"var(--clr-primary)"}
                  handleChange={(event) => updateEquipmentName(event, index)}
                  required
                />
                <GlobalInput
                  inputType={"number"}
                  inputValue={input.quantity}
                  labelText={"Quantity"}
                  labelColor={"var(--clr-primary)"}
                  min={0}
                  handleChange={(event) =>
                    updateEquipmentQuantity(event, index)
                  }
                  required
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: "0",
                    right: "0",
                    color: "var(--clr-primary)",
                  }}
                  onClick={() => removeEquipment(index)}
                  aria-label="delete"
                >
                  <BsTrash fontSize={"1rem"} />
                </IconButton>
              </FormGroup>
            );
          })}
        </div>

        <AddBtn action={addNewEquipment} id="add-more-eqp" text="Add More" />

        <GlobalBtn my="1rem" mx="auto" type="submit" disabled={isHiring}>
          Send Request
        </GlobalBtn>
      </form>
    </GlobalModal>
  );
};

export default RequestEquipment;
