import React, { useEffect, useState } from "react";
import GlobalSelect from "../../globalcomponents/GlobalSelect";
import {
  useGetCategories,
  useGetLanguage,
} from "../../../hooks/useQueries/useOnboarding";
import { getToday } from "../../../utils/dateRanges";
import GlobalInput from "../../globalcomponents/GlobalInput";

const FilterTech = ({ values, handleChange, dateQueries, setDateQueries }) => {
  const { data: categorie } = useGetCategories();
  const { data: language } = useGetLanguage();
  const [category, setCategory] = useState([]);

  const today = getToday();
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
            options={language?.data}
            selectName="language"
            selectValue={values.language}
            defaultOption=" Language"
            handleChange={handleChange}
            valueType="string"
            width="100%"
          />
        </div>
        <div className="d-flex align-items-center">
          <GlobalInput
            inputType="date"
            labelText="From"
            inputValue={dateQueries?.from?.date}
            handleChange={(e) =>
              setDateQueries({ type: "setFrom", date: e.target.value })
            }
            error={dateQueries?.from.error}
            errorMessage={dateQueries?.from.errorMsg}
            max={today}
          />
          <img src="/images/arrows-exchange-alt.png" alt="" />
          <GlobalInput
            inputType="date"
            labelText="To"
            inputValue={dateQueries?.to?.date}
            handleChange={(e) =>
              setDateQueries({ type: "setTo", date: e.target.value })
            }
            error={dateQueries?.to.error}
            errorMessage={dateQueries?.to.errorMsg}
            min={dateQueries?.from.date}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterTech;
