
import { createContext, useState, useEffect, ReactNode, useContext } from "react";

// Define available languages
export type Language = "en" | "vi";

// Define the context type
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

// Create context with default values
export const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string) => key,
});

// Hook for using language context
export const useLanguage = () => useContext(LanguageContext);

// Define translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.courses": "Courses",
    "nav.dashboard": "Dashboard",
    "nav.signIn": "Sign In",
    "nav.signUp": "Sign Up",
    "nav.signOut": "Sign Out",
    "nav.myAccount": "My Account",
    
    // Auth
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.name": "Name",
    "auth.role": "Role",
    "auth.student": "Student",
    "auth.teacher": "Teacher",
    "auth.admin": "Admin",
    "auth.loginSuccess": "Login successful",
    "auth.loginFailed": "Login failed",
    "auth.registerSuccess": "Registration successful",
    "auth.registerFailed": "Registration failed",
    "auth.loggedOut": "You have been successfully logged out",
    "auth.welcomeBack": "Welcome back",
    
    // Courses
    "courses.browse": "Browse Courses",
    "courses.create": "Create Course",
    "courses.enroll": "Enroll Now",
    "courses.addToCart": "Add to Cart",
    "courses.removeFromCart": "Remove from Cart",
    "courses.price": "Price",
    "courses.instructor": "Instructor",
    "courses.description": "Description",
    "courses.lessons": "Lessons",
    
    // Cart
    "cart.title": "Your Cart",
    "cart.empty": "Your cart is empty",
    "cart.total": "Total",
    "cart.checkout": "Checkout",
    "cart.remove": "Remove",
    
    // Dashboard
    "dashboard.welcome": "Welcome to your Dashboard",
    "dashboard.myCourses": "My Courses",
    "dashboard.progress": "Progress",
    "dashboard.stats": "Statistics",
    
    // Admin
    "admin.dashboard": "Admin Dashboard",
    "admin.users": "Users Management",
    "admin.courses": "Courses Management",
    "admin.stats": "Platform Statistics",
    
    // Footer
    "footer.rights": "All rights reserved",
    
    // Language
    "language.select": "Language",
    "language.en": "English",
    "language.vi": "Vietnamese",
  },
  vi: {
    // Navigation
    "nav.home": "Trang chủ",
    "nav.courses": "Khóa học",
    "nav.dashboard": "Bảng điều khiển",
    "nav.signIn": "Đăng nhập",
    "nav.signUp": "Đăng ký",
    "nav.signOut": "Đăng xuất",
    "nav.myAccount": "Tài khoản của tôi",
    
    // Auth
    "auth.email": "Email",
    "auth.password": "Mật khẩu",
    "auth.name": "Tên",
    "auth.role": "Vai trò",
    "auth.student": "Học viên",
    "auth.teacher": "Giáo viên",
    "auth.admin": "Quản trị viên",
    "auth.loginSuccess": "Đăng nhập thành công",
    "auth.loginFailed": "Đăng nhập thất bại",
    "auth.registerSuccess": "Đăng ký thành công",
    "auth.registerFailed": "Đăng ký thất bại",
    "auth.loggedOut": "Bạn đã đăng xuất thành công",
    "auth.welcomeBack": "Chào mừng trở lại",
    
    // Courses
    "courses.browse": "Duyệt khóa học",
    "courses.create": "Tạo khóa học",
    "courses.enroll": "Ghi danh ngay",
    "courses.addToCart": "Thêm vào giỏ hàng",
    "courses.removeFromCart": "Xóa khỏi giỏ hàng",
    "courses.price": "Giá",
    "courses.instructor": "Giảng viên",
    "courses.description": "Mô tả",
    "courses.lessons": "Bài học",
    
    // Cart
    "cart.title": "Giỏ hàng của bạn",
    "cart.empty": "Giỏ hàng của bạn trống",
    "cart.total": "Tổng cộng",
    "cart.checkout": "Thanh toán",
    "cart.remove": "Xóa",
    
    // Dashboard
    "dashboard.welcome": "Chào mừng đến với Bảng điều khiển",
    "dashboard.myCourses": "Khóa học của tôi",
    "dashboard.progress": "Tiến độ",
    "dashboard.stats": "Thống kê",
    
    // Admin
    "admin.dashboard": "Bảng điều khiển quản trị",
    "admin.users": "Quản lý người dùng",
    "admin.courses": "Quản lý khóa học",
    "admin.stats": "Thống kê nền tảng",
    
    // Footer
    "footer.rights": "Đã đăng ký bản quyền",
    
    // Language
    "language.select": "Ngôn ngữ",
    "language.en": "Tiếng Anh",
    "language.vi": "Tiếng Việt",
  }
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  // Get saved language from localStorage or default to English
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    return savedLanguage && (savedLanguage === "en" || savedLanguage === "vi") 
      ? savedLanguage 
      : "en";
  });

  // Save language preference to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
