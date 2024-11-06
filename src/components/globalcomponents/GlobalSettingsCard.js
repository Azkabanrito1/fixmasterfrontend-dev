import { Link } from "react-router-dom";
import styled from "styled-components";

const GlobalSettingsCard = ({ settingOption }) => {
  return (
    <Cards key={settingOption.id}>
      <img src={settingOption.img} alt="" />
      <h3>
        <Link to={settingOption.linkUrl}>
          <span>{settingOption.title}</span>
          <i className="fas fa-chevron-right"></i>
        </Link>
        <div role="description">{settingOption.description}</div>
      </h3>
    </Cards>
  );
};

export default GlobalSettingsCard;

const Cards = styled.div`
  width: 100%;
  padding-top: 1rem !important;
  padding-inline: 1rem !important;
  border-radius: 12px;
  background-color: #fff;

  img {
    margin-bottom: 1rem;
  }

  a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    text-decoration: none;

    span {
      margin-right: 24px;
      font-size: 20px;
      color: var(--clr-primary);
    }

    i {
      color: #000;
      font-size: 14px;
    }
  }

  [role="description"] {
    font-size: 1rem;
    font-weight: 400;
  }
`;
