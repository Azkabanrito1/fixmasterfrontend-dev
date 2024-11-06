import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useGetNoficationByCategory } from "../../hooks/useQueries/useAdmin";
import { useFormik } from "formik";
import GlobalSelect from "../../components/globalcomponents/GlobalSelect";
import GlobalBallBeat from "../../components/globalcomponents/GlobalBallBeat";

const TextEditor = () => {
  const quillRef = useRef(null);
  const [content, setContent] = useState("<p>Loading....</p>");
  const { handleBlur, handleChange, values } = useFormik({
    initialValues: {
      category: "",
      description: "",
    },
  });
  const { data: textData, isLoading } = useGetNoficationByCategory({
    categoryId: values.category,
  });

  const [data, setData] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]); // For selecting categories
  const [apiOptions, setApiOptions] = useState([]); // For selecting HTML based on response from API

  useEffect(() => {
    // Generate category options (0 - 18)
    const arr = Array.from({ length: 19 }, (_, i) => i);
    const categoryArr = arr.map((value) => ({
      id: value,
      name: value.toString(),
    }));
    setCategoryOptions(categoryArr);

    // Update data and content if API has finished loading
    if (!isLoading && textData?.data?.notifications) {
      const notificationOptions = textData.data.notifications.map(
        (item, index) => ({
          id: index,
          name: item.description,
        })
      );
      setApiOptions(notificationOptions);
      setData(textData.data.notifications);
    } else {
      setData([]);
      setContent("<p>No items found</p>");
    }
  }, [textData, isLoading]);

  useEffect(() => {
    // Update content based on description selection
    if (data.length && values.description !== "") {
      setContent(
        data[values.description]?.templateContent || "<p>No items found</p>"
      );
    } else {
      setContent("<p>Loading....</p>");
    }
  }, [values.description, data]);

  // Function to handle content changes
  const updateValue = (value) => {
    setContent(value);
  };

  const logContent = () => {
    console.log(content);
  };

  return (
    <div>
      {/* Category Selection */}
      <GlobalSelect
        style={{ margin: "40px 0px" }}
        labelText="Category"
        descriptionText="Select a category"
        selectName="category"
        selectValue={values.category}
        options={categoryOptions}
        defaultOption="Select an option"
        handleBlur={handleBlur}
        handleChange={handleChange}
        required
      />
      {data.length > 0 && (
        <GlobalSelect
          style={{ marginBottom: "40px" }}
          labelText="Description"
          selectName="description"
          selectValue={values.description}
          options={apiOptions}
          defaultOption="Select an option"
          handleBlur={handleBlur}
          handleChange={handleChange}
          required
        />
      )}
      {/* Loading Indicator */}/
      {!isLoading && (
        <ReactQuill ref={quillRef} value={content} onChange={updateValue} />
      )}
      <button onClick={logContent} style={{ marginTop: "20px" }}>
        Log Content to Console
      </button>
    </div>
  );
};

export default TextEditor;
