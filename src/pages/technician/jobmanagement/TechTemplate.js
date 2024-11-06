import React from "react";
import { useGetTechOngoingJobs } from "../../../hooks/useQueries/useJobs";
import { Outlet, useParams } from "react-router-dom";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";

const TechTemplate = () => {
  const { data: ongoingJobs } = useGetTechOngoingJobs();
  const { fixId } = useParams();
  const ongoingJob = ongoingJobs?.data?.filter((job) => {
    return job.fixId === Number(fixId);
  });

  return (
    <>
      <div className="mb-5">
        <PageHeading>Ongoing Jobs</PageHeading>
        <BackBtn />
      </div>
      <Outlet context={{ jobDetails: ongoingJob || [] }} />
    </>
  );
};

export default TechTemplate;
