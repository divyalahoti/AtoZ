import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('atoz_cart')) || [];
    } catch { return []; }
  });
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('atoz_wishlist')) || [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('atoz_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('atoz_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const exists = prev.find(i => i._id === product._id);
      if (exists) {
        return prev.map(i => i._id === product._id ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, { ...product, qty }];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i._id !== id));

  const updateQty = (id, qty) => {
    if (qty < 1) return removeFromCart(id);
    setCart(prev => prev.map(i => i._id === id ? { ...i, qty } : i));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(i => i._id === product._id);
      if (exists) return prev.filter(i => i._id !== product._id);
      return [...prev, product];
    });
  };

  const isInWishlist = (id) => wishlist.some(i => i._id === id);
  const isInCart = (id) => cart.some(i => i._id === id);

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <CartContext.Provider value={{
      cart, wishlist, addToCart, removeFromCart, updateQty, clearCart,
      toggleWishlist, isInWishlist, isInCart, cartTotal, cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
