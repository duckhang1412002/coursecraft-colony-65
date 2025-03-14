
import { createContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

// Course type definition
export interface CartCourse {
  id: string;
  title: string;
  price: number;
  instructor: string;
  image: string;
  category?: string;
  level?: string;
}

interface CartContextType {
  cartItems: CartCourse[];
  addToCart: (course: CartCourse) => Promise<void>;
  removeFromCart: (courseId: string) => void;
  clearCart: () => void;
  isInCart: (courseId: string) => boolean;
  cartTotal: number;
}

export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: async () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  isInCart: () => false,
  cartTotal: 0,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartCourse[]>([]);
  const { toast } = useToast();

  // Calculate the total price of items in the cart
  const cartTotal = cartItems.reduce((total, item) => total + item.price, 0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse saved cart", error);
        localStorage.removeItem("cart");
      }
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add a course to the cart
  const addToCart = async (course: CartCourse): Promise<void> => {
    // Check if the course is already in the cart
    if (cartItems.some(item => item.id === course.id)) {
      toast({
        title: "Course Already in Cart",
        description: "This course is already in your cart",
      });
      return;
    }

    // Add the course to the cart
    setCartItems(prev => [...prev, course]);
  };

  // Remove a course from the cart
  const removeFromCart = (courseId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== courseId));
    toast({
      title: "Course Removed",
      description: "The course has been removed from your cart",
    });
  };

  // Clear the entire cart
  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart",
    });
  };

  // Check if a course is in the cart
  const isInCart = (courseId: string): boolean => {
    return cartItems.some(item => item.id === courseId);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
