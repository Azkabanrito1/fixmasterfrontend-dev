import { Button } from "@mui/material";
import useLogout from "../../../hooks/useLogout";
import useLoginDetails from "../../../hooks/useLoginDetails";

const LogoutUser = ({ action }) => {
  const handleLogout = useLogout(action);
  const { role } = useLoginDetails();

  if (role.toLowerCase().includes("admin")) {
    return;
  }

  return (
    <div className="d-flex justify-content-center align-items-center mb-4 text-center orange">
      <p className="me-3 mb-0 fs-6 text-bold">If this is not you...</p>{" "}
      <Button
        sx={{
          bgcolor: "var(--clr-primary)",
          color: "#fff",
          lineHeight: 1,
          py: "0.6em",
        }}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
};

export default LogoutUser;
