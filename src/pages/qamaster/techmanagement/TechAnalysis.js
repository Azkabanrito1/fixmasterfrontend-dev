import { useState } from "react";
import JobCards, {
  CardContainer,
  CardHead,
  CardBody,
  Value,
} from "../../../components/franchiseecomponents/dashboardcomponents/JobCards";
import { PageHeading } from "../../../components/globalcomponents/Utilities";
import { BackBtn } from "../../../components/globalcomponents/Utilities";
import styled from "styled-components";
import { Star } from "../../../components/globalcomponents/RatingStars";
import { JobContainer } from "../../franchisee/dashboard/JobManagement";
import BarChart from "../../../components/charts/BarChart";
import LineChart from "../../../components/charts/LineChart";
import { techRatingData } from "../../../utils/techChartData";
import RadarChart from "../../../components/charts/RadarChart";
import { useParams } from "react-router-dom";
import {
  useGetTechnicianFixAnalysis,
  useGetTechnicianRating,
} from "../../../hooks/useQueries/useAdmin";
import { timeFilters } from "../../../utils/selectOptions";
import { months } from "../../../utils/selectOptions";
import { useEffect } from "react";

const TechAnalysis = () => {
  const [isJobDetailsOpen, setIsJobDetailsOpen] = useState(false);
  const [jobDetailTitle, setJobDetailTitle] = useState("");
  const { userId } = useParams();
  const [uploadedImg, setUploadedImg] = useState({
    id: "",
    url: "",
  });

  //fetching data
  const { data: fixData } = useGetTechnicianFixAnalysis(userId);
  const { data: ratingsData } = useGetTechnicianRating(userId);
  // console.log(ratingsData?.data?.map((item) => console.log(item)));

  useEffect(() => {
    if (fixData?.data?.technicianPicture) {
      setUploadedImg({
        url: fixData?.data?.technicianPicture,
      });
    }
  }, [fixData?.data?.technicianPicture]);

  const maxEarning = Math.max(...techRatingData.map((tech) => tech.earning));
  const minEarning = Math.min(...techRatingData.map((tech) => tech.earning));
  const earningData = {
    labels: techRatingData.map((tech) => tech.month),
    datasets: [
      {
        label: "Earning per Month",
        data: techRatingData.map((tech) => tech.earning),
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
  };

  const ratingDetails = {
    labels: ratingsData?.data?.map((item) => months[item.month - 1].name),
    datasets: [
      {
        label: "Ratings per Month",
        data: ratingsData?.data?.map((tech) => tech.ratingPerMonth),
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
  };

  // console.log(ratingDetails);

  const ratingBreakdown = {
    labels: techRatingData?.map((rating) => rating.name),
    datasets: [
      {
        label: "",
        data: techRatingData.map((rating) => rating.ratingPerMonth),
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
  };

  const accountSummary = {
    ongoingEarning: {
      totalDaily: fixData?.data?.ongoingJobs[0]?.total_count,
      totalWeek: fixData?.data?.ongoingJobs[1]?.total_count,
      totalMonth: fixData?.data?.ongoingJobs[2]?.total_count,
      totalYear: fixData?.data?.ongoingJobs[3]?.total_count,
    },
    warranty: {
      totalDaily: 0,
      totalWeek: 0,
      totalMonth: 0,
      totalYear: 0,
    },
    completed: {
      totalDaily: fixData?.data?.completedJobs[0]?.total_count,
      totalWeek: fixData?.data?.completedJobs[1]?.total_count,
      totalMonth: fixData?.data?.completedJobs[2]?.total_count,
      totalYear: fixData?.data?.completedJobs[3]?.total_count,
    },
    rejected: {
      totalDaily: fixData?.data?.rejectedJobs[0]?.total_count,
      totalWeek: fixData?.data?.rejectedJobs[1]?.total_count,
      totalMonth: fixData?.data?.rejectedJobs[2]?.total_count,
      totalYear: fixData?.data?.rejectedJobs[3]?.total_count,
    },
  };

  const jobStatus = {
    ongoing: {
      title: "Ongoing Jobs",
      text: "Total Ongoing Jobs",
      img: "/images/ongoing.png",
      ref: "ongoing",
      color: "#7B61FF",
      values: accountSummary?.ongoingEarning,
      filters: [{ type: "time", details: timeFilters }],
    },
    warranty: {
      title: "Warranty Claims",
      text: "Total Warranty Claims",
      img: "/images/warranty-jobs.png",
      ref: "warranty",
      color: "var(--clr-primary)",
      values: accountSummary?.warranty,
      filters: [{ type: "time", details: timeFilters }],
    },
    completed: {
      title: "Completed Jobs",
      text: "Total Completed Jobs",
      img: "/images/completed.png",
      ref: "completed",
      color: "#11E981",
      values: accountSummary?.completed,
      filters: [{ type: "time", details: timeFilters }],
    },
    rejected: {
      title: "Rejected Jobs",
      text: "Total Rejected jobs",
      img: "/images/rejected.png",
      ref: "rejected",
      color: "#E01B1B",
      values: accountSummary?.rejected,
      filters: [{ type: "time", details: timeFilters }],
    },
  };
  const jobCardClick = (text) => {
    setJobDetailTitle(text);
    setIsJobDetailsOpen(true);
  };

  const jobsTemplate = Object.keys(jobStatus).map((status) => {
    return (
      <JobCards
        key={jobStatus[status].title}
        title={jobStatus[status].title}
        text={jobStatus[status].text}
        img={jobStatus[status].img}
        color={jobStatus[status].color}
        filters={jobStatus[status].filters}
        values={jobStatus[status].values}
        link={jobStatus[status].ref}
        linkText={`View Technician ${jobStatus[status].title}`}
        handleCardClick={() => jobCardClick(jobStatus[status].title)}
      />
    );
  });

  return (
    <div style={{ backgroundColor: "#f2f2f2" }}>
      <div style={{ marginBottom: "3rem" }}>
        <PageHeading>Technician Analysis Report</PageHeading>
        <BackBtn />
      </div>

      <JobContainer>
        <CardContainer>
          <AccountInfo>
            <div className="image">
              <img
                src={fixData?.data?.technicianPicture || "/images/avatar.png"}
                alt=""
              />
            </div>
            <div className="info">
              <h2 className="name">{fixData?.data?.technicianName}</h2>
              <div className="rating">
                <Star percent={fixData?.data?.rating * 20} size="35px" />
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
              <Value clr="var(--clr-primary)">{fixData?.data?.jobCount}</Value>
            </div>
          </CardBody>
        </CardContainer>
      </JobContainer>

      <RatingData>
        <LineChart chartData={ratingDetails} options={ratingDetails.options} />
      </RatingData>

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
              {/* {techData
                .map((earning) => earning.earning)
                .reduce((a, b) => a + b, 0)} */}
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
              {/* {Math.max(...techData.map((tech) => tech.earning)) -
                Math.min(...techData.map((tech) => tech.earning))} */}
            </span>
          </div>
        </EarningSummary>
      </EarningData>

      <RatingBreakdown>
        {/* <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"100%"}
          height={"400px"}
        /> */}
        <RadarChart
          chartData={ratingBreakdown}
          options={ratingBreakdown.options}
        />
      </RatingBreakdown>
    </div>
  );
};

export default TechAnalysis;

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
