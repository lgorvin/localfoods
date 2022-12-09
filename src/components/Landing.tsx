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
        <div className="flex justify-center ">
          <div className="mt-72 ml-[-700px]">
            <h1 className="text-6xl font-bold text-right mb-2 animate__animated animate__backInLeft">
              BUY <span className="text-green-500 font-bold">LOCAL</span>{" "}
            </h1>
            <h1 className="text-7xl font-bold text-right mb-2 animate__animated animate__backInLeft animate__delay-1s">
              GROW <span className="text-green-500 font-bold">LOCAL</span>
            </h1>
            <h1 className="text-8xl font-bold text-right animate__animated animate__backInLeft animate__delay-2s">
              THINK <span className="text-green-500">LOCAL</span>
            </h1>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="bg-black  mt-[-300px] h-[400px] w-[20px] shadow-md rounded-sm"></div>
        </div>
        <div className="bg-gray-100 ml-[1000px] mt-[-400px] h-[400px] w-[500px] rounded-lg animate__animated animate__backInRight animate__delay-3s">
          <img
            className="h-full rounded-sm shadow-md border-4 border-black"
            src={localImg}
            alt=""
          />
        </div>
        <Link
          activeClass="active"
          to="test1"
          spy={true}
          smooth={true}
          offset={50}
          duration={500}
        >
          <h1 className="text-center text-xl cursor-pointer font-bold mt-36">
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
