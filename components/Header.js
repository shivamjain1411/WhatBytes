import React from "react";
import logo from "../Images/logo.png";
import Image from "next/image";
import { Avatar } from "@nextui-org/avatar";
function Header() {
  return (
    <div className="h-24 border">
      <div className="flex justify-between">
        <div className="flex items-center">
          <Image src={logo} alt="Logo" className="h-12 w-auto" />
          <h1 className="text-4xl font-bold">WhatBytes</h1>
        </div>
        <div>
          <div className="m-4 flex border-2 border-gray-300 rounded-lg items-center">
            <Avatar src="" className="w-6 h-6 text-tiny rounded-full" />
            <h1 className="text-lg font-bold px-2">Rahil Siddique</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
