import { Link } from "react-router-dom";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import { PATH_ADMIN } from "../../../routes/paths";
import { useGetSlaParams } from "../../../hooks/useQueries/useAdmin";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import { useState } from "react";
import UpdateSla from "./SLA/UpdateSla";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import { Button, Stack } from "@mui/material";

const SlaMgt = () => {
  const { data: slaParams, isLoading } = useGetSlaParams();
  const data = [{ ...slaParams }];
  const [showModal, setShowModal] = useState(false);
  const [activeApplicant, setActiveApplicant] = useState({});
  const getActiveApplicant = (value) => {
    // let applicantIndex = data?.findIndex((x) => x.id === value);
    const active = data.filter((el) => {
      return el.id === value;
    });
    setActiveApplicant(active[0]);
  };

  const updateSla = (id) => {
    setShowModal(true);
    getActiveApplicant(id);
    console.log(activeApplicant);
  };
  const columns = [
    { name: "jobClosureRespose", label: "Job Closure Response" },
    { name: "jobResponseTime", label: "Job Response Time" },
    { name: "quoteResponseTime", label: "Quote Response Time" },
    { name: "sla", label: "SLA" },
    { name: "spareSupplyResponse", label: "Spare Supply Response" },
    {
      name: "id",
      label: "Actions",
      options: {
        sort: false,
        filter: false,
        customBodyRender: (value, meta) => {
          const actions = [
            {
              id: 1,
              name: "Update Settings",
              action: () => updateSla(value),
            },
          ];
          return <GlobalTableActions actions={actions} id="sla-params" />;
        },
      },
    },
  ];

  return (
    <>
      <div>
        <BackBtn />
        <Stack direction={{ xs: "column", sm: "row" }} alignItems={"center"}>
          <PageHeading className="text-capitalize me-auto mx-auto">
            SLA Parameters
          </PageHeading>
          <Button
            sx={{
              bgcolor: "var(--clr-primary)",
            }}
          >
            <Link
              to={`${PATH_ADMIN.newSla}`}
              style={{
                color: "#fff ",
                textDecoration: "none",
              }}
            >
              New SLA Parameters
            </Link>
          </Button>
        </Stack>
      </div>
      <GlobalBallBeat loading={isLoading} />
      {!isLoading && (
        <GlobalTable
          columns={columns}
          data={data}
          options={{
            elevation: 0,
            rowsPerPage: 20,
            selectableRows: "none",
            rowsPerPageOptions: [20, 50, 100],
          }}
        />
      )}
      {showModal && (
        <UpdateSla
          open={showModal}
          close={() => setShowModal(false)}
          activeId={activeApplicant?.id}
        />
      )}

      <></>
    </>
  );
};
export default SlaMgt;
