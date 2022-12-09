import { useState } from "react";
import Landing from "./components/Landing";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
