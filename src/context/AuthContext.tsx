
import { createContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "teacher";
  avatar?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: "student" | "teacher") => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  isLoading: true,
  login: async () => false,
  register: async () => false,
  logout: () => {},
});

// Mock database for users
const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "John Teacher",
    email: "teacher@example.com",
    role: "teacher",
    avatar: "https://i.pravatar.cc/150?u=teacher",
  },
  {
    id: "2",
    name: "Jane Student",
    email: "student@example.com", 
    role: "student",
    avatar: "https://i.pravatar.cc/150?u=student",
  },
];

// Mock passwords (in a real app, you would never store passwords like this)
const MOCK_PASSWORDS = {
  "teacher@example.com": "password123",
  "student@example.com": "password123",
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Check for saved auth on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse saved user", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if the user exists and password matches
      const userIndex = MOCK_USERS.findIndex(u => u.email === email);
      if (userIndex === -1 || MOCK_PASSWORDS[email] !== password) {
        toast({
          title: "Login failed",
          description: "Invalid email or password",
          variant: "destructive",
        });
        return false;
      }
      
      // Set the authenticated user
      const authenticatedUser = MOCK_USERS[userIndex];
      setUser(authenticatedUser);
      localStorage.setItem("user", JSON.stringify(authenticatedUser));
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${authenticatedUser.name}!`,
      });
      
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (
    name: string, 
    email: string, 
    password: string, 
    role: "student" | "teacher"
  ): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if the email already exists
      if (MOCK_USERS.some(u => u.email === email)) {
        toast({
          title: "Registration failed",
          description: "An account with this email already exists",
          variant: "destructive",
        });
        return false;
      }
      
      // Create a new user
      const newUser: User = {
        id: `user_${Date.now()}`,
        name,
        email,
        role,
        avatar: `https://i.pravatar.cc/150?u=${Date.now()}`,
      };
      
      // Add user to mock database
      MOCK_USERS.push(newUser);
      // Add password to mock database
      (MOCK_PASSWORDS as any)[email] = password;
      
      // Auto-login the new user
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      
      toast({
        title: "Registration successful",
        description: `Welcome to LearnWave, ${name}!`,
      });
      
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
