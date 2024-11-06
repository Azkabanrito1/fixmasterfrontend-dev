import DiagnosticFinding from "./DiagnosticFinding";
import GlobalBtn from "../../../../../../globalcomponents/GlobalBtn";
import {
  useCreateRecommendationAndFinding,
  useGetDiagnosisReport,
} from "../../../../../../../hooks/useQueries/useJobs";
import { useEffect, useReducer, useState } from "react";
import { useSnackbar } from "notistack";
import { SectionHeading } from "../../../../../../globalcomponents/Utilities";

const initState = [
  {
    issues: "",
    recommendations: "",
  },
];

const issuesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ISSUE":
      return [
        ...state,
        {
          issues: "",
          recommendations: "",
        },
      ];
    case "REMOVE_ISSUE":
      return state.filter((_, index) => index !== action.index);
    case "UPDATE_ISSUE":
      return state.map((issues, index) => {
        if (index === parseInt(action.index)) {
          return {
            ...issues,
            [action.name]: action.value,
          };
        }
        return issues;
      });
    case "INIT_ISSUE":
      return action.payload;
    default:
      return state;
  }
};

const FindingAndRecommendation = ({ fixId }) => {
  const [issuesAndRecommendations, setIssuesAndRecommendations] = useReducer(
    issuesReducer,
    initState
  );
  const [comment, setComment] = useState("");
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const { data: issuesAndRecommendationsData } = useGetDiagnosisReport(fixId);

  //----------------------------------------------------------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
  };
  const onFailure = (response) => {
    enqueueSnackbar(response.message, {
      variant: "error",
    });
  };
  const { mutate: createIssueAndRecommendation, isLoading } =
    useCreateRecommendationAndFinding(fixId, onSuccess, onFailure);

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      fixId: Number(fixId),
      issuesAndRecommendations,
      additionalComments: comment,
    };
    createIssueAndRecommendation(payload);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // the name of the fields is a concatenated string of issue/recommendation and the index
    // i.e. issue-1 or recommendation-2
    const nameArr = name.split("-");
    const inputName = nameArr[0];
    const index = nameArr[1];

    setIssuesAndRecommendations({
      type: "UPDATE_ISSUE",
      index,
      name: inputName,
      value,
    });
  };

  const addIssue = () => setIssuesAndRecommendations({ type: "ADD_ISSUE" });
  const removeIssue = (index) =>
    setIssuesAndRecommendations({ type: "REMOVE_ISSUE", index });

  const formHandler = {
    values: issuesAndRecommendations,
    handleChange,
    addIssue,
    removeIssue,
    comment,
    setComment,
  };

  useEffect(() => {
    if (
      !!issuesAndRecommendationsData?.data?.issuesAndRecommendations?.length
    ) {
      const issue =
        issuesAndRecommendationsData?.data?.issuesAndRecommendations?.map(
          (item) => {
            return {
              issues: item.issues,
              recommendations: item.recommendations,
            };
          }
        );
      // setIssueRec(issue);
      setIssuesAndRecommendations({ type: "INIT_ISSUE", payload: issue });
      setComment(issuesAndRecommendationsData?.data?.additionalComments);
      setAlreadyAdded(true);
    }
  }, [issuesAndRecommendationsData?.data?.issuesAndRecommendations]);

  return (
    <section>
      <SectionHeading>Diagnostics Finding & Recommendation</SectionHeading>
      <form onSubmit={onSubmit}>
        <DiagnosticFinding
          formHandler={formHandler}
          alreadyAdded={alreadyAdded}
        />
        {!alreadyAdded && (
          <GlobalBtn
            mx="auto"
            type="submit"
            disabled={
              (!issuesAndRecommendations.issuesReducer &&
                !issuesAndRecommendations.initState &&
                !comment) ||
              isLoading
            }
          >
            {isLoading ? "Loading" : "Submit"}
          </GlobalBtn>
        )}
      </form>
    </section>
  );
};

export default FindingAndRecommendation;
