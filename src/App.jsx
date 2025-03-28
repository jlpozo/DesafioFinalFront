import { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Asidebar from './components/asidebar';
import Footer from './components/footer';

import Header from './components/header';
import Navbar from './components/navbar';

import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import ProductsPage from './pages/productsPage';
import ProductPage from './pages/productPage';
import CartPage from './pages/cartPage';

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

            <Routes>
              <Route path="/" element ={<ProductsPage/>}/>
              <Route path="/product/:id" element={<ProductPage/>}/>
              <Route path="/cart" element={<CartPage/>}/>
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
 