import React from "react";
import "./app/styles/global.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./app/pages/Home";
import Layout from "./app/components/layouts/Navbar";
import Detail from "./app/pages/Detail";
import Create from "./app/pages/Employees";
import Login from "./app/pages/Login";
import HomeFilter from "./app/pages/HomeFilter";
import NotFound from "./app/pages/NotFound";

function App() {
  return (
    <Router>
      <Layout />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employees/:id" element={<Detail />} />
        <Route path="/table" element={<HomeFilter />} />
        <Route path="/employees" element={<Create />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
