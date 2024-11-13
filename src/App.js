import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Menu from './components/Menu';
import Product from './components/Product'; // Import the Product component
import Cart from './components/Cart';
import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <main className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="cart/:cartId" element={<Cart />} />
            <Route path="pdp/:productId" element={<Product />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

      </div>
    </Router>
  );
}

export default App;
