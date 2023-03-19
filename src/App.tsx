import React from "react";
import Routes from "./routes/index";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { store } from "./store/store";
import { Provider } from "react-redux";
import Fetching from "./pages/Fetching";

function App() {
  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Fetching>
          <Routes />
        </Fetching>
      </LocalizationProvider>
    </Provider>
  );
}

export default App;
