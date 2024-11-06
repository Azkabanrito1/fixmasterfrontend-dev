import { useEffect, useState } from "react";
import {
  useCreateAddressOnRequest,
  useUpdateLiveLocation,
} from "./useQueries/useIdentity";
import { useSnackbar } from "notistack";

const useGoogleGeocode = ({ isScriptLoadSucceed }) => {
  const { enqueueSnackbar } = useSnackbar();

  // initialize the google geocode service
  useEffect(() => {
    // creeate an interval to get the geo location data in intervals
    const locationFetchInterval = setInterval(() => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { longitude, latitude } = position?.coords;

        // only initiate the geocode service if the google maps script has loaded
        if (isScriptLoadSucceed) {
          initGeocode({ lat: latitude, lng: longitude });
        }
      });
    }, 0.5 * 60 * 1000); // minutes intervals

    // clear the interval when the component unmounts
    return () => clearInterval(locationFetchInterval);
  }, [isScriptLoadSucceed]);

  // extract the breakdown of the address from the response
  // of the google maps service and return the values
  const extractAddressDetails = (place) => {
    const addressDetails = {
      address: "",
      country: "",
      state: "",
      lga: "",
      city: "",
      longitude: 0,
      latitude: 0,
    };

    // stop execution if there are no adress components
    // i.e. the adress is invalid
    if (!place.address_components) {
      return addressDetails;
    }

    addressDetails.longitude = place.geometry.location.lng();
    addressDetails.latitude = place.geometry.location.lat();
    addressDetails.address = place.formatted_address.split(",")[0];

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
    });

    return addressDetails;
  };

  // callbacks that will be called when api call fails
  const onFailure = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };

  // mutation to create the address in the database and get the city ID
  const { mutateAsync: createAddressOnReq } = useCreateAddressOnRequest(
    undefined,
    onFailure
  );
  const { mutateAsync: updateLocation } = useUpdateLiveLocation(
    undefined,
    onFailure
  );

  const initGeocode = ({ lat, lng }) => {
    // create an instance of the google geocoder
    const geocoder = new window.google.maps.Geocoder();

    geocoder.geocode(
      { location: { lng, lat } },
      async function (results, status) {
        if (status === "OK") {
          // extract the address details from the results
          const addressDets = extractAddressDetails(results[0]);

          const { country, state, lga, city, longitude, latitude, address } =
            addressDets;

          const payload = {
            country,
            state,
            lga,
            city,
            longitude,
            latitude,
          };

          const response = await createAddressOnReq(payload);

          const updateResponse = await updateLocation({
            address,
            longitude,
            latitude,
            cityId: response.data.data.cityIdResult,
          });
        }
      }
    );
  };
};

export default useGoogleGeocode;
