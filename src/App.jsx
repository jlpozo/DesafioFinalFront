import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Asidebar from './components/asidebar';
import Footer from './components/footer';
import Main from './components/main';
import Header from './components/header';
import Navbar from './components/navbar';


import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Navbar/>
        <Asidebar/>
        <Header/>
        <Footer/>
      </div>
    </>
  )
}

export default App
