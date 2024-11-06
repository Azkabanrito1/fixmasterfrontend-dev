import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { PropTypes } from "prop-types";

const useFetch = ({ action, args = [], deps = [] }) => {
  const [data, setData] = useState(null);
  const dispatch = useDispatch();

  const getData = async () => {
    const response = await dispatch(action(...args));
    if (response?.data) setData(response?.data);
    else setData(response);
  };

  useEffect(() => {
    getData();
  }, [...deps]);

  return data;
};

useFetch.propTypes = {
  action: PropTypes.func,
  args: PropTypes.array,
  deps: PropTypes.array,
};

export default useFetch;
