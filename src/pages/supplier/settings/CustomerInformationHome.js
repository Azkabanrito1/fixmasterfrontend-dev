import Collapsible from "react-collapsible";
import {
  BackBtn,
  Main,
  PageHeading,
  PreboardingContainer,
} from "../../../components/globalcomponents/Utilities";
import styled from "styled-components";
import CustomerForm from "../../../components/suppliercomponent/setting/CustomerForm";
import {
  useGetStageId,
  useGetTrustedCustomer,
} from "../../../hooks/useQueries/useOnboarding";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/layouts/dashboard/CollaboratorDashboardHeader";
import GuarantorInfoSubmitted from "../../../components/layouts/settings/GuarantorInfoSubmitted";

const CustomerInformationHome = () => {
  const navigate = useNavigate();
  const { data: loginStage } = useGetStageId();

  // //fetching data and making api call
  const { data: trustedCustomerInfo } = useGetTrustedCustomer();
  console.log(trustedCustomerInfo?.data);

  const noOfCustomer = 2;
  const template = Array.from(Array(noOfCustomer).keys(), (_, x) => x).map(
    (index) => {
      return (
        <Collapsible
          key={index}
          trigger={
            <>
              <span>Customer {index + 1}</span>
              <div className="fs-6">
                {!!trustedCustomerInfo?.data[index] ? (
                  <span
                    className={`${
                      trustedCustomerInfo?.data[
                        index
                      ]?.status?.toLowerCase() === "confirmed"
                        ? "text-success"
                        : "text-danger"
                    } me-3`}
                  >
                    Submitted - {trustedCustomerInfo?.data[index]?.status}
                  </span>
                ) : (
                  <span className="me-3 text-danger">Not Submitted</span>
                )}
                <i className="fas fa-chevron-right"></i>
              </div>
            </>
          }
        >
          <CustomerForm customerInfo={trustedCustomerInfo?.data[index]} />
        </Collapsible>
      );
    }
  );

  return (
    <>
      {!loginStage?.data?.isCompleted && <Header />}
      <GuarantorsContainer>
        <Main>
          <div>
            <BackBtn />
            <PageHeading>Trusted Customer Information</PageHeading>
            <p className="fs-5 text-muted align-items-center">
              Please Update your trusted customer information
            </p>
          </div>

          <div>{template}</div>
        </Main>
      </GuarantorsContainer>
      {trustedCustomerInfo?.data.length >= 2 && (
        <GuarantorInfoSubmitted
          isOpen={trustedCustomerInfo?.data.length >= 2}
          info="customer"
        />
      )}
    </>
  );
};

export default CustomerInformationHome;

const GuarantorsContainer = styled(PreboardingContainer)`
  padding-block: 48px 48px 0;
  overflow: hidden;

  main {
    height: 100%;
    overflow-x: hidden;

    & > div {
      width: min(100%, 990px);
      margin-inline: auto;
    }
  }

  .Collapsible {
    padding-block: 1rem;
    margin-inline: auto;
    padding-inline: 1rem;
    font-weight: bold;

    &:not(:last-child) {
      border-bottom: 1px dotted var(--clr-primary);
    }

    .Collapsible__trigger {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-block: 20px;
      font-size: 24px;
      cursor: pointer;

      .fas {
        font-size: 1rem;
        transition: 350ms ease-in-out;
      }

      &[aria-expanded="true"] .fas {
        rotate: 90deg;
      }
    }
  }
`;
