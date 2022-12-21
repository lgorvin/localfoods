import React from "react";
import "animate.css";
import * as Scroll from "react-scroll";
import {
  Link,
  Button,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller,
} from "react-scroll";
import localImg from "../assets/alex-hudson-m3I92SgM3Mk-unsplash.jpg";

const Landing = () => {
  return (
    <>
      <div className="mt-[-10px]">
        <div className="flex justify-center w-screen ">
          <div className="xl:mt-72 lg:mt-72 mt-[100px] lg:ml-[-570px] xl:ml-[-750px] duration-500">
            <h1 className="xl:text-6xl lg:text-5xl text-2xl font-bold text-center lg:text-right mb-2 animate__animated animate__backInLeft duration-500">
              BUY <span className="text-green-500 font-bold">LOCAL</span>{" "}
            </h1>
            <h1 className="xl:text-7xl lg:text-6xl text-3xl font-bold text-center lg:text-right mb-2 animate__animated animate__backInLeft animate__delay-1s duration-500">
              GROW <span className="text-green-500 font-bold">LOCAL</span>
            </h1>
            <h1 className="xl:text-8xl lg:text-7xl text-4xl font-bold text-center lg:text-right animate__animated animate__backInLeft animate__delay-2s duration-500">
              THINK <span className="text-green-500">LOCAL</span>
            </h1>
          </div>
        </div>
        <div className="flex justify-center w-screen">
          <div className="bg-black mt-[30px] lg:mt-[-250px]  xl:mt-[-330px] h-[10px] w-[300px] lg:h-[300px] lg:w-[20px] xl:h-[400px] xl:w-[20px] shadow-md rounded-sm duration-500"></div>
        </div>
        <div className="flex justify-center ">
          <div className="bg-gray-100 xl:ml-[600px] lg:ml-[600px]  mt-[30px] lg:mt-[-300px] xl:mt-[-400px] h-[200px] w-[300px] lg:h-[300px] lg:w-[400px] xl:h-[400px] xl:w-[500px] rounded-lg duration-500 animate__animated animate__backInRight animate__delay-3s">
            <img
              className="h-full rounded-sm shadow-md border-4 border-black"
              src={localImg}
              alt=""
            />
          </div>
        </div>
        <Link
          activeClass="active"
          to="test1"
          spy={true}
          smooth={true}
          offset={50}
          duration={500}
        >
          <h1 className="text-center text-xl cursor-pointer font-bold mt-40 lg:mt-36">
            SEE HOW IT WORKS
          </h1>
        </Link>
      </div>
      <div className="h-screen">
        <Element name="test1" className="element">
          <p className="mx-10 pt-16">
            Sign up for an account and choose either Supplier or Consumer. As a
            consumer set your location and find all local foods within a 10 mile
            radius. Suppliers can list all their products and push discounts.
            The closer you are to the supplier the greater the discount you
            receive up to 10%. For example if you live 1 Mile away you will
            receive a 10% discount, if you live 9 miles away you will receive a
            1% discount. This helps to encourage people to travel less reducing
            the effect we place on the environment. As a consumer you can filter
            out products you don't like. Firebase to handle authentication.
            Different pages depending on wether user is a Supplier or a
            Consumer. Supplier page allows them to set their business up on the
            site with pictures, location and a bio. Supplier account will give
            access to analytics such as product views and sales. Consumers can
            like products and add businesses to their favourites. Suppliers can
            offer delivery and collection if they wish. Consumers will be able
            to track their orders and find out when their order will be
            delivered or when they can collect. There will be a messaging system
            for consumers to message suppliers, strict rules in place to stop
            trolls.
          </p>
        </Element>
      </div>
    </>
  );
};

export default Landing;
