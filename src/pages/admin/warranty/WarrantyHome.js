import WarrantyTable from "../../../components/admincomponents/warranty/WarrantyTable";
import { useGetAllWarranty } from "../../../hooks/useQueries/useAdmin";

const AdminWarrantyHome = () => {
  const { data: warrantyData } = useGetAllWarranty();

  const warranties = warrantyData?.warranties?.reverse();

  return <WarrantyTable warranties={warranties} />;
};

export default AdminWarrantyHome;
