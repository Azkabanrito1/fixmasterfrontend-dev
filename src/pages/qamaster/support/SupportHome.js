import styled from "styled-components";
import RequestCard from "./SupportRequest";
import { useGetSupportRequest } from "../../../hooks/useQueries/useJobs";
import { PageHeading } from "../../../components/globalcomponents/Utilities";

const SupportHome = () => {
  const { data: supportData } = useGetSupportRequest();
  return (
    <div>
      <PageHeading className="mb-3">Support Requests</PageHeading>

      {supportData?.data?.length > 0 ? (
        <CardContainer>
          <RequestCard supports={supportData?.data} />
        </CardContainer>
      ) : (
        <p className="mt-5 text-center">
          There are no pending requests for now
        </p>
      )}
    </div>
  );
};

export default SupportHome;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
`;
