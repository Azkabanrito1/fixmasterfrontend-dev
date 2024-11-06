import ModalHeader from "../../layouts/modal/ModalHeader";
import GlobalModal from "../../globalcomponents/GlobalModal";
import styled from "styled-components";
import { useViewApplication } from "../../../hooks/useQueries/useOnboarding";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";

const ViewQaMasterApplication = ({
  isOpen,
  closeModal,
  applicantId,
  headerText,
}) => {
  const [languages, setLanguages] = useState([]);
  const [primarySubCategory, setPrimarySubCategory] = useState([]);
  const [secondarySubCategory, setSecondarySubCategory] = useState([]);

  const { data: application, isLoading } = useViewApplication(2, applicantId);

  const applicantDetails = application?.data;
  const nameArray = applicantDetails?.name?.split(" ");

  useEffect(() => {
    if (applicantDetails && applicantDetails?.languages) {
      const languageNames = applicantDetails.languages.map(
        (language) => language.name
      );
      setLanguages(languageNames.join(", "));
    }

    if (applicantDetails && applicantDetails?.primarySpecialization) {
      const primarySubCategories = applicantDetails?.primarySpecialization?.map(
        (category) => category.subCategoryName
      );
      setPrimarySubCategory(primarySubCategories.join(", "));
    }

    if (applicantDetails && applicantDetails?.secondarySpecialization) {
      const secondarySubCategories =
        applicantDetails?.secondarySpecialization?.map(
          (category) => category.subCategoryName
        );
      setSecondarySubCategory(secondarySubCategories.join(", "));
    }
  }, [applicantDetails]);

  return (
    <GlobalModal
      isOpen={isOpen}
      closeModal={closeModal}
      shouldCloseOnOverlayClick={true}
    >
      {/* <ModalHeader closeModal={closeModal} title="QA Application" /> */}
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
                <Info>{applicantDetails?.location}</Info>
              </SingleWrap>
              <SingleWrap>
                <Label>Postal Code</Label>
                <Info>{applicantDetails?.postalCode}</Info>
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
            <Title>Candidate's Area of Specialization</Title>
            <Wrap>
              <SingleWrap>
                <Label>Area of Specialization</Label>
                <Info>{applicantDetails?.areaOfSpecialization}</Info>
              </SingleWrap>
              <SingleWrap>
                <Label>Selected Sub-Category</Label>
                <Info>{primarySubCategory}</Info>
              </SingleWrap>
              {applicantDetails?.areaOfSecondarySpecialization && (
                <SingleWrap>
                  <Label>Area of Secondary Specialization</Label>
                  <Info>{applicantDetails?.areaOfSecondarySpecialization}</Info>
                </SingleWrap>
              )}
              {secondarySubCategory && (
                <SingleWrap>
                  <Label>Selected Secondary Sub-Category</Label>
                  <Info>{secondarySubCategory}</Info>
                </SingleWrap>
              )}
            </Wrap>
          </WrapInfo>
          <WrapInfo>
            <Title>Language Proficiency Information</Title>
            <Wrap>
              <SingleWrap>
                <Label>Language(s)</Label>
                <Info>{languages}</Info>
              </SingleWrap>
            </Wrap>
          </WrapInfo>
          <WrapInfo>
            <Title>Candidate's Experience Evaluation</Title>
            <Wrap>
              <SingleWrap>
                <Label>Years of Primary Experience</Label>
                <Info>{applicantDetails?.yearOfExperience}</Info>
              </SingleWrap>
              {applicantDetails?.secondaryYearsofExperience && (
                <SingleWrap>
                  <Label>Years of Secondary Experience</Label>
                  <Info>{applicantDetails?.secondaryYearsofExperience}</Info>
                </SingleWrap>
              )}
              <SingleWrap>
                <Label>Experience Giving Technical Training</Label>
                <Info>{applicantDetails?.yearOfTraining}</Info>
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

export default ViewQaMasterApplication;

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
