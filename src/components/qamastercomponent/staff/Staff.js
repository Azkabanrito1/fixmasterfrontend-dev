import styled from "styled-components";

const Staff = ({ staffData }) => {
  return (
    <StaffContainer>
      <div className="logo">
        <img src="/images/fixmaster.png" alt="logo" />
      </div>

      <div className="profile">
        <div className="image">
          <img
            src={staffData?.profilePicture || "/images/avatar.png"}
            alt="staff"
          />
        </div>

        <div className="data">
          <div>
            <h4>Name: </h4>
            <span>{staffData?.name}</span>
          </div>
          <div>
            <h4>Staff No: </h4>
            <span>{staffData?.staffNumber}</span>
          </div>
          <div>
            <h4>Job Ref: </h4>
            <span>{staffData?.currentJobRef}</span>
          </div>
          <div>
            <h4>Role: </h4>
            <span>{staffData?.role}</span>
          </div>
          <div>
            <h4>Date Issued: </h4>
            <span>{staffData?.dateIssued}</span>
          </div>
        </div>
      </div>
    </StaffContainer>
  );
};

export default Staff;

const StaffContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
  height: 100%;
  background-image: url("/images/staff.jpeg");
  background-position: right center;
  background-repeat: no-repeat;
  background-size: cover;

  img {
    max-width: 100%;
  }

  .logo {
    width: min(250px, 45%);
  }

  h4 {
    font-weight: 600;
    font-size: 2rem;
    margin-bottom: 0;
  }

  .data {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;

    & > div {
      display: flex;
      align-items: center;
      gap: 1rem;
      font-size: 2rem;
    }
  }

  .profile {
    display: flex;
    gap: 3rem;

    .image {
      width: 30%;
      aspect-ratio: 1;
      border-radius: 50%;
      overflow: hidden;

      img {
        height: 100%;
        object-fit: cover;
      }
    }
  }

  @media screen and (max-width: 576px) {
    h4 {
      font-weight: 500;
      font-size: 1.2rem;
      margin-bottom: 0;
    }
    span {
      font-size: 1.3rem;
    }
    .profile {
      flex-direction: column;
      gap: 1.2rem;
    }

    .image {
      width: 100%;
      aspect-ratio: 1;
    }
  }
`;
