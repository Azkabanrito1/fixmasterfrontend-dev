import styled from "styled-components";

const SubscriptionBenefits = () => {
  return (
    <StyledList>
      <li>
        Priority services delivery over other customers that are not subscribers
      </li>
      <li>No labour charges on fixes booked using our subscription</li>
      <li>No need to pay booking fees</li>
      <li>
        The privilege of booking a recuring maintenance regime for their home
        based equipment.
      </li>
    </StyledList>
  );
};

export default SubscriptionBenefits;

const StyledList = styled.ul`
  margin-bottom: 2rem;

  li {
    &::marker {
      color: var(--clr-primary);
    }
    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
`;
