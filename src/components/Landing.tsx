import React from "react";

const Landing = () => {
  return (
    <>
      <div className="flex justify-center">
        <div className="mt-72 ">
          <h1 className="text-5xl font-bold text-right">
            BUY <span className="text-green-500 font-bold">LOCAL</span>{" "}
          </h1>
          <h1 className="text-6xl font-bold text-right">
            GROW <span className="text-green-500 font-bold">LOCAL</span>
          </h1>
          <h1 className="text-7xl font-bold text-right">
            THINK <span className="text-green-500">LOCAL</span>
          </h1>
        </div>
      </div>
      <div className="bg-black ml-[1050px] mt-[-260px] h-[350px] w-[20px] rounded-sm"></div>
      <div className="bg-gray-100 ml-[1100px] mt-[-350px] h-[350px] w-[350px]">
        <img
          className="h-full"
          src="https://th.bing.com/th/id/R.db3f63420b79d9bf39dead9d096a165f?rik=TTUj8rdQZsKGlg&pid=ImgRaw&r=0"
          alt=""
        />
      </div>
    </>
  );
};

export default Landing;
