import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import GlobalBtn from "./GlobalBtn";

export const DashboardWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  height: calc(100vh - 90px);
  margin-top: ${({ mb }) => mb};
  overflow: hidden;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Main = styled.main`
  position: relative;
  width: 100%;
  padding: 1.5rem;
  background-color: #f2f2f2;
  overflow-x: clip;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 12px; /* width of the entire scrollbar */
  }
  &::-webkit-scrollbar-track {
    background: #eee; /* color of the tracking area */
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--clr-primary); /* color of the scroll thumb */
    border-radius: 10px; /* roundness of the scroll thumb */
    border: 3px solid #eee;
  }
`;

export const Container = styled.div`
  position: relative;
  /* background-color: #f5f5f5; */
  padding-top: ${({ pt }) => pt};
  padding-bottom: ${({ pb }) => pb};
  padding-block: ${({ py }) => py};

  & > div {
    max-width: ${({ width }) => width || "1140px"};
    margin-inline: auto;
    padding-top: 32px;
    padding-inline: 32px;
    padding-bottom: 40px;
  }

  h1 {
    font-size: 36px;
    margin-bottom: 16px;
  }

  p {
    margin-bottom: 16px;
    line-height: 1.8;
    font-size: 16px;
  }

  @media screen and (max-width: 750px) {
    padding-top: ${({ pt }) => pt || "40px"};
  }
`;

export const SectionHeading = styled.h2`
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px dashed var(--clr-primary);
  font-size: 1.3rem;
`;

export const PreboardingContainer = styled(Container)`
  height: calc(100vh - 90px);
`;

export const Back = styled(GlobalBtn)`
  position: absolute;
  inset: ${({ inset }) => (inset ? inset : "32px auto auto 32px")};
  background-color: transparent;
  width: max-content;
  padding: 0.5rem 1rem;
  color: #000;
  font-size: 16px;
  z-index: 4;

  &:hover {
    background-color: transparent;
    color: var(--clr-primary);
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const BackBtn = ({ inset }) => {
  const navigate = useNavigate();

  return (
    <Back inset={inset} onClick={() => navigate(-1)}>
      &lt; Back
    </Back>
  );
};

export const Fields = styled.fieldset`
  appearance: none;
  border: none;
  margin-bottom: 30px;

  p {
    color: #8692a6;
    margin-bottom: 8px;
  }

  span {
    color: #8692a6;
    margin-bottom: 8px;
  }

  .description {
    color: #8692a6;
    margin-bottom: 8px;
  }

  div[role="group"] label {
    display: inline-flex;
    align-items: center;
    margin-right: 48px;
    font-size: 20px;
    font-weight: 400;
  }

  .img {
    width: 25px;
  }

  input[type="radio"] {
    width: 24px;
    height: 24px;
    margin-right: 10px;
    border: 2px solid var(--clr-primary);
    border-radius: 0;
    accent-color: var(--clr-primary);
  }
`;

export const GroupHeading = styled.h2`
  margin-bottom: ${({ mb }) => (mb ? mb : "1em")};
  font-size: 20px;
