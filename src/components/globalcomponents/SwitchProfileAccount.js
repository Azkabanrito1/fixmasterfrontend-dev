import { useSnackbar } from "notistack";
import { useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import GlobalBtn from "./GlobalBtn";
import {
  useGetUserProfile,
  useSwitchAccount,
} from "../../hooks/useQueries/useIdentity";
import { logout } from "../../redux/auth/actions";

const SwitchProfileAccount = ({ role, isDefault }) => {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSwitchSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    dispatch(logout());
    queryClient.clear();
    navigate("/login");
  };

  const onSwitchFailure = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };

  const { mutate: switchAccount } = useSwitchAccount(
    onSwitchSuccess,
    onSwitchFailure
  );
  const { data: userData } = useGetUserProfile();

  const user = userData?.user;

  const switchUserProfile = () => switchAccount(role);

  return (
    <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-3">
      <div style={{ gap: "1rem" }} className="d-flex align-items-center">
        <div
          style={{
            width: "60px",
            aspectRatio: 1,
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          <img
            width={"100%"}
            height={"100%"}
            style={{ objectFit: "cover" }}
            src={user?.profilePictureUrl || "/images/avatar.png"}
            alt="profile"
          />
        </div>
        <div>
          <span className="name d-block">{`${user?.firstName} ${user?.lastName}`}</span>
          <span className="text-muted d-block" style={{ fontSize: ".8rem" }}>
            {role}
          </span>
        </div>
      </div>
      <>
        {isDefault ? (
          <span className="fw-bold" style={{ color: "var(--clr-primary)" }}>
            Default
          </span>
        ) : (
          <GlobalBtn
            color="#fff"
            bgColor="var(--clr-primary)"
            width="max-content"
            fs="0.9rem"
            py="0.5em"
            px="0.8em"
            onClick={switchUserProfile}
          >
            Make Default
          </GlobalBtn>
        )}
      </>
    </div>
  );
};

export default SwitchProfileAccount;
