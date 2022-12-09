import React from "react";
import "animate.css";

const About = () => {
  return (
    <div>
      <div>
        <h1 className="text-6xl mt-12 text-center font-bold text-green-500">
          ABOUT
        </h1>
        <h1 className="text-6xl  text-center font-bold text-green-500">US</h1>
      </div>
      <div className="flex justify-center">
        <div className="bg-black rotate-90  mt-[-175px] h-[400px] w-[10px] shadow-md rounded-sm"></div>
      </div>
      <div className="grid place-items-center grid-cols-2 mt-[-150px] mx-[500px]">
        <div className="h-[500px] w-[400px] group hover:bg-white rounded-lg shadow-md bg-green-500 duration-700 animate__animated animate__backInLeft">
          <div className="flex justify-center items-center h-full">
            <h1 className="text-center text-7xl group-hover:hidden text-white font-bold duration-700">
              OUR <br /> MISSION
            </h1>
            <p className="text-center text-xl hidden group-hover:block text-black font-bold mx-5 mt-5 duration-700">
              We aim to help build stronger and more sustainable local food
              systems by connecting farmers and producers with consumers in
              their communities.
            </p>
          </div>
        </div>
        <div className="h-[500px] w-[400px] group hover:bg-white rounded-lg shadow-md bg-green-500 duration-700 animate__animated animate__backInRight">
          <div className="flex justify-center items-center h-full">
            <h1 className="text-center text-7xl group-hover:hidden text-white font-bold duration-700">
              WHY <br /> US?
            </h1>
            <p className="text-center text-xl hidden group-hover:block text-black font-bold mx-5 mt-5 duration-700">
              We believe that locally-sourced foods are not only delicious, but
              also better for the environment and for the local economy. By
              choosing to shop on Think Local, you can be sure that you are
              supporting your local community and helping to create a more
              sustainable food system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
