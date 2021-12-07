import React, { useState, useEffect } from "react";
import "./form.scss";

function Form(props) {
  const [reqData, setReqData] = useState({ method: "get" });
  
  useEffect(() => {
    document.getElementById("get").style.background = "#ccc";
    document.getElementById("post").style.background = "#ccc";
    document.getElementById("delete").style.background = "#ccc";
    document.getElementById("put").style.background = "#ccc";
    let methodActive = document.getElementById(`${reqData.method}`);
    methodActive.style.background = "#fff";
  }, [reqData.method]);

  const methodHandler = (e) => {
    e.preventDefault();
    setReqData({ method: e.target.id });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      method: reqData.method,
      url: e.target.url.value
    };
    props.handleApiCall(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <span>URL: </span>
          <input name="url" type="text" />
          <button type="submit">GO!</button>
        </label>
        <label className="methods" name="methods">
          <span id="get" onClick={methodHandler}>
            GET
          </span>
          <span id="post" onClick={methodHandler}>
            POST
          </span>
          <span id="put" onClick={methodHandler}>
            PUT
          </span>
          <span id="delete" onClick={methodHandler}>
            DELETE
          </span>
        </label>
      </form>
      {(reqData.method === "post" || reqData.method === "put") && (
        <textarea
          rows="20"
          cols="50"
          name="body"
         
        ></textarea>
      )}
    </>
  );
}

export default Form;
