import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Add from "./components/add/Add";
import Update from "./components/update/Update";
import "./App.css";
import Home from "./components/home/Home";

function App() {

  // routes setup
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add/:id" element={<Add />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
    </Router>
  );
}

export default App;
