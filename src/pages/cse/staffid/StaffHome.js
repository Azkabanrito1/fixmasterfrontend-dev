import Staff from "../../../components/qamastercomponent/staff/Staff";
import { useGetUserIdCard } from "../../../hooks/useQueries/useIdentity";

const StaffHome = () => {
  const { data: staffData } = useGetUserIdCard();

  return <Staff staffData={staffData?.data} />;
};

export default StaffHome;
