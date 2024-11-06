import { Stack } from "@mui/material";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import { useGetCollaboratorRoles } from "../../../hooks/useQueries/useIdentity";
import GlobalCollapsible from "../../../components/globalcomponents/GlobalCollapsible";
import GuarantorSettingsForm from "../../../components/admincomponents/guarantor/GuarantorSettingsForm";
import { useGetAllGuarantorSettings } from "../../../hooks/useQueries/useAdmin";

const GuarantorSettings = () => {
  const { data: rolesData } = useGetCollaboratorRoles();
  const { data: guarSettingsData } = useGetAllGuarantorSettings();

  return (
    <Stack spacing={4}>
      <div>
        <BackBtn />
        <PageHeading>Guarantor Requirement</PageHeading>
      </div>

      {rolesData?.data?.map((role) => (
        <GlobalCollapsible
          key={role.id}
          title={role.name}
          children={
            <GuarantorSettingsForm
              collaboratorId={role.id}
              initValues={
                guarSettingsData?.filter(
                  (data) => data.collaboratorId === role.id
                )[0]
              }
            />
          }
        />
      ))}
    </Stack>
  );
};

export default GuarantorSettings;
