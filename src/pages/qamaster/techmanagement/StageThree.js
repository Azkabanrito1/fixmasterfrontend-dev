import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import { format } from "date-fns";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import GradeTechApplicant from "./GradeTechApplicant";
import {
  useGetTechnicianDiscussion,
  useGetCollaboratorRating,
  useRateApplicantInterview,
} from "../../../hooks/useQueries/useOnboarding";
import { BallBeat } from "react-pure-loaders";
import { useState } from "react";
import { useSnackbar } from "notistack";
import useDateFilter from "../../../hooks/useDateFilter";
import useDateQueries from "../../../hooks/useDateQueries";
import DateFilterToolbar from "../../../components/globalcomponents/DateFilterToolbar";

const StageThree = ({ data }) => {
  const [rateApplicantModal, setRateApplicantModal] = useState(false);
  const [techApplicantId, setTechApplicantId] = useState("");
  const [ratingsData, setRatingsData] = useState([]);

  const { enqueueSnackbar } = useSnackbar();
  //----------data fetching----------------
  const { data: technicianDiscussion, isLoading } =
    useGetTechnicianDiscussion("first");

  const { dateQueries, setDateQueries } = useDateQueries();
  const filteredResults = useDateFilter(
    dateQueries,
    "interviewDate",
    technicianDiscussion?.data
  );

  const openRateApplicant = (userId) => {
    setRateApplicantModal(true);
    setTechApplicantId(userId);
    const payload = {
      role: 5,
      type: 2,
    };
    ratingCriteria(payload);
  };
  const closeRateApplicant = (userId) => {
    setRateApplicantModal(false);
    setTechApplicantId(userId);
  };

  // mutation callbacks
  const onSuccess = (response) => {
    setRatingsData(response);
  };

  const onFailed = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };
  const onSuccessfullRAting = (response) => {
    enqueueSnackbar(response.message, {
      variant: "success",
    });
    closeRateApplicant();
  };

  //------------------------mutation------------------------
  const { mutate: ratingCriteria, isLoading: loading } =
    useGetCollaboratorRating(onSuccess);

  const { mutate: rateApplicant, isLoading: isGrading } =
    useRateApplicantInterview({
      onSuccess: onSuccessfullRAting,
      onFailed,
      roleId: 5,
    });

  const techColumns = [
    {
      name: "sn",
      label: "S/N",
      options: {
        customBodyRender: (_, meta) => meta.rowIndex + 1,
      },
    },
    {
      name: "name",
      label: "Name",
    },
    {
      name: "technicianCategory",
      label: "Category",
      options: {
        customBodyRender: (value) => {
          const categories = value?.map((cat) => {
            return cat.categoryName;
          });
          return <span>{categories?.join(", ")}</span>;
        },
      },
    },
    {
      name: "interviewDate",
      label: "Discussion",
      options: {
        customBodyRender: (value) =>
          !!value && format(new Date(value), "dd-MM-yyyy"),
      },
    },
    {
      name: "technicianLanguage",
      label: "Languages",
      options: {
        customBodyRender: (value) => {
          const language = value?.map((lang) => {
            return lang.languageName;
          });
          return <span>{language?.join(", ")}</span>;
        },
      },
    },

    {
      name: "id",
      label: "Action",
      options: {
        customBodyRender: (value) => {
          const actions = [
            {
              id: 1,
              name: "Rate Applicant",
              action: () => {
                openRateApplicant(value);
              },
              disabled: false,
            },
          ];
          return <GlobalTableActions actions={actions} id="id" />;
        },
      },
    },
  ];

  const gradeApplicant = (initpayload) => {
    const payload = {
      role: 5,
      type: 1,
      applicantId: techApplicantId,
      additionalComment: "",
      ratings: initpayload.ratings,
    };
    rateApplicant(payload);
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <BallBeat loading={isLoading} color="var(--clr-primary)" />
      </div>

      {!isLoading && (
        <GlobalTable
          columns={techColumns}
          data={filteredResults}
          options={{
            elevation: 0,
            filter: data ? false : true,
            search: data ? false : true,
            viewColumns: data ? false : true,
            print: data ? false : true,
            download: data ? false : true,
            selectableRows: "none",
            rowsPerPage: data ? 5 : 20,
            rowsPerPageOptions: [data ? 5 : 20, 50, 100],
            customToolbar: () => (
              <DateFilterToolbar
                dateQueries={dateQueries}
                setDateQueries={setDateQueries}
              />
            ),
          }}
        />
      )}
      {!isLoading && technicianDiscussion?.data?.length === 0 && (
        <p className="text-center">There are no applicants in this stage</p>
      )}

      {rateApplicantModal && (
        <GradeTechApplicant
          isOpen={rateApplicantModal}
          closeModal={closeRateApplicant}
          applicantId={techApplicantId}
          criteriaData={ratingsData}
          isLoading={loading}
          gradeApplicant={gradeApplicant}
          isGrading={isGrading}
        />
      )}
    </>
  );
};

export default StageThree;
