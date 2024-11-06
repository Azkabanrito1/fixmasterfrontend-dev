import { Link } from "react-router-dom";
import styled from "styled-components";

const Logo = ({ maxWidth, mx, mb, linkRef }) => {
  return (
    <LogoContainer maxWidth={maxWidth} mx={mx} mb={mb}>
      <Link to={linkRef || "#"}>
        <img src="/images/fixmaster.png" alt="fix master logo" />
      </Link>
    </LogoContainer>
  );
};

export default Logo;

const LogoContainer = styled.div`
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : "175px")};
  margin-inline: ${({ mx }) => mx};
  margin-bottom: ${({ mb }) => mb};

  img {
    width: 100%;
    aspect-ratio: 2 / 1;
    object-fit: cover;
  }
`;
