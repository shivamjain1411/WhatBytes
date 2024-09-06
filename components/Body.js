import React from "react";
import Sidebar from "./Sidebar";
import PercentileGraph from "./PercentileGraph";

function Body() {
  return (
    <div className="flex h-screen">
      {/* Sidebar with 1/5 screen width */}
      <div className="w-1/6">
        <Sidebar />
      </div>
      {/* PercentileGraph takes the remaining width */}
      <div className="w-5/6 ">
        <PercentileGraph />
      </div>
    </div>
  );
}

export default Body;
