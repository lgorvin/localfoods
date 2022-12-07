import { useState } from "react";
import Landing from "./components/Landing";
import NavBar from "./components/NavBar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <NavBar />
      <Landing />
    </div>
  );
}

export default App;
