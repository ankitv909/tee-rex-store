import React from 'react';
import {useCart} from '../context/CartContext';

const CartPage = () => {
    const {cart, updateQuantity, removeFromCart} = useCart();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (<>
        <div className="cart-page">
            <h3>Shopping Cart</h3>
        </div>

        <div className="shopping-cart">
            {cart.map(item => (<div key={item.id} className="cart-item">
                <img src={item.imageURL} alt={item.name} className="cart-item-img"/>
                <div className="cart-item-info">
                    <strong>{item.name}</strong>
                    <p>Rs {item.price}</p>
                </div>
                <div className="cart-item-actions">
                    <select
                        className="cart-item-select"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                    >
                        {[...Array(item.maxQuantity).keys()].map(q => (
                            <option key={q + 1} value={q + 1}>Qty: {q + 1}</option>))}
                    </select>
                    <button className="cart-item-delete" onClick={() => removeFromCart(item.id)}>Delete</button>
                </div>
            </div>))}

            <hr className="cart-total-divider"/>
            <div className="cart-total">
                <strong>Total amount</strong>
                <span>Rs. {total}</span>
            </div>
        </div>
    </>);
};

export default CartPage;
