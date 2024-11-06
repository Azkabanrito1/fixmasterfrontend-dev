import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AssignmentHeader, AssignmentContainer } from "./DashboardHomeSection";
import TerritoryHealthCards from "./TerritoryHealthCards";
import { CardContainer } from "./JobCards";
import { Star } from "../../globalcomponents/RatingStars";
import {
  cseFilters,
  customerFilters,
  jobFilters,
  timeFilters,
} from "../../../utils/selectOptions";

const TerritoryHealth = ({ dashboardData, collaboratorRole }) => {
  const navigate = useNavigate();

  const newJobs = {
    totalDay: dashboardData?.newJobsToday,
    totalWeek: dashboardData?.newJobsThisWeek,
    totalMonth: dashboardData?.newJobsThisMonth,
    totalYear: dashboardData?.newJobsThisYear,
  };
  const ongoingJobs = {
    totalDay: dashboardData?.ongoingJobsToday,
    totalWeek: dashboardData?.ongoingJobsThisWeek,
    totalMonth: dashboardData?.ongoingJobsThisMonth,
    totalYear: dashboardData?.ongoingJobsThisYear,
  };
  const warrantyJobs = {
    totalDay: dashboardData?.warrantyJobsToday,
    totalWeek: dashboardData?.warrantyJobsThisWeek,
    totalMonth: dashboardData?.warrantyJobsThisMonth,
    totalYear: dashboardData?.warrantyJobsThisYear,
  };
  const completedJobs = {
    totalDay: dashboardData?.completedJobsToday,
    totalWeek: dashboardData?.completedJobsThisWeek,
    totalMonth: dashboardData?.completedJobsThisMonth,
    totalYear: dashboardData?.completedJobsThisYear,
  };

  const territoryRevenue = {
    totalDay: dashboardData?.territoryRevenueToday,
    totalWeek: dashboardData?.territoryRevenueThisWeek,
    totalMonth: dashboardData?.territoryRevenueThisMonth,
    totalYear: dashboardData?.territoryRevenueThisYear,
  };

  const franchiseeRevenue = {
    totalDay: dashboardData?.franchiseeRevenueToday,
    totalWeek: dashboardData?.franchiseeRevenueThisWeek,
    totalMonth: dashboardData?.franchiseeRevenueThisMonth,
    totalYear: dashboardData?.franchiseeRevenueThisYear,
  };

  const territoryCSEs = dashboardData?.territoryCSEs?.map((cses) => {
    if (cses.cseStatus.toLowerCase() === "active cse") {
      return { totalCSEs: cses.cseCount };
    }
  });

  const territoryCustomers = dashboardData?.territoryCustomers?.map((cus) => {
    if (cus.categoryName.toLowerCase() === "regular customer") {
      return { regular: cus.customerCount };
    }
    if (cus.categoryName.toLowerCase() === "estate customer") {
      return { estate: cus.customerCount };
    }
  });

  const territoryJobs = {
    territoryNewJobs: newJobs,
    territoryOngoingJobs: ongoingJobs,
    territoryWarrantyJobs: warrantyJobs,
    territoryCompletedJobs: completedJobs,
  };

  const healthStatus = [
    {
      title: "Jobs",
      text: "Total Territory Jobs",
      img: "/images/unassigned.png",
      ref: "job-management",
      color: "#FF9B04",
      filters: [jobFilters, timeFilters],
      values: territoryJobs,
    },
    {
      title: "Revenue",
      text: "Total Territory Revenue",
      img: "/images/ongoing.png",
      ref: "account",
      color: "#7B61FF",
      filters: [timeFilters],
      values: territoryRevenue,
    },
    {
      title: "Customers",
      text: "Total Territory Customers",
      img: "/images/warranty-jobs.png",
      ref: "commercial-customers",
      color: "var(--clr-primary)",
      filters: [customerFilters],
      values: { ...territoryCustomers?.[0] },
    },
    {
      title: "CSEs",
      text: "Total Active CSEs",
      img: "/images/completed.png",
      ref: "cse-managed",
      color: "#11E981",
      filters: [cseFilters],
      values: { ...territoryCSEs?.[0] },
    },
    {
      title: "Income",
      text: "My Income",
      img: "/images/rejected.png",
      ref: "wallet",
      color: "#E01B1B",
      filters: [timeFilters],
      values: franchiseeRevenue,
    },
  ];

  const healthTemplate = healthStatus.map((status) => {
    return (
      <TerritoryHealthCards
        key={status.title}
        title={status.title}
        text={status.text}
        img={status.img}
        color={status.color}
        filters={status.filters}
        values={status.values}
        handleCardClick={() => navigate(`/franchisee/${status.ref}`)}
      />
    );
  });

  return (
    <AssignmentContainer>
      <AssignmentHeader>
        <h2>Territory Health</h2>
      </AssignmentHeader>
      <JobCardContainers>
        <CardContainer>
          <Account>
            <div className="image">
              <img
                src={dashboardData?.profilePictureUrl || "/images/avatar.png"}
                alt=""
              />
            </div>
            <div className="info">
              <h2 className="fs-5 text-start">{dashboardData?.userName}</h2>
              <span className="fs-6 text-muted">{collaboratorRole}</span>
              <div className="rating">
                <Star percent={dashboardData?.userRating} size="25px" />
              </div>
            </div>
          </Account>
        </CardContainer>
        {healthTemplate}
      </JobCardContainers>
    </AssignmentContainer>
  );
};

export default TerritoryHealth;

const Account = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 100%;

  .image {
    width: 35%;
    aspect-ratio: 1;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      max-height: 100%;
      object-fit: cover;
    }
  }

  .name {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .info {
    display: grid;
    grid-template: row;
  }

  img {
    max-width: 100%;
  }
`;

const JobCardContainers = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
`;
