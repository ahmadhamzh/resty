import React, { useState, useReducer } from "react";

import "./app.scss";

// Let's talk about using index.js and some other name in the component folder
// There's pros and cons for each way of doing this ...
import Header from "./components/header/index";
import Footer from "./components/footer/index";
import Form from "./components/form/index";
import Results from "./components/results/index";
import History from "./components/history/history";
const axios = require("axios");


const initialState = {
  data: null,
  requestParams: {},
  history: []
};
function setState(state = initialState, action) {
  switch (action.name) {
    case "resApi":
      return {
        ...state,
        data: action.payload.res,
        requestParams: action.payload.req
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(setState, initialState);

  // const [state, setState] = useState({
  //   data: null,
  //   requestParams: {}
  // });
  // const [requestParams, setRequestParams] = useState({});

  const callApi = async (requestParams) => {
    console.log(requestParams);
    state.history.push(requestParams);
    let resApi;
    if (requestParams.method === "get") {
      resApi = await axios.get(requestParams.url);
    }
    if (requestParams.method === "delete") {
      resApi = await axios.delete(requestParams.url);
    }
    if (resApi) {
      const action = {
        name: "resApi",
        payload: {
          res: resApi,
          req: requestParams
        }
      };
      dispatch(action);
    } else {
      const action = {
        name: "resApi",
        payload: "no data found"
      };
      dispatch(action);
      // setState({ data: "no data found", requestParams });
    }
    console.log(state.history, "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
  };

  return (
    <React.Fragment>
      <Header />
      <div>Request Method: {state.requestParams.method}</div>
      <div>URL: {state.requestParams.url}</div>
      <Form handleApiCall={callApi} />
      <History handleApiCall={callApi} history={state.history} />
      <Results data={state.data} />
      <Footer />
    </React.Fragment>
  );
}

export default App;
