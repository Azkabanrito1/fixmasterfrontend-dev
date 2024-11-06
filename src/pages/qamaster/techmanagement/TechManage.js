import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star } from "../../../components/globalcomponents/RatingStars";
import UpdateTechStatus from "../../../components/qamastercomponent/techmanagement/modal/UpdateTechStatus";
import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import { useGetAllTechnician } from "../../../hooks/useQueries/useAdmin";
import moment from "moment";
import { Chip, Stack } from "@mui/material";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import { BallBeat } from "react-pure-loaders";

const TechManage = () => {
  const [openUpdateStatus, setOpenUpdateStatus] = useState(false);
  const [techApplicant, setTechApplicant] = useState([]);

  //fetching data
  const { data: manageAllTech, isLoading } = useGetAllTechnician();

  const handleNavigation = (userId) => {
    navigate("../tech-analysis/" + userId);
  };
  const getApplicantUserId = (userId) =>
    manageAllTech?.data?.filter((tech) => tech.userId === userId);

  const handleUpdateStatus = (userId) => {
    setOpenUpdateStatus(true);
    const tech = getApplicantUserId(userId);
    setTechApplicant(tech);
  };
  const closeUpdateStatus = () => {
    setOpenUpdateStatus(false);
  };

  const navigate = useNavigate();

  // formatted user activities date

  const formatttedMovementDate = function (date) {
    const calcDaysPass = (date1, date2) =>
      Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

    const daysPass = calcDaysPass(new Date(), date);
    if (daysPass === 0) {
      return "Today";
    } else if (daysPass === 1) {
      return "Yesterday";
    } else if (daysPass <= 7) {
      return `${daysPass} days`;
    } else {
      const day = String(date?.getDate()).padStart(2, 0);
      const month = String(date?.getMonth() + 1).padStart(2, 0);
      const year = date?.getFullYear();
      return `${day}/${month}/${year}`;
    }
  };

  const managedColumns = [
    {
      name: "sn",
      label: "S/N",
      options: {
        customBodyRender: (_, tableMeta) => tableMeta.rowIndex + 1,
      },
    },
    {
      name: "userName",
      label: "Name",
    },
    {
      name: "rating",
      label: "Ratings",
      options: {
        customBodyRender: (value) => <Star percent={value * 20} />,
      },
    },

    {
      name: "lastActivity",
      label: "Last Activity",
      options: {
        customBodyRender: (value) => {
          // formatttedMovementDate(value);
          const lastActivity = moment(value);
          if (lastActivity.isSame(new Date(), "day")) {
            return lastActivity.startOf("hour").fromNow();
          }

          return lastActivity.startOf("day").fromNow();
        },
      },
    },
    {
      name: "roleStatus",
      label: "Status",
      options: {
        customBodyRender: (value) => (
          <Chip
            label={value}
            color={
              value.trim().toLowerCase() === "active"
                ? "success"
                : value.trim().toLowerCase() === "suspended"
                ? "info"
                : value.trim().toLowerCase() === "dormant"
                ? "warning"
                : "error"
            }
          />
        ),
      },
    },

    {
      name: "userId",
      label: "Action",
      options: {
        customBodyRender: (value) => {
          const actions = [
            {
              id: 1,
              name: "View Analysis Report",
              action: () => {
                handleNavigation(value);
              },
              disabled: true,
            },
            {
              id: 1,
              name: "Update Tech Status",
              action: () => {
                handleUpdateStatus(value);
              },
              disabled: false,
            },
          ];
          return <GlobalTableActions actions={actions} id="id" />;
        },
      },
    },
  ];

  return (
    <div>
      <PageHeading>Technicians Managed</PageHeading>
      <BackBtn />
      <div style={{ textAlign: "center" }}>
        <BallBeat isLoading={isLoading} color="var(--clr-primary)" />
      </div>
      {!isLoading && manageAllTech?.data?.length > 0 && (
        <GlobalTable
          columns={managedColumns}
          data={manageAllTech?.data}
          options={{
            elevation: 0,
            selectableRows: "none",
            rowsPerPage: 20,
            rowsPerPageOptions: [20, 50, 100],
          }}
        />
      )}
      {!isLoading && manageAllTech?.data?.data?.length === 0 && (
        <Stack flex={1} justifyContent={"center"} alignItems={"center"}>
          <p className="fs-5 text-center">No Technician is Managed</p>
        </Stack>
      )}
      {setOpenUpdateStatus && (
        <UpdateTechStatus
          isOpen={openUpdateStatus}
          closeModal={closeUpdateStatus}
          techApplicant={techApplicant}
        />
      )}
    </div>
  );
};

export default TechManage;
