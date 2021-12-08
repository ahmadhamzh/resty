import React from "react";

function history(props) {
  console.log(props.history, "llllllllllll");

  return (
    <div>
      {props.history.map((item) => {
        return (
          <pre>
            <li>
              {item.method} {item.url}
            </li>
            <button
              onClick={() => {
                props.handleApiCall({
                  method: item.method,
                  url: item.url
                });
              }}
            >
              go
            </button>
          </pre>
        );
      })}
    </div>
  );
}

export default history;
