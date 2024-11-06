import { useReducer, useState } from "react";
import GlobalBtn from "../../components/globalcomponents/GlobalBtn";
import MemberAlready from "../../components/franchiseecomponents/modals/MemberAlready";
import RegisterFranchisee from "../../components/franchiseecomponents/modals/RegisterFranchisee";
import RegisterCse from "../../components/csecomponent/cse/modal/RegisterCse";
import ApplicationSuccess from "../../components/franchiseecomponents/modals/ApplicationSuccess";
import QaMasterRegistration from "../../components/qamastercomponent/modal/QaMasterRegistration";
import RegisterTechnician from "../../components/techniciancomponents/modals/RegisterTechnician";
import RegisterSupplier from "../../components/suppliercomponent/modal/RegisterSupplier";
import RegisterCallCenter from "../../components/callcentercomponent/modals/RegisterCallCenter";
import SiteNavbar from "../../components/landingpagecomponents/SiteNavbar";

const initModalCtrlState = {
  signInModal: false,
  cseModal: false,
  franchiseeModal: false,
  qamasterModal: false,
  technicianModal: false,
  supplierModal: false,
  callcenterModal: false,
  succcessModal: false,
};

const modalReducer = (state, action) => {
  switch (action.type) {
    case "openSignIn":
      return {
        ...state,
        signInModal: true,
      };
    case "openCse":
      return {
        ...state,
        signInModal: false,
        cseModal: true,
      };
    case "openFranchisee":
      return {
        ...state,
        signInModal: false,
        franchiseeModal: true,
      };
    case "openQA":
      return {
        ...state,
        signInModal: false,
        qamasterModal: true,
      };
    case "openTechnician":
      return {
        ...state,
        signInModal: false,
        technicianModal: true,
      };
    case "openSupplier":
      return {
        ...state,
        signInModal: false,
        supplierModal: true,
      };
    case "openCallCenter":
      return {
        ...state,
        signInModal: false,
        callcenterModal: true,
      };
    case "closeCse":
      return {
        ...state,
        cseModal: false,
      };
    case "closeSignIn":
      return {
        ...state,
        signInModal: false,
      };
    case "closeFranchisee":
      return {
        ...state,
        franchiseeModal: false,
      };
    case "closeQA":
      return {
        ...state,
        qamasterModal: false,
      };
    case "closeTechnician":
      return {
        ...state,
        technicianModal: false,
      };
    case "closeSupplier":
      return {
        ...state,
        supplierModal: false,
      };
    case "closeCallCenter":
      return {
        ...state,
        callcenterModal: false,
      };
    case "applicationSuccess":
      return {
        signInModal: false,
        cseModal: false,
        franchiseeModal: false,
        qamasterModal: false,
        technicianModal: false,
        supplierModal: false,
        callcenterModal: false,
        succcessModal: true,
      };
    case "closeSuccess":
      return {
        ...state,
        succcessModal: false,
      };
  }
};

