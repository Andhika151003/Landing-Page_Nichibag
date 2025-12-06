import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // Ambil data dari LocalStorage saat awal load
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('nichibag_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Simpan ke LocalStorage setiap kali cart berubah
  useEffect(() => {
    localStorage.setItem('nichibag_cart', JSON.stringify(cart));
  }, [cart]);

  // Fungsi Tambah ke Keranjang
  const addToCart = (product, selectedColor, quantity) => {
    setCart((prevCart) => {
      // Cek apakah produk dengan warna yang sama sudah ada
      const existingItemIndex = prevCart.findIndex(
        (item) => item._id === product._id && item.selectedColor?.name === selectedColor?.name
      );

      if (existingItemIndex > -1) {
        // Jika ada, update quantity-nya
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += quantity;
        return newCart;
      } else {
        // Jika belum, tambahkan item baru
        return [...prevCart, { ...product, selectedColor, quantity }];
      }
    });
  };

  // Fungsi Hapus dari Keranjang
  const removeFromCart = (id, colorName) => {
    setCart((prevCart) => 
      prevCart.filter(item => !(item._id === id && item.selectedColor?.name === colorName))
    );
  };

  // Fungsi Update Quantity
  const updateQuantity = (id, colorName, amount) => {
    setCart((prevCart) => 
      prevCart.map(item => {
        if (item._id === id && item.selectedColor?.name === colorName) {
          return { ...item, quantity: Math.max(1, item.quantity + amount) };
        }
        return item;
      })
    );
  };

  // Hitung Total Harga
  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = item.discountPrice || item.price;
      return total + (price * item.quantity);
    }, 0);
  };

  // Hitung Total Item (untuk Badge di Navbar)
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, getTotalPrice, getTotalItems }}>
      {children}
    </CartContext.Provider>
  );
};