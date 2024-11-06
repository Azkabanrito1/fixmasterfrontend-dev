import { Link } from "react-router-dom";
import { PATH_ADMIN } from "../../../routes/paths";
import { BackBtn, PageHeading } from "../../globalcomponents/Utilities";
import BookingFeeTable from "./BookingFeeTable";
import { useGetJobBookingFee } from "../../../hooks/useQueries/useAdmin";
import { Button, Stack } from "@mui/material";

const JobBookingFees = () => {
  const { data: paramsData, isLoading } = useGetJobBookingFee();

  const newArray = paramsData?.data.map((el) => {
    return {
      id: el.id,
      fixClass:
        el.fixClass === 2
          ? "Installation"
          : el.fixClass === 3
          ? "Maintenace"
          : el.fixClass === 4
          ? "Repair"
          : "",
      fixCategory:
        el.fixCategory === 1
          ? "Refrigerators and Coolants"
          : el.fixCategory === 2
          ? "Electricals"
          : el.fixCategory === 3
          ? "Plumbing"
          : el.fixCategory === 4
          ? "Mechanic"
          : "",
      fixType:
        el.fixType === 2
          ? "Standard"
          : el.fixType === 4
          ? "Out of Hours"
          : el.fixType === 7
          ? "Emergency"
          : "",
      applicableFee: el.applicableFee,
      status: el.status,
    };
  });

  return (
    <>
      <div>
        <BackBtn />
        <Stack direction={{ xs: "column", sm: "row" }} alignItems={"center"}>
          <PageHeading className="text-capitalize me-auto mx-auto">
            Job Booking Fee
          </PageHeading>
          <Button
            sx={{
              bgcolor: "var(--clr-primary)",
            }}
          >
            <Link
              to={`${PATH_ADMIN.createBookingFee}`}
              style={{
                color: "#fff ",
                textDecoration: "none",
              }}
            >
              New Booking Fee
            </Link>
          </Button>
        </Stack>
      </div>

      <BookingFeeTable bookingFeeParam={newArray} loading={isLoading} />
    </>
  );
};

export default JobBookingFees;
