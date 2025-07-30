import React, { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
  // Initialize cart from localStorage if available
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Sync cart state to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage
    }
  }, [cart]); // Dependency array ensures this effect runs when cart changes

  // Function to add items to the cart
  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
  };

  // Function to remove items from the cart
  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  // Function to update item quantity (increase or decrease)
  const updateQuantity = (itemId, action) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === itemId) {
          if (action === 'increase') {
            return { ...item, quantity: item.quantity + 1 };
          } else if (action === 'decrease' && item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          }
        }
        return item;
      });
    });
  };

  // Function to empty the cart
  const emptyCart = () => {
    setCart([]); // Clear cart state
    localStorage.removeItem('cart'); // Remove cart from localStorage
  };

  // Function to get total number of items in the cart
  const getTotalCartItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        emptyCart,
        getTotalCartItems,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
