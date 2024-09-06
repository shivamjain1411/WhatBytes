"use client";
import React, { useState } from "react";
import Hamburger from "hamburger-react";
function Sidebar() {
  const [isOopen, setOopen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Hamburger icon visible on small screens */}
      <div className="lg:hidden p-4">
        <Hamburger
          className="text-2xl cursor-pointer"
          toggled={isOopen}
          toggle={setOopen}
          onClick={toggleSidebar}
        />
      </div>

      <div
        className={`bg-white shadow-md lg:block ${
          isOpen ? "block" : "hidden"
        } lg:h-full`}
      >
        <ul className="mt-6 space-y-4">
          <li className="text-gray-700 hover:text-blue-500 cursor-pointer font-bold text-xl py-4 mr-2 pl-4">
            Dashboard
          </li>
          <li className="text-blue-500 cursor-pointer font-bold text-xl pl-4 bg-gray-200 rounded-r-full border-red-500 py-4 mr-2">
            Skill Test
          </li>
          <li className="text-gray-700 hover:text-blue-500 cursor-pointer font-bold text-xl py-4 mr-2 pl-4">
            Internship
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
