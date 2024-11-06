import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import GlobalBallBeat from "../../../../components/globalcomponents/GlobalBallBeat";
import { useGetAllGuarantorInformation } from "../../../../hooks/useQueries/useAdmin";
import GlobalModal from "../../../../components/globalcomponents/GlobalModal";
import AltModalHeader from "../../../../components/layouts/modal/AltModalHeader";

const MoreGuarantorInfo = ({
  isOpen,
  closeModal,
  guarantorId,
  headerText,
  collaborator,
}) => {
  const { data: guarantorInformation, isLoading } =
    useGetAllGuarantorInformation(collaborator);

  const getActiveGuarantor = (id) =>
    guarantorInformation?.filter((guarantor) => guarantor.attachmentId === id);

  const guarantorInfo = getActiveGuarantor(guarantorId);

  const guarantor = guarantorInfo[0];

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
            <Title>Guarantor's Personal Information</Title>
            <Wrap>
              <SingleWrap>
                <Label>Name</Label>
                <Info>{guarantor?.guarantorName}</Info>
              </SingleWrap>
              <SingleWrap>
                <Label>Marital Status</Label>
                <Info>{guarantor?.maritalStatus}</Info>
              </SingleWrap>
              <SingleWrap>
                <Label>Date of Birth</Label>
                <Info>{guarantor?.dateofBirth}</Info>
              </SingleWrap>
              <SingleWrap>
                <Label>Relationship</Label>
                <Info>{guarantor?.relationship}</Info>
              </SingleWrap>
            </Wrap>
          </WrapInfo>
          <WrapInfo>
            <Title>Guarantor's Contact Information</Title>
            <Wrap>
              <SingleWrap>
                <Label>Email Address</Label>
                <Info>{guarantor?.email}</Info>
              </SingleWrap>
              <SingleWrap>
                <Label>Phone</Label>
                <Info>{guarantor?.phone}</Info>
              </SingleWrap>
              {guarantor?.alternativePhone && (
                <SingleWrap>
                  <Label>Alternative Phone</Label>
                  <Info>{guarantor?.alternativePhone}</Info>
                </SingleWrap>
              )}
              <SingleWrap>
                <Label>Home Address</Label>
                <Info>{guarantor?.homeAddress}</Info>
              </SingleWrap>
              <SingleWrap>
                <Label>Home City</Label>
                <Info>{guarantor?.homeCity}</Info>
              </SingleWrap>
            </Wrap>
          </WrapInfo>
          <WrapInfo>
            <Title>Guarantor's Official Information</Title>
            <Wrap>
              <SingleWrap>
                <Label>Company Name</Label>
                <Info>{guarantor?.companyName}</Info>
              </SingleWrap>
              <SingleWrap>
                <Label>Office Address</Label>
                <Info>{guarantor?.officeAddress}</Info>
              </SingleWrap>
              <SingleWrap>
                <Label>Office City</Label>
                <Info>{guarantor?.officeCity}</Info>
              </SingleWrap>
              <SingleWrap>
                <Label>Office Occupancy</Label>
                <Info>{guarantor?.officeOccupancy}</Info>
              </SingleWrap>
            </Wrap>
          </WrapInfo>
          <WrapInfo>
            <Title>Additional Information</Title>
            <Wrap>
              <SingleWrap>
                <Label>Attachment Type</Label>
                <Info>{guarantor?.attachmentType}</Info>
              </SingleWrap>
              <SingleWrap>
                <Label>Attachment ID</Label>
                <Info>{guarantor?.attachmentId}</Info>
              </SingleWrap>
              {guarantor?.attachmenturl && (
                <SingleWrap>
                  <Label>Attachment URL</Label>
                  <Info>
                    <Link target="_blank" to={guarantor?.attachmenturl}>
                      View
                    </Link>
                  </Info>
                </SingleWrap>
              )}
              <SingleWrap>
                <Label>Guarantor Response Date</Label>
                <Info>{guarantor?.guarantorResponseDate}</Info>
              </SingleWrap>
              <SingleWrap>
                <Label>Guarantor Status</Label>
                <Info>{guarantor?.status}</Info>
              </SingleWrap>
            </Wrap>
          </WrapInfo>
        </ApplicantDetails>
      )}
    </GlobalModal>
  );
};

export default MoreGuarantorInfo;

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
