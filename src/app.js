import React, { useState } from "react";

import "./app.scss";

// Let's talk about using index.js and some other name in the component folder
// There's pros and cons for each way of doing this ...
import Header from "./components/header/index";
import Footer from "./components/footer/index";
import Form from "./components/form/index";
import Results from "./components/results/index";

const axios = require("axios");
function App() {
  const [state, setState] = useState({ data: null, requestParams: {} });
  const callApi = async (requestParams) => {
    let resApi;
    if (requestParams.method === "get") {
      resApi = await axios.get(requestParams.url);
    }
    if (requestParams.method === "delete") {
      resApi = await axios.delete(requestParams.url);
    }
    if (resApi) {      
      setState({ data : resApi, requestParams });
    } else {
      setState({ data: "no data found", requestParams });
    }
  };

  return (
    <React.Fragment>
      <Header />
      <div>Request Method: {state.requestParams.method}</div>
      <div>URL: {state.requestParams.url}</div>
      <Form handleApiCall={callApi} />
      <Results data={state.data} />
      <Footer />
    </React.Fragment>
  );
}

export default App;
