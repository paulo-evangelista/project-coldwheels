import React from "react";

function Truck({ height = "50px", width = "50px"}) {
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
        d="M16 16V3H1v13h15zm0 0h7v-5l-3-3h-4v8zm-8 2.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0zm13 0a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
      ></path>
    </svg>
  );
}

export default Truck;
