import GlobalSelect from "../../../../globalcomponents/GlobalSelect";
import styled from "styled-components";
import Filter from "./Filter";

const ReferralFilter = ({ setFilterClass, filterClass, setFilter, filter }) => {
  const referral = [
    {
      id: 1,
      name: "email",
      amount: "3,000",
    },
    {
      id: 2,
      name: "email",
      amount: "3,000",
    },
    {
      id: 3,
      name: "email",
      amount: "3,000",
    },
  ];
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div className="d-flex gap-4 align-items-center">
          <InputDiv>
            <label>Your Referral Link</label>
            <div>
              <input />
              <button>Share</button>
            </div>
          </InputDiv>

          <InputDiv>
            <label>Your Referral Code</label>
            <div>
              <input />
              <button>Copy</button>
            </div>
          </InputDiv>
        </div>
        <div className="d-flex align-items-center mt-4">
          <GlobalSelect
            selectName="filter"
            options={referral}
            defaultOption="Select"
            handleChange={(e) => setFilter(e.target.value)}
            width="300px"
            height="56px"
          />
          <Filter setFilter={setFilterClass} filter={filterClass} />
        </div>
      </div>
    </div>
  );
};

export default ReferralFilter;
const InputDiv = styled.div`
  display: grid;

  > div {
    display: flex;
    align-items: flex-end;

    * {
      height: 56px;
      margin-bottom: 10px;
    }
    input {
      border-radius: 10px 0px 0px 10px;
      border: 1px solid var(--clr-primary);
    }
  }

  button {
    margin-top: 24px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px;
    gap: 10px;

    width: 97px;

    background: var(--clr-primary);
    border-radius: 0px 10px 10px 0px;
    border: none;
    color: #ffffff;
  }
  > label {
    text-align: flex-start;

    left: 20px;
    bottom: -20px;
    position: relative;
  }
`;
