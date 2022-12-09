import React from "react";
import logo from "../assets/logo.png";
import { Outlet, Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="">
      <div className="w-screen h-[75px] pb-[150px] mt-[-40px] bg-white  shadow-md">
        {/* <img className="mt-[85px] mx-[90px] scale-90" src={logo} alt="" /> */}
        <h1 className="ml-16 font-bold text-6xl ">
          <span className="text-4xl font-black">
            <br />
            THINK | <span className=" text-green-500">LOCAL</span>
          </span>
        </h1>
        <ul className="text-center mt-[-36px] " id="list">
          <li className="mx-6 font-semibold text-xl text-black hover:scale-110 duration-300 cursor-pointer">
            <Link to="/">Home</Link>
          </li>
          <li className="mx-6 font-semibold text-xl text-black hover:scale-110 duration-300 cursor-pointer">
            Find Food
          </li>
          <li className="mx-6 font-semibold text-xl text-black hover:scale-110 duration-300 cursor-pointer">
            Sell Food
          </li>
          <li className="mx-6 font-semibold text-xl text-black hover:scale-110 duration-300 cursor-pointer">
            <Link to="/about">About</Link>
          </li>
        </ul>
        <button className="bg-white rounded-md shadow-md border-2 font-semibold border-black px-6 py-2 float-right mt-[-35px] mr-[64px] hover:bg-green-500 active:scale-95 hover:text-white duration-500">
          <h1 className=" font-bold inline">
            <Link to="/signup">SIGN UP</Link>
          </h1>
        </button>
        <button className="bg-white rounded-md shadow-md border-2 font-semibold border-black px-6 py-2 float-right mt-[-35px] mx-[15px] hover:bg-green-500 active:scale-95 hover:text-white duration-500">
          <h1 className=" font-bold inline">
            <Link to="/login">LOG IN</Link>
          </h1>
        </button>
      </div>
    </div>
  );
};

export default NavBar;
