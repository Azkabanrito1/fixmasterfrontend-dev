import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import ChangeCseStatus from "../../../components/franchiseecomponents/csemanagement/ChangeCSEStatus";
import {
  BackBtn,
  PageHeading,
  InfoTable,
  NoData,
} from "../../../components/globalcomponents/Utilities";
import GlobalInput from "../../../components/globalcomponents/GlobalInput";
import GlobalSelect from "../../../components/globalcomponents/GlobalSelect";
import { Star } from "../../../components/globalcomponents/RatingStars";
import { useDispatch, useSelector } from "react-redux";
import { getCSEManaged } from "../../../redux/franchisee/actions";
import { BallBeat } from "react-pure-loaders";

const CseManaged = () => {
  const [cseManaged, setCseManaged] = useState([]);
  const [searchString, setSearchString] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.auth);

  const getCseManaged = async () => {
    const response = await dispatch(getCSEManaged());
    if (response.data) setCseManaged(response.data);
  };

  useEffect(() => {
    getCseManaged();
  }, []);

  const handleSearchInputChange = (searchStr) => {
    setSearchString(searchStr);
  };

  let filteredResult = cseManaged.filter((cse) =>
    cse.name
      .replace(/\s/g, "")
      .toLowerCase()
      .includes(searchString.toLowerCase())
  );

  const ratings = [
    { id: 1, name: "1 star" },
    { id: 2, name: "2 stars" },
    { id: 3, name: "3 stars" },
    { id: 4, name: "4 stars" },
    { id: 5, name: "5 stars" },
  ];

  const tableBody = filteredResult.map((cse) => {
    return (
      <tr key={cse.id}>
        <td>{cse.name}</td>
        <td
          className="text-center"
          aria-label={`Rating this CSE as ${cse.rating} stars out of 5`}
        >
          <Star percent={cse.rating * 20} />
        </td>
        <td className="text-center">{cse.lastActivity}</td>
        <td className="d-flex justify-content-center">
          <ChangeCseStatus cseId={cse.id} cseStatus={cse.status} />
        </td>
        <td>
          <button
            className="primary align-right underline"
            onClick={() => navigate("../cse-analysis/" + cse.id)}
          >
            View CSE Analysis Report
          </button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <PageHeading>CSE Managed</PageHeading>
      <BackBtn />
      <Filter>
        <GlobalInput
          inputPlaceholder={"Search..."}
          iconSrc={"/images/search.png"}
          handleChange={(e) => handleSearchInputChange(e.target.value)}
          inputValue={searchString}
        />
        <div className="options">
          <GlobalSelect
            defaultOption={"Ratings"}
            selectName={"Ratings"}
            options={ratings}
          />
          <GlobalInput
            labelText={"From"}
            inputType={"date"}
            inputPlaceholder={"Select Date"}
            iconSrc={"images/timeVectr.svg"}
          />
          <img src="/images/arrows-exchange-alt.png" alt="" />
          <GlobalInput
            labelText={"To"}
            inputType={"date"}
            inputPlaceholder={"Select Date"}
            iconSrc={"images/timeVectr.svg"}
          />
        </div>
      </Filter>

      <div className="text-center">
        <BallBeat color="var(--clr-primary)" loading={isLoading} />
      </div>

      {!isLoading && (
        <InfoTable>
          <thead className="fullbody">
            <tr>
              <th>Name</th>
              <th className="text-center">Ratings</th>
              <th className="text-center">Last Activity</th>
              <th className="text-center">Update Status</th>
              <th className="align-right">----</th>
            </tr>
          </thead>
          <tbody className="fullbody">
            {filteredResult.length > 0 ? tableBody : <NoData cols="5" />}
          </tbody>
        </InfoTable>
      )}
    </>
  );
};

export default CseManaged;

const Filter = styled.div`
  margin-bottom: 3rem;

  &,
  .options {
    display: flex;
    justify-content: space-between;
    align-items: end;
    gap: 0.8rem;
  }

  .options div {
    min-width: 120px;
  }
`;
