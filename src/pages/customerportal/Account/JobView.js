import styled from "styled-components";
import { getUserDashboard } from "../../../redux/user/actions";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as MdIcons from "react-icons/md";
import BookingHistory from "./BookingHistory";
import AccountHistory from "./AccountHistory";

const styleArrDown = {
  width: "20px",
  height: "20px",
  color: "#676767",
  marginTop: "3px",
  cursor: "pointer",
  marginLeft: "10px",
};
const styleArrRight = {
  width: "20px",
  height: "40px",
  color: "#ffffff",
  marginTop: "3px",
};
const styleArrRightOv = {
  width: "20px",
  height: "40px",
  color: "#000000",
  marginTop: "3px",
};
const JobView = () => {
  const { jobSummary = {} } = useSelector((state) => state.user);
  const { transactionSummary = {} } = useSelector((state) => state.user);
  const [weekJobs, setWeekJobs] = useState(false);
  const [monthJobs, setMonthJobs] = useState(true);
  const [yearJobs, setYearJobs] = useState(false);
  const [dropDownJobs, setDropDownJobs] = useState(false);
  const [weekTrans, setWeekTrans] = useState(false);
  const [monthTrans, setMonthTrans] = useState(true);
  const [bookOpen, setBookOpen] = useState(false);
  const [openTransaction, setOpenTansaction] = useState(false);
  const [yearTrans, setYearTrans] = useState(false);
  const [dropDownTrans, setDropDownTrans] = useState(false);
  const [userDashboard, setUserDashboard] = useState({});
  const [size, setSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight,
  });
  const dispatch = useDispatch();

  const updateSize = () =>
    setSize({
      x: window.innerWidth,
      y: window.innerHeight,
    });
  useEffect(() => (window.onresize = updateSize), []);
  const displayWeekTotal = () => {
    setWeekJobs(true);
    setMonthJobs(false);
    setYearJobs(false);
    showDropDownJobs();
  };
  const displayMonthTotal = () => {
    setMonthJobs(true);
    setWeekJobs(false);
    setYearJobs(false);
    showDropDownJobs();
  };
  const displayYearTotal = () => {
    setYearJobs(true);
    setWeekJobs(false);
    setMonthJobs(false);
    showDropDownJobs();
  };

  const showDropDownJobs = () => {
    setDropDownJobs(!dropDownJobs);
  };

  //Transaction
  const displayWeekTrans = () => {
    setWeekTrans(true);
    setMonthTrans(false);
    setYearTrans(false);
    showDropDownTrans();
  };
  const displayMonthTrans = () => {
    setMonthTrans(true);
    setWeekTrans(false);
    setYearTrans(false);
    showDropDownTrans();
  };
  const displayYearTrans = () => {
    setYearTrans(true);
    setWeekTrans(false);
    setMonthTrans(false);
    showDropDownTrans();
  };

  const showDropDownTrans = () => {
    setDropDownTrans(!dropDownTrans);
  };
  const getUserDashboardData = async () => {
    const response = await dispatch(getUserDashboard());
    setUserDashboard(response);
  };

  useEffect(() => {
    getUserDashboardData();
  }, []);

  const handleClick = function () {
    setBookOpen(!bookOpen);
  };

  const handleTransaction = function () {
    setOpenTansaction(!openTransaction);
  };

  const { weekTotal, monthTotal, yearTotal } = jobSummary;
  const {
    totalWeekSpendings,
    totalMonthSpendings,
    totalYearSpendings,
    totalWeekEarnings,
    totalMonthEarnings,
    totalYearEarnings,
  } = transactionSummary;
  return (
    <JobOverview>
      <JobOverview>
        <Jobs>
          <JobsfirstColumn>
            <p>Jobs</p>
            <Month>
              <p>
                {(weekJobs && "Week") ||
                  (monthJobs && "Month") ||
                  (yearJobs && "Year")}
              </p>
              <MdIcons.MdOutlineKeyboardArrowDown
                style={styleArrDown}
                onClick={showDropDownJobs}
              />
              {dropDownJobs ? (
                <JobDropDown>
                  <h6 onClick={displayWeekTotal}>This Week</h6>
                  <h6 onClick={displayMonthTotal}>This Month</h6>
                  <h6 onClick={displayYearTotal}>This Year</h6>
                </JobDropDown>
              ) : null}
            </Month>
          </JobsfirstColumn>
          <TotalBookings>
            <img
              src="/images/chartSv.svg"
              alt=""
              style={{ paddingLeft: "1rem" }}
            />
            <Bookings>
              <p>Total bookings</p>
              <label>
                {(weekJobs && weekTotal) ||
                  (monthJobs && monthTotal) ||
                  (yearJobs && yearTotal)}
              </label>
            </Bookings>
          </TotalBookings>
          <ViewBooking onClick={handleClick}>
            <p>View Booking history</p>
            <MdIcons.MdOutlineKeyboardArrowRight style={styleArrRight} />
          </ViewBooking>
        </Jobs>

        <Overview>
          <OverviewfirstColumn>
            <p>Overview</p>
            <Month>
              <p>
                {(weekTrans && "Week") ||
                  (monthTrans && "Month") ||
                  (yearTrans && "Year")}
              </p>
              <MdIcons.MdOutlineKeyboardArrowDown
                style={styleArrDown}
                onClick={showDropDownTrans}
              />
              {dropDownTrans ? (
                <TransDropDown>
                  <h6 onClick={displayWeekTrans}>This Week</h6>
                  <h6 onClick={displayMonthTrans}>This Month</h6>
                  <h6 onClick={displayYearTrans}>This Year</h6>
                </TransDropDown>
              ) : null}
            </Month>
          </OverviewfirstColumn>
          <TotalSpent>
            <img
              src="/images/arrSide.svg"
              alt=""
              style={{ paddingLeft: "10px" }}
            />
            <Spent>
              <p>Total spent</p>
              <label>
                {(weekTrans && totalWeekSpendings) ||
                  (monthTrans && totalMonthSpendings) ||
                  (yearTrans && totalYearSpendings)}
              </label>
            </Spent>
          </TotalSpent>
          <AmountHistory onClick={handleTransaction}>
            <p>View transaction history</p>
            <MdIcons.MdOutlineKeyboardArrowRight style={styleArrRightOv} />
          </AmountHistory>
        </Overview>
      </JobOverview>
      <BookingHistory isOpen={bookOpen} />
      <AccountHistory isOpen={openTransaction} />
    </JobOverview>
  );
};

