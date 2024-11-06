import PromosTable from "../../../components/admincomponents/promos/PromosTable";
import { useGetPromos } from "../../../hooks/useQueries/useAdmin";

const PromosHome = () => {
  const { data: promoData, isLoading } = useGetPromos();

  const promos = promoData?.promos;

  return (
    <>
      <PromosTable promos={promos} isLoading={isLoading} />
    </>
  );
};

export default PromosHome;
