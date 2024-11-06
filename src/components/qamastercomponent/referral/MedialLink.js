import styled from "styled-components";
import GlobalModal from "../../globalcomponents/GlobalModal";
import AltModalHeader from "../../layouts/modal/AltModalHeader";
import {
  FacebookIcon,
  FacebookShareButton,
  InstapaperIcon,
  InstapaperShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";

const MedialLink = ({ isOpen, closeModal, link, title }) => {
  return (
    <GlobalModal isOpen={isOpen} closeModal={closeModal} width={"350px"}>
      <AltModalHeader heading="Share referral link" closeModal={closeModal} />
      <MedialContainer>
        <div className="network">
          <FacebookShareButton url={link} className="share-button">
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </div>
        <div className="network">
          <WhatsappShareButton
            url={link}
            title={title}
            separator=":: "
            className="share-button"
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </div>
        <div className="network">
          <TwitterShareButton url={link} title={title} className="share-button">
            <XIcon size={32} round />
          </TwitterShareButton>
        </div>
        <div className="network">
          <TelegramShareButton
            url={link}
            title={title}
            className="share-button"
          >
            <TelegramIcon size={32} round />
          </TelegramShareButton>
        </div>
        <div className="network">
          <LinkedinShareButton
            url={link}
            title={title}
            className="share-button"
          >
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
        </div>
      </MedialContainer>
    </GlobalModal>
  );
};

export default MedialLink;

const MedialContainer = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, 30px);
  max-width: 400px;
  margin: 0 auto;

  .network {
    text-align: center;
  }

  .share-button {
    cursor: pointer;
  }

  .share-button:hover:not(:active) {
    opacity: 0.75;
  }
`;
