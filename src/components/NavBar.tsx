import logo from "../assets/logo.png";
import { Outlet, NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useMediaQuery } from "react-responsive";
import "animate.css";
import App from "../App";

const NavBar = () => {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [supplier, setSupplier] = useState(false);
  const [consumer, setConsumer] = useState(false);

  const [dropDown, setDropDown] = useState(false);
  const handleDropDown = () => setDropDown(!dropDown);
  const navigate = useNavigate();

  const tailwindLg = useMediaQuery({ query: "(min-width: 1024px)" });
  const tailwindMd = useMediaQuery({ query: "(min-width: 758px)" });

  //Fetches user's name and wether they are consumer or supplier
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      console.log(data);
      setName(data.name);
      setSupplier(data.supplier);
      setConsumer(data.consumer);
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);
  return (
    <div className="">
      <div className="w-screen  h-[75px] pb-[150px] mt-[-40px] bg-white shadow-md">
        {/* <img className="mt-[85px] mx-[90px] scale-90" src={logo} alt="" /> */}
        <NavLink to="/">
          <h1 className="lg:ml-16 text-center lg:text-left font-bold text-6xl ">
            <span className="text-4xl font-black">
              <br />
              THINK | <span className=" text-green-500">LOCAL</span>
            </span>
          </h1>
        </NavLink>
        {tailwindLg && (
          <ul className="text-center mt-[-36px] " id="list">
            <li className="xl:mx-6 mx-2 ml-48 font-semibold text-xl text-black hover:scale-110 duration-300 cursor-pointer">
              <NavLink to="/">Home</NavLink>
            </li>

            <li className="xl:mx-6 mx-2 font-semibold text-xl text-black hover:scale-110 duration-300 cursor-pointer">
              <NavLink to="/findfood">Food Hub</NavLink>
            </li>

            {supplier && (
              <li className="xl:mx-6 mx-2 font-semibold text-xl text-black hover:scale-110 duration-300 cursor-pointer">
                <NavLink to="/supplierhub">Supplier Hub</NavLink>
              </li>
            )}
            <li className="xl:mx-6 mx-2 font-semibold text-xl text-black hover:scale-110 duration-300 cursor-pointer">
              <NavLink to="/about">About</NavLink>
            </li>
            <li className="xl:mx-6 mx-2 font-semibold text-xl text-black hover:scale-110 duration-300 cursor-pointer">
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
          </ul>
        )}

        {tailwindLg && (
          <>
            {!user && (
              <button className="bg-white rounded-md shadow-md border-2 font-semibold border-black px-6 py-2 float-right mt-[-35px] mr-[64px] hover:bg-green-500 active:scale-95 hover:text-white duration-500">
                <h1 className=" font-bold inline">
                  <NavLink to="/signup">SIGN UP</NavLink>
                </h1>
              </button>
            )}
          </>
        )}
        {tailwindLg && (
          <>
            {!user && (
              <button className="bg-white rounded-md shadow-md border-2 font-semibold border-black px-6 py-2 float-right mt-[-35px] mx-[15px] hover:bg-green-500 active:scale-95 hover:text-white duration-500">
                <h1 className=" font-bold inline">
                  <NavLink to="/login">LOG IN</NavLink>
                </h1>
              </button>
            )}
          </>
        )}
        {tailwindLg && (
          <>
            {user && (
              <div className="float-right mt-[-45px] mr-[35px]">
                <h1 className="text-black text-3xl">
                  <NavLink to="/dashboard">{name}</NavLink>
                </h1>
                <h1
                  className="cursor-pointer hover:text-xl duration-300"
                  onClick={logout}
                >
                  Log Out?
                </h1>
              </div>
            )}
          </>
        )}
      </div>
      {!dropDown && (
        <>
          {!tailwindLg && (
            <div className="bg-white h-[40px] border-slate-200 border-b-2 shadow-lg w-screen">
              <div className="flex justify-center items-center">
                {/* <svg
                  onClick={handleDropDown}
                  className="absolute mt-[15px] ml-[-2px] scale-[0.1]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z" />
                </svg> */}
                <svg
                  onClick={handleDropDown}
                  className="absolute mt-[10px] ml-[-2px] scale-[0.2] min-h-[200px] max-h-[200px] hover:scale-[0.3] duration-300"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M3,8H21a1,1,0,0,0,0-2H3A1,1,0,0,0,3,8Zm18,8H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Zm0-5H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z" />
                </svg>
              </div>
            </div>
          )}
        </>
      )}
      <div>
        {!tailwindLg && (
          <>
            {dropDown && (
              <div className="bg-white absolute z-30 h-[270px] w-screen flex justify-center animate__animated ">
                <ul className="text-center mt-[170px] ">
                  <li
                    onClick={handleDropDown}
                    className=" duration-300 cursor-pointer"
                  >
                    <svg
                      onClick={handleDropDown}
                      className={
                        user
                          ? "scale-[0.25] mt-[-235px] ml-[-2px] mb-[-60px] rotate-180 cursor-pointer"
                          : "scale-[0.15] mt-[-300px] ml-[-2px] mb-[-135px] rotate-180 cursor-pointer"
                      }
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17,9.17a1,1,0,0,0-1.41,0L12,12.71,8.46,9.17a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42l4.24,4.24a1,1,0,0,0,1.42,0L17,10.59A1,1,0,0,0,17,9.17Z" />
                    </svg>
                  </li>
                  <li className="mx-6 font-semibold text-xl text-black hover:scale-110 duration-300 cursor-pointer">
                    <NavLink to="/">Home</NavLink>
                  </li>
                  <li className="mx-6 font-semibold text-xl text-black hover:scale-110 duration-300 cursor-pointer">
                    <NavLink to="/test">test</NavLink>
                  </li>

                  <li className="mx-6 font-semibold text-xl text-black hover:scale-110 duration-300 cursor-pointer">
                    <NavLink to="/findfood">Food Hub</NavLink>
                  </li>

                  {supplier && (
                    <li className="mx-6 font-semibold text-xl text-black hover:scale-110 duration-300 cursor-pointer">
                      <NavLink to="/supplierhub">Supplier Hub</NavLink>
                    </li>
                  )}
                  <li className="mx-6 font-semibold text-xl text-black hover:scale-110 duration-300 cursor-pointer">
                    <NavLink to="/about">About</NavLink>
                  </li>
                  <li className="mx-6 font-semibold text-xl text-black hover:scale-110 duration-300 cursor-pointer">
                    <NavLink to="/dashboard">Dashboard</NavLink>
                  </li>
                  {!user && (
                    <button className="bg-white rounded-md shadow-md border-2 font-semibold border-black px-6 py-2  mt-[25px] mr-[64px] hover:bg-green-500 active:scale-95 hover:text-white duration-500">
                      <h1 className=" font-bold inline">
                        <NavLink to="/signup">SIGN UP</NavLink>
                      </h1>
                    </button>
                  )}
                  {!user && (
                    <button className="bg-white rounded-md shadow-md border-2 font-semibold border-black px-6 py-2  mt-[25px] mx-[15px] hover:bg-green-500 active:scale-95 hover:text-white duration-500">
                      <h1 className=" font-bold inline">
                        <NavLink to="/login">LOG IN</NavLink>
                      </h1>
                    </button>
                  )}
                  {user && (
                    <div className=" mt-[10px]">
                      <h1 className="text-black text-3xl">
                        <NavLink to="/dashboard">{name}</NavLink>
                      </h1>
                      <h1
                        className="cursor-pointer hover:text-xl duration-300"
                        onClick={logout}
                      >
                        Log Out?
                      </h1>
                    </div>
                  )}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default NavBar;