export default JobView;

const JobOverview = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;

  @media (min-width: 1441px) {
    width: 100%;
  }

  @media (max-width: 860px) {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;
const Jobs = styled.div`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 19px;
  width: 320px;
  height: 184px;
  border-radius: 10px;

  @media (min-width: 1441px) {
    width: 50%;
  }

  @media (max-width: 860px) {
    background-color: #ffffff;
    padding: 25px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 420px;
    height: 300px;
  }

  @media (max-width: 540px) {
    background-color: #ffffff;
    padding: 25px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 320px;
    height: 300px;
  }
`;
const Overview = styled.div`
  margin-left: 21px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 19px;
  width: 320px;
  height: 184px;
  border-radius: 10px;

  @media (min-width: 1441px) {
    width: 50%;
  }

  @media (max-width: 860px) {
    margin-left: 0px;
    background-color: #ffffff;
    padding: 25px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 420px;
    height: 300px;
  }

  @media (max-width: 540px) {
    margin-left: 0px;
    background-color: #ffffff;
    padding: 25px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 320px;
    height: 300px;
  }
`;

const JobsfirstColumn = styled.div`
  display: flex;
  flex-direction: row;
  padding-right: 25px;
  padding-top: 25px;
  gap: 150px;
  padding-left: 1.8rem;
  position: relative;

  && p {
    width: 49px;
    height: 25px;

    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 25px;

    display: flex;

    color: #676767;
  }

  @media (min-width: 1441px) {
    display: flex;
    flex-direction: row;
    padding-top: 25px;
    gap: 67%;
  }
  @media (min-width: 1800px) {
    display: flex;
    flex-direction: row;
    padding-top: 25px;
    gap: 70%;
  }
  @media (min-width: 2000px) {
    display: flex;
    flex-direction: row;
    padding-top: 25px;
    gap: 75%;
  }
`;

const JobDropDown = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: -20px;
  margin-top: 20px;
  padding: 0px 3px;
  gap: 6px;

  && h6 {
    width: 101px;
    height: 25px;
    cursor: pointer;

    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 25px;

    display: flex;
    align-items: center;
    text-transform: capitalize;

    color: #000000;

    flex: none;
    order: 0;
    flex-grow: 0;
  }

  width: 107px;
  height: 92px;

  background: #ffffff;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;

  flex: none;
  order: 1;
  flex-grow: 0;
`;
const TransDropDown = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: -20px;
  margin-top: 20px;
  padding: 0px 3px;
  gap: 6px;

  && h6 {
    width: 101px;
    height: 25px;
    cursor: pointer;

    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 25px;

    display: flex;
    align-items: center;
    text-transform: capitalize;

    color: #000000;

    flex: none;
    order: 0;
    flex-grow: 0;
  }

  width: 107px;
  height: 92px;

  background: #ffffff;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 3px;

  flex: none;
  order: 1;
  flex-grow: 0;
`;
const Month = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;

  && p {
    width: 50px;
    height: 25px;

    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 25px;
    /* identical to box height, or 156% */

    display: flex;
    align-items: center;
    text-transform: capitalize;

    color: #676767;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
  }
`;

const TotalBookings = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 1.3rem;
  gap: 9px;

  width: 176px;
  height: 50px;

  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;
const Bookings = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  && p {
    width: 143px;
    height: 25px;

    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 25px;
    /* identical to box height, or 179% */

    display: flex;
    align-items: center;

    color: #676767;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
  }

  && label {
    width: 77px;
    padding-right: rem;
    height: 25px;

    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 25px;
    /* identical to box height, or 104% */

    display: flex;
    align-items: center;

    color: #006717;

    /* Inside auto layout */

    flex: none;
    order: 1;
    flex-grow: 0;
  }
`;

const ViewBooking = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding-left: 25px;
  padding-right: 25px;
  cursor: pointer;

  width: 320px;
  height: 55px;

  background: #006717;
  border-radius: 0px 0px 10px 10px;
  && p {
    width: 180px;
    height: 25px;
    margin-top: 20px;
    padding-left: 12px;

    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 25px;
    /* identical to box height, or 156% */

    display: flex;
    align-items: center;

    color: #ffffff;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
  }

  @media (min-width: 1441px) {
    width: 100%;
  }
`;

const OverviewfirstColumn = styled(JobsfirstColumn)``;

const TotalSpent = styled(TotalBookings)``;

const Spent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  && p {
    width: 143px;
    height: 25px;

    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 25px;
    /* identical to box height, or 179% */

    display: flex;
    align-items: center;

    color: #676767;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
  }

  && label {
    width: 77px;
    height: 25px;

    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 25px;
    /* identical to box height, or 104% */

    display: flex;
    align-items: center;

    color: #e01b1b;

    /* Inside auto layout */

    flex: none;
    order: 1;
    flex-grow: 0;
  }
`;

const AmountHistory = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding-left: 25px;
  padding-right: 25px;
  cursor: pointer;

  width: 320px;
  height: 55px;

  background: #feeee7;
  border-radius: 0px 0px 10px 10px;
  && p {
    width: 180px;
    height: 25px;
    margin-top: 20px;

    font-family: "Roboto";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 25px;
    /* identical to box height, or 156% */

    display: flex;
    align-items: center;

    color: #000000;

    /* Inside auto layout */

    flex: none;
    order: 0;
    flex-grow: 0;
  }
  @media (min-width: 1441px) {
    width: 100%;
  }
`;