const Careers = () => {
  const [modalCtrlState, setModalCtrlState] = useReducer(
    modalReducer,
    initModalCtrlState
  );
  const [formDestination, setFormDestination] = useState();
  const [isNavOpen, setIsNavOpen] = useState(false);

  let loginDetails = localStorage.getItem("loginDetails");
  if (loginDetails) loginDetails = JSON.parse(loginDetails);
  const token = loginDetails?.token;

  const controlAppFlow = (destination) => {
    // check is user is logged in
    if (token) {
      // if yes open the required application form
      switch (destination) {
        case "franchisee":
          setModalCtrlState({ type: "openFranchisee" });
          break;
        case "cse":
          setModalCtrlState({ type: "openCse" });
          break;
        case "qamaster":
          setModalCtrlState({ type: "openQA" });
          break;
        case "technician":
          setModalCtrlState({ type: "openTechnician" });
          break;
        case "supplier":
          setModalCtrlState({ type: "openSupplier" });
          break;
        case "callcenter":
          setModalCtrlState({ type: "openCallCenter" });
          break;
        default:
          break;
      }
    } else {
      // if no, open modal to verify if they have an account
      setModalCtrlState({ type: "openSignIn" });
    }
    setFormDestination(destination);
  };

  const openApplicationModals = {
    franchisee: function () {
      setModalCtrlState({ type: "openFranchisee" });
    },
    cse: function () {
      setModalCtrlState({ type: "openCse" });
    },
    qamaster: function () {
      setModalCtrlState({ type: "openQA" });
    },
    technician: function () {
      setModalCtrlState({ type: "openTechnician" });
    },
    supplier: function () {
      setModalCtrlState({ type: "openSupplier" });
    },
    callcenter: function () {
      setModalCtrlState({ type: "openCallCenter" });
    },
  };

  return (
    <>
      <SiteNavbar
        isOpen={isNavOpen}
        toggleIsOpen={() => {
          setIsNavOpen((prev) => !prev);
        }}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1rem",
          padding: "2rem",
          backgroundColor: "#f6f6f6",
        }}
      >
        <div className="card">
          <img
            src="/images/looking-at-note.png"
            alt=""
            className="card-img-top"
          />
          <div className="card-body">
            <GlobalBtn
              width="max-content"
              mx="auto"
              px="2rem"
              fs="14px"
              onClick={() => controlAppFlow("franchisee")}
            >
              Register As Franchisee
            </GlobalBtn>
          </div>
        </div>
        <div className="card">
          <img
            src="/images/looking-at-note.png"
            alt=""
            className="card-img-top"
          />
          <div className="card-body">
            <GlobalBtn
              width="max-content"
              mx="auto"
              px="2rem"
              fs="14px"
              onClick={() => controlAppFlow("cse")}
            >
              Register As CSE
            </GlobalBtn>
          </div>
        </div>
        <div className="card">
          <img
            src="/images/looking-at-note.png"
            alt=""
            className="card-img-top"
          />
          <div className="card-body">
            <GlobalBtn
              width="max-content"
              mx="auto"
              px="2rem"
              fs="14px"
              onClick={() => controlAppFlow("qamaster")}
            >
              Register As QA Master
            </GlobalBtn>
          </div>
        </div>
        <div className="card">
          <img
            src="/images/looking-at-note.png"
            alt=""
            className="card-img-top"
          />
          <div className="card-body">
            <GlobalBtn
              width="max-content"
              mx="auto"
              px="2rem"
              fs="14px"
              onClick={() => controlAppFlow("technician")}
            >
              Register As Technician
            </GlobalBtn>
          </div>
        </div>
        <div className="card">
          <img
            src="/images/looking-at-note.png"
            alt=""
            className="card-img-top"
          />
          <div className="card-body">
            <GlobalBtn
              width="max-content"
              mx="auto"
              px="2rem"
              fs="14px"
              onClick={() => controlAppFlow("supplier")}
            >
              Register As Supplier
            </GlobalBtn>
          </div>
        </div>
        <div className="card">
          <img
            src="/images/looking-at-note.png"
            alt=""
            className="card-img-top"
          />
          <div className="card-body">
            <GlobalBtn
              width="max-content"
              mx="auto"
              px="2rem"
              fs="14px"
              onClick={() => controlAppFlow("callcenter")}
            >
              Register As Call Center
            </GlobalBtn>
          </div>
        </div>
      </div>

      {modalCtrlState.signInModal && (
        <MemberAlready
          isOpen={modalCtrlState.signInModal}
          closeModal={() => setModalCtrlState({ type: "closeSignIn" })}
          destination={formDestination}
          openApplicationModal={openApplicationModals}
        />
      )}
      {modalCtrlState.succcessModal && (
        <ApplicationSuccess
          isOpen={modalCtrlState.succcessModal}
          closeModal={() => setModalCtrlState({ type: "closeSuccess" })}
        />
      )}
      {modalCtrlState.franchiseeModal && (
        <RegisterFranchisee
          isOpen={modalCtrlState.franchiseeModal}
          openSuccessModal={() =>
            setModalCtrlState({ type: "applicationSuccess" })
          }
          closeModal={() => setModalCtrlState({ type: "closeFranchisee" })}
          openMemberAlready={() => setModalCtrlState({ type: "openSignIn" })}
        />
      )}
      {modalCtrlState.cseModal && (
        <RegisterCse
          isOpen={modalCtrlState.cseModal}
          openSuccessModal={() =>
            setModalCtrlState({ type: "applicationSuccess" })
          }
          closeModal={() => setModalCtrlState({ type: "closeCse" })}
          openMemberAlready={() => setModalCtrlState({ type: "openSignIn" })}
        />
      )}
      {modalCtrlState.qamasterModal && (
        <QaMasterRegistration
          isOpen={modalCtrlState.qamasterModal}
          openSuccessModal={() =>
            setModalCtrlState({ type: "applicationSuccess" })
          }
          closeModal={() => setModalCtrlState({ type: "closeQA" })}
          openMemberAlready={() => setModalCtrlState({ type: "openSignIn" })}
        />
      )}
      {modalCtrlState.technicianModal && (
        <RegisterTechnician
          isOpen={modalCtrlState.technicianModal}
          openSuccessModal={() =>
            setModalCtrlState({ type: "applicationSuccess" })
          }
          closeModal={() => setModalCtrlState({ type: "closeTechnician" })}
          openMemberAlready={() => setModalCtrlState({ type: "openSignIn" })}
        />
      )}
      {modalCtrlState.supplierModal && (
        <RegisterSupplier
          isOpen={modalCtrlState.supplierModal}
          openSuccessModal={() =>
            setModalCtrlState({ type: "applicationSuccess" })
          }
          closeModal={() => setModalCtrlState({ type: "closeSupplier" })}
          openMemberAlready={() => setModalCtrlState({ type: "openSignIn" })}
        />
      )}
      {modalCtrlState.callcenterModal && (
        <RegisterCallCenter
          isOpen={modalCtrlState.callcenterModal}
          openSuccessModal={() =>
            setModalCtrlState({ type: "applicationSuccess" })
          }
          closeModal={() => setModalCtrlState({ type: "closeCallCenter" })}
          openMemberAlready={() => setModalCtrlState({ type: "openSignIn" })}
        />
      )}
    </>
  );
};

export default Careers;
