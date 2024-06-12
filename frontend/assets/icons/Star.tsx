import React from "react";

function Star({width="50px", height="50px"}) {
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
        strokeWidth="2"
        d="M14 2.333l3.605 7.304 8.062 1.178-5.834 5.682 1.377 8.026L14 20.732l-7.21 3.791 1.377-8.026-5.834-5.682 8.062-1.178L14 2.333z"
      ></path>
    </svg>
  );
}

export default Star;