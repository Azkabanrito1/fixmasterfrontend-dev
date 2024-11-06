import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import "react-calendar/dist/Calendar.css";
import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import GreenQuotationBar from "../components/layouts/headerandnavitems/GreenQuotationBar";
import SideBarItems from "../components/layouts/headerandnavitems/SideBarItems";
import ClientDataRow from "../components/dashboardcomponents/ClientDataRow";
import WalletBodyBox from "../components/dashboardcomponents/WalletBodyBox";
import BookAFixModal from "../components/layouts/modal/modal-designs/BookAFixModal";
import SelectDate from "../components/dashboardcomponents/Loyalty/SelectDate";
import SelectItem from "../components/dashboardcomponents/Loyalty/SelectItem";
import WalletHome from "../components/dashboardcomponents/wallet/WalletHome";
import DatePick from "../components/globalcomponents/DatePick";

const styleClosed = { width: "30px", height: "30px" };
const styleArrDown = {
  width: "20px",
  height: "20px",
  color: "#676767",
  marginTop: "3px",
  cursor: "pointer",
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
function Wallet() {
  const { userDashboard = "" } = useSelector((state) => state.user);
  const { jobSummary = {} } = useSelector((state) => state.user);
  const { transactionSummary = {} } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [sidebar, setSidebar] = useState(true);
  const [weekJobs, setWeekJobs] = useState(false);
  const [monthJobs, setMonthJobs] = useState(true);
  const [yearJobs, setYearJobs] = useState(false);
  const [dropDownJobs, setDropDownJobs] = useState(false);
  const [weekTrans, setWeekTrans] = useState(false);
  const [monthTrans, setMonthTrans] = useState(true);
  const [yearTrans, setYearTrans] = useState(false);
  const [dropDownTrans, setDropDownTrans] = useState(false);
  const [size, setSize] = useState({
    x: window.innerWidth,
    y: window.innerHeight,
  });

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const showSidebar = () => setSidebar(!sidebar);

  const {
    userName,
    totalBookedJobs,
    accountSubScription,
    walletBalance,
    walletId,
    newFixNotificationCount,
    ongoingFixNotificationCount,
    profilePicture,
    userRating,
    fixSchedule,
    pendingFixNotifications,
    message,
    status,
    promoBanner,
  } = userDashboard;

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
    <Container>
      <AllPageBody>
        <AllNav>
          <div>
            <div className="nav_bar">
              <GreenQuotationBar
                quote="Your Quotation Fix REF FHHD388 is Ready"
                h5Text="View all notifications"
              />
              {size.x >= 1200 ? (
                <button onClick={openModal}>Book A Fix</button>
              ) : (
                " "
              )}
            </div>
          </div>
          <div>
            <div className="menu-icon">
              <FaIcons.FaBars className="menu" onClick={showSidebar} />
            </div>
            <nav className={sidebar ? "navbar active" : "navbar"}>
              <img src="/images/FixMastercse.png" alt="" />
              <ul>
                <div className="closed">
                  <AiIcons.AiOutlineClose
                    style={styleClosed}
                    className="close"
                    onClick={showSidebar}
                  />
                </div>
                <SideBarItems />
              </ul>
            </nav>
          </div>
        </AllNav>
        <PageBody>
          <PageBodyChild>
            <PageBodyChildLeft>
              {/*ClientProfile-start*/}
              <ClientProfile>
                <ClientDataRow
                  userName={userName}
                  totalBookedJobs={totalBookedJobs}
                  accountSubScription={accountSubScription}
                  profilePicture={profilePicture}
                  userRating={userRating}
                />
                <WalletBodyBox
                  walletBalance={walletBalance}
                  walletId={walletId}
                />
              </ClientProfile>

              {/*ClientProfile-end*/}

              {/*JobOverview*/}
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
                    <img src="/images/chartSv.svg" alt="" />
                    <Bookings>
                      <p>Total bookings</p>
                      <label>
                        {(weekJobs && weekTotal) ||
                          (monthJobs && monthTotal) ||
                          (yearJobs && yearTotal)}
                      </label>
                    </Bookings>
                  </TotalBookings>
                  <BookingHistory>
                    <p>View Booking history</p>
                    <MdIcons.MdOutlineKeyboardArrowRight
                      style={styleArrRight}
                    />
                  </BookingHistory>
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
                    <img src="/images/arrSide.svg" alt="" />
                    <Spent>
                      <p>Total spent</p>
                      <label>
                        {(weekTrans && totalWeekSpendings) ||
                          (monthTrans && totalMonthSpendings) ||
                          (yearTrans && totalYearSpendings)}
                      </label>
                    </Spent>
                  </TotalSpent>
                  <TransactionHistory>
                    <p>View transaction history</p>
                    <MdIcons.MdOutlineKeyboardArrowRight
                      style={styleArrRightOv}
                    />
                  </TransactionHistory>
                </Overview>
              </JobOverview>
              {/*JobOverView*/}
            </PageBodyChildLeft>

            {size.x >= 1200 ? (
              <PageBodyChildRight>
                <CalenderSpace>
                  <img src="/images/ileya-fix-promo-acts.svg" alt="" />
                </CalenderSpace>
              </PageBodyChildRight>
            ) : (
              ""
            )}
          </PageBodyChild>
          <SelectColumn>
            <SelectDat>
              <DatePick />
              <img src="/images/loyaltyBar.svg" alt="" />
              <DatePick />
            </SelectDat>
            <SelectItem />
          </SelectColumn>
          <AllHistory>
            <HistoryHeader>
              <H1Text>
                <h1>Title</h1>
              </H1Text>
              <H2Text>
                <h2>Description</h2>
              </H2Text>
              <H4Text>
                <h4>Amount</h4>
              </H4Text>
              <PText>
                <p>Date</p>
              </PText>
            </HistoryHeader>
            <WalletHome />
            <hr></hr>
            <WalletHome />
            <hr></hr>
            <WalletHome />
            <hr></hr>
            <WalletHome />
          </AllHistory>
        </PageBody>

        <BookAFixModal open={showModal} close={closeModal} />
      </AllPageBody>
    </Container>
  );
}

