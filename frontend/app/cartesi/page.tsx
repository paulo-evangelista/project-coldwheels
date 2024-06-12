'use client'
import React from "react";
import { Network } from "../../components/Network/Network";
import { Inspect } from "../../components/Inspect/Inspect";
import { Report } from "../../components/Report/Report";
import { Notice } from "../../components/Notice/Notice";

const Cartesi = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="grid grid-cols-2 gap-4 p-5">
        <div className="bg-white p-5 rounded-lg shadow-md">
          <Network />
          <Report />
          <Notice />
        </div>
        <div className="bg-white p-5 rounded-lg shadow-md">
          <Inspect />
        </div>
      </div>
    </div>
  );
};

export default Cartesi;
