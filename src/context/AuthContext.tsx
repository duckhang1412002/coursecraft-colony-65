import { createContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/context/LanguageContext";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "teacher" | "admin";
  avatar?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: "student" | "teacher" | "admin") => Promise<boolean>;
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
  {
    id: "3",
    name: "Admin User",
    email: "admin@example.com", 
    role: "admin",
    avatar: "https://i.pravatar.cc/150?u=admin",
  },
];

const MOCK_PASSWORDS = {
  "teacher@example.com": "password123",
  "student@example.com": "password123",
  "admin@example.com": "password123",
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { t } = useLanguage();

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

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userIndex = MOCK_USERS.findIndex(u => u.email === email);
      if (userIndex === -1 || MOCK_PASSWORDS[email] !== password) {
        toast({
          title: t("auth.loginFailed"),
          description: "Invalid email or password",
          variant: "destructive",
        });
        return false;
      }
      
      const authenticatedUser = MOCK_USERS[userIndex];
      setUser(authenticatedUser);
      localStorage.setItem("user", JSON.stringify(authenticatedUser));
      
      toast({
        title: t("auth.loginSuccess"),
        description: `${t("auth.welcomeBack")}, ${authenticatedUser.name}!`,
      });
      
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: t("auth.loginFailed"),
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    name: string, 
    email: string, 
    password: string, 
    role: "student" | "teacher" | "admin"
  ): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (MOCK_USERS.some(u => u.email === email)) {
        toast({
          title: t("auth.registerFailed"),
          description: "An account with this email already exists",
          variant: "destructive",
        });
        return false;
      }
      
      const newUser: User = {
        id: `user_${Date.now()}`,
        name,
        email,
        role,
        avatar: `https://i.pravatar.cc/150?u=${Date.now()}`,
      };
      
      MOCK_USERS.push(newUser);
      (MOCK_PASSWORDS as any)[email] = password;
      
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      
      toast({
        title: t("auth.registerSuccess"),
        description: `Welcome to LearnWave, ${name}!`,
      });
      
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: t("auth.registerFailed"),
        description: "An unexpected error occurred",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: t("auth.loggedOut"),
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
