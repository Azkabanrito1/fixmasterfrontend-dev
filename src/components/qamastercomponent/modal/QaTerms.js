import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GlobalModal from "../../globalcomponents/GlobalModal";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import { useGetTermsAndConditions } from "../../../hooks/useQueries/useAdmin";
import moment from "moment";
import GlobalPDFViewer from "../../globalcomponents/GlobalPDFViewer";

const QaTerms = ({ open, close, headerText }) => {
  const [url, setUrl] = useState("");
  const [date, setDate] = useState("");
  const {
    data: termsData,
    isLoading,
    isRefetching,
  } = useGetTermsAndConditions("qa");
  useEffect(() => {
    setUrl(termsData?.data[0]?.fileUrl);
    setDate(termsData?.data[0]?.createdAt);
  }, [isLoading, isRefetching]);

  return (
    <GlobalModal
      isOpen={open}
      closeModal={close}
      shouldCloseOnOverlayClick={true}
      height="fit-content"
    >
      <AltModalHeader
        closeModal={close}
        heading={headerText}
        alignText={`center`}
      />
      <GlobalBallBeat loading={isLoading} />
      {!isLoading && (
        <Container>
          <Div
            style={{ maxHeight: "350px", width: "100%", overflowY: "scroll" }}
          >
            <GlobalPDFViewer url={url} classes="terms-pdf" />
          </Div>
        </Container>
      )}
    </GlobalModal>
  );
};

export default QaTerms;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 20px;

  a {
    text-decoration: none;
    color: var(--clr-primary);

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Header = styled.header`
  text-align: center;
  padding: 10px 0px;
`;

const UpdatedDate = styled.p`
  font-size: 1em;
  color: gray;
  margin-top: -20px;
`;

const Div = styled.div`
  &::-webkit-scrollbar {
    width: 20px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #f26222;
    border-radius: 10px;
    border: 2px solid #f1f1f1;
  }
  /* Firefox scrollbar customization */
  scrollbar-width: thin;
  scrollbar-color: #f26222;
`;
