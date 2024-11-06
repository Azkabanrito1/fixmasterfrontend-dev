import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GlobalModal from "../../globalcomponents/GlobalModal";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import GlobalBallBeat from "../../globalcomponents/GlobalBallBeat";
import moment from "moment";
import GlobalPDFViewer from "../../globalcomponents/GlobalPDFViewer";
import { useGetTermsAndConditions } from "../../../hooks/useQueries/useAdmin";

const CallCenterTerms = ({ open, close, headerText }) => {
  const [url, setUrl] = useState("");
  const [date, setDate] = useState("");
  const {
    data: termsData,
    isLoading,
    isRefetching,
  } = useGetTermsAndConditions("cco");
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

export default CallCenterTerms;

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
  padding: 0 0 20px;
`;

const UpdatedDate = styled.p`
  font-size: 1em;
  color: gray;
  margin-top: -20px;
`;

const Main = styled.main`
  margin: 20px 0;
`;

const Section = styled.section`
  margin-bottom: 40px;

  h2 {
    font-size: 1.5rem;
  }
  h3 {
    font-size: 1.3rem;
  }
`;

const Nav = styled.nav`
  margin-bottom: 40px;

  h2 {
    font-size: 1.5rem;
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin: 10px 0;
`;

const Link = styled.a`
  text-decoration: none;
  color: blue;
  &:hover {
    text-decoration: underline;
  }
`;

const Address = styled.address`
  font-style: normal;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 20px 0;
  background-color: #f1f1f1;
`;

const responsiveMixin = `
  @media (max-width: 768px) {
    padding: 10px;
   
    ${Section} {
      margin-bottom: 20px;
    }
    ${Footer} {
      padding: 10px 0;
    }
  }
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
