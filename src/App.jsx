import { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Asidebar from './components/asidebar';
import Footer from './components/footer';
import Products from './components/products';
import Header from './components/header';
import Navbar from './components/navbar';

import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';

import { UserContext } from './context/UserContext'; 

import './App.css'

import {Navigate, BrowserRouter, Route, Routes, Link} from "react-router-dom";

function App() {
  const { token } = useContext(UserContext);
  console.log("token", token);
  
  return (
    <>
      <div>
        <BrowserRouter>
          <Header/>
          <Navbar/>
          <Asidebar/>
          <Products/>
          

          <Routes>
            <Route path="/" element ={<Products/>}/>              
            <Route path="/register" element ={!token?<RegisterPage/> : <Navigate to="/"/>}/>
            <Route path="/login" element ={!token?<LoginPage/> : <Navigate to="/"/>}/>
          </Routes>

          <Footer/>
        </BrowserRouter>

        </div>
    </>
  )
}

export default App
 

/* import './App.css'
import { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Componentes
import Header from './components/header'
import Navbar from './components/navbar'
import Sidebar from './components/asidebar'

// Páginas
import Home from './pages/Home'
import Products from './pages/products'
import Cart from './pages/Cart'

function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid">
        <Header />
        <Navbar />
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <main className="col-md-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App */