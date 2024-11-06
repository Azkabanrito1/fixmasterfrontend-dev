import React, { useState } from "react";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import JobCards, {
  CardContainer,
  CardHead,
  CardBody,
  Value,
} from "../../../components/franchiseecomponents/dashboardcomponents/JobCards";
import CseJobDetails from "./CseJobDetails";
import { JobContainer } from "../dashboard/JobManagement";
import styled from "styled-components";
import { Star } from "../../../components/globalcomponents/RatingStars";
import { cseData, cseRatingData } from "../../../utils/chartData";
import BarChart from "../../../components/charts/BarChart";
import LineChart from "../../../components/charts/LineChart";
import RadarChart from "../../../components/charts/RadarChart";
import { useParams } from "react-router-dom";

const CseAnalysisReport = () => {
  const maxEarning = Math.max(...cseData.map((cse) => cse.earning));
  const minEarning = Math.min(...cseData.map((cse) => cse.earning));
  const [isJobDetailsOpen, setIsJobDetailsOpen] = useState(false);
  const [jobDetailTitle, setJobDetailTitle] = useState("");
  const [earningData, setEarningData] = useState({
    labels: cseData.map((cse) => cse.month),
    datasets: [
      {
        label: "Earning per Month",
        data: cseData.map((cse) => cse.earning),
        borderWidth: 1,
        backgroundColor: ["rgba(242, 98, 34, 0.7)"],
      },
    ],
    options: {
      responsive: true,
      scales: {
        y: {
          max: maxEarning + 5000,
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Earning per month",
        },
        legend: {
          display: false,
        },
      },
    },
  });

  const [ratingData, setRatingData] = useState({
    labels: cseData.map((cse) => cse.month),
    datasets: [
      {
        label: "Ratings per Month",
        data: cseData.map((cse) => cse.rating),
        borderWidth: 3,
        borderColor: "rgba(242, 98, 34, 0.2)",
        backgroundColor: ["var(--clr-primary)"],
      },
    ],
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Ratings per Month",
        },
        legend: {
          display: false,
        },
      },
    },
  });

  const [ratingBreakdown, setRatingBreakdown] = useState({
    labels: cseRatingData.map((rating) => rating.name),
    datasets: [
      {
        label: "",
        data: cseRatingData.map((rating) => rating.rating),
        borderWidth: 3,
        borderColor: "var(--clr-primary)",
        backgroundColor: ["rgba(242, 98, 34, 0.2)"],
      },
    ],
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: "Ratings Chart",
        },
        legend: {
          display: false,
        },
      },
      scales: {
        r: {
          max: 5,
          suggestedMin: 2,
          beginAtZero: true,
          angleLines: {
            color: "#111",
          },
          ticks: {
            stepSize: 0.5,
          },
        },
      },
    },
  });

  let { id } = useParams();

  const jobStatus = {
    ongoing: {
      title: "Ongoing Jobs",
      text: "Total Ongoing Jobs",
      img: "/images/ongoing.png",
      ref: "ongoing",
      color: "#7B61FF",
    },
    warranty: {
      title: "Warranty Claims",
      text: "Total Warranty Claims",
      img: "/images/warranty-jobs.png",
      ref: "warranty",
      color: "var(--clr-primary)",
    },
    completed: {
      title: "Completed Jobs",
      text: "Total Completed Jobs",
      img: "/images/completed.png",
      ref: "completed",
      color: "#11E981",
    },
    rejected: {
      title: "Rejected Jobs",
      text: "Total Rejected jobs",
      img: "/images/rejected.png",
      ref: "rejected",
      color: "#E01B1B",
    },
  };

  const jobCardClick = (text) => {
    setJobDetailTitle(text);
    setIsJobDetailsOpen(true);
  };

  const noOfJobs = {
    ongoing: 10,
    warranty: 15,
    completed: 4,
    rejected: 1,
  };

  const jobsTemplate = Object.keys(jobStatus).map((status) => {
    return (
      <JobCards
        key={jobStatus[status].title}
        title={jobStatus[status].title}
        text={jobStatus[status].text}
        img={jobStatus[status].img}
        color={jobStatus[status].color}
        linkText={`View CSE ${jobStatus[status].title}`}
        Value={noOfJobs[jobStatus[status].ref]}
        handleCardClick={() => jobCardClick(jobStatus[status].title)}
      />
    );
  });

  return (
    <>
      <div style={{ marginBottom: "3rem" }}>
        <PageHeading>CSE ANALYSIS REPORT</PageHeading>
        <BackBtn />
      </div>

      <JobContainer>
        <CardContainer>
          <AccountInfo>
            <div className="image">
              <img src="/images/avatar.png" alt="" />
            </div>
            <div className="info">
              <h2 className="name">John Doe</h2>
              <div className="rating">
                <Star percent="68" size="35px" />
              </div>
            </div>
          </AccountInfo>
        </CardContainer>
        {jobsTemplate}
        <CardContainer>
          <CardHead>
            <h3>Total Jobs</h3>
          </CardHead>

          <CardBody>
            <div>
              <img src="/images/total-jobs.png" alt="" />
            </div>
            <div>
              <div>Total Jobs</div>
              <Value clr="var(--clr-primary)">
                {Object.values(noOfJobs).reduce((a, b) => a + b)}
              </Value>
            </div>
          </CardBody>
        </CardContainer>
      </JobContainer>

      <EarningData>
        <div>
          <BarChart chartData={earningData} options={earningData.options} />
        </div>
        <EarningSummary>
          <div>
            <h4>Earning %/Job</h4>
            <span className="value">5%</span>
          </div>
          <div>
            <h4>Net cseData</h4>
            <span className="value">
              {cseData
                .map((earning) => earning.earning)
                .reduce((a, b) => a + b, 0)}
            </span>
          </div>
          <div>
            <h4>Highest Amount Earned</h4>
            <span className="value">{maxEarning}</span>
          </div>
          <div>
            <h4>Lowest Amount Earned</h4>
            <span className="value">{minEarning}</span>
          </div>
          <div>
            <h4>Earning Margin</h4>
            <span className="value">
              {Math.max(...cseData.map((cse) => cse.earning)) -
                Math.min(...cseData.map((cse) => cse.earning))}
            </span>
          </div>
        </EarningSummary>
      </EarningData>

      <RatingData>
        <LineChart chartData={ratingData} options={ratingData.options} />
      </RatingData>

      <RatingBreakdown>
        <RadarChart
          chartData={ratingBreakdown}
          options={ratingBreakdown.options}
        />
      </RatingBreakdown>

      {isJobDetailsOpen && (
        <CseJobDetails
          isOpen={isJobDetailsOpen}
          closeModal={() => setIsJobDetailsOpen(false)}
          title={jobDetailTitle}
        />
      )}
    </>
  );
};

export default CseAnalysisReport;

const EarningData = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
`;

const EarningSummary = styled.div`
  border-radius: 1rem;
  background-color: #fff;

  div {
    padding: 1rem;

    &:not(:last-child) {
      border-bottom: 1px dashed var(--clr-primary);
    }
  }

  h4 {
    margin-bottom: 0.8rem;
  }

  .value {
    font-weight: bold;
    color: var(--clr-primary);
    font-size: 1.2rem;
  }
`;

const RatingData = styled.div`
  margin-top: 3rem;
`;

const RatingBreakdown = styled.div`
  margin-top: 3rem;
  width: max(70%, 400px);
  margin-inline: auto;
`;

const AccountInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 100%;

  .image {
    width: 25%;
  }

  .name {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  img {
    max-width: 100%;
  }
`;
