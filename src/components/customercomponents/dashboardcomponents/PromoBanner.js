import { BannerContainer } from "../../globalcomponents/Utilities";

const PromoBanner = ({ banner, height }) => {
  return (
    <BannerContainer height={height}>
      <img src={banner} alt="" />
    </BannerContainer>
  );
};

export default PromoBanner;
