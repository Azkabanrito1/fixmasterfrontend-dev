import { useState } from "react";
import ContactPreference from "../../../components/admincomponents/preferences/ContactPreference";
import GlobalBallBeat from "../../../components/globalcomponents/GlobalBallBeat";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import { Link } from "react-router-dom";

const CustomerPrefNotify = () => {
  const [openAddContactPref, setOpenAddContactPref] = useState(false);

  const showContactpref = () => {
    setOpenAddContactPref(true);
  };
  const columns = [
    {
      name: "s/n",
      label: "S/N",
      options: {
        customBodyRender: (_, i) => i.rowIndex + 1,
      },
    },
    {
      name: "name",
      label: "Name",
    },
    {
      name: "code",
      label: "Code",
    },
    {
      name: "prefMaster",
      label: "Preference Master",
    },
  ];
  return (
    <>
      <div className="position-relative mb-5">
        <BackBtn />
        <PageHeading>Customer</PageHeading>

        <div>
          <Link
            onClick={showContactpref}
            className="position-absolute top-0 end-0 btn"
            style={{ backgroundColor: "var(--clr-primary)", color: "#fff " }}
            width="max-content"
            px="2em"
          >
            Add Preference Master
          </Link>
        </div>
      </div>
      {/* <GlobalBallBeat loading={isLoading}/> */}
      <GlobalTable columns={columns} data={[]} />
      {openAddContactPref && (
        <ContactPreference
          isOpen={openAddContactPref}
          closeModal={() => setOpenAddContactPref(false)}
        />
      )}
    </>
  );
};

export default CustomerPrefNotify;
