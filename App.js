import React, { useState } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/loginPage'
import SignUp from './components/signup'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Product from './components/Product'
import Customer from './components/Customers'
import Sidebar from './components/Dashboard/DashBoard'
import ReactPrinter from './components/PrintComponents/printComponent'
import Sales from './components/SalePurchase/Sales'
import Purchase from './components/SalePurchase/Purchase'
import Forgot from './components/Forgot'


function App() {

  return (
    <Router>
      <div>

        <ToastContainer position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='colored' />
        <Routes>
          {/*pages */}
          <Route exact path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          {/* after login routes */}
          <Route path="/product" element={< Product />} />
          <Route path="/customer" element={< Customer />} />
          {/* miscellaneous */}
          <Route path="/dashboard" element={<Sidebar />} />
          <Route path="/print" element={<ReactPrinter />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/forgot" element={<Forgot />} />

        </Routes>
      </div>
    </Router>
  )
}
export default App