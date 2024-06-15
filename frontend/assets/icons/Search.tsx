import React from "react";

function Search({width="50px", height="50px"}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 28 28"
    >
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M12.833 7a5.833 5.833 0 015.834 5.833m.768 6.598L24.5 24.5m-2.333-11.667a9.333 9.333 0 11-18.667 0 9.333 9.333 0 0118.667 0z"
      ></path>
    </svg>
  );
}

export default Search;