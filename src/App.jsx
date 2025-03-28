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

import { UserContext } from './context/UserContext'; 


import './App.css'

import {Navigate, BrowserRouter, Route, Routes, Link} from "react-router-dom";

function App() {
  const { token, isAdmin } = useContext(UserContext);
  console.log("token", token);
  console.log("isAdmin", isAdmin); // indica si es administrador
  
  return (
    <>
      <div className="container">
        <BrowserRouter>
            <Header/>
            <Navbar/>
            <Asidebar/>
            
            <main>
              <Routes>
                <Route path="/" element={!isAdmin?<ProductsPage/> : <EditProductsPage/>}/>
                <Route path="/product/:id" element={!isAdmin?<ProductPage/> : <EditProductPage/>}/>
                <Route path="/cart" element={<CartPage/>}/>
                <Route path="/register" element ={!token?<RegisterPage/> : <Navigate to="/"/>}/>
                <Route path="/login" element ={!token?<LoginPage/> : <Navigate to="/"/>}/>
              </Routes>
            </main>
            <Footer/>
        </BrowserRouter>
        
        </div>
    </>
  )
}

export default App
 