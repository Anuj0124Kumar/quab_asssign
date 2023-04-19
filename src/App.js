import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./page/Home";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Movie:id" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
