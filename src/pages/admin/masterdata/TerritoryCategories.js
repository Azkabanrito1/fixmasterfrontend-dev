import React from "react";
import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import { Button } from "@mui/material";
import useControlModal from "../../../hooks/useControlModal";
import AddTerritoryCategoryModal from "../../../components/admincomponents/masterdata/AddTerritoryCategoryModal";
import { useState } from "react";
import GlobalTableActions from "../../../components/globalcomponents/GlobalTableActions";
import GlobalInput from "../../../components/globalcomponents/GlobalInput";
import { useDebounce } from "react-use";
import useDateQueries from "../../../hooks/useDateQueries";
import { useGetAllTerritoryCategories } from "../../../hooks/useQueries/useAdmin";
import GlobalTable from "../../../components/globalcomponents/GlobalTable";

const TerritoryCategories = () => {
  const { isModalOpen, openModal, closeModal } = useControlModal();
  const [activeId, setActiveId] = useState(null);
  const [queryParams, setQueryParams] = useState({
    searchString: "",
    pageSizeParam: "",
    PageNumberParam: 1,
  });
  const [searchStr, setSearchStr] = useState("");

  const { data: tcData } = useGetAllTerritoryCategories({ queryParams });
  const territoryCategories = tcData?.data?.territoryCategories;
  const meta = tcData?.data?.meta;

  // debounce the fetching of territories by search
  useDebounce(
    () => {
      if (!!searchStr)
        setQueryParams((prev) => ({ ...prev, searchParam: searchStr }));
    },
    2000,
    [searchStr]
  );

  const columns = [
    {
      name: "sn",
      label: "S/N",
      options: {
        customBodyRender: (_, table) => table.rowIndex + 1,
      },
    },
    { name: "categoryName", label: "Territory Category Name" },
    { name: "radius", label: "Category Radius" },
    {
      name: "id",
      label: "Actions",
      options: {
        customBodyRender: (value, row) => {
          const actions = [
            {
              id: 0,
              name: "Edit Territory Category",
              action: () => {
                setActiveId(value);
                openModal();
              },
            },
          ];
          return (
            <div className="text-center">
              <GlobalTableActions actions={actions} id="territory-categories" />
            </div>
          );
        },
      },
    },
  ];

  return (
    <>
      <div className="position-relative mb-5">
        <PageHeading>Territory Categories</PageHeading>
        <BackBtn />
        <Button
          className="position-absolute top-0 end-0 btn"
          style={{ backgroundColor: "var(--clr-primary)", color: "#fff " }}
          width="max-content"
          px="1em"
          onClick={openModal}
        >
          New Category
        </Button>
      </div>

      <GlobalTable
        columns={columns}
        data={territoryCategories}
        options={{
          serverSide: true,
          rowsPerPage: meta?.recordsPerPage || 10,
          count: meta?.totalRecords || 0,
          rowsPerPageOptions: [10, 20, 50],
          page: meta?.currentPage - 1 || 0,
          textLabels: {
            body: {
              noMatch: <div className="orange">No territory category data</div>,
            },
          },
          onTableChange: (action, tableState) => {
            if (action === "changePage") {
              setQueryParams((prev) => ({
                ...prev,
                PageNumberParam: tableState.page + 1,
              }));
            }
            // else {
            //   console.log("action not handled.");
            // }
          },
          customSearchRender: () => (
            <GlobalInput
              inputType="search"
              width="180px"
              inputPlaceholder="Search by name"
              inputValue={searchStr}
              handleChange={(e) => setSearchStr(e.target.value)}
            />
          ),
        }}
      />

      {isModalOpen && (
        <AddTerritoryCategoryModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          activeId={activeId}
        />
      )}
    </>
  );
};

export default TerritoryCategories;
