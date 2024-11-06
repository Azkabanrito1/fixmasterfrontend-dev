import { Star } from "../../globalcomponents/RatingStars";

const DashboardProfile = ({ profileData }) => {
  return (
    <div className="profile">
      <div className="image">
        <img src={profileData?.profilePicture || "/images/avatar.png"} alt="" />
      </div>
      <div>
        <h3>{profileData?.userName}</h3>
        <Star percent={profileData?.userRating * 20} />
      </div>
    </div>
  );
};

export default DashboardProfile;
