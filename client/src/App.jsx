import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Paymentsuccess from './PaymentSuccess';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/paymentsuccess" element={<Paymentsuccess/>}/>
      </Routes>
    </Router>
  )
}

export default App
