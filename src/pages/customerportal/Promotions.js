import {
  BackBtn,
  PageHeading,
} from "../../components/globalcomponents/Utilities";
import { useLocation, useOutletContext } from "react-router-dom";
import { InfoTable } from "../../components/globalcomponents/Utilities";
import moment from "moment";
import { Button, Stack } from "@mui/material";
import { useGetPromotions } from "../../hooks/useQueries/useIdentity";
import { format } from "date-fns";
import GlobalBallBeat from "../../components/globalcomponents/GlobalBallBeat";
import GlobalTable from "../../components/globalcomponents/GlobalTable";

function Promotions() {
  const { data: promotionsData, isLoading } = useGetPromotions();
  const { openBookaFix, setPromoId } = useOutletContext();

  const promotions = promotionsData?.data;

  const columns = [
    {
      name: "title",
      label: "Promo Title",
    },
    {
      name: "description",
      label: "Discounts",
    },
    {
      name: "expiryDate",
      label: "Expiry Date",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "customerPromotionId",
      label: "Actions",
      options: {
        customBodyRender: (value) => (
          <Button
            onClick={() => {
              setPromoId(value);
              openBookaFix();
            }}
            sx={{ color: "var(--clr-primary)" }}
          >
            USE NOW
          </Button>
        ),
      },
    },
  ];

  return (
    <>
      <div className="mb-5">
        <BackBtn />
        <PageHeading>Promotions</PageHeading>
      </div>

      <GlobalBallBeat loading={isLoading} />

      {!isLoading && promotions?.length > 0 && (
        <GlobalTable columns={columns} data={promotions} />
      )}

      {!isLoading && promotions?.length === 0 && (
        <Stack flex={1} justifyContent={"center"} alignItems={"center"}>
          <p className="fs-5 text-center">No promotions available</p>
        </Stack>
      )}
    </>
  );
}

export default Promotions;
