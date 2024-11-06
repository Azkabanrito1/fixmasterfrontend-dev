import { useState } from "react";
import { Main } from "../../components/globalcomponents/Utilities";
import Header from "../../components/layouts/dashboard/CollaboratorDashboardHeader";
import VerifyUserModal from "../../components/globalcomponents/modals/VerifyUserModal";
import CreatePassWordModal from "../../components/globalcomponents/modals/CreatePasswordModal";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { PATH_PUBLIC } from "../../routes/paths";
import { useCollaborTokenVerification } from "../../hooks/useQueries/useOnboarding";
import GlobalFullScreenLoader from "../../components/globalcomponents/GlobalFullScreenLoader";

const VerifyUser = () => {
  const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [userData, setUserData] = useState({});
  const [isVerified, setIsVerified] = useState(false);

  const [searchParam] = useSearchParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const token = searchParam.get("token");
  const onSuccessVerification = (response) => {
    setIsVerified(true);
    if (response?.message === "101") {
      enqueueSnackbar("Verification success.", { variant: "success" });
      setUserData(response?.data);
      setIsVerifyModalOpen(false);
      setShowPasswordModal(true);
    } else if (response?.message === "102") {
      enqueueSnackbar(
        "Verification success. You already have an account. Please sign in",
        { variant: "success" }
      );
      return navigate(PATH_PUBLIC.login);
    }
  };
  const onFailedVerification = (response) => {
    if (response?.message === "103") {
      return enqueueSnackbar("Invalid user or token", { variant: "error" });
    }
    enqueueSnackbar(response.message, { variant: "error" });
  };
  const { mutate: verifyToken, isLoading } = useCollaborTokenVerification(
    onSuccessVerification,
    onFailedVerification
  );

  return (
    <>
      <Header />
      <Main>
        <VerifyUserModal
          isOpen={isVerifyModalOpen}
          closeModal={() => setIsVerifyModalOpen(false)}
          verifyToken={() => verifyToken(token)}
          isVerified={isVerified}
        />
        <CreatePassWordModal
          isOpen={showPasswordModal}
          closeModal={() => setShowPasswordModal(false)}
          userData={userData}
        />
      </Main>
      <GlobalFullScreenLoader open={isLoading} />
    </>
  );
};

export default VerifyUser;
