import { useState } from "react";
import { Link } from "react-router-dom";
import GlobalTable from "../../../../components/globalcomponents/GlobalTable";
import GlobalTableActions from "../../../../components/globalcomponents/GlobalTableActions";
import GlobalSelect from "../../../../components/globalcomponents/GlobalSelect";
import { Chip } from "@mui/material";
import { useGetUsersByCategory } from "../../../../hooks/useQueries/useIdentity";

const userTypes = [
  { id: 1, name: "Individual customer" },
  { id: 2, name: "Commercial customer" },
];

const CustomToolbar = ({ userType, setUserType }) => {
  const urlPath = window.location.pathname;
  const linkTo =
    urlPath.includes("dashboard") && userType === "Individual customer"
      ? urlPath.replace("dashboard", "user-mgmt/corporate/Individual")
      : urlPath.includes("dashboard") && userType === "Commercial customer"
      ? urlPath.replace("dashboard", "user-mgmt/corporate/Commercial")
      : "/";
  return (
    <div className="d-inline-flex flex-column flex-sm-row">
      <GlobalSelect
        inputFont="13px"
        className="me-1"
        height="auto"
        valueType="string"
        options={userTypes}
        handleChange={(e) => setUserType(e.target.value)}
        selectValue={userType}
      />
      <Link
        to={linkTo}
        style={{
          padding: "8px 14px",
          backgroundColor: "var(--clr-primary)",
          color: "#fff",
          textDecoration: "none",
          borderRadius: "8px",
        }}
      >
        View All
      </Link>
    </div>
  );
};

const CustomerAdminDashboardUserTable = ({ data, customerType }) => {
  const [customerUserType, setCustomerUserType] = useState(
    "Individual customer"
  );
  const { data: usersData, isLoading } =
    useGetUsersByCategory(customerUserType);
  let filteredResults = usersData || [];
  filteredResults = filteredResults.map((customer) => ({
    ...customer,
    name: `${customer.firstName} ${customer.lastName}`,
  }));

  const columns = [
    {
      name: "name",
      label: "Name",
    },
    { name: "territory", label: "Territory" },
    {
      name: "accountStatus",
      label: "Status",
      options: {
        customBodyRender: (value) => (
          <Chip
            label={value}
            color={value?.toLowerCase() === "active" ? "success" : "error"}
          />
        ),
      },
    },
  ];

  return (
    <GlobalTable
      columns={columns}
      data={filteredResults}
      title="Customer Types"
      options={{
        download: false,
        print: false,
        viewColumns: false,
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10],
        customToolbar: () => (
          <CustomToolbar
            setUserType={setCustomerUserType}
            userType={customerUserType}
          />
        ),
      }}
    />
  );
};

export default CustomerAdminDashboardUserTable;
