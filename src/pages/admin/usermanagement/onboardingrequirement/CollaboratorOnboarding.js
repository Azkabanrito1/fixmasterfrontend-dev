import React from "react";
import { UserCardsContainer } from "../CollaboratorMgmtOptions";
import UserCard from "../../../../components/admincomponents/usermanagement/UserCard";
import { Stack } from "@mui/material";
import {
  BackBtn,
  PageHeading,
  SectionHeading,
} from "../../../../components/globalcomponents/Utilities";
import { Container } from "./VideoHome";
import Collapsible from "react-collapsible";
import InterviewGradingParameters from "./InterviewGradingParameters";
import { useLocation } from "react-router-dom";
import ApplicationForm from "./ApplicationForm";
import MCQRequirements from "./MCQRequirements";
import ThankYou from "./ThankYou";
import VideoSettings from "../../../../components/admincomponents/onboardingrequirements/VideoSettings";

const CollaboratorOnboarding = ({ hasStage1Requirements }) => {
  const onboardingData = [
    ...(hasStage1Requirements
      ? [
          {
            id: 1,
            icon: "/images/group.png",
            title: "Application Requirements",
            description: "Application form requirements...",
            to: "application",
          },
        ]
      : []),
    {
      id: 2,
      icon: "/images/group.png",
      title: `Interview Grading`,
      description: "Interview grading parameters...",
      to: "interview",
    },
  ];

  const location = useLocation();

  const getDynamicSegment = () => {
    const pathSegments = location.pathname.split("/");
    const index = pathSegments.findIndex((segment) => segment === "user-mgmt");
    if (index !== -1 && index + 1 < pathSegments.length) {
      return pathSegments[index + 1]; // This returns the segment after 'user-mgmt'
    }
    return null;
  };

  const collaborator = getDynamicSegment();

  const hasLanguage =
    collaborator === "qamaster" ||
    collaborator === "supplier" ||
    collaborator === "technician" ||
    collaborator === "cco";

  const hasVideo = collaborator === "cse" || collaborator === "cco";

  const role =
    (collaborator === "cse" && "CSE") || (collaborator === "cco" && "CCO");

  const fourStages =
    collaborator === "qamaster" || collaborator === "franchisee";

  const threeStages = collaborator === "supplier";

  const fiveStages =
    collaborator === "cse" ||
    collaborator === "cco" ||
    collaborator === "technician";

  return (
    <>
      {fourStages && (
        <Stack spacing={4} style={{ height: "auto" }}>
          <div>
            <PageHeading>Onboarding Requirements</PageHeading>
            <BackBtn />
          </div>

          <Container>
            <Collapsible
              trigger={
                <>
                  <SectionHeading className=" w-100 column">
                    Stage 1 Requirements
                    <div
                      className="d-flex justify-content-between align-items-center"
                      style={{ marginTop: "0.3rem" }}
                    >
                      <p style={{ color: "#a3aed0", fontSize: "1rem" }}>
                        Application form requirements
                      </p>
                      <i
                        className="fas fa-chevron-right"
                        style={{ color: "var(--clr-primary)" }}
                      ></i>
                    </div>
                  </SectionHeading>
                </>
              }
            >
              <ApplicationForm
                hasLanguage={hasLanguage && true}
                hasVideo={hasVideo && true}
                role={role}
              />
            </Collapsible>
            <Collapsible
              trigger={
                <>
                  <SectionHeading
                    className=" w-100 column"
                    style={{ marginTop: "-3rem" }}
                  >
                    Stage 2 Requirements
                    <div
                      className="d-flex justify-content-between align-items-center"
                      style={{ marginTop: "0.3rem" }}
                    >
                      <p style={{ color: "#a3aed0", fontSize: "1rem" }}>
                        Interview performance grading parameters
                      </p>
                      <i
                        className="fas fa-chevron-right"
                        style={{ color: "var(--clr-primary)" }}
                      ></i>
                    </div>
                  </SectionHeading>
                </>
              }
            >
              <InterviewGradingParameters
                collaborator={collaborator}
                interviewName={"Offline Interview"}
                interviewType={"OfflineInterview"}
              />
            </Collapsible>
            <Collapsible
              trigger={
                <>
                  <SectionHeading
                    className="w-100 column"
                    style={{ marginTop: "-3rem" }}
                  >
                    Stage 3 Requirements
                    <div
                      className="d-flex justify-content-between align-items-center"
                      style={{ marginTop: "0.3rem" }}
                    >
                      <p style={{ color: "#a3aed0", fontSize: "1rem" }}>
                        Onboarding training & MCQs grading
                      </p>
                      <i
                        className="fas fa-chevron-right"
                        style={{ color: "var(--clr-primary)" }}
                      ></i>
                    </div>
                  </SectionHeading>
                </>
              }
            >
              <MCQRequirements collaborator={collaborator} trainingType={1} />
            </Collapsible>
            <Collapsible
              trigger={
                <>
                  <SectionHeading
                    className=" w-100 column"
                    style={{ marginTop: "-3rem", marginBottom: "0.5rem" }}
                  >
                    Stage 4 Requirements
                    <div
                      className="d-flex justify-content-between align-items-center"
                      style={{ marginTop: "0.3rem" }}
                    >
                      <p style={{ color: "#a3aed0", fontSize: "1rem" }}>
                        Job readiness interview performance grading parameters
                      </p>
                      <i
                        className="fas fa-chevron-right"
                        style={{ color: "var(--clr-primary)" }}
                      ></i>
                    </div>
                  </SectionHeading>
                </>
              }
            >
              <InterviewGradingParameters
                collaborator={collaborator}
                interviewName={"Job Readiness Interview"}
                interviewType={"JobReadinessInterview"}
              />
            </Collapsible>
          </Container>
        </Stack>
      )}

      {threeStages && (
        <Stack spacing={4} style={{ height: "auto" }}>
          <div>
            <PageHeading>Onboarding Requirements</PageHeading>
            <BackBtn />
          </div>

          <Container>
            <Collapsible
              trigger={
                <>
                  <SectionHeading className=" w-100 column">
                    Stage 1 Requirements
                    <div
                      className="d-flex justify-content-between align-items-center"
                      style={{ marginTop: "0.3rem" }}
                    >
                      <p style={{ color: "#a3aed0", fontSize: "1rem" }}>
                        Application form requirements
                      </p>
                      <i
                        className="fas fa-chevron-right"
                        style={{ color: "var(--clr-primary)" }}
                      ></i>
                    </div>
                  </SectionHeading>
                </>
              }
            >
              <ApplicationForm
                hasLanguage={hasLanguage && true}
                hasVideo={hasVideo && true}
                role={role}
              />
            </Collapsible>
            <Collapsible
              trigger={
                <>
                  <SectionHeading
                    className="w-100 column"
                    style={{ marginTop: "-3rem" }}
                  >
                    Stage 2 Requirements
                    <div
                      className="d-flex justify-content-between align-items-center"
                      style={{ marginTop: "0.3rem" }}
                    >
                      <p style={{ color: "#a3aed0", fontSize: "1rem" }}>
                        Onboarding training & MCQs grading
                      </p>
                      <i
                        className="fas fa-chevron-right"
                        style={{ color: "var(--clr-primary)" }}
                      ></i>
                    </div>
                  </SectionHeading>
                </>
              }
            >
              <MCQRequirements collaborator={collaborator} trainingType={1} />
            </Collapsible>
            <Collapsible
              trigger={
                <>
                  <SectionHeading
                    className=" w-100 column"
                    style={{ marginTop: "-3rem", marginBottom: "0.5rem" }}
                  >
                    Stage 3 Requirements
                    <div
                      className="d-flex justify-content-between align-items-center"
                      style={{ marginTop: "0.3rem" }}
                    >
                      <p style={{ color: "#a3aed0", fontSize: "1rem" }}>
                        Job readiness interview performance grading parameters
                      </p>
                      <i
                        className="fas fa-chevron-right"
                        style={{ color: "var(--clr-primary)" }}
                      ></i>
                    </div>
                  </SectionHeading>
                </>
              }
            >
              <InterviewGradingParameters
                collaborator={collaborator}
                interviewName={"Job Readiness Interview"}
                interviewType={"JobReadinessInterview"}
              />
            </Collapsible>
          </Container>
        </Stack>
      )}

      {fiveStages && (
        <Stack spacing={4} style={{ height: "auto" }}>
          <div>
            <PageHeading>Onboarding Requirements</PageHeading>
            <BackBtn />
          </div>

          <Container>
            <Collapsible
              trigger={
                <>
                  <SectionHeading className=" w-100 column">
                    Stage 1 Requirements
                    <div
                      className="d-flex justify-content-between align-items-center"
                      style={{ marginTop: "0.3rem" }}
                    >
                      <p style={{ color: "#a3aed0", fontSize: "1rem" }}>
                        Application form requirements
                      </p>
                      <i
                        className="fas fa-chevron-right"
                        style={{ color: "var(--clr-primary)" }}
                      ></i>
                    </div>
                  </SectionHeading>
                </>
              }
            >
              {hasVideo && <VideoSettings />}
              <ApplicationForm
                hasLanguage={hasLanguage && true}
                hasVideo={hasVideo && true}
                role={role}
              />
            </Collapsible>
            <Collapsible
              trigger={
                <>
                  <SectionHeading
                    className="w-100 column"
                    style={{ marginTop: "-3rem" }}
                  >
                    Stage 2 Requirements
                    <div
                      className="d-flex justify-content-between align-items-center"
                      style={{ marginTop: "0.3rem" }}
                    >
                      <p style={{ color: "#a3aed0", fontSize: "1rem" }}>
                        MCQ cut off & number of sittings
                      </p>
                      <i
                        className="fas fa-chevron-right"
                        style={{ color: "var(--clr-primary)" }}
                      ></i>
                    </div>
                  </SectionHeading>
                </>
              }
            >
              <MCQRequirements collaborator={collaborator} trainingType={2} />
            </Collapsible>
            <Collapsible
              trigger={
                <>
                  <SectionHeading
                    className=" w-100 column"
                    style={{ marginTop: "-3rem" }}
                  >
                    Stage 3 Requirements
                    <div
                      className="d-flex justify-content-between align-items-center"
                      style={{ marginTop: "0.3rem" }}
                    >
                      <p style={{ color: "#a3aed0", fontSize: "1rem" }}>
                        Interview performance grading parameters
                      </p>
                      <i
                        className="fas fa-chevron-right"
                        style={{ color: "var(--clr-primary)" }}
                      ></i>
                    </div>
                  </SectionHeading>
                </>
              }
            >
              <InterviewGradingParameters
                collaborator={collaborator}
                interviewName={
                  collaborator === "technician"
                    ? "Offline Interview"
                    : "Automated Interview"
                }
                interviewType={
                  collaborator === "technician"
                    ? "OfflineInterview"
                    : "AutomatedInterview"
                }
              />
              {collaborator !== "technician" && (
                <MCQRequirements collaborator={collaborator} trainingType={3} />
              )}
              {hasVideo && <ThankYou collaborator={role} />}
            </Collapsible>
            <Collapsible
              trigger={
                <>
                  <SectionHeading
                    className=" w-100 column"
                    style={{ marginTop: "-3rem" }}
                  >
                    Stage 4 Requirements
                    <div
                      className="d-flex justify-content-between align-items-center"
                      style={{ marginTop: "0.3rem" }}
                    >
                      <p style={{ color: "#a3aed0", fontSize: "1rem" }}>
                        Onboarding training & MCQs grading parameters
                      </p>
                      <i
                        className="fas fa-chevron-right"
                        style={{ color: "var(--clr-primary)" }}
                      ></i>
                    </div>
                  </SectionHeading>
                </>
              }
            >
              <MCQRequirements collaborator={collaborator} trainingType={1} />
            </Collapsible>
            <Collapsible
              trigger={
                <>
                  <SectionHeading
                    className=" w-100 column"
                    style={{ marginTop: "-3rem" }}
                  >
                    Stage 5 Requirements
                    <div
                      className="d-flex justify-content-between align-items-center"
                      style={{ marginTop: "0.3rem" }}
                    >
                      <p style={{ color: "#a3aed0", fontSize: "1rem" }}>
                        Job readiness interview performance grading parameters
                      </p>
                      <i
                        className="fas fa-chevron-right"
                        style={{ color: "var(--clr-primary)" }}
                      ></i>
                    </div>
                  </SectionHeading>
                </>
              }
            >
              <InterviewGradingParameters
                collaborator={collaborator}
                interviewName={"Job Readiness Interview"}
                interviewType={"JobReadinessInterview"}
              />
            </Collapsible>
          </Container>
        </Stack>
      )}
    </>
  );
};

export default CollaboratorOnboarding;