export default Wallet;

const Container = styled.div`
  position: relative;
  width: 100vw;
`;
const AllNav = styled.div`
  position: absolute;
  width: 100%;
  overflow: hidden;

  .navbar {
  }

  && img {
    margin-left: 20px;
    margin-top: auto;
    margin-bottom: auto;
    width: 120px;
    height: 55px;
  }
  .navbar.active {
    display: flex;
    flex-direction: column;
    align-items: left;
    position: fixed;
    justify-content: flex-start;
    transition: 1s ease;
    background-color: white;
    width: 15%;
    top: 0;
  }

  .menu-icon {
    display: none;
  }

  .closed {
    display: none;
  }

  .nav_bar {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: white;
    height: 80px;
    width: 100%;
  }

  && button {
    text-transform: uppercase;
    padding-left: 60px;
    padding-right: 60px;
    padding-top: 17px;
    padding-bottom: 17px;
    margin-left: 30px;
    border: none;
    cursor: pointer;

    width: 320px;
    height: 54px;

    background: var(--clr-primary);
    border-radius: 8px;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 18px;

    text-decoration: none;
    color: white;

    &:hover {
      background: #404040;
      button {
        color: #404040;
      }
    }
  }

  @media (min-width: 1441px) {
    && button {
      text-transform: uppercase;
      padding-left: 60px;
      padding-right: 60px;
      padding-top: 17px;
      padding-bottom: 17px;
      margin-left: 10px;
      border: none;
      cursor: pointer;

      width: 28%;
      height: 54px;

      background: var(--clr-primary);
      border-radius: 8px;
      font-family: "Roboto";
      font-style: normal;
      font-weight: 700;
      font-size: 28px;
      line-height: 18px;

      text-decoration: none;
      color: white;

      &:hover {
        background: #404040;
        button {
          color: #404040;
        }
      }
    }
  }

  @media (max-width: 1360px) {
    .navbar.active {
      display: flex;
      flex-direction: column;
      align-items: left;
      position: fixed;
      justify-content: flex-start;
      transition: 1s ease;
      background-color: white;
      width: 17%;
      top: 0;
    }

    .nav_bar {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-left: 50px;
      background: white;
      height: 80px;
      width: 100%;
    }
  }

  @media (max-width: 1323px) {
    .navbar.active {
      display: flex;
      flex-direction: column;
      align-items: left;
      position: fixed;
      justify-content: flex-start;
      transition: 1s ease;
      background-color: white;
      width: 17%;
      top: 0;
    }
  }

  @media (max-width: 1280px) {
    .navbar.active {
      display: flex;
      flex-direction: column;
      align-items: left;
      position: fixed;
      justify-content: flex-start;
      transition: 1s ease;
      background-color: white;
      width: 17%;
      top: 0;
    }

    .nav_bar {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-left: 75px;
      background: white;
      height: 80px;
      width: 100%;
    }
  }

  @media (max-width: 1200px) {
    .navbar.active {
      display: flex;
      flex-direction: column;
      align-items: left;
      position: fixed;
      justify-content: flex-start;
      transition: 1s ease;
      background-color: white;
      width: 20%;
      top: 0;
    }

    .nav_bar {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-left: 60px;
      background: white;
      height: 80px;
      width: 100%;
    }
  }

  @media (max-width: 1000px) {
    .navbar.active {
      display: flex;
      flex-direction: column;
      align-items: left;
      position: fixed;
      justify-content: flex-start;
      transition: 1s ease;
      background-color: white;
      width: 20%;
      top: 0;
    }

    .nav_bar {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-left: 60px;
      background: white;
      height: 80px;
      width: 100%;
    }
  }

  @media (max-width: 860px) {
    .navbar.active {
      display: flex;
      flex-direction: column;
      align-items: left;
      position: fixed;
      justify-content: flex-start;
      transition: 1s ease;
      background-color: white;
      width: 30%;
      top: 0;
    }

    .nav_bar {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin-left: 60px;
      background: white;
      height: 80px;
      width: 100%;
    }
  }

  @media (max-width: 540px) {
    .navbar {
      width: 100%;
      height: 100vh;
      position: fixed;
      top: -100%;
      transition: 1s ease;
      width: 50%;
      background-color: #595959;
      top: 0;
    }

    .navbar.active {
      display: none;
      flex-direction: column;
      align-items: left;
      justify-content: flex-start;
      transition: 1s ease;
      background-color: #595959;
      width: 0%;
      top: 0;
    }

    .closed {
      display: block;
      justify-content: flex-start;
      width: 100%;
      color: black;
      position: absolute;
      top: 0px;
      left: 1px;
      cursor: pointer;
      .close {
        font-size: 25px;
      }
    }

    .menu-icon {
      display: block;
      cursor: pointer;
      position: absolute;
      top: 25px;
      left: 5px;
      .menu {
        font-size: 25px;
      }
    }

    .nav_bar {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-left: 0px;
      background: white;
      height: 80px;
    }
    @media (max-width: 412px) {
      .navbar {
        width: 100%;
        height: 100vh;
        position: fixed;
        top: -100%;
        transition: 1s ease;
        width: 100%;
        background-color: #595959;
        top: 0;
      }

      .navbar.active {
        display: none;
        flex-direction: column;
        align-items: left;
        justify-content: flex-start;
        transition: 1s ease;
        background-color: #595959;
        width: 0%;
        top: 0;
      }
    }

    @media (max-width: 280px) {
      overflow: hidden;
    }
  }
`;

