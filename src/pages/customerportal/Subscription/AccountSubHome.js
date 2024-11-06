import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import GlobalBtn from "../../../components/globalcomponents/GlobalBtn";
import { PageHeading } from "../../../components/globalcomponents/Utilities";
import SubCard from "../../../components/customercomponents/subscription/ActiveSubCard";
import { useGetCustomerSubscriptions } from "../../../hooks/useQueries/useJobs";

const AccountSubHome = () => {
  const { data: activePlansData } = useGetCustomerSubscriptions();

  const navigate = useNavigate();

  const activeSubs = activePlansData?.data;

  return (
    <>
      <PageHeading>Account Subscription</PageHeading>
      <img
        src="/images/note-icon.png"
        alt=""
        className="mx-auto d-block mb-4"
      />

      <section className="mb-5">
        <h2 className="fs-5 mb-3 fw-bold">
          Why not take out a subscription with FixMaster and enjoy the following
          benefits
        </h2>
        <StyledList>
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
        </StyledList>
      </section>

      <section>
        <h2 className="fs-5 mb-3 fw-bold">Active Subscriptions </h2>
        {activeSubs && activeSubs?.length > 0 ? (
          <>
            {activeSubs?.map((sub) => (
              <SubCard key={sub.subscriptionId * Math.random()} plan={sub} />
            ))}
          </>
        ) : (
          <p className="text-muted text-center">
            You do not have any active subscription plan
          </p>
        )}
        <GlobalBtn
          onClick={() => navigate("buy-subscription")}
          className="mt-4"
          mx="auto"
          width="auto"
          px="2.5em"
        >
          Buy Subscripton
        </GlobalBtn>
      </section>
    </>
  );
};

export default AccountSubHome;

const StyledList = styled.ul`
  li {
    &::marker {
      color: var(--clr-primary);
    }
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
`;