`;

export const FormGroup = styled.div`
  --gap: ${({ gap }) => gap || "30px"};

  position: relative;
  display: grid;
  grid-template-columns: ${({ columns, size }) =>
    size
      ? `repeat(auto-fit, minmax(calc(${
          size / columns + "px"
        } - (var(--gap) * ${columns * 2})), 1fr))`
      : `repeat(${columns}, 1fr)`};
  gap: var(--gap);
  margin-bottom: ${({ mb }) => (mb ? mb : "none")};

  @media only screen and (max-width: 756px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

export const Grid = styled(FormGroup)`
  h3,
  h4 {
    font-size: 1rem;
    color: var(--clr-primary);
  }

  a {
    text-decoration: none;
    color: var(--clr-primary);
  }

  img {
    max-width: 100%;
  }
`;

export const JobsStyledNav = styled.nav`
  margin-bottom: 3rem;

  ul {
    display: grid;
    list-style: none;
    padding: 0;
    gap: 0.5rem;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }

  li {
    background-color: #f8e9e2;
  }

  a {
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
    padding: 0.8rem;
    color: var(--clr-primary);
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    text-decoration: none;

    &.active {
      background-color: var(--clr-primary);
      color: #fff;
    }
  }
`;

export const OnboardingStageNav = styled.nav`
  gap: 1rem;
  display: grid;
  margin: 0 auto 32px;
  max-width: 756px;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  justify-content: center;

  a,
  button {
    background-color: #f8e9e2;
    appearance: none;
    padding: 10px 1rem;
    border: none;
    /* background-color: transparent; */
    color: var(--clr-primary);
    text-decoration: none;
    cursor: pointer;
    transition: 300ms ease-in-out;
  }

  a.active,
  button.active {
    background-color: var(--clr-primary);
    color: #fff;
  }
`;

export const PageHeading = styled.h1`
  margin-bottom: 16px;
  font-size: 24px;
  text-align: center;
  text-transform: capitalize;
  font-weight: 700;

  & + p {
    text-align: center;
    max-width: 50ch;
    margin-inline: auto;
    font-size: 18px;
    font-weight: 300;
    line-height: 1.4;
    color: #575f6e;
  }

  @media screen and (max-width: 768px) {
    font-size: 18px;
    margin-right: 3rem;
  }
`;

export const ProfilePicture = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
`;

const StyledTable = styled.table`
  table-layout: ${({ layout }) => layout || "fixed"};
  border-collapse: collapse;
  width: max(100%, ${({ minWidth }) => (minWidth ? minWidth : "700px")});
  height: ${({ height }) => height || "auto"};

  .fullbody {
    border-radius: 8px;

    &:not(thead) {
      background-color: #f8e9e2;
    }

    th:first-child,
    td:first-child {
      padding-left: 1rem;
    }

    th:last-child,
    td:last-child {
      padding-right: 1rem;
    }
  }

  th {
    padding: ${({ border }) => (border ? "0.8rem" : "none")};
    padding-bottom: 1rem;
    border: ${({ border }) => border || "none"};
    color: #a1a1a1;
    font-size: 1rem;
    text-align: left;
  }

  td {
    border: ${({ border }) => border || "none"};
    padding: ${({ border }) => (border ? "1rem" : "0.5rem")};
    padding-block: 1rem;
    font-size: 0.9em;
    text-align: left;
    overflow-wrap: break-word;
    word-wrap: break-word;
  }

  /* /* th:first-child,
    td:first-child {
      text-align: left;
    } */

  th:last-child,
  td:last-child {
    text-align: right;
  }

  tr:not(:last-child) td {
    border: ${({ border }) => border || "none"};
    border-bottom: ${({ border }) => border || "1px solid #a1a1a121"};
  }

  button {
    padding: 0.2em;
    border: none;
    cursor: pointer;
    font-size: 1.05rem;

    &.primary {
      color: var(--clr-primary);
      background-color: transparent;

      span {
        margin-right: 8px;
        text-decoration: underline;
        text-underline-offset: 5px;
      }
    }

    &.edit-status {
      display: flex;
      align-items: center;
      gap: 5px;
      text-transform: capitalize;
      background-color: transparent;

      img {
        width: 1em;
      }

      &.active {
        color: #006717;
      }

      &.dormant {
        color: #ff9b04;
      }

      &.suspended {
        color: #a1a1a1;
      }

      &.sacked {
        color: #e01b1b;
      }
    }

    & + img,
    img {
      position: relative;
      top: 2px;
    }
  }

  a.video {
    color: #0487ff;
  }

  a.cv {
    color: var(--clr-primary);
  }

  .status {
    text-align: center;

    span {
      padding: 6px 20px;
      border-radius: 8px;
      color: #fff;
      font-size: 16px;
      text-align: center;
      background-color: var(--clr-primary);
    }

    .not-selected {
      background-color: #e0e0e0;
    }

    .accepted {
      background-color: #11e981;
    }

    .rejected {
      background-color: #e01b1b;
    }
  }

  .align-right {
    text-align: right;
  }

  .align-left {
    text-align: left;
  }

  .underline {
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

export const InfoTable = ({ children, minWidth, height, border, layout }) => {
  return (
    <div style={{ overflowX: "auto", height: height }}>
      <StyledTable minWidth={minWidth} border={border} layout={layout}>
        {children}
      </StyledTable>
    </div>
  );
};

export const NoData = ({ dataName = "", cols }) => {
  return (
    <tr>
      <td className="text-center" colSpan={cols}>{`No ${
        dataName ? dataName : "data"
      } to display`}</td>
    </tr>
  );
};

export const StyledAccount = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-radius: 10px;
  background-color: #fff;
  width: 100%;

  .profile {
    display: flex;
    align-items: center;
    gap: 1rem;

    h3 {
      margin-bottom: 0;
      font-size: 1.25rem;
      font-weight: 700;
    }
  }

  .image {
    width: 80px;
    aspect-ratio: 1;
    border-radius: 50%;
    overflow: hidden;

    img {
      max-width: 100%;
    }
  }

  .stats {
    font-size: 1.1rem;
    color: #676767;

    & > div {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    h4 {
      font-weight: 600;
      font-size: 1.1rem;
      margin-bottom: 0;
    }
  }

  .account {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    height: 100%;
    padding: 0.8rem;
    background-color: #f2f2f2;
    border-radius: 10px;

    .balance {
      color: var(--clr-primary);
      font-size: 2rem;
      font-weight: 700;
    }

    .loyalty {
      display: flex;
      justify-content: space-between;
      gap: 0.8rem;
    }

    a {
      display: flex;
      align-items: center;
      color: #676767;
      font-size: 0.9rem;
      text-decoration: none;
    }

    svg {
      color: var(--clr-primary);
      margin-right: 0.3rem;
    }
  }

  @media screen and (max-width: 576px) {
    flex-direction: column;
    gap: 1.5rem;

    & > div {
      width: 100%;
    }
  }
`;

export const GridCardsContainer = styled.section`
  --gap: 1.5rem;

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--gap);

  & > div {
    background-color: #fff;
    border-radius: 10px;
  }

  a {
    text-decoration: none;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const BannerContainer = styled.div`
  height: ${({ height }) => height || "auto"};
  border-radius: 10px;
  overflow: hidden;

  img {
    display: block;
    width: 100%;
    aspect-ratio: 4 / 3.2;
    height: ${({ height }) => (height ? "100%" : "auto")};
    object-fit: cover;
  }
`;

export const AdditionalBtn = styled.button`
  display: inline-block;
  appearance: none;
  border: none;
  margin-left: auto;
  background: none;
  font-weight: 700;

  svg {
    color: var(--clr-primary);
  }
`;
