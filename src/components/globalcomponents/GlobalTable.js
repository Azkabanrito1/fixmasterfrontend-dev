import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material";

const GlobalTable = ({ options, title, data, columns, components }) => {
  const tableTheme = createTheme({
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: "transparent",
          },
        },
      },
      MuiPopover: {
        styleOverrides: {
          paper: {
            backgroundColor: "#fff",
          },
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            backgroundColor: "#fff",
          },
        },
      },
      MUIDataTableToolbar: {
        styleOverrides: {
          root: ({ options }) => {
            const { displayToolbar = true } = options;
            return {
              display: displayToolbar ? "flex" : "none",
              marginBottom: "1rem",
              "@media (max-width: 756px)": {
                flexDirection: "column",
              },
            };
          },
        },
      },
      MUIDataTableHeadCell: {
        styleOverrides: {
          root: {
            backgroundColor: "transparent",
          },
        },
      },
      MUIDataTableBodyCell: {
        styleOverrides: {
          root: {
            backgroundColor: "rgb(248, 233, 226)",
          },
        },
      },
      MUIDataTableBodyRow: {
        styleOverrides: {
          responsiveStacked: {
            "@media (max-width: 900px)": {
              backgroundColor: "var(--clr-primary)",
            },
          },
        },
      },
      MUIDataTablePagination: {
        root: {
          backgroundColor: "#000",
          color: "#fff",
        },
      },
    },
  });

  return (
    <ThemeProvider theme={tableTheme}>
      <MUIDataTable
        options={{
          elevation: 0,
          rowsPerPage: 20,
          rowsPerPageOptions: [20, 50, 100],
          selectableRows: "none",
          ...options,
        }}
        title={title}
        data={data}
        columns={columns}
        components={components}
      />
    </ThemeProvider>
  );
};

export default GlobalTable;
