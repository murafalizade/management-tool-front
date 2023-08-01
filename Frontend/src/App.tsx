import React from 'react';
import './app/styles/global.scss';
import {BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Home from './app/pages/Home';
import Layout from './app/components/Layout';
import Detail from './app/pages/Detail';
import Create from './app/pages/Create';
import Login from './app/pages/Login';

function App() {
  return (
    <Router>
      <Layout/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/detail/:id" element={<Detail/>} />
        <Route path="/create" element={<Create/>} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
