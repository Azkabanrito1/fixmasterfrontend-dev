import { useGetUserProfile } from "../../hooks/useQueries/useOnboarding";

const Pending = () => {
  const { data: userData } = useGetUserProfile();

  let loginDetails = localStorage.getItem("loginDetails");
  if (loginDetails) loginDetails = JSON.parse(loginDetails);
  const fName = userData?.user?.firstName;

  return (
    <PreboardingContainer>
      <div>
        <h1>Welcome {fName}, </h1>

        <h2>Approval pending</h2>
      </div>
    </PreboardingContainer>
  );
};

export default Pending;
