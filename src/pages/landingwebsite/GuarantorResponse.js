import { useState } from "react";
import { Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import { LoginRegWrapper } from "./Login";
import { useNavigate } from "react-router-dom";
import ModalHeader from "../../components/layouts/modal/ModalHeader";
import {
  useGuarantorResponse,
  useValidateGuarantor,
} from "../../hooks/useQueries/useIdentity";
import GlobalBtn from "../../components/globalcomponents/GlobalBtn";
import GlobalAltBtn from "../../components/globalcomponents/GlobalAltBtn";
import SiteNavbar from "../../components/landingpagecomponents/SiteNavbar";
import ConfirmAcceptModal from "../../components/globalcomponents/modals/ConfirmAcceptModal";
import ConfirmDeleteModal from "../../components/globalcomponents/modals/ConfirmDeleteModal";
import GlobalFullScreenLoader from "../../components/globalcomponents/GlobalFullScreenLoader";

const GuarantorResponse = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(window.location.search);
  const gid = searchParams.get("gh");

  const { data: guaranteeData } = useValidateGuarantor(gid, { enabled: !!gid });
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    navigate("/");
  };
  const onError = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };
  const { mutate: guarantorResponse, isLoading } = useGuarantorResponse(
    onSuccess,
    onError
  );
  const pageUrl = window.location.href;
  const sendResponse = (response) => {
    const payload = {
      guarantorId: guaranteeData?.guarantorId,
      responseStatus: response,
      url: pageUrl,
    };

    guarantorResponse(payload);
  };

  return (
    <>
      <SiteNavbar
        isOpen={isNavOpen}
        toggleIsOpen={() => {
          setIsNavOpen((prev) => !prev);
        }}
      />
      <LoginRegWrapper>
        <Stack maxWidth={"600px"} spacing={2} className="bg-white rounded p-4">
          <ModalHeader title="Confirm Guarantor Status" mb={"0px"} pb={"0px"} />

          <p>
            <strong>{guaranteeData?.requestorName}</strong> has applied for the
            role of a <em>{guaranteeData?.requestorRole}</em> at FixMaster. You,{" "}
            <strong>{guaranteeData?.guarantorName}</strong> have been listed by
            as a guarantor to the above mentioned individual.
          </p>
          <p>Please accept or reject the request</p>
          <Stack direction={"row"} justifyContent={"space-around"} spacing={4}>
            <GlobalBtn onClick={() => setShowConfirmModal(true)}>
              Accept
            </GlobalBtn>
            <GlobalAltBtn onClick={() => setShowRejectModal(true)}>
              Reject
            </GlobalAltBtn>
          </Stack>
        </Stack>
      </LoginRegWrapper>

      <GlobalFullScreenLoader open={isLoading} />

      {showConfirmModal && (
        <ConfirmAcceptModal
          open={showConfirmModal}
          close={() => setShowConfirmModal(false)}
          pText={`Are you sure you want to be a guarantor to ${guaranteeData.requestorName}`}
          onDelete={() => sendResponse("Accept")}
          actionText={"Confirm"}
        />
      )}
      {showRejectModal && (
        <ConfirmDeleteModal
          open={showRejectModal}
          close={() => setShowRejectModal(false)}
          pText={`Are you sure you want to reject being a guarantor to ${guaranteeData.requestorName}`}
          onDelete={() => sendResponse("Reject")}
          actionText={"Reject"}
        />
      )}
    </>
  );
};

export default GuarantorResponse;
