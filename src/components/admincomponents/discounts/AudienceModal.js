import { useGetAudienceByCategory } from "../../../hooks/useQueries/useAdmin";
import GlobalSelectTableModal from "../../globalcomponents/GlobalSelectionTableModal";

const AudienceModal = ({
  audienceList,
  audienceCategory,
  addToAudience,
  closeModal,
  isOpen,
}) => {
  const { data: audienceData, isLoading } = useGetAudienceByCategory(
    audienceCategory,
    {
      enabled: !!audienceCategory,
    }
  );

  const audience =
    audienceData?.data?.map((audience, index) => ({
      id: audience.id,
      index: index + 1,
      name: audience.name,
    })) || [];

  const columns = [
    { field: "index", headerName: "S/N", width: 100 },
    { field: "name", headerName: "Name", flex: 1 },
  ];

  return (
    <GlobalSelectTableModal
      isOpen={isOpen}
      closeModal={closeModal}
      initData={audience}
      isLoading={isLoading}
      selectedData={audienceList}
      action={addToAudience}
      columns={columns}
      heading="Add Audience"
    />
  );
};

export default AudienceModal;
