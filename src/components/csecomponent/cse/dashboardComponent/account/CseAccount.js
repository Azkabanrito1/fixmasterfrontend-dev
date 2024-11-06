import { useNavigate } from "react-router-dom";
import GlobalBtn from "../../../../globalcomponents/GlobalBtn";
import { StyledAccount } from "../dasboard/StyleComponent";
import { Star } from "../../../../globalcomponents/RatingStars";

const CseAccount = ({ accountData }) => {
  const navigate = useNavigate();
  return (
    <StyledAccount>
      <div>
        <div className="profile">
          <div className="image">
            <img
              src={accountData?.profilePicture || "/images/avatar.png"}
              alt=""
            />
          </div>
          <div>
            <h3> {accountData?.userName} </h3>
            <Star percent={accountData?.userRating * 20} />
          </div>
        </div>

        <div className="stats">
          <div style={{ gap: "60px" }}>
            <h4>Jobs Done: </h4>
            <span>{accountData?.totalBookedJobs}</span>
          </div>
          <div>
            <h4>Referrals: </h4>
            {accountData?.accountSubScription?.length && (
              <span>{accountData?.accountSubScription[0].shortName}</span>
            )}
          </div>
        </div>
      </div>

      <div className="account" style={{ height: "150px", width: "200px" }}>
        <span className="balance">{accountData?.walletBalance}</span>
        <div style={{ marginTop: "60px" }}>
          <GlobalBtn
            fs="0.9rem"
            px="1.8em"
            py="0.6em"
            width="max-content"
            height="auto"
            onClick={() => navigate("/account")}
          >
            Withdraw
          </GlobalBtn>
        </div>
      </div>
    </StyledAccount>
  );
};

export default CseAccount;
