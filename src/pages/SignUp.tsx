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
  const history = useNavigate();
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(
      name,
      supplier,
      consumer,
      email,
      password,
      company
    );
  };
  useEffect(() => {
    if (loading) return;
    if (user) history("/dashboard");
  }, [user, loading]);
  return (
    <div className="register mt-[-50px] scale-110">
      <div className="register__container">
        <div className="">
          <h1 className="mb-[-10px] font-bold">Consumer or Supplier?</h1> <br />
          <h1 className="text-center inline">Supplier</h1>
          <input
            type="checkbox"
            className="register__textBox inline ml-5 scale-125"
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
            className="register__textBox inline ml-5 scale-125"
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
          className="register__textBox"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />

        <input
          type="text"
          className="register__textBox"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="register__textBox"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className="register__btn" onClick={register}>
          Register
        </button>
        <button
          className="register__btn register__google"
          onClick={signInWithGoogle}
        >
          Register with Google
        </button>
        <div>
          Already have an account? <Link to="/login">Login</Link> now.
        </div>
      </div>
    </div>
  );
}
export default SignUp;
