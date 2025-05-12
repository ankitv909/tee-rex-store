import React, {createContext, useContext, useEffect, useState} from 'react';
import {toast} from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                if (existing.quantity >= existing.maxQuantity) {
                    toast.error(`Only ${existing.maxQuantity} items available in stock!`);
                    return prev;
                }
                return prev.map((item) => item.id === product.id ? {...item, quantity: item.quantity + 1} : item);
            }
            return [...prev, {...product, quantity: 1, maxQuantity: product.quantity}];
        });
    };

    const updateQuantity = (id, newQuantity) => {
        setCart((prev) => {
            const item = prev.find((i) => i.id === id);
            if (!item) return prev;

            if (newQuantity > item.maxQuantity) {
                toast.error(`Only ${item.maxQuantity} items available in stock!`);
                return prev;
            }

            if (newQuantity <= 0) {
                return prev.filter((i) => i.id !== id);
            }

            return prev.map((i) => i.id === id ? {...i, quantity: newQuantity} : i);
        });
    };

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    return (<CartContext.Provider value={{cart, addToCart, removeFromCart, updateQuantity}}>
        {children}
    </CartContext.Provider>);
};

export const useCart = () => useContext(CartContext);
