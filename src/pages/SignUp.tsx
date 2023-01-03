import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase";
import "./Register.css";
function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [supplier, setSupplier] = useState(false);
  const handleSClick = () => setSupplier(!supplier);
  const [consumer, setConsumer] = useState(false);
  const handleCClick = () => setConsumer(!consumer);
  const [company, setCompany] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);

  const history = useNavigate();
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(
      name,
      supplier,
      consumer,
      email,
      password,
      company,
      lat,
      long
    );
  };
  useEffect(() => {
    //if user now logged in take them to dashboard
    if (loading) return;
    if (user) history("/dashboard");
  }, [user, loading]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  }, [user, loading]);
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col text-center bg-slate-200 p-[30px]">
        <div className="">
          <h1 className="mb-[-10px] font-bold">Consumer or Supplier?</h1> <br />
          <h1 className="text-center inline">Supplier</h1>
          <input
            type="checkbox"
            className=" inline ml-5 scale-125"
            // value={supplier}
            checked={supplier}
            onClick={handleSClick}
            placeholder="Supplier?"
          />
          {supplier && (
            <input
              className="mx-2 px-2 py-2 duration-300"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company Name"
            />
          )}
        </div>
        <div className="mb-5">
          <h1 className="text-center inline">Consumer</h1>
          <input
            type="checkbox"
            className=" inline ml-5 scale-125"
            // value={supplier}
            checked={consumer}
            onClick={handleCClick}
            placeholder="Supplier?"
          />
          {supplier && consumer ? (
            <h1 className="mt-2 font-black">ONLY PICK ONE</h1>
          ) : (
            <h1></h1>
          )}
        </div>
        <input
          type="text"
          className="p-[10px] mb-[10px] text-xl"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />

        <input
          type="text"
          className="p-[10px] mb-[10px] text-xl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="p-[10px] mb-[10px] text-xl"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="p-[10px] mb-[10px] text-xl text-white bg-black"
          onClick={register}
        >
          Register
        </button>
        <button
          className="p-[10px] mb-[10px] text-xl text-white bg-blue-600"
          onClick={signInWithGoogle}
        >
          Register with Google
        </button>
        <div className="mt-4">
          Already have an account?{" "}
          <span className="text-blue-600 hover:text-blue-800 duration-300">
            <Link to="/login">Login now.</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
