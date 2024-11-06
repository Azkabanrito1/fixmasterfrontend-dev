import { Link, useNavigate } from "react-router-dom";
import { PageHeading } from "../../../components/globalcomponents/Utilities";
import { PATH_ADMIN } from "../../../routes/paths";
import { useGetDiscounts } from "../../../hooks/useQueries/useAdmin";
import DiscountTable from "../../../components/admincomponents/discounts/DiscountTable";
import { Stack } from "@mui/material";

const Discounts = () => {
  const navigate = useNavigate();
  const { data: discountsData, isLoading } = useGetDiscounts();

  const discounts = discountsData?.discounts;

  const editDiscount = (id) => navigate(`${PATH_ADMIN.editDiscounts}/${id}`);
  const deactivateDiscount = (id) => console.log("deactivated");

  return (
    <Stack>
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">
        <PageHeading className="mb-0">Discounts</PageHeading>
        <Link
          to={`${PATH_ADMIN.createDiscounts}`}
          className="btn"
          style={{ backgroundColor: "var(--clr-primary)", color: "#fff " }}
          width="max-content"
          px="1em"
        >
          Setup Discount
        </Link>
      </div>

      <DiscountTable
        editDiscount={editDiscount}
        deactivateDiscount={deactivateDiscount}
        discounts={discounts}
        isLoading={isLoading}
      />
    </Stack>
  );
};

export default Discounts;
