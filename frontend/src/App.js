import React, {useState, useEffect} from 'react';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Header from './components/Header';


function App() {


  return (
    <>
    <Router basename='/'>
      <div className='container'>
      <Header />
      <Routes>
        <Route  path='/' element={<Dashboard />}/>
        <Route  path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />} />
      </Routes>
      </div>
    </Router>
    <ToastContainer />
    </>
  );
}

export default App;
