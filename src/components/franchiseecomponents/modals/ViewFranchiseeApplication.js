import ModalHeader from "../../layouts/modal/ModalHeader";
import GlobalModal from "../../globalcomponents/GlobalModal";
import styled from "styled-components";
import { useViewApplication } from "../../../hooks/useQueries/useOnboarding";
import { Link } from "react-router-dom";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";

const ViewFranchiseeApplication = ({
  isOpen,
  closeModal,
  applicantId,
  headerText,
}) => {
  const { data: application, isLoading } = useViewApplication(1, applicantId);
  const applicantDetails = application?.data;
  const nameArray = applicantDetails?.name?.split(" ");

  console.log(applicantDetails);
  return (
    <GlobalModal
      isOpen={isOpen}
      closeModal={closeModal}
      shouldCloseOnOverlayClick={true}
    >
      <AltModalHeader
        closeModal={closeModal}
        heading={headerText}
        alignText={`center`}
      />
      <GlobalBallBeat loading={isLoading} />
      {!isLoading && (
        <ApplicantDetails>
          <WrapInfo>
            <Title>Candidate's Personal Information</Title>
            <Wrap>
              <SingleWrap>
                <Label>First Name</Label>
                <Info>{nameArray && nameArray[0]}</Info>
              </SingleWrap>
              <SingleWrap>
                <Label>Last Name</Label>
                <Info>{nameArray && nameArray[1]}</Info>
              </SingleWrap>
              <SingleWrap>
                <Label>Gender</Label>
                <Info>{applicantDetails?.gender}</Info>
              </SingleWrap>
              <SingleWrap>
                <Label>Date of Birth</Label>
                <Info>{applicantDetails?.dateOFBirth}</Info>
              </SingleWrap>
            </Wrap>
          </WrapInfo>
          <WrapInfo>
            <Title>Candidate's Contact Information</Title>
            <Wrap>
              <SingleWrap>
                <Label>Email Address</Label>
                <Info>{applicantDetails?.emailAddress}</Info>
              </SingleWrap>
              <SingleWrap>
                <Label>Phone Number</Label>
                <Info>{applicantDetails?.phoneNumber}</Info>
              </SingleWrap>
              <SingleWrap>
                <Label>Residential Address</Label>
                <Info>{applicantDetails?.residentialAddress}</Info>
              </SingleWrap>
              <SingleWrap>
                <Label>City</Label>
                <Info>{applicantDetails?.cItyName}</Info>
              </SingleWrap>
              <SingleWrap>
                <Label>Landmark</Label>
                <Info>{applicantDetails?.landMark}</Info>
              </SingleWrap>
            </Wrap>
          </WrapInfo>
          <WrapInfo>
            <Title>Candidate's Academic Qualifications</Title>
            <Wrap>
              <SingleWrap>
                <Label>Highest Level of Education</Label>
                <Info>{applicantDetails?.academicQualification}</Info>
              </SingleWrap>
              <SingleWrap>
                <Label>Course of Study</Label>
                <Info>{applicantDetails?.courseOfStudy}</Info>
              </SingleWrap>
            </Wrap>
          </WrapInfo>
          <WrapInfo>
            <Title>Candidate's Experience Evaluation</Title>
            <Wrap>
              <SingleWrap>
                <Label>Ever Run/Currently Running a Business</Label>
                <Info>
                  {applicantDetails?.runningBusiness === "true" ? "Yes" : "No"}
                </Info>
              </SingleWrap>
              <SingleWrap>
                <Label>Years of Experience</Label>
                <Info>{applicantDetails?.provableStaff}</Info>
              </SingleWrap>
              <SingleWrap>
                <Label>Marketing Skills</Label>
                <Info>
                  {applicantDetails?.marketingSkill === "true" ? "Yes" : "No"}
                </Info>
              </SingleWrap>
              <SingleWrap>
                <Label>Funds to Invest</Label>
                <Info>
                  {applicantDetails?.haveFunds === "true" ? "Yes" : "No"}
                </Info>
              </SingleWrap>
            </Wrap>
          </WrapInfo>
          <WrapInfo>
            <Title>Additional Information</Title>
            <Wrap>
              <SingleWrap>
                <Label>CV</Label>
                <Info>
                  <Link target="_blank" to={applicantDetails?.cvAttachment}>
                    View
                  </Link>
                </Info>
              </SingleWrap>
              <SingleWrap>
                <Label>Cover Letter</Label>
                <Info>
                  <Link
                    target="_blank"
                    to={applicantDetails?.coverLetterAttachment}
                  >
                    View
                  </Link>
                </Info>
              </SingleWrap>
            </Wrap>
          </WrapInfo>
        </ApplicantDetails>
      )}
    </GlobalModal>
  );
};

export default ViewFranchiseeApplication;

const ApplicantDetails = styled.div``;
const WrapInfo = styled.div`
  margin-bottom: 1em;
`;
const Title = styled.div`
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 1em;
`;
const Wrap = styled.div`
  width: 100%;
  display: flex;
  column-gap: 2rem;
  flex-wrap: wrap;
`;
const SingleWrap = styled.div`
  width: 47.5%;
  margin-bottom: 1em;
`;
const Label = styled.div`
  display: block;
  margin-bottom: 8px;
  color: #696f79;
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
`;
const Info = styled.div`
  a {
    color: #e32636;
  }
`;
