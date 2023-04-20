import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./page/Home";
import Summary from "./page/Summary";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route  path="Movie/:id" element={<Summary />} />
      </Routes>
    </>
  );
}

export default App;
