import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  useAcceptFranchisee,
  useGetFranchiseeApplicants,
} from "../../hooks/useQueries/useOnboarding";
import { useQueryClient } from "react-query";
import { logout } from "../../redux/auth/actions";
import GlobalBtn from "../../components/globalcomponents/GlobalBtn";
import { useNavigate } from "react-router-dom";

const HrDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: applicants } = useGetFranchiseeApplicants();
  const { mutate: acceptApplicant } = useAcceptFranchisee();

  const applicantsTemplate = applicants?.data?.map((applicant) => {
    return (
      <Applicant key={applicant.id}>
        {applicant.firstName} {applicant.lastName}
        <span style={{ marginLeft: "30px" }}>{applicant.emailAddress}</span>
        {!applicant.isApproved ? (
          <button onClick={() => acceptApplicant(applicant.id)}>
            Accept Franchisee
          </button>
        ) : (
          <button disabled="disabled">Already Accepted</button>
        )}
      </Applicant>
    );
  });

  const handleLogout = () => {
    dispatch(logout());
    queryClient.clear();
    navigate("/");
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h1>HR</h1>
        <GlobalBtn onClick={handleLogout}>Log out</GlobalBtn>
      </div>

      <div>
        <h2>Franchisee Applicants</h2>
        {applicantsTemplate?.reverse()}
      </div>
    </>
  );
};

export default HrDashboard;

const Applicant = styled.li`
  padding: 1rem;
  font-size: 18px;

  button {
    margin-left: 4rem;
    padding: 1rem;
  }
`;
