import {
  Fields,
  FormGroup,
  GroupHeading,
} from "../../../../../globalcomponents/Utilities";
import styled from "styled-components";
import { useFormik } from "formik";
import AssignTech from "../modal/AssignTech";
import { useState } from "react";

const Labour = () => {
  const [assignTechnician, setAssignTechnician] = useState(false);
  const { values, handleChange } = useFormik({
    initialValues: {
      issue: "",
    },
  });
  const data = [
    {
      id: 0,
      techni: "Joe",
      add: "iyana",
    },
  ];
  return (
    <>
      <Fields>
        <FormGroup columns="1">
          <div>
            <GroupHeading>
              Would it be fixed by the technician(s) who handled the fix or a
              new supplier(s)
            </GroupHeading>
            <div className="row" aria-labelledby="issue-radio-group"></div>
            <div className="cols">
              <input
                type="radio"
                name="issue"
                value="supply"
                onChange={handleChange}
                checked={values.issue === "supply"}
              />
              <label style={{ fontSize: "20px" }}>
                Fix will be taken of by the technician(s) who handled the supply
              </label>
            </div>
            <div className="cols">
              <input
                type="radio"
                name="issue"
                value="newTech"
                onChange={handleChange}
                checked={values.issue === "newTech"}
              />
              <label style={{ fontSize: "20px" }}>
                Fix wii be assigned to new technician(s)
              </label>
            </div>
          </div>
        </FormGroup>
      </Fields>
      {values.issue === "supply" ? (
        <AssignTech
          openAssignTechModal={assignTechnician}
          assignedTechnicians={data}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Labour;

const Field = styled(Fields)`
  display: inline-block;
`;
