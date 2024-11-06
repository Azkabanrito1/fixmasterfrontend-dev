import { useEffect, useState } from "react";
import {
  BackBtn,
  Fields,
  FormGroup,
  GroupHeading,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import GlobalInput from "../../../components/globalcomponents/GlobalInput";
import {
  useDeactivateCity,
  useEditCityDate,
  useGetTerritoryDetails,
  useCreateTerritoryWithCities,
} from "../../../hooks/useQueries/useAdmin";
import { useSnackbar } from "notistack";
import GlobalBtn from "../../../components/globalcomponents/GlobalBtn";
import { useNavigate, useParams } from "react-router-dom";
import AddedCities from "../../../components/admincomponents/territories/AddedCitiesTable";
import AddBtn from "../../../components/franchiseecomponents/jobsmanagement/AddBtn";
import AddCity from "../../../components/admincomponents/territories/modals/AddCities";
import EditCityEndDate from "../../../components/admincomponents/territories/modals/EditCityDate";
import GlobalFullScreenLoader from "../../../components/globalcomponents/GlobalFullScreenLoader";
import SaveCity from "../../../components/admincomponents/territories/modals/SaveCity";
import TerritoryNavigation from "../../../components/admincomponents/territories/TerritoryNavigation";

const EditTerritory = () => {
  const [selected, setSelected] = useState([]);
  const [cityEditing, setCityEditing] = useState();
  const [newlyAdded, setNewlyAdded] = useState([]);
  const [territoryName, setTerritoryName] = useState("");
  const [openSaveCity, setOpenSaveCity] = useState(false);
  const [openAddCityModal, setOpenAddCityModal] = useState(false);
  const [openEditCityDateModal, setOpenEditCityDateModal] = useState(false);
  const [error, setError] = useState({
    state: false,
    message: "",
  });

  const countryId = "1";
  const selectedInfo = {
    countryId: 1,
    stateId: selected[0]?.stateId,
    lgaId: selected[0]?.lgaId,
  };
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // Mutation callback functions
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
  };
  const onFailure = (error) => {
    enqueueSnackbar(error.message, { variant: "error" });
  };

  // useQuery get and mutate hooks
  const { data: territoryData } = useGetTerritoryDetails(id);
  const { mutate: addCitiesToTerritory, isLoading: isSubmitting } =
    useCreateTerritoryWithCities({
      id,
      onSuccess: (response) => {
        onSuccess(response);
      },
      onFailed: onFailure,
    });
  const { mutate: deactivateCity } = useDeactivateCity(
    id,
    onSuccess,
    onFailure
  );
  const { mutate: editCityDate } = useEditCityDate(
    id,
    (response) => {
      onSuccess(response);
      setOpenEditCityDateModal(false);
    },
    onFailure
  );

  // set territory name and country id as initial state data
  useEffect(() => {
    if (territoryData?.details?.length > 0) {
      if (territoryData?.details[0]?.cityId !== 0) {
        setSelected(territoryData?.details);
      }
    }
    setTerritoryName(territoryData?.territoryName || "");
  }, [territoryData]);

  const setupTerritory = () => {
    if (!territoryName) {
      setError({
        state: true,
        message: "Please enter territory name",
      });
      return;
    }

    const newDetails = newlyAdded.map((city) => ({
      cityId: city.cityId,
      startDate: city.startDate,
      endDate: city.endDate,
    }));

    const payload = {
      actionType: 1,
      territoryId: parseInt(id),
      territoryName: territoryName,
      countryId,
      cityDetail: newDetails,
    };

    addCitiesToTerritory(payload);
  };

  const handleTerritoryChange = (e) => setTerritoryName(e.target.value);
  const openEditCityModal = (city) => {
    setCityEditing(city);
    setOpenEditCityDateModal(true);
  };

  const removeCityFromNew = (id) => {
    const filtered = newlyAdded.filter((city) => city.cityId !== id);
    setNewlyAdded(filtered);
  };

  return (
    <>
      <div className="mb-5">
        <PageHeading>Edit Territory: {territoryName}</PageHeading>
        <BackBtn />
      </div>

      <TerritoryNavigation />

      <Fields>
        <GroupHeading>Territory Information</GroupHeading>
        <FormGroup columns="3">
          <GlobalInput
            labelText="Territory Name"
            inputName="territoryName"
            inputValue={territoryName}
            handleChange={handleTerritoryChange}
            error={error.state}
            errorMessage={error.message}
            required
          />
        </FormGroup>
      </Fields>

      <div className="mb-4">
        {selected.length > 0 && (
          <AddedCities
            cities={selected}
            isSelected={true}
            deactivateCity={deactivateCity}
            editCityDates={openEditCityModal}
            title="Added Cities"
            columnNames={{
              state: "stateName",
              city: "cityName",
              lga: "lgaName",
            }}
          />
        )}
      </div>

      <div className="mb-4">
        {newlyAdded.length > 0 && (
          <AddedCities
            cities={newlyAdded}
            removeCity={removeCityFromNew}
            title="Cities to be Added"
            columnNames={{
              state: "state_name",
              city: "name",
              lga: "localGoverment",
            }}
          />
        )}

        <AddBtn
          id={"addCity"}
          text={"Add New City"}
          action={() => setOpenAddCityModal(true)}
        />
      </div>

      <GlobalBtn mx="auto" onClick={setupTerritory}>
        {isSubmitting ? "Loading..." : "Update"}
      </GlobalBtn>

      {openAddCityModal && (
        <AddCity
          selectedInfo={selectedInfo}
          countryId={countryId}
          newlyAdded={newlyAdded}
          existingCities={selected}
          isOpen={openAddCityModal}
          setNewCities={setNewlyAdded}
          openSaveCity={() => setOpenSaveCity(true)}
          closeModal={() => setOpenAddCityModal(false)}
        />
      )}
      {openEditCityDateModal && (
        <EditCityEndDate
          editDate={editCityDate}
          cityDetails={cityEditing}
          isOpen={openEditCityDateModal}
          closeModal={() => setOpenEditCityDateModal(false)}
        />
      )}
      {openSaveCity && (
        <SaveCity
          isOpen={openSaveCity}
          closeModal={() => setOpenSaveCity(false)}
          openAddCities={() => setOpenAddCityModal(true)}
        />
      )}

      <GlobalFullScreenLoader open={isSubmitting} />
    </>
  );
};

export default EditTerritory;
