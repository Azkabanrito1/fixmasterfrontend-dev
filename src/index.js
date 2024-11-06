import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";
import Modal from "react-modal";
import { SnackbarProvider } from "notistack";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const container = document.getElementById("root");
Modal.setAppElement(document.getElementById("root"));
const root = createRoot(container);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Router>
            <App />
          </Router>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </SnackbarProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
