import React, { useEffect, useState } from "react";
import GlobalSelect from "../../globalcomponents/GlobalSelect";
import { useGetCategories } from "../../../hooks/useQueries/useOnboarding";

const FilteredStageTwo = ({ values, handleChange }) => {
  const { data: categorie } = useGetCategories();
  const [category, setCategory] = useState([]);

  const dateFrom = [
    {
      id: 1,
      name: "19/07/2022",
    },
    {
      id: 2,
      name: "20/07/2022",
    },
    {
      id: 3,
      name: "19/06/2023",
    },
  ];
  const grade = [
    {
      id: 0,
      name: 50,
    },
    {
      id: 1,
      name: 60,
    },
    {
      id: 2,
      name: 80,
    },
  ];
  useEffect(() => {
    if (categorie) {
      const newCategoryArr = categorie?.data?.map((item) => ({
        id: item.id,
        name: item.longName,
      }));
      setCategory(newCategoryArr);
    }
  }, [categorie]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div className="d-flex gap-5">
          <GlobalSelect
            options={category}
            selectName="category"
            selectValue={values.category}
            defaultOption="Category"
            handleChange={handleChange}
            valueType="string"
            width="100%"
          />
          <GlobalSelect
            options={grade}
            selectName="language"
            selectValue={values.grade}
            defaultOption=" Grade"
            handleChange={handleChange}
            valueType="string"
            width="100%"
          />
        </div>
        <div className="d-flex">
          <GlobalSelect
            labelText="Application Date from"
            options={dateFrom}
            defaultOption="Select Date"
          />
          <img src="/images/arrows-exchange-alt.png" alt="" />
          <GlobalSelect
            labelText="To"
            options={dateFrom}
            defaultOption="Select Date"
          />
        </div>
      </div>
    </div>
  );
};

export default FilteredStageTwo;
