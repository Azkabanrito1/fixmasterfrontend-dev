import styled from "styled-components";

const MyFooter = () => {
  return (
    <>
      <Footer>
        <FooterItems>
          <div className="split">
            <div className="logo">
              <div className="image">
                <img src="/images/logo.svg" alt="omo" />
              </div>
              <p>
                Whether you need quick fixes or comprehensive solutions, we are
                here to help make repairs easier for you.
              </p>
            </div>
            <div className="links">
              <h3>PRODUCTS</h3>
              <a href="#">
                <li>Repair Services</li>
              </a>
              <a href="#">
                <li>Installation Services</li>
              </a>
              <a href="#">
                <li>Maintenance Services</li>
              </a>
              <a href="#">
                <li>Equipment Hire</li>
              </a>
            </div>
          </div>
          <div className="split">
            <div className="links">
              <h3>FOLLOW US</h3>
              <a href="#">
                <li>Plumbing Repairs</li>
              </a>
              <a href="#">
                <li>Electronic and Appliance Repairs</li>
              </a>
              <a href="#">
                <li>HVAC System Installations</li>
              </a>
              <a href="#">
                <li>Security System Installations</li>
              </a>
              <a href="#">
                <li>Landscape and grounds maintenance</li>
              </a>
            </div>
            <div className="links">
              <h3>QUICK LINKS</h3>
              <a href="#">
                <li>About Us</li>
              </a>
              <a href="#">
                <li>Service</li>
              </a>
              <a href="#">
                <li>Contact Us</li>
              </a>
              <a href="#">
                <li>Log In</li>
              </a>
              <a href="#">
                <li>Terms & Privacy</li>
              </a>
            </div>
          </div>
        </FooterItems>
        <div className="copyright">
          <hr />
          <p>© 2023 FixMaster. All Rights Reserved.</p>
        </div>
      </Footer>
    </>
  );
};
export default MyFooter;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  width: 100%;

  padding: 1rem 4vw;

  .copyright {
    text-align: center;
  }
`;
const FooterItems = styled.div`
  display: flex;
  gap: 1.5rem;
  width: 100%;

  @media screen and (max-width: 1023px) {
    flex-direction: column;
  }

  .split {
    display: flex;
    width: 100%;
    justify-content: space-between;
    gap: 1.5rem;

    @media screen and (max-width: 767px) {
      flex-direction: column;
      max-width: 480px;
    }

    .logo {
      flex: 1;
      .image {
        width: 7%;
        height: 7%;

        width: 30%;
        height: 30%;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .links {
      flex: 1;

      h3 {
        color: #f26222;
        font-size: 1rem;
      }
      a {
        text-decoration: none;
        color: black;
        transition: 0.2s all linear;

        &:hover {
          color: #f26222;
        }
      }
    }
  }
`;
