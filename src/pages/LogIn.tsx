import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Login.css";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/dashboard");
  }, [user, loading]);
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="flex flex-col text-center bg-slate-200 p-[30px]">
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
          className="p-[10px] mb-[10px] text-xl bg-black text-white"
          onClick={() => logInWithEmailAndPassword(email, password)}
        >
          Login
        </button>
        <button
          className="p-[10px] mb-[10px] text-xl text-white bg-blue-600"
          onClick={signInWithGoogle}
        >
          Login with Google
        </button>
        <div className="mt-4">
          <p className="hover:text-blue-800 duration-300">
            <Link to="/reset">Forgot Password</Link>
          </p>
        </div>
        <div>
          Don't have an account?{" "}
          <span className="text-blue-600 hover:text-blue-800 duration-300">
            <Link to="/signup">Register now.</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
export default LogIn;
