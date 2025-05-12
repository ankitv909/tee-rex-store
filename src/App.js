import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductListing from './pages/ProductListing';
import CartPage from './pages/CartPage';
import { CartProvider, useCart } from './context/CartContext';
import { ToastContainer } from 'react-toastify';
import { FiShoppingCart } from 'react-icons/fi';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const CartIcon = () => {
    const { cart } = useCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <Link to="/cart" className="cart-link" >
            <FiShoppingCart size={24} Color="#6d6d6d" />
            {totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </Link>
    );
};

const App = () => (
    <CartProvider>
        <Router>
            <ToastContainer position="top-right" autoClose={2000} />
            <header className="header">
                <Link to="/" className="nav-main-Color" style={{ textDecoration: 'none' }}>
                    <h2>TeeRex Store</h2>
                </Link>
                <nav className="nav">
                    <Link to="/" className="nav-text-Color">Products</Link>
                    <CartIcon />
                </nav>
            </header>
            <Routes>
                <Route path="/" element={<ProductListing />} />
                <Route path="/cart" element={<CartPage />} />
            </Routes>
        </Router>
    </CartProvider>
);

export default App;
