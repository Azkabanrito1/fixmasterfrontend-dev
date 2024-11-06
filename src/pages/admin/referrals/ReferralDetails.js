import React from "react";
import {
  BackBtn,
  Grid,
  GroupHeading,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import { useGetAllreferralSettingRecords } from "../../../hooks/useQueries/useAdmin";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import { useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";

const ReferralDetails = () => {
  const { id } = useParams();

  const { data: recordsData, isLoading } = useGetAllreferralSettingRecords();
  const referral = recordsData?.data?.find((record) => record.id === +id);

  const textTransform = function (str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <>
      <div className="mb-3">
        <BackBtn />
        <PageHeading>Referral Records Details</PageHeading>
      </div>
      <GlobalBallBeat loading={isLoading} />

      <div
        style={{
          border: "1px solid black",
          paddingLeft: "1rem",
          paddingTop: "1rem",
          marginTop: "1rem",
        }}
      >
        <GroupHeading className="pt-3 ps-2">Referred By</GroupHeading>
        <div>
          <Grid columns="4" gap="0px" className="mb-4">
            <div>
              <h3>Name</h3>
              <span className="d-block">
                {textTransform(referral?.referredBy)}
              </span>
            </div>

            <div>
              <h3>Collaborator</h3>
              <span className="d-block">{referral?.refereeRole}</span>
            </div>

            <div>
              <h3>Amount Earned</h3>
              <span className="d-block">
                {referral?.amountEarnedByReferrer
                  ? referral?.amountEarnedByReferrer?.toLocaleString("en-NG", {
                      style: "currency",
                      currency: "NGN",
                    })
                  : "0"}
              </span>
            </div>
            <div>
              <h3>Referral Code</h3>
              <span className="d-block">{referral?.referralCode}</span>
            </div>
          </Grid>
        </div>
      </div>
      <div
        style={{
          border: "1px solid black",
          paddingLeft: "1rem",
          paddingTop: "1rem",
          marginTop: "1rem",
        }}
      >
        <GroupHeading className="pt-3 ps-2">Referee</GroupHeading>
        <div>
          <Grid columns="4" gap="0px" className="mb-4">
            <div>
              <h3>Name</h3>
              <span className="d-block">{referral?.referee}</span>
            </div>

            <div>
              <h3>Collaborator</h3>
              <span className="d-block">{referral?.referrerRole}</span>
            </div>

            <div>
              <h3>Date</h3>
              <span className="d-block">
                {format(parseISO(referral?.createDate), "dd/MM/yyyy")}
              </span>
            </div>
            <div>
              <h3>status</h3>
              <span className="d-block">{textTransform(referral?.status)}</span>
            </div>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default ReferralDetails;
