import styled from "styled-components";
import Collapsible from "react-collapsible";
import {
  PageHeading,
  BackBtn,
  PreboardingContainer,
  Main,
} from "../../../components/globalcomponents/Utilities";
import GuarantorsInfoForm from "../../../components/franchiseecomponents/settings/GuarantorsInfoForm";
import {
  useGuarantorInfoSubmit,
  useGuarantorInfoUpdate,
  useGetGuarantorInfo,
  useGetStageId,
} from "../../../hooks/useQueries/useOnboarding";
import { useSnackbar } from "notistack";
import GuarantorInfoSubmitted from "./GuarantorInfoSubmitted";
import { useEffect, useState } from "react";

const GuarantorsInfo = ({
  isTrustedCustomer = false,
  isTrustedCustomerHeader = false,
}) => {
  const [openNotificationModal, setOpenNotificationModal] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { data: loginStage } = useGetStageId();
  const onboarding = loginStage?.data || {};

  // ===========================mutations =========================
  const onSubmitSuccess = () => {
    enqueueSnackbar("Submitted successfully", { variant: "success" });
  };

  const onSubmitError = (error) => {
    enqueueSnackbar(error.message, { variant: "error" });
  };

  const { mutate: submitInfo, isLoading: isSubmitting } =
    useGuarantorInfoSubmit(onSubmitSuccess, onSubmitError);
  const { mutate: updateInfo, isLoading: isUpdating } = useGuarantorInfoUpdate(
    onSubmitSuccess,
    onSubmitError
  );
  const { data: guarantorData } = useGetGuarantorInfo();

  useEffect(() => {
    if (guarantorData?.data?.length >= 2) {
      setOpenNotificationModal(true);
    }
  }, [guarantorData?.data?.length]);

  const noOfGuarantors = 2;

  const template = Array.from(Array(noOfGuarantors).keys(), (_, x) => x).map(
    (index) => {
      return (
        <Collapsible
          key={index}
          trigger={
            <>
              <span>
                {isTrustedCustomerHeader ? "Customer" : "Guarantor"} {index + 1}
              </span>
              <div className="fs-6">
                {!!guarantorData?.data[index] ? (
                  <span
                    className={`${
                      guarantorData.data[index].status.toLowerCase() ===
                      "confirmed"
                        ? "text-success"
                        : "text-danger"
                    } me-3`}
                  >
                    Submitted - {guarantorData.data[index].status}
                  </span>
                ) : (
                  <span className="me-3 text-danger">Not Submitted</span>
                )}
                <i className="fas fa-chevron-right"></i>
              </div>
            </>
          }
        >
          <GuarantorsInfoForm
            guarantor={guarantorData?.data[index]}
            isTrustedCustomer={isTrustedCustomer}
            isLoading={isSubmitting}
            isUpdating={isUpdating}
            submitInfo={submitInfo}
            updateInfo={updateInfo}
          />
        </Collapsible>
      );
    }
  );

  return (
    <>
      <GuarantorsContainer>
        <Main>
          <div>
            {!onboarding.stageName?.includes("guarantor") && <BackBtn />}
            <div className="pb-0">
              <PageHeading>
                {isTrustedCustomer
                  ? "Trusted Customer Information"
                  : "Guarantor's Information"}
              </PageHeading>
              <p>
                Please provide your
                <span className="ml-2 gap-3" style={{ marginLeft: "5px" }}>
                  {isTrustedCustomer
                    ? "trusted customer information to continue"
                    : "guarantor's information to continue"}
                </span>
              </p>
            </div>
            {template}
          </div>
        </Main>
      </GuarantorsContainer>

      {openNotificationModal && (
        <GuarantorInfoSubmitted
          isOpen={openNotificationModal}
          closeModal={() => setOpenNotificationModal(false)}
          info={"guarantor"}
        />
      )}
    </>
  );
};

export default GuarantorsInfo;

const GuarantorsContainer = styled(PreboardingContainer)`
  padding-block: 48px 48px 0;
  overflow: hidden;

  main {
    height: 100%;
    /* background-color: transparent; */
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
      border-bottom: 1px solid var(--clr-primary);
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
