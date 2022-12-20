import logo from "../assets/logo.png";
import { Outlet, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

const NavBar = () => {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [supplier, setSupplier] = useState(false);
  const [consumer, setConsumer] = useState(false);
  const navigate = useNavigate();
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
            <Link to="/findfood">Food Hub</Link>
          </li>

          {supplier && (
            <li className="mx-6 font-semibold text-xl text-black hover:scale-110 duration-300 cursor-pointer">
              <Link to="/supplierhub">Supplier Hub</Link>
            </li>
          )}
          <li className="mx-6 font-semibold text-xl text-black hover:scale-110 duration-300 cursor-pointer">
            <Link to="/about">About</Link>
          </li>
          <li className="mx-6 font-semibold text-xl text-black hover:scale-110 duration-300 cursor-pointer">
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
        {!user && (
          <button className="bg-white rounded-md shadow-md border-2 font-semibold border-black px-6 py-2 float-right mt-[-35px] mr-[64px] hover:bg-green-500 active:scale-95 hover:text-white duration-500">
            <h1 className=" font-bold inline">
              <Link to="/signup">SIGN UP</Link>
            </h1>
          </button>
        )}

        {!user && (
          <button className="bg-white rounded-md shadow-md border-2 font-semibold border-black px-6 py-2 float-right mt-[-35px] mx-[15px] hover:bg-green-500 active:scale-95 hover:text-white duration-500">
            <h1 className=" font-bold inline">
              <Link to="/login">LOG IN</Link>
            </h1>
          </button>
        )}

        {user && (
          <div className="float-right mt-[-45px] mr-[35px]">
            <h1 className="text-black text-3xl">{name}</h1>
            <h1
              className="cursor-pointer hover:text-xl duration-300"
              onClick={logout}
            >
              Log Out?
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;