const AllPageBody = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #f2f2f2;
  width: 100%;

  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column;
  }
  @media (max-width: 280px) {
    overflow: hidden;
  }
`;

const PageBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 60px;
  gap: 2px;
  margin-top: 60px;
  width: 100%;
  background: #f2f2f2;

  @media (max-width: 1360px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 110px;
    gap: 2px;
    margin-top: 60px;
    width: 100%;
    background: #f2f2f2;
  }

  @media (max-width: 1280px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 130px;
    gap: 2px;
    margin-top: 60px;
    width: 100%;
    background: #f2f2f2;
  }
  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 115px;
    gap: 2px;
    margin-top: 60px;
    width: 100%;
    background: #f2f2f2;
  }
  @media (max-width: 540px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 0px;
    gap: 2px;
    margin-top: 60px;
    width: 100%;
    background: #f2f2f2;
  }
`;
const PageBodyChild = styled.div`
  background-color: #f2f2f2;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 2px;
  width: 95%;

  @media (min-width: 1441px) {
    background-color: #f2f2f2;
    display: flex;
    flex-direction: row;
    gap: 2px;
    justify-content: center;
    width: 96%;
  }
`;
const PageBodyChildLeft = styled.div`
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  gap: 2px;

  @media (min-width: 1441px) {
    width: 75%;
    margin-left: 150px;
  }
`;
const PageBodyChildRight = styled.div`
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-left: 30px;
  margin-top: 35px;

  @media (min-width: 1441px) {
    margin-left: 45px;
    width: 25%;
  }
`;
const ClientProfile = styled.div`
  margin-top: 38px;
  display: flex;
  flex-direction: row;

  @media (min-width: 1441px) {
    width: 100%;
  }

  @media (max-width: 860px) {
    margin-top: 38px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;
const JobOverview = styled.div`
  margin-top: 38px;
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
  border-radius: 0px 0px 10px 10px;

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
  border-radius: 0px 0px 10px 10px;

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
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 25px;
  gap: 150px;
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
    align-items: center;

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
  padding-left: 25px;
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

