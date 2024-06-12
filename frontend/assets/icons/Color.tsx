import React from "react";

function Color({ width = "50px", height = "50px"}) {
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
        d="M2 2l14.5 3.5L18 13l-5 5-7.5-1.5L2 2zm0 0l7.586 7.586M12 19l7-7 3 3-7 7-3-3zm1-8a2 2 0 11-4 0 2 2 0 014 0z"
      ></path>
    </svg>
  );
}

export default Color;
