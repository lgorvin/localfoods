import { useState } from "react";
import Landing from "./components/Landing";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import Reset from "./pages/Reset";
import Dashboard from "./pages/Dashboard";
import SellFood from "./pages/SellFood";
import FindFood from "./pages/FindFood";
import Test from "./pages/Test";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/supplierhub" element={<SellFood />} />
        <Route path="/findfood" element={<FindFood />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
