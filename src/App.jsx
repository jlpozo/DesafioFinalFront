import { useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Asidebar from './components/asidebar';
import Footer from './components/footer';

import Header from './components/header';
import Navbar from './components/navbar';

import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import ProductsPage from './pages/productsPage';
import EditProductsPage from './pages/editProductsPage';
import ProductPage from './pages/productPage';
import EditProductPage from './pages/editProductPage';
import CartPage from './pages/cartPage';
import AddProductPublic from './pages/addProductPublic';
import OrderPage from './pages/orderPage';
import Home from './pages/home';

import { UserContext } from './context/UserContext'; 

import './App.css'

import {Navigate, BrowserRouter, Route, Routes, Link} from "react-router-dom";

function App() {
  const { token, isAdmin } = useContext(UserContext);
  console.log("token", token);
  console.log("isAdmin", isAdmin); // indica si es administrador
  
  return (
    <>
      <BrowserRouter>
        <div className="container d-flex flex-column min-vh-100">
          <Header/>
          <Navbar/>
          
          <div className="row flex-grow-1">
            <div className="col-md-3">
              <Asidebar/>
            </div>
            
            <div className="col-md-9">
              <main className="py-3">
                <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/:id" element={!isAdmin?<ProductsPage/> : <EditProductsPage/>}/>
                  <Route path="/product/:id" element={!isAdmin?<ProductPage/> : <EditProductPage/>}/>
                  <Route path="/cart" element={<CartPage/>}/>
                  <Route path="/register" element ={!token?<RegisterPage/> : <Navigate to="/"/>}/>
                  <Route path="/login" element ={!token?<LoginPage/> : <Navigate to="/"/>}/>
                  <Route path="/addProductPublic" element={<AddProductPublic/>}/>
                  <Route path="/orderConfirm" element={<OrderPage/>}/>
                </Routes>
              </main>
            </div>
          </div>
          
          <Footer/>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
 