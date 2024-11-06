import Collapsible from "react-collapsible";
import { StyledCollapsible } from "../customercomponents/BookaFix/BookingInfo";
import styled from "styled-components";

const GlobalCollapsible = ({ title, subHeading, children }) => {
  return (
    <StyledCollapsibleContainer>
      <Collapsible
        trigger={
          <StyledCollapsible className="w-100 d-flex justify-content-between align-items-center mb-4">
            <div>
              <h4 className="heading" style={{ width: "auto" }}>
                {title}
              </h4>
              {subHeading && <p className="sub-heading">{subHeading}</p>}
            </div>
            <i className="fas fa-chevron-right collapsible-icon"></i>
          </StyledCollapsible>
        }
      >
        {children}
      </Collapsible>
    </StyledCollapsibleContainer>
  );
};

export default GlobalCollapsible;

const StyledCollapsibleContainer = styled.div`
  .collapsible-icon {
    position: relative;
    transition: 0.3s ease-in-out;
    color: var(--clr-primary);
  }

  .Collapsible__trigger[aria-expanded="true"] .collapsible-icon {
    transform: rotate(90deg);
  }
`;
