import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

//store
import { Provider } from "react-redux";
import store from "./store/provider";

//axios
import axios from "axios";
import { baseURL, key } from "./util/Config";

// type
import {
  CLOSE_SPINNER_PROGRESS,
  OPEN_SPINNER_PROGRESS,
} from "./store/spinner/types";
import Spinner from "./pages/Spinner";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { bdAdminMuiTheme } from "./muiTheme";
import { vendorGlobalStyles } from "./vendorGlobalStyles";
import "bootstrap-daterangepicker/daterangepicker.css";

axios.defaults.baseURL = baseURL;
if (key) {
  axios.defaults.headers.common["key"] = key;
}

axios.interceptors.request.use(
  (req) => {
    store.dispatch({ type: OPEN_SPINNER_PROGRESS });
    return req;
  },
  (error) => {
    console.log(error);
  }
);

axios.interceptors.response.use(
  (res) => {
    store.dispatch({ type: CLOSE_SPINNER_PROGRESS });
    return res;
  },
  (err) => {
    if (err.message === "Network Error") {
      // Handle network error
    }
    store.dispatch({ type: CLOSE_SPINNER_PROGRESS });
    return Promise.reject(err);
  }
);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={bdAdminMuiTheme}>
      <CssBaseline enableColorScheme />
      <GlobalStyles styles={vendorGlobalStyles} />
      <BrowserRouter>
        <Provider store={store}>
          <App />
          <Spinner />
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
