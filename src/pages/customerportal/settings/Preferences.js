import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import { useGetPreferenceMaster } from "../../../hooks/useQueries/useAdmin";
import PreferenceBox from "../../../components/customercomponents/Settings/PreferenceBox";
import { useSnackbar } from "notistack";
import {
  useGetContactAndNotificationsPreference,
  useSaveContactPreference,
  useSaveNotificationsPreference,
} from "../../../hooks/useQueries/useIdentity";
import NotificationBox from "../../../components/customercomponents/Settings/NotificationBox";

const Preferences = () => {
  const { enqueueSnackbar } = useSnackbar();

  //----------------------------------data fetching--------------------------
  const { data: contactPrefData } = useGetPreferenceMaster();
  const { data: preferenceData } = useGetContactAndNotificationsPreference();

  //--------------------------------mutate fn & mutation------------------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };

  const { mutate: saveContactPreference, isLoading: isSavingContact } =
    useSaveContactPreference(onSuccess, onFailure);

  const { mutate: saveNotification, isLoading: isSavingNotify } =
    useSaveNotificationsPreference(onSuccess, onFailure);

  return (
    <>
      <div className="mb-5">
        <BackBtn />
        <PageHeading>Preferences</PageHeading>
      </div>

      <PreferenceBox
        contactPref={contactPrefData?.data}
        saveContactPreference={saveContactPreference}
        issaving={isSavingContact}
        preferences={preferenceData?.data}
      />

      <NotificationBox
        saveNotification={saveNotification}
        isSaving={isSavingNotify}
        preferences={preferenceData?.data}
      />
    </>
  );
};

export default Preferences;
