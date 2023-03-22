import React from "react";
import Routes from "./routes/index";
import { store } from "./store/store";
import { Provider } from "react-redux";
import Fetching from "./pages/Fetching";

function App() {
  return (
    <Provider store={store}>
      <Fetching>
        <Routes />
      </Fetching>
    </Provider>
  );
}

export default App;
