import { useEffect } from "react";
import { useState } from "react";
import { BallBeat } from "react-pure-loaders";
import { useDispatch, useSelector } from "react-redux";
import {
  InfoTable,
  NoData,
} from "../../../components/globalcomponents/Utilities";
import GlobalBtn from "../../../components/globalcomponents/GlobalBtn";
import GlobalInput from "../../../components/globalcomponents/GlobalInput";
import GlobalSelect from "../../../components/globalcomponents/GlobalSelect";
import { PageHeading } from "../../../components/globalcomponents/Utilities";
import AddNewCustomer from "../../../components/franchiseecomponents/commercialcustomers/modals/AddNewCustomerModal";
import { getCommercialCustomersListings } from "../../../redux/franchisee/actions";

const CommercialCustomerListing = () => {
  const [listing, setListing] = useState([]);
  const [statusVal, setStatusVal] = useState("");
  const [searchStr, setSearchStr] = useState("");
  const [dateQueries, setDateQueries] = useState({
    fromDate: "",
    toDate: "",
  });
  const [isAddCommercialCustomer, setIsAddCommercialCustomer] = useState(false);

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAddCommercialCustomer) getListings();
  }, [dateQueries, isAddCommercialCustomer]);

  const getListings = async () => {
    const response = await dispatch(
      getCommercialCustomersListings(dateQueries.fromDate, dateQueries.toDate)
    );
    if (response.data) setListing(response.data);
  };

  const status = [
    { id: 1, name: "Active" },
    { id: 2, name: "Dormant" },
  ];

  let filteredListing = listing.filter((list) =>
    list.name.toLowerCase().includes(searchStr.toLowerCase())
  );

  if (statusVal !== "") {
    filteredListing = filteredListing.filter((list) =>
      list.status.toLowerCase().includes(statusVal.toLowerCase())
    );
  }

  const tbodyTemplate = filteredListing.map((listing) => (
    <tr key={listing.id || Math.random()}>
      <td>{listing.name}</td>
      <td className="text-center">{listing.uplift}</td>
      <td className="text-center">{listing.numberOfJobs}</td>
      <td className="text-center">{listing.valueOfjobs}</td>
      <td
        className="text-center"
        style={{
          color:
            listing.status.toLowerCase() === "active" ? "#006717" : "#FF9B04",
        }}
      >
        {listing.status}
      </td>
      <td className="text-center">
        {listing.dateAdded.slice(0, listing.dateAdded.indexOf("T"))}
      </td>
    </tr>
  ));

  return (
    <>
      <div>
        <PageHeading>Commercial Customers Listing</PageHeading>
      </div>

      <div
        className="d-flex justify-content-between align-items-center p-3 rounded"
        style={{ backgroundColor: "#f6e7e0" }}
      >
        <GlobalInput
          inputType={"text"}
          inputPlaceholder="Search..."
          iconSrc={"/images/search.png"}
          inputValue={searchStr}
          handleChange={(e) => setSearchStr(e.target.value)}
        />

        <GlobalBtn
          onClick={() => setIsAddCommercialCustomer(true)}
          width="auto"
          height="auto"
          px="2rem"
          py=".8rem"
          fs="16px"
        >
          Add Commercial Customer
        </GlobalBtn>
      </div>

      <div
        className="d-flex justify-content-end align-items-end my-5"
        style={{ gap: "20px" }}
      >
        <GlobalSelect
          options={status}
          defaultOption="All"
          selectValue={statusVal}
          valueType="string"
          handleChange={(e) => setStatusVal(e.target.value)}
        />

        <div className="d-flex justify-content-between align-items-end">
          <GlobalInput
            inputType={"date"}
            inputValue={dateQueries.fromDate}
            labelText="From"
            handleChange={(e) =>
              setDateQueries({ ...dateQueries, fromDate: e.target.value })
            }
            max={dateQueries.toDate}
          />
          <img src="/images/arrows-exchange-alt.png" alt="" />
          <GlobalInput
            inputType={"date"}
            inputValue={dateQueries.toDate}
            labelText="To"
            handleChange={(e) =>
              setDateQueries({ ...dateQueries, toDate: e.target.value })
            }
            min={dateQueries.fromDate}
          />
        </div>
      </div>

      <div className="text-center">
        <BallBeat loading={isLoading} color="var(--clr-primary)" />
      </div>

      {!isLoading && (
        <InfoTable>
          <thead className="fullbody">
            <tr>
              <th>Name</th>
              <th className="text-center">Uplift %</th>
              <th className="text-center">No of Jobs</th>
              <th className="text-center">Value of Jobs</th>
              <th className="text-center">Status</th>
              <th className="text-center">Date Added</th>
            </tr>
          </thead>
          <tbody className="fullbody">
            {filteredListing.length > 0 ? tbodyTemplate : <NoData cols={"6"} />}
          </tbody>
        </InfoTable>
      )}

      {isAddCommercialCustomer && (
        <AddNewCustomer
          isOpen={isAddCommercialCustomer}
          closeModal={() => setIsAddCommercialCustomer(false)}
        />
      )}
    </>
  );
};

export default CommercialCustomerListing;