const BookingHistory = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding-left: 25px;
  padding-right: 25px;

  width: 320px;
  height: 55px;

  background: #006717;
  border-radius: 0px 0px 10px 10px;
  && p {
    width: 180px;
    height: 25px;

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

const TransactionHistory = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding-left: 25px;
  padding-right: 25px;

  width: 320px;
  height: 55px;

  background: #feeee7;
  border-radius: 0px 0px 10px 10px;
  && p {
    width: 180px;
    height: 25px;

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
const SelectColumn = styled.div`
  margin-top: 48px;
  display: flex;
  flex-direction: row;
  gap: 35%;
  align-items: center;
  justify-content: center;

  @media (min-width: 1441px) {
    display: flex;
    flex-direction: row;
    gap: 60%;
    margin-left: 4%;
  }
`;
const SelectDat = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  width: auto;
  height: auto;
`;
const AllHistory = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  width: 90%;
  height: auto;
`;

const HistoryHeader = styled.div`
  display: flex;
  flex-direction: row;
  gap: 17%;
  width: 86%;
  height: 25px;
  align-items: center;
  justify-content: center;

  flex: none;
  order: 0;
  flex-grow: 0;

  @media (min-width: 1441px) {
    margin-left: 5%;
  }
`;
const H1Text = styled.div`
  display: flex;
  align-items: center;
  width: 12%;
  && h1 {
    justify-content: "space-between";
    width: 12%;
    height: 25px;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    /* identical to box height, or 139% */

    color: #a2a2a2;
  }
`;
const H2Text = styled.div`
  display: flex;
  align-items: center;
  width: 12%;
  && h2 {
    justify-content: "space-between";
    width: 12%;
    height: 25px;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    /* identical to box height, or 139% */

    color: #a2a2a2;
  }
`;
const H3Text = styled.div`
  display: flex;
  align-items: center;
  width: 12%;

  && h3 {
    justify-content: "space-between";
    width: 12%;
    height: 25px;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    /* identical to box height, or 139% */

    color: #a2a2a2;
  }
`;
const H4Text = styled.div`
  display: flex;
  align-items: center;
  width: 12%;
  && h4 {
    justify-content: "space-between";
    width: 12%;
    height: 25px;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    /* identical to box height, or 139% */

    color: #a2a2a2;
  }
`;
const H5Text = styled.div`
  display: flex;
  align-items: center;
  width: 15%;
  && h5 {
    justify-content: "space-between";
    width: 14%;
    height: 25px;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    /* identical to box height, or 139% */

    color: #a2a2a2;
  }
`;
const H6Text = styled.div`
  display: flex;
  align-items: center;
  width: 16%;
  && h6 {
    justify-content: "space-between";
    width: 16%;
    height: 25px;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    /* identical to box height, or 139% */

    color: #a2a2a2;
  }
`;
const PText = styled.div`
  display: flex;
  align-items: center;
  width: 8%;
  && p {
    justify-content: "space-between";
    width: 8%;
    height: 25px;
    font-family: "Roboto";
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    /* identical to box height, or 139% */

    color: #a2a2a2;
  }
`;
const CalenderSpace = styled.div`
  .react-calendar {
    width: 320px;
    height: 420px;
    max-width: 100%;
    background: white;
    border: none;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
  }

  && img {
    width: 379px;
    height: 392px;
  }
`;
