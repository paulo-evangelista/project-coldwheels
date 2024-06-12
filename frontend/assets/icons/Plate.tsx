import React from "react";

function Plate({ width = "50px", height = "50px" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M18 10H6m15-4H3m18 8H3m15 4H6"
      ></path>
    </svg>
  );
}

export default Plate;
