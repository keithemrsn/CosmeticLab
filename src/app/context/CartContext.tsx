import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { safeJsonParse } from '../lib/storage';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  shade?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number, shade?: string) => void;
  updateQuantity: (id: number, quantity: number, shade?: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return safeJsonParse<CartItem[]>(saved, []);
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id && i.shade === item.shade);
      if (existing) {
        return prev.map(i =>
          i.id === item.id && i.shade === item.shade
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number, shade?: string) => {
    setCartItems((prev) => prev.filter((item) => !(item.id === id && item.shade === shade)));
  };

  const updateQuantity = (id: number, quantity: number, shade?: string) => {
    if (quantity <= 0) {
      removeFromCart(id, shade);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id && item.shade === shade ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
