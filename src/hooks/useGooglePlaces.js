import { useEffect, useState } from "react";
import { useCreateAddressOnRequest } from "./useQueries/useIdentity";
import { useSnackbar } from "notistack";

const useGooglePlaces = (isScriptLoadSucceed, inputRef) => {
  const [addressComponents, setAddressComponents] = useState({});
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isScriptLoadSucceed) {
      initAutoComplete(inputRef, createAddressOnReq, setAddressComponents);
    }
  }, [isScriptLoadSucceed]);

  const extractAddressDetails = (place) => {
    const addressDetails = {
      country: "",
      state: "",
      lga: "",
      city: "",
      streetName: "",
      streetNumber: "",
      longitude: 0,
      latitude: 0,
    };

    if (!place.address_components) {
      return addressDetails;
    }

    addressDetails.longitude = place.geometry.location.lng();
    addressDetails.latitude = place.geometry.location.lat();

    place.address_components.forEach((component) => {
      const types = component.types;
      const value = component.long_name;

      if (types.includes("country")) {
        addressDetails.country = value;
      }

      if (types.includes("administrative_area_level_1")) {
        addressDetails.state = value;
      }

      if (types.includes("administrative_area_level_2")) {
        addressDetails.lga = value;
      }
      if (
        !types.includes("administrative_area_level_2") &&
        (types.includes("administrative_area_level_3") ||
          types.includes("sublocality_level_1"))
      ) {
        addressDetails.lga = value;
      }
      if (
        types.includes("administrative_area_level_2") &&
        addressDetails.city === ""
      ) {
        addressDetails.city = value;
      }

      if (
        types.includes("neighborhood") ||
        types.includes("administrative_area_level_3") ||
        types.includes("sublocality_level_1")
      ) {
        addressDetails.city = value;
      }

      if (types.includes("route")) {
        addressDetails.streetName = value;
      }

      if (types.includes("street_number")) {
        addressDetails.streetNumber = value;
      }
    });

    return addressDetails;
  };

  const onChangeAddress = async (
    autoComplete,
    createAddressEntry,
    setAddress
  ) => {
    const location = autoComplete.getPlace();
    const components = extractAddressDetails(location);

    const { country, state, lga, city, longitude, latitude } = components;

    const payload = {
      country,
      state,
      lga,
      city,
      longitude,
      latitude,
    };

    const response = await createAddressEntry(payload);

    setAddress({
      ...components,
      cityIdResult: response.data.data.cityIdResult,
    });
  };

  const initAutoComplete = (ref, createAddressEntry, setAddress) => {
    if (!ref.current) return;

    const options = {
      componentRestrictions: { country: "NG" },
      fields: ["address_component", "geometry"],
    };

    const autoComplete = new window.google.maps.places.Autocomplete(
      ref.current,
      options
    );

    autoComplete.addListener("place_changed", () => {
      onChangeAddress(autoComplete, createAddressEntry, setAddress);
    });
  };

  const onFailure = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };

  const { mutateAsync: createAddressOnReq } = useCreateAddressOnRequest(
    undefined,
    onFailure
  );

  return addressComponents;
};

export default useGooglePlaces;
