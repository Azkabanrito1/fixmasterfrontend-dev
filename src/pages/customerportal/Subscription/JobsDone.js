import { useParams } from "react-router-dom";
import {
  BackBtn,
  InfoTable,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import {
  PageAside,
  PageContainer,
} from "../../../components/layouts/dashboard/DashboardUtilities";
import styled from "styled-components";
import SubCard from "../../../components/customercomponents/subscription/ActiveSubCard";
import { useQueryClient } from "react-query";

const JobsDone = () => {
  const { subId } = useParams();
  const queryClient = useQueryClient();
  const initialSubData = queryClient.getQueryData("all-active-subs");
  const initData = initialSubData?.data?.data?.filter(
    (sub) => sub.subscriptionId === parseInt(subId)
  );
  return (
    <PageContainer>
      <div>
        <div>
          <PageHeading>Jobs Done</PageHeading>
          <BackBtn />
        </div>

        <SubCard plan={initData?.[0]} />

        <InfoTable minWidth="400px">
          <thead className="fullbody">
            <tr>
              <th>Job Ref</th>
              <th>Description</th>
              <th className="text-center">Date</th>
            </tr>
          </thead>
          <tbody className="fullbody">
            <tr>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </InfoTable>
      </div>
      <PageAside>
        <AsideCard>
          <h2>
            Why not take out a subscription with FixMaster and enjoy the
            following benefits
          </h2>

          <ul>
            <li>
              Priority services delivery over other customers that are not
              subscribers
            </li>
            <li>No labour charges on fixes booked using our subscription</li>
            <li>No need to pay booking fees</li>
            <li>
              The privilege of booking a recuring maintenance regime for their
              home based equipment.
            </li>
          </ul>
        </AsideCard>
      </PageAside>
    </PageContainer>
  );
};

export default JobsDone;

const AsideCard = styled.div`
  padding: 0.8rem;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 1px 4px 4px 0 rgba(0, 0, 0, 0.25);

  h2 {
    line-height: 1.4em;
    font-size: 1rem;
    font-weight: bold;
  }

  ul {
    li {
      color: var(--clr-primary);
      font-size: 0.9rem;
      font-weight: bold;

      &::marker {
        color: var(--clr-primary);
      }
      &:not(:last-child) {
        margin-bottom: 10px;
      }
    }
  }
`;
