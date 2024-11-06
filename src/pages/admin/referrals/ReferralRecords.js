import { format, parseISO } from "date-fns";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import { Chip } from "@mui/material";
import { useGetAllreferralSettingRecords } from "../../../hooks/useQueries/useAdmin";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import { useNavigate } from "react-router-dom";

const ReferralRecords = () => {
  const { data: recordsData, isLoading } = useGetAllreferralSettingRecords();

  const navigate = useNavigate();

  const textTransform = function (str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  const columns = [
    {
      name: "s/n",
      label: "S/N",
      options: {
        customBodyRender: (_, index) => index.rowIndex + 1,
      },
    },
    {
      name: "referee",
      label: "Referee",
    },
    {
      name: "referredBy",
      label: "Referred by",
      options: {
        customBodyRender: (value) => textTransform(value),
      },
    },
    {
      name: "amountEarnedByReferrer",
      label: "Amount Earned By Referrer",
      options: {
        customBodyRender: (value) => {
          const amount = value
            ? value?.toLocaleString("en-NG", {
                style: "currency",
                currency: "NGN",
              })
            : "0";
          return <div>{amount}</div>;
        },
      },
    },
    {
      name: "createDate",
      label: "Date created",
      options: {
        customBodyRender: (value) =>
          !!value && format(parseISO(value), "dd/MM/yyyy"),
      },
    },
    {
      name: "status",
      label: "Status",
      options: {
        customBodyRender: (value) => (
          <Chip
            label={
              value?.toLowerCase() === "pending"
                ? "Pending"
                : value?.toLowerCase() === "completed"
                ? "Completed"
                : null
            }
            color={value?.toLowerCase() === "pending" ? "warning" : "success"}
          />
        ),
      },
    },
    {
      name: "id",
      label: "Action",
      options: {
        customBodyRender: (value) => {
          const actions = [
            {
              id: 0,
              name: "View",
              action: () => {
                navigate(`../referrals-records/${value}`);
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
    <>
      <div className="mb-3">
        <BackBtn />
        <PageHeading>Referral Records</PageHeading>
      </div>
      <GlobalBallBeat loading={isLoading} />
      <GlobalTable data={recordsData?.data} columns={columns} />
    </>
  );
};

export default ReferralRecords;
