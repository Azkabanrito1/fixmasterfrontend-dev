import { BackBtn, OnboardingStageNav, PageHeading } from "../../../../components/globalcomponents/Utilities";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const NewTechnician = () => {
 const location = useLocation();

 const stageUrl = location.pathname.split("/").slice(-1)[0];

 return (
   <div>
     <BackBtn />
     <PageHeading style={{ marginBottom: "32px" }}>
       Technician Onboarding
     </PageHeading>
     <OnboardingStageNav>
       <NavLink
         to="stage-1"
         className={stageUrl === ("new" || "stage-1") ? "active" : ""}
       >
         Stage 1
       </NavLink>
       <NavLink to="stage-2">Stage 2</NavLink>
       <NavLink to="stage-3">Stage 3</NavLink>
       <NavLink to="stage-4">Stage 4</NavLink>
       <NavLink to="stage-5">Stage 5</NavLink>
     </OnboardingStageNav>

     <Outlet />
   </div>
 );
};

export default NewTechnician;